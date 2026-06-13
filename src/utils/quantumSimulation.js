// File: src/utils/quantumSimulation.js

// Generate quantum key with random bits and bases
export const generateQuantumKey = (numPhotons) => {
  const photons = [];
  const aliceBits = [];
  
  for (let i = 0; i < numPhotons; i++) {
    const bit = Math.random() > 0.5 ? 1 : 0;
    const basis = Math.random() > 0.5 ? 'rectilinear' : 'diagonal';
    let polarization;
    
    if (basis === 'rectilinear') {
      polarization = bit === 1 ? 'vertical' : 'horizontal';
    } else {
      polarization = bit === 1 ? '45deg' : '135deg';
    }
    
    photons.push({
      id: i,
      bit,
      basis,
      polarization,
      originalBit: bit,
      originalBasis: basis
    });
    
    aliceBits.push({
      bit,
      basis,
      polarization,
      id: i
    });
  }
  
  return { photons, aliceBits };
};

// Simulate BB84 protocol with optional eavesdropping
export const simulateBB84Protocol = (photons, hasEavesdropper) => {
  const measurements = [];
  
  photons.forEach(photon => {
    // Bob randomly chooses measurement basis
    const bobBasis = Math.random() > 0.5 ? 'rectilinear' : 'diagonal';
    
    let measuredBit;
    let isDisturbed = false;
    
    if (hasEavesdropper) {
      // Eve intercepts with random basis
      const eveBasis = Math.random() > 0.5 ? 'rectilinear' : 'diagonal';
      
      // Eve measures (disturbs photon)
      isDisturbed = true;
      
      let eveMeasurement;
      if (eveBasis === photon.basis) {
        // Eve measures correctly
        eveMeasurement = photon.bit;
      } else {
        // Eve guesses wrong basis - gets random result
        eveMeasurement = Math.random() > 0.5 ? 1 : 0;
      }
      
      // Photon continues to Bob with Eve's measurement (collapsed state)
      if (bobBasis === eveBasis) {
        // Bob measures what Eve sent
        measuredBit = eveMeasurement; // Fixed: removed self-assignment
      } else {
        // Bob gets random result (photon collapsed by Eve)
        measuredBit = Math.random() > 0.5 ? 1 : 0;
      }
    } else {
      // No eavesdropper
      if (bobBasis === photon.basis) {
        measuredBit = photon.bit;
      } else {
        // Wrong basis - random result
        measuredBit = Math.random() > 0.5 ? 1 : 0;
      }
    }
    
    measurements.push({
      bit: measuredBit,
      basis: bobBasis,
      isDisturbed: hasEavesdropper && isDisturbed,
      matchesBasis: bobBasis === photon.basis
    });
  });
  
  return measurements;
};

// Detect eavesdropping by calculating error rate
export const detectEavesdropping = (photons, measurements) => {
  if (!measurements || measurements.length === 0 || !photons || photons.length === 0) {
    return { detected: false, errorRate: 0 };
  }
  
  let matchingBasisCount = 0;
  let errorCount = 0;
  
  measurements.forEach((measurement, index) => {
    if (measurement.matchesBasis && photons[index]) {
      matchingBasisCount++;
      if (measurement.bit !== photons[index].bit) {
        errorCount++;
      }
    }
  });
  
  const errorRate = matchingBasisCount > 0 ? (errorCount / matchingBasisCount) : 0;
  
  return {
    detected: errorRate > 0.11, // BB84 threshold is ~11%
    errorRate: errorRate * 100,
    matchingBits: matchingBasisCount - errorCount,
    totalErrors: errorCount
  };
};

// Calculate quantum key statistics
export const calculateQuantumStats = (aliceBits, bobMeasurements) => {
  if (!aliceBits || !bobMeasurements || aliceBits.length === 0 || bobMeasurements.length === 0) {
    return {
      totalBits: 0,
      matchingBasis: 0,
      matchingBits: 0,
      siftedKeyLength: 0,
      errorRate: 0,
      finalKeyLength: 0,
      efficiency: 0
    };
  }
  
  const totalBits = aliceBits.length;
  let matchingBasis = 0;
  let matchingBits = 0;
  
  aliceBits.forEach((aliceBit, index) => {
    const bobMeasurement = bobMeasurements[index];
    if (bobMeasurement && aliceBit.basis === bobMeasurement.basis) {
      matchingBasis++;
      if (aliceBit.bit === bobMeasurement.bit) {
        matchingBits++;
      }
    }
  });
  
  const siftedKeyLength = matchingBasis;
  const errorRate = matchingBasis > 0 ? ((matchingBasis - matchingBits) / matchingBasis) * 100 : 0;
  const finalKeyLength = Math.floor(siftedKeyLength * 0.8); // After error correction & privacy amplification
  
  return {
    totalBits,
    matchingBasis,
    matchingBits,
    siftedKeyLength,
    errorRate,
    finalKeyLength,
    efficiency: matchingBasis > 0 ? (finalKeyLength / totalBits * 100).toFixed(1) : '0.0'
  };
};