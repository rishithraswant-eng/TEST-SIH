"use client";

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Copy, CheckCircle, AlertCircle } from 'lucide-react';
import { GraphNode, GraphEdge } from './types';

interface HopTableViewProps {
  nodes: GraphNode[];
  edges: GraphEdge[];
  onClose: () => void;
}

export default function HopTableView({ nodes, edges, onClose }: HopTableViewProps) {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const toggleRow = (id: string) => {
    const newSet = new Set(expandedRows);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setExpandedRows(newSet);
  };

  const getNodeByAddress = (address: string) => nodes.find(n => n.address === address);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="flex flex-col h-full bg-white text-black p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold font-sans">Hop-by-Hop Attribution Table</h2>
          <p className="text-gray-600 text-sm mt-1">Full-fidelity representation of the attribution graph.</p>
        </div>
        <button 
          onClick={onClose}
          className="bg-gray-200 hover:bg-gray-300 text-black px-4 py-2 rounded text-sm font-medium transition-colors"
        >
          Return to Graph Canvas
        </button>
      </div>

      <div className="flex-1 overflow-auto border border-gray-300 rounded print:border-none print:overflow-visible">
        <table className="w-full text-left text-sm whitespace-nowrap print:text-xs">
          <thead className="bg-gray-100 sticky top-0 z-10 print:static">
            <tr>
              <th className="px-4 py-3 font-semibold text-gray-700 border-b border-gray-300">Hop</th>
              <th className="px-4 py-3 font-semibold text-gray-700 border-b border-gray-300">From</th>
              <th className="px-4 py-3 font-semibold text-gray-700 border-b border-gray-300">To</th>
              <th className="px-4 py-3 font-semibold text-gray-700 border-b border-gray-300">Asset</th>
              <th className="px-4 py-3 font-semibold text-gray-700 border-b border-gray-300">Value</th>
              <th className="px-4 py-3 font-semibold text-gray-700 border-b border-gray-300">Evidence</th>
              <th className="px-4 py-3 border-b border-gray-300"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {edges.filter(e => e.layer === 'primary').map((edge, index) => {
              const isExpanded = expandedRows.has(edge.id);
              const fromNode = getNodeByAddress(edge.from);
              const toNode = getNodeByAddress(edge.to);

              return (
                <React.Fragment key={edge.id}>
                  <tr 
                    className="hover:bg-gray-50 cursor-pointer print:break-inside-avoid"
                    onClick={() => toggleRow(edge.id)}
                  >
                    <td className="px-4 py-3">{index + 1}</td>
                    <td className="px-4 py-3">
                      <div className="font-mono text-gray-800">{edge.from.substring(0, 8)}...{edge.from.substring(edge.from.length - 6)}</div>
                      <div className="text-xs text-gray-500">{fromNode?.nodeClass || 'UNKNOWN'}</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-mono text-gray-800">{edge.to.substring(0, 8)}...{edge.to.substring(edge.to.length - 6)}</div>
                      <div className="text-xs text-gray-500">{toNode?.nodeClass || 'UNKNOWN'}</div>
                    </td>
                    <td className="px-4 py-3 font-medium">{edge.assetSymbol}</td>
                    <td className="px-4 py-3 font-mono">{edge.valueBase}</td>
                    <td className="px-4 py-3">
                      {edge.isInference ? (
                        <span className="flex items-center text-amber-600 text-xs font-semibold">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          Inference
                        </span>
                      ) : (
                        <span className="flex items-center text-green-600 text-xs font-semibold">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Verified
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-gray-400 text-right">
                      {isExpanded ? <ChevronUp className="w-5 h-5 inline-block" /> : <ChevronDown className="w-5 h-5 inline-block" />}
                    </td>
                  </tr>
                  
                  {isExpanded && (
                    <tr className="bg-gray-50 print:bg-white print:break-inside-avoid">
                      <td colSpan={7} className="px-4 py-4 border-b border-gray-200">
                        <div className="grid grid-cols-2 gap-8 text-sm">
                          <div>
                            <h4 className="font-semibold text-gray-700 mb-2">Transaction Details</h4>
                            <div className="grid grid-cols-[100px_1fr] gap-2 mb-1">
                              <span className="text-gray-500">Hash:</span>
                              <div className="flex items-center group">
                                <span className="font-mono text-gray-800 mr-2 break-all">{edge.txHash}</span>
                                <button onClick={(e) => { e.stopPropagation(); copyToClipboard(edge.txHash); }} className="text-gray-400 hover:text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <Copy className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                            <div className="grid grid-cols-[100px_1fr] gap-2 mb-1">
                              <span className="text-gray-500">Block:</span>
                              <span>812,441 <span className="text-gray-400 text-xs ml-1">(143 confirmations)</span></span>
                            </div>
                            <div className="grid grid-cols-[100px_1fr] gap-2">
                              <span className="text-gray-500">Time (UTC):</span>
                              <span>2024-05-12 14:32:01</span>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-700 mb-2">Endpoint Classifications</h4>
                            <div className="grid grid-cols-[100px_1fr] gap-2 mb-2">
                              <span className="text-gray-500">Source:</span>
                              <div>
                                <span className="font-medium text-gray-800">{fromNode?.entityName || 'Unknown Entity'}</span>
                                <span className="mx-2 text-gray-300">|</span>
                                <span>{fromNode?.nodeClass}</span>
                              </div>
                            </div>
                            <div className="grid grid-cols-[100px_1fr] gap-2">
                              <span className="text-gray-500">Destination:</span>
                              <div>
                                <span className="font-medium text-gray-800">{toNode?.entityName || 'Unknown Entity'}</span>
                                <span className="mx-2 text-gray-300">|</span>
                                <span>{toNode?.nodeClass}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
      
      {/* Print only footer */}
      <div className="hidden print:block mt-8 text-center text-gray-500 text-xs">
        Generated by PHANTASM Attribution Engine • Page 1
      </div>
    </div>
  );
}
