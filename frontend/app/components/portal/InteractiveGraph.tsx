"use client";

import React, { useState } from 'react';
import { ZoomIn, ZoomOut, RotateCcw, ShieldCheck, Activity, ArrowRight, Layers } from 'lucide-react';
import { DEMO_CASE_DATA, GraphNode } from '@/app/lib/mockData';

interface InteractiveGraphProps {
  selectedNodeId: string;
  onSelectNode: (node: GraphNode) => void;
}

export default function InteractiveGraph({ selectedNodeId, onSelectNode }: InteractiveGraphProps) {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.15, 2.0));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.15, 0.5));
  const handleReset = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPan({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
  };

  const handleMouseUp = () => setIsDragging(false);

  // Layout coordinates for SVG Canvas graph nodes
  const nodePositions: Record<string, { x: number; y: number }> = {
    'target': { x: 100, y: 220 },
    'mule-1': { x: 260, y: 140 },
    'mule-2': { x: 420, y: 280 },
    'bridge': { x: 580, y: 160 },
    'mule-3': { x: 740, y: 280 },
    'mixer': { x: 880, y: 140 },
    'vasp-x': { x: 1040, y: 220 },
  };

  return (
    <div className="relative w-full h-[450px] bg-[#050810] border border-[#1E2D4A] rounded-xl overflow-hidden shadow-2xl select-none">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#111a2e_1px,transparent_1px),linear-gradient(to_bottom,#111a2e_1px,transparent_1px)] bg-[size:32px_32px] opacity-30" />

      {/* Controls Overlay */}
      <div className="absolute top-4 right-4 z-20 flex space-x-2 bg-[#111A2E]/90 border border-[#1E2D4A] p-1.5 rounded-lg shadow-lg backdrop-blur">
        <button
          onClick={handleZoomIn}
          className="p-1.5 text-gray-400 hover:text-cyan-400 hover:bg-white/5 rounded transition-colors"
          title="Zoom In"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={handleZoomOut}
          className="p-1.5 text-gray-400 hover:text-cyan-400 hover:bg-white/5 rounded transition-colors"
          title="Zoom Out"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <button
          onClick={handleReset}
          className="p-1.5 text-gray-400 hover:text-amber-400 hover:bg-white/5 rounded transition-colors"
          title="Reset Pan/Zoom"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Top Left Legend Header */}
      <div className="absolute top-4 left-4 z-20 flex items-center space-x-3 bg-[#111A2E]/90 border border-[#1E2D4A] px-3.5 py-2 rounded-lg text-xs font-mono backdrop-blur">
        <Activity className="w-4 h-4 text-cyan-400 animate-pulse" />
        <span className="text-gray-200 font-bold">MONEY-FLOW PATHWAY</span>
        <span className="text-gray-500">|</span>
        <div className="flex items-center space-x-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_8px_#FFB300]" />
          <span className="text-amber-300">Traced Route (Gold)</span>
        </div>
      </div>

      {/* Interactive SVG Canvas Viewport */}
      <div
        className="w-full h-full cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <svg
          className="w-full h-full"
          viewBox="0 0 1200 450"
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            transformOrigin: 'center center',
            transition: isDragging ? 'none' : 'transform 0.1s ease-out',
          }}
        >
          <defs>
            {/* Gold Edge Gradient */}
            <linearGradient id="goldEdgeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FFB300" />
              <stop offset="50%" stopColor="#FFF" />
              <stop offset="100%" stopColor="#FFB300" />
            </linearGradient>

            {/* Glowing filters */}
            <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <filter id="cyanGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Render Edges */}
          {DEMO_CASE_DATA.edges.map((edge, idx) => {
            const posFrom = nodePositions[edge.from];
            const posTo = nodePositions[edge.to];
            if (!posFrom || !posTo) return null;

            // Draw curved path
            const midX = (posFrom.x + posTo.x) / 2;
            const midY = (posFrom.y + posTo.y) / 2 + (idx % 2 === 0 ? -15 : 15);
            const pathD = `M ${posFrom.x} ${posFrom.y} Q ${midX} ${midY} ${posTo.x} ${posTo.y}`;

            return (
              <g key={idx}>
                {/* Edge line shadow/glow */}
                <path
                  d={pathD}
                  fill="none"
                  stroke="#FFB300"
                  strokeWidth="3"
                  strokeOpacity="0.8"
                  filter="url(#goldGlow)"
                />

                {/* Animated Edge Pulse Circle */}
                <circle r="4" fill="#FFFFFF" filter="url(#goldGlow)">
                  <animateMotion path={pathD} dur={`${2 + idx * 0.4}s`} repeatCount="indefinite" />
                </circle>

                {/* Latency / Tx label on edge */}
                <text
                  x={midX}
                  y={midY - 8}
                  fill="#FFB300"
                  fontSize="10"
                  fontFamily="monospace"
                  textAnchor="middle"
                  className="select-none"
                >
                  {edge.latency}
                </text>
              </g>
            );
          })}

          {/* Render Nodes */}
          {DEMO_CASE_DATA.nodes.map((node) => {
            const pos = nodePositions[node.id];
            if (!pos) return null;

            const isSelected = selectedNodeId === node.id;
            const isVasp = node.type === 'vasp_deposit' || node.type === 'vasp_hot' || (node.type as string) === 'vasp';
            const isTarget = node.type === 'target';
            const isBridge = node.type === 'bridge';

            let nodeColor = '#FFB300';
            if (isVasp) nodeColor = '#00E5FF';
            if (isBridge) nodeColor = '#3B82F6';

            return (
              <g
                key={node.id}
                transform={`translate(${pos.x}, ${pos.y})`}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectNode(node);
                }}
                className="cursor-pointer group"
              >
                {/* Selection Halo */}
                {isSelected && (
                  <circle
                    r={isVasp ? '38' : '28'}
                    fill="none"
                    stroke={nodeColor}
                    strokeWidth="2"
                    strokeDasharray="4,4"
                  >
                    <animateTransform
                      attributeName="transform"
                      type="rotate"
                      from="0"
                      to="360"
                      dur="8s"
                      repeatCount="indefinite"
                    />
                  </circle>
                )}

                {/* VASP Lock-on Target HUD */}
                {isVasp && (
                  <circle
                    r="32"
                    fill="none"
                    stroke="#00E5FF"
                    strokeWidth="1.5"
                    strokeOpacity="0.6"
                    className="animate-ping"
                  />
                )}

                {/* Outer Base Circle */}
                <circle
                  r={isVasp ? '24' : isTarget ? '20' : '16'}
                  fill="#0A0F1D"
                  stroke={nodeColor}
                  strokeWidth={isSelected ? '3.5' : '2'}
                  filter={isVasp ? 'url(#cyanGlow)' : 'url(#goldGlow)'}
                />

                {/* Center Core Circle */}
                <circle r={isVasp ? '10' : '6'} fill={nodeColor} />

                {/* Node Label Text */}
                <text
                  y={isVasp ? '44' : '34'}
                  fill="#FFFFFF"
                  fontSize="11"
                  fontWeight="bold"
                  fontFamily="monospace"
                  textAnchor="middle"
                  className="group-hover:fill-cyan-300 transition-colors"
                >
                  {node.label}
                </text>

                {/* Sub Address Text */}
                <text
                  y={isVasp ? '56' : '46'}
                  fill="#9CA3AF"
                  fontSize="9"
                  fontFamily="monospace"
                  textAnchor="middle"
                >
                  {node.address.slice(0, 8)}...
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
