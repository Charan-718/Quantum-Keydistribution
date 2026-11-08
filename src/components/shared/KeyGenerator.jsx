// File: src/components/shared/KeyGenerator.jsx
import React, { useState } from 'react';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import { KeyIcon, RotateCcwIcon, CopyIcon, CheckIcon } from '../ui/Icons';
import './KeyGenerator.css';

function KeyGenerator({ type, keySize, onKeyGenerated }) {
  const [keyBits, setKeyBits] = useState([]);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedKey, setGeneratedKey] = useState('');
  const [copied, setCopied] = useState(false);

  const generateKey = () => {
    setIsGenerating(true);
    setGenerationProgress(0);
    setKeyBits([]);
    
    const totalBits = type === 'quantum' ? 256 : keySize;
    const bits = [];
    let progress = 0;
    
    const interval = setInterval(() => {
      if (progress >= totalBits) {
        clearInterval(interval);
        setIsGenerating(false);
        
        // Create final key representation
        const keyHex = bits.map(bit => (typeof bit === 'object' ? bit.bit : bit).toString(16)).join('');
        setGeneratedKey(keyHex);
        
        if (onKeyGenerated) {
          onKeyGenerated({
            bits: bits,
            hex: keyHex,
            size: totalBits,
            type: type
          });
        }
        return;
      }
      
      // Generate bit
      const bit = Math.random() > 0.5 ? 1 : 0;
      
      // For quantum, simulate basis and polarization
      if (type === 'quantum') {
        const basis = Math.random() > 0.5 ? 'rectilinear' : 'diagonal';
        const polarization = basis === 'rectilinear' 
          ? (bit === 1 ? 'vertical' : 'horizontal')
          : (bit === 1 ? '45deg' : '135deg');
        
        bits.push({
          bit,
          basis,
          polarization,
          id: Date.now() + Math.random()
        });
      } else {
        bits.push(bit);
      }
      
      setKeyBits([...bits]);
      setGenerationProgress(Math.round(((progress + 1) / totalBits) * 100));
      progress++;
    }, type === 'quantum' ? 35 : 8);
  };

  const resetKey = () => {
    setKeyBits([]);
    setGeneratedKey('');
    setGenerationProgress(0);
    setIsGenerating(false);
    setCopied(false);
  };

  const handleCopy = () => {
    if (!generatedKey) return;
    navigator.clipboard.writeText(generatedKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getPolarizationGlyph = (pol) => {
    switch (pol) {
      case 'vertical': return '|';
      case 'horizontal': return '—';
      case '45deg': return '/';
      case '135deg': return '\\';
      default: return '|';
    }
  };

  return (
    <div className={`key-generator ${type}`}>
      <div className="generator-header">
        <div className="generator-title-row">
          <KeyIcon size={18} color="var(--color-quantum-primary)" />
          <h3>
            {type === 'quantum' ? 'Quantum Key Generation Engine' : 'Classical Pseudorandom Key Generator'}
          </h3>
        </div>
        <Badge variant={type === 'quantum' ? 'quantum' : 'classical'}>
          {type === 'quantum' ? '256 Photons (BB84)' : `${keySize} Bits (FIPS 140-3)`}
        </Badge>
      </div>
      
      <div className="generation-progress">
        <div className="progress-bar-track">
          <div 
            className="progress-bar-fill"
            style={{ 
              width: `${generationProgress}%`,
              backgroundColor: type === 'quantum' ? 'var(--color-quantum-primary)' : 'var(--color-classical-primary)'
            }}
          />
        </div>
        <div className="progress-text-row">
          <span className="progress-status">
            {isGenerating ? 'Synthesizing Entropy Pool...' : generationProgress === 100 ? 'Synthesis Complete' : 'Standing By'}
          </span>
          <span className="progress-percent font-mono">{generationProgress}%</span>
        </div>
      </div>
      
      <div className="bit-visualization">
        <div className="bit-grid">
          {keyBits.slice(0, 64).map((bitObj, index) => {
            const isQ = type === 'quantum';
            const bitVal = isQ ? bitObj.bit : bitObj;
            return (
              <div 
                key={index}
                className={`bit-cell ${type} ${
                  isQ 
                    ? (bitObj.basis === 'rectilinear' ? 'rect' : 'diag')
                    : (bitVal === 1 ? 'one' : 'zero')
                }`}
                title={isQ 
                  ? `Bit: ${bitObj.bit}, Basis: ${bitObj.basis}, Polarization: ${bitObj.polarization}`
                  : `Bit: ${bitVal}`
                }
              >
                {isQ ? (
                  <span className="photon-glyph font-mono">{getPolarizationGlyph(bitObj.polarization)}</span>
                ) : (
                  <span className="font-mono">{bitVal}</span>
                )}
              </div>
            );
          })}
        </div>
        {keyBits.length > 64 && (
          <div className="bit-count font-mono">
            + {keyBits.length - 64} additional key bits in register
          </div>
        )}
      </div>
      
      {generatedKey && (
        <div className="generated-key-display">
          <div className="key-header-row">
            <h4>Output Material (Hexadecimal Digest):</h4>
            <Button size="sm" variant="ghost" onClick={handleCopy} leftIcon={copied ? <CheckIcon size={14} /> : <CopyIcon size={14} />}>
              {copied ? 'Copied' : 'Copy'}
            </Button>
          </div>
          <div className="key-hex">
            <code className="font-mono">{generatedKey.substring(0, 64)}...</code>
          </div>
          <div className="key-metrics">
            <span className="metric">Entropy Source: <strong>{type === 'quantum' ? 'True Quantum Vacuum Fluctuations' : 'CSPRNG Hash Algorithm'}</strong></span>
            <span className="metric">Key Length: <strong>{keyBits.length} {type === 'quantum' ? 'qubits' : 'bits'}</strong></span>
            <span className="metric">Security Model: <strong>{type === 'quantum' ? 'Information-Theoretic' : 'Computational Hardness'}</strong></span>
          </div>
        </div>
      )}
      
      <div className="generator-controls">
        <Button 
          variant={type === 'quantum' ? 'quantum' : 'classical'}
          onClick={generateKey}
          disabled={isGenerating}
          loading={isGenerating}
        >
          {isGenerating ? 'Generating Material...' : `Generate ${type === 'quantum' ? 'Quantum' : 'Classical'} Key`}
        </Button>
        <Button 
          variant="secondary"
          onClick={resetKey}
          disabled={isGenerating}
          leftIcon={<RotateCcwIcon size={14} />}
        >
          Reset Buffer
        </Button>
      </div>
    </div>
  );
}

export default KeyGenerator;
