"use client";

import React, { useState, useEffect } from 'react';
import { Play, Square, CheckCircle, Circle, ArrowRight, Activity, Clock, ShieldAlert } from 'lucide-react';

type Stage = 'INGESTING' | 'PRUNING' | 'CLASSIFYING' | 'SEARCHING' | 'SCORING' | 'SEALING';

export default function LiveProgress({ onStop, onComplete }: { onStop: () => void, onComplete: () => void }) {
  const [currentStage, setCurrentStage] = useState<Stage>('INGESTING');
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [progress, setProgress] = useState(0);

  const stages: { id: Stage; label: string; detail: string; status: 'done' | 'active' | 'pending' }[] = [
    { id: 'INGESTING', label: 'INGESTING', detail: '1,284 transactions · 4 sources · 3 conflicts', status: currentStage === 'INGESTING' ? 'active' : 'done' },
    { id: 'PRUNING', label: 'PRUNING', detail: '412 edges filtered (dust, bot bursts)', status: currentStage === 'INGESTING' ? 'pending' : (currentStage === 'PRUNING' ? 'active' : 'done') },
    { id: 'CLASSIFYING', label: 'CLASSIFYING', detail: '847 / 1,102 nodes', status: ['INGESTING', 'PRUNING'].includes(currentStage) ? 'pending' : (currentStage === 'CLASSIFYING' ? 'active' : 'done') },
    { id: 'SEARCHING', label: 'SEARCHING', detail: 'Identifying paths', status: ['INGESTING', 'PRUNING', 'CLASSIFYING'].includes(currentStage) ? 'pending' : (currentStage === 'SEARCHING' ? 'active' : 'done') },
    { id: 'SCORING', label: 'SCORING', detail: 'Monte carlo simulation', status: currentStage === 'SEALING' || currentStage === 'SCORING' ? (currentStage === 'SCORING' ? 'active' : 'done') : 'pending' },
    { id: 'SEALING', label: 'SEALING', detail: 'Finalizing attribution', status: currentStage === 'SEALING' ? 'active' : 'pending' }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedSeconds(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Mock simulation
    const stageFlow: Stage[] = ['INGESTING', 'PRUNING', 'CLASSIFYING', 'SEARCHING', 'SCORING', 'SEALING'];
    let index = 0;
    
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          index++;
          if (index < stageFlow.length) {
            setCurrentStage(stageFlow[index]);
            return 0;
          } else {
            clearInterval(interval);
            setTimeout(onComplete, 1000);
            return 100;
          }
        }
        return p + 2;
      });
    }, 100);
    
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="bg-phantasm-surface border border-phantasm-border rounded-xl shadow-lg relative overflow-hidden flex flex-col h-full animate-in fade-in zoom-in duration-500">
      {/* Header */}
      <div className="bg-phantasm-border/30 px-6 py-4 border-b border-phantasm-border flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <Activity className="w-5 h-5 text-phantasm-cyan animate-pulse" />
          <h2 className="text-sm font-semibold text-gray-200">Tracing bc1qxy2k…8mzk9v</h2>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-gray-400 font-mono text-sm flex items-center">
            <Clock className="w-4 h-4 mr-2 text-phantasm-cyan/70" />
            Elapsed {formatTime(elapsedSeconds)}
          </span>
          <button 
            onClick={onStop}
            className="bg-red-500/10 text-red-400 hover:bg-red-500/20 px-4 py-1.5 rounded text-sm font-medium transition-colors flex items-center"
          >
            <Square className="w-3.5 h-3.5 mr-2 fill-current" />
            Stop
          </button>
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col">
        {/* Stages list */}
        <div className="space-y-4 mb-8">
          {stages.map((stage) => (
            <div key={stage.id} className={`flex items-center transition-all duration-300 ${stage.status === 'active' ? 'opacity-100' : (stage.status === 'done' ? 'opacity-70' : 'opacity-30')}`}>
              <div className="w-8 flex justify-center">
                {stage.status === 'done' && <CheckCircle className="w-5 h-5 text-green-500" />}
                {stage.status === 'active' && <ArrowRight className="w-5 h-5 text-phantasm-cyan" />}
                {stage.status === 'pending' && <Circle className="w-4 h-4 text-gray-600" />}
              </div>
              <div className="flex-1 ml-3 flex justify-between items-center">
                <div>
                  <span className={`font-mono text-sm tracking-wide ${stage.status === 'active' ? 'text-phantasm-cyan font-bold' : 'text-gray-300'}`}>
                    {stage.label}
                  </span>
                  {(stage.status === 'done' || stage.status === 'active') && (
                    <span className="ml-4 text-sm text-gray-400">{stage.detail}</span>
                  )}
                </div>
                {stage.status === 'active' && (
                  <div className="flex items-center w-48">
                    <div className="flex-1 h-1.5 bg-phantasm-border rounded-full overflow-hidden mr-3">
                      <div className="h-full bg-phantasm-cyan transition-all duration-300 shadow-[0_0_8px_rgba(0,229,255,0.5)]" style={{ width: `${progress}%` }}></div>
                    </div>
                    <span className="font-mono text-xs text-phantasm-cyan">{progress}%</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Live Findings */}
        <div className="mt-auto bg-[#070A0E] border border-phantasm-border rounded-lg p-5">
          <h3 className="text-gray-400 font-semibold text-sm mb-3">Live findings</h3>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="text-phantasm-cyan mr-2">•</span>
              <span className="text-sm text-gray-300">Hop 2 shows a peel-chain pattern</span>
            </li>
            <li className="flex items-start">
              <span className="text-phantasm-cyan mr-2">•</span>
              <span className="text-sm text-gray-300 flex items-center">
                3 transactions have conflicting data between sources 
                <button onClick={() => alert("Viewing conflicting transactions details...")} className="ml-3 text-xs text-phantasm-cyan hover:underline bg-phantasm-cyan/10 px-2 py-0.5 rounded border border-phantasm-cyan/20">view</button>
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-phantasm-cyan mr-2">•</span>
              <span className="text-sm text-gray-300">1 node classified as a mixing service</span>
            </li>
          </ul>
        </div>
        
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">
            You can leave this page. We'll notify you when it completes.
          </p>
        </div>
      </div>
    </div>
  );
}
