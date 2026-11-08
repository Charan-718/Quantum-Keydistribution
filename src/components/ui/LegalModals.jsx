// File: src/components/ui/LegalModals.jsx
import React from 'react';
import Modal from './Modal';

export function TermsOfServiceModal({ isOpen, onClose }) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Terms of Service & Research Usage Policy"
      subtitle="Quantum Key Distribution Scientific Simulator v1.0"
    >
      <h3>1. Educational & Simulation Scope</h3>
      <p>
        The Quantum Key Distribution (QKD) Laboratory simulator is intended strictly for academic, research, 
        demonstration, and algorithm evaluation purposes. All cryptographic keys, quantum state collapse models, 
        and Diffie-Hellman discrete logarithm iterations are executed in simulated sandboxes in-browser.
      </p>

      <h3>2. Physical Hardware vs Virtualization</h3>
      <p>
        While the BB84 protocol simulation faithfully mirrors single-photon polarization, Heisenberg measurement 
        uncertainty, and the Shor-Preskill QBER threshold (11.0%), it does not interface with physical single-photon 
        detectors (SPDs) or fiber-optic quantum repeaters. No physical hardware keys should be used for production data encryption.
      </p>

      <h3>3. Intellectual Property & Attribution</h3>
      <p>
        The BB84 quantum protocol was developed by Charles Bennett and Gilles Brassard (1984). The Diffie-Hellman key exchange 
        was published by Whitfield Diffie and Martin Hellman (1976). Interactive 3D lattice pointcloud models are licensed under 
        Creative Commons Attribution via Sketchfab (Federica Girola).
      </p>

      <h3>4. Warranty Disclaimer</h3>
      <p>
        This software is provided "as is", without warranty of any kind, express or implied, including but not limited to 
        the warranties of merchantability, fitness for a particular research purpose, and non-infringement.
      </p>
    </Modal>
  );
}

export function PrivacyPolicyModal({ isOpen, onClose }) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Privacy Policy & Data Transparency"
      subtitle="Local-first execution and cryptographic zero-telemetry guarantee"
    >
      <h3>1. Client-Side Only Execution</h3>
      <p>
        All pseudorandom bit generation, modular exponentiations, photon polarization matrices, and sifting calculations 
        are computed entirely within your local browser runtime. No bitstreams, private keys, or intercepted channel logs 
        are transmitted to external servers or third-party analytical endpoints.
      </p>

      <h3>2. Zero Telemetry & No Tracking Cookies</h3>
      <p>
        This laboratory suite does not deploy marketing cookies, fingerprinting mechanisms, or behavioral analytics. 
        Theme preferences (Dark/Light mode) and simulator configurations are stored ephemerally in browser session memory.
      </p>

      <h3>3. Third-Party Embedded Content</h3>
      <p>
        The standalone 3D pointcloud lattice is rendered via Sketchfab's embed player in xr-spatial tracking mode. 
        Sketchfab may process standard technical request headers (such as IP address and user-agent) necessary to serve 
        WebGL pointcloud assets.
      </p>

      <h3>4. Data Retention</h3>
      <p>
        Resetting the channel or closing the browser window instantly purges all generated quantum keys, error logs, 
        and classical ciphertexts from system memory.
      </p>
    </Modal>
  );
}

export function ProtocolReferenceModal({ isOpen, onClose }) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="BB84 & Classical Protocol Reference"
      subtitle="Mathematical and quantum physical principles governing key distribution"
      maxWidth="760px"
    >
      <h3>BB84 Protocol (Bennett & Brassard, 1984)</h3>
      <p>
        QKD utilizes the fundamental laws of quantum physics to establish unconditional secrecy. Photons are polarized in two 
        mutually unbiased bases: Rectilinear (+) with states 0° (|0⟩) and 90° (|1⟩), and Diagonal (×) with states 45° (|+⟩) 
        and 135° (|-⟩).
      </p>
      <ul>
        <li><strong>Heisenberg Uncertainty:</strong> Measuring a photon in a non-conjugate basis irrecoverably collapses its state vector.</li>
        <li><strong>No-Cloning Theorem:</strong> An unknown quantum state cannot be replicated. An eavesdropper cannot tap and duplicate quantum bits.</li>
        <li><strong>QBER Threshold:</strong> Any eavesdropping attempts introduce a characteristic 25% error rate on intercepted bits. If the Quantum Bit Error Rate exceeds 11%, the sifted key is discarded.</li>
      </ul>

      <h3>Classical Asymmetric Key Exchange (Diffie-Hellman / RSA)</h3>
      <p>
        Classical security depends entirely on computational intractability assumptions:
      </p>
      <ul>
        <li><strong>Discrete Logarithm Problem:</strong> Given g^a mod p and g^b mod p, computing g^(ab) mod p is computationally infeasible on classical von Neumann architectures for large primes (2048+ bits).</li>
        <li><strong>Shor's Algorithm Vulnerability:</strong> On a sufficiently scaled fault-tolerant quantum computer, Shor's polynomial-time period-finding algorithm completely breaks RSA and Diffie-Hellman discrete log systems.</li>
      </ul>
    </Modal>
  );
}

