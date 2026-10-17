// File: src/App.jsx
import React, { useState } from 'react';
import Header from './components/shared/Header';
import SideBySideComparison from './components/comparison/SideBySideComparison';
import ControlPanel from './components/shared/ControlPanel';
import StatsDashboard from './components/comparison/StatsDashboard';
import ClassicalSimulator from './components/classical/ClassicalSimulator';
import QuantumSimulator from './components/quantum/QuantumSimulator';
import './styles/App.css';
import './styles/variables.css';

function App() {
  const [activeTab, setActiveTab] = useState('comparison');
  const [simulationSpeed, setSimulationSpeed] = useState(1);
  const [showEavesdropper, setShowEavesdropper] = useState(false);
  const [keySize, setKeySize] = useState(2048);

  return (
    <div className="app">
      <Header 
        title="Quantum vs Classical Key Distribution Simulator"
        subtitle="Intelligence Agency Secure Communications Protocol"
      />
      
      <ControlPanel
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        simulationSpeed={simulationSpeed}
        setSimulationSpeed={setSimulationSpeed}
        showEavesdropper={showEavesdropper}
        setShowEavesdropper={setShowEavesdropper}
        keySize={keySize}
        setKeySize={setKeySize}
      />
      
      <main className="main-content">
        {activeTab === 'comparison' && (
          <SideBySideComparison
            simulationSpeed={simulationSpeed}
            showEavesdropper={showEavesdropper}
            keySize={keySize}
          />
        )}
        
        {activeTab === 'classical' && (
          <div className="single-view">
            <h2 style={{ marginBottom: '1.5rem', color: 'var(--classical-blue, #4DABFF)' }}>
              Classical Key Distribution (RSA / Diffie-Hellman)
            </h2>
            <ClassicalSimulator
              simulationSpeed={simulationSpeed}
              showEavesdropper={showEavesdropper}
              keySize={keySize}
            />
          </div>
        )}
        
        {activeTab === 'quantum' && (
          <div className="single-view">
            <h2 style={{ marginBottom: '1.5rem', color: 'var(--quantum-cyan, #00E5FF)' }}>
              Quantum Key Distribution (BB84 Protocol)
            </h2>
            <QuantumSimulator
              simulationSpeed={simulationSpeed}
              showEavesdropper={showEavesdropper}
            />
          </div>
        )}
      </main>
      
      <StatsDashboard
        showEavesdropper={showEavesdropper}
        keySize={keySize}
      />
      
      <footer className="footer">
        <p>Intelligence Agency Cryptographic Simulation v1.0 | For Training Purposes Only</p>
      </footer>
    </div>
  );
}

export default App;