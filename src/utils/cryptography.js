// File: src/utils/cryptography.js

// Simulate classical key generation
export const generateClassicalKeys = (keySize) => {
  const generateKey = (size) => {
    const chars = '0123456789ABCDEF';
    let key = '';
    for (let i = 0; i < size / 4; i++) {
      key += chars[Math.floor(Math.random() * chars.length)];
    }
    return key;
  };

  return {
    alice: {
      privateKey: generateKey(keySize),
      publicKey: generateKey(keySize),
      secret: Math.floor(Math.random() * 1000000)
    },
    bob: {
      privateKey: generateKey(keySize),
      publicKey: generateKey(keySize),
      secret: Math.floor(Math.random() * 1000000)
    }
  };
};

// Simulate Diffie-Hellman key exchange
export const simulateDiffieHellman = (aliceKeys, bobKeys) => {
  // Simplified simulation of DH shared secret
  const shared = (aliceKeys.secret * bobKeys.secret) % 1000000;
  return shared.toString(16).toUpperCase().padStart(64, '0').slice(0, 64);
};

// Simulate message encryption
export const encryptMessage = (message, key) => {
  // Simple XOR encryption for demonstration
  let encrypted = '';
  for (let i = 0; i < message.length; i++) {
    const charCode = message.charCodeAt(i) ^ key.charCodeAt(i % key.length);
    encrypted += String.fromCharCode(charCode);
  }
  return btoa(encrypted); // Return base64 encoded
};

// Calculate brute force time for different key sizes
export const calculateBruteForceTime = (keySize) => {
  const estimates = {
    512: { years: 0.001, color: '#ff6b6b' },
    1024: { years: 30000000000000, color: '#ffa726' },
    2048: { years: 1e30, color: '#4ecdc4' },
    3072: { years: 1e40, color: '#1dd1a1' },
    4096: { years: 1e50, color: '#00d2d3' }
  };
  
  return estimates[keySize] || estimates[2048];
};

// Check if key is vulnerable
export const isKeyVulnerable = (keySize, showEavesdropper) => {
  if (keySize <= 1024) return true;
  if (showEavesdropper && keySize <= 2048) return true;
  return false;
};