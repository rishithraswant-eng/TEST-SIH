import logging

from fastapi import FastAPI
from fastapi.testclient import TestClient

from app.core.audit_middleware import AuditMiddleware

app = FastAPI()
app.add_middleware(AuditMiddleware)

@app.get("/cases/123/view")
def view_case():
    return {"status": "ok"}

@app.post("/cases/123/update")
def update_case():
    return {"status": "ok"}

client = TestClient(app)

def test_audit_middleware(caplog):
    caplog.set_level(logging.INFO)
    
    # GET request should not emit audit event
    response = client.get("/cases/123/view")
    assert response.status_code == 200
    
    audit_logs = [r for r in caplog.records if "AUDIT EVENT" in r.getMessage()]
    assert len(audit_logs) == 0
    
    # POST request should emit audit event
    response = client.post("/cases/123/update")
    assert response.status_code == 200
    
    audit_logs = [r for r in caplog.records if "AUDIT EVENT" in r.getMessage()]
    assert len(audit_logs) == 1
    
    log_msg = audit_logs[0].getMessage()
    assert "'method': 'POST'" in log_msg
    assert "'case_id': '123'" in log_msg
    assert "'endpoint': '/cases/123/update'" in log_msg

def test_audit_middleware_registered_on_real_app(caplog):
    caplog.set_level(logging.INFO)
    
    from app.main import app as real_app
    real_client = TestClient(real_app)
    
    # We just need to make any POST request to the real app
    # Even if it 404s or 422s, the middleware should still log it
    real_client.post("/some-nonexistent-endpoint-for-audit-test")
    
    audit_logs = [r for r in caplog.records if "AUDIT EVENT" in r.getMessage()]
    assert len(audit_logs) >= 1
    
    log_msg = audit_logs[0].getMessage()
    assert "'method': 'POST'" in log_msg
    assert "'endpoint': '/some-nonexistent-endpoint-for-audit-test'" in log_msg
