// File: src/components/shared/NetworkVisualization.jsx
import React, { useEffect, useState } from 'react';
import {
  UserIcon,
  ServerIcon,
  EyeIcon,
  KeyIcon,
  FileTextIcon
} from '../ui/Icons';
import './NetworkVisualization.css';

function NetworkVisualization({ type, showEavesdropper, isActive, dataPackets }) {
  const [nodes, setNodes] = useState([]);
  const [connections, setConnections] = useState([]);
  const [packets, setPackets] = useState([]);

  useEffect(() => {
    // Initialize network nodes
    const networkNodes = [
      { id: 'alice', label: 'Alice (Transmitter)', x: 60, y: 60, type: 'agent' },
      { id: 'bob', label: 'Bob (Receiver)', x: 440, y: 60, type: 'server' },
      { id: 'eve', label: 'Eve (Channel Observer)', x: 250, y: 150, type: 'eavesdropper', hidden: !showEavesdropper }
    ];
    
    const networkConnections = [
      { from: 'alice', to: 'bob', type: type === 'quantum' ? 'quantum' : 'classical' },
      ...(showEavesdropper ? [
        { from: 'eve', to: 'alice', type: 'attack', dashed: true },
        { from: 'eve', to: 'bob', type: 'attack', dashed: true }
      ] : [])
    ];
    
    setNodes(networkNodes);
    setConnections(networkConnections);
    
    // Generate packets if active
    if (isActive && dataPackets) {
      const newPackets = dataPackets.map(packet => ({
        id: packet.id,
        x: 60,
        y: 60,
        targetX: 440,
        targetY: 60,
        progress: 0,
        type: packet.type,
        content: packet.content
      }));
      setPackets(newPackets);
    }
  }, [type, showEavesdropper, isActive, dataPackets]);

  useEffect(() => {
    if (!isActive || packets.length === 0) return;
    
    const interval = setInterval(() => {
      setPackets(prev => 
        prev.map(packet => ({
          ...packet,
          progress: packet.progress >= 1 ? 0 : packet.progress + 0.02,
          x: 60 + (440 - 60) * packet.progress,
          y: 60 + Math.sin(packet.progress * Math.PI) * 45
        })).filter(packet => packet.progress < 1.2)
      );
    }, 50);
    
    return () => clearInterval(interval);
  }, [isActive, packets.length]);

  const renderNodeIcon = (nodeType) => {
    if (nodeType === 'agent') return <UserIcon size={16} />;
    if (nodeType === 'server') return <ServerIcon size={16} />;
    if (nodeType === 'eavesdropper') return <EyeIcon size={16} />;
    return null;
  };

  return (
    <div className="network-visualization">
      <div className="network-canvas">
        {/* Draw connections */}
        {connections.map(conn => (
          <svg key={`${conn.from}-${conn.to}`} className="connection-layer">
            <line
              x1={nodes.find(n => n.id === conn.from)?.x || 0}
              y1={nodes.find(n => n.id === conn.from)?.y || 0}
              x2={nodes.find(n => n.id === conn.to)?.x || 0}
              y2={nodes.find(n => n.id === conn.to)?.y || 0}
              className={`connection ${conn.type} ${conn.dashed ? 'dashed' : ''}`}
            />
          </svg>
        ))}
        
        {/* Draw packets */}
        {packets.map(packet => (
          <div
            key={packet.id}
            className={`packet ${packet.type}`}
            style={{
              left: `${packet.x}px`,
              top: `${packet.y}px`,
              transform: `translate(-50%, -50%)`
            }}
          >
            <div className="packet-content">
              {packet.type === 'key' ? <KeyIcon size={13} /> : <FileTextIcon size={13} />}
            </div>
            {packet.type === 'key' && (
              <div className="packet-tooltip">
                {packet.content}
              </div>
            )}
          </div>
        ))}
        
        {/* Draw nodes */}
        {nodes.filter(node => !node.hidden).map(node => (
          <div
            key={node.id}
            className={`network-node ${node.type}`}
            style={{
              left: `${node.x}px`,
              top: `${node.y}px`
            }}
          >
            <div className="node-icon">
              {renderNodeIcon(node.type)}
            </div>
            <div className="node-label">{node.label}</div>
            <div className="node-status">
              {node.type === 'eavesdropper' && showEavesdropper && 'MONITORING'}
              {node.type !== 'eavesdropper' && (isActive ? 'TRANSMITTING' : 'IDLE')}
            </div>
          </div>
        ))}
      </div>
      
      <div className="network-legend">
        <div className="legend-item">
          <div className="legend-line classical"></div>
          <span>Classical Channel</span>
        </div>
        <div className="legend-item">
          <div className="legend-line quantum"></div>
          <span>Quantum Channel</span>
        </div>
        <div className="legend-item">
          <div className="legend-line attack"></div>
          <span>Interception Attempt</span>
        </div>
        <div className="legend-item">
          <div className="legend-packet key"></div>
          <span>Key Exchange</span>
        </div>
        <div className="legend-item">
          <div className="legend-packet data"></div>
          <span>Ciphertext Stream</span>
        </div>
      </div>
    </div>
  );
}

export default NetworkVisualization;
