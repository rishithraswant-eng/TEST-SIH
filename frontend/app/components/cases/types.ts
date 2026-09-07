export type NodeClass =
  | 'VASP_DEPOSIT' | 'VASP_HOT' | 'MULE' | 'MIXER'
  | 'BRIDGE' | 'DEX_ROUTER' | 'UNKNOWN';

export type ConfidenceBand = 'high' | 'medium' | 'abstained';

export interface GraphNode {
  id: string;
  address: string;          // full, untruncated
  chainKey: string;
  nodeClass: NodeClass;
  classProbabilities: Record<NodeClass, number>;  // full vector, not just argmax
  confidenceBand: ConfidenceBand;
  isSeed: boolean;
  isAbsorption: boolean;
  entityName?: string;      // e.g. "WazirX (deposit)"
  flags: Array<'conflicted' | 'overridden' | 'pruned' | 'pending_finality'>;
  valueThroughBase: string; // decimal string — never a JS number
}

export interface GraphEdge {
  id: string;
  from: string;
  to: string;
  txHash: string;
  assetSymbol: string;
  valueBase: string;        // decimal string
  isPruned: boolean;
  isInference: boolean;     // co-spend / change-address heuristic edge
  layer: 'primary' | 'alternate' | 'pruned';
}

export interface TracePath {
  rank: number;
  confidencePoint: number;  // 0..1
  ciLower: number;
  ciUpper: number;
  hopCount: number;
  terminalEntity: string;
  terminalClass: NodeClass;
  jurisdiction: 'FIU_REGISTERED_DOMESTIC' | 'OFFSHORE' | 'UNKNOWN_ENTITY';
  tracedValueFraction: number; // 0..1 — share of seed value on this path
  proofsVerified: number;
  proofsTotal: number;
  crossesMixer: boolean;
}
