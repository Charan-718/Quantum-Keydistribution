// File: src/utils/animationHelpers.js

/**
 * Animation utility functions for the key distribution simulator
 */

// Easing functions for smooth animations
export const easingFunctions = {
  linear: t => t,
  easeInQuad: t => t * t,
  easeOutQuad: t => t * (2 - t),
  easeInOutQuad: t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
  easeInCubic: t => t * t * t,
  easeOutCubic: t => (--t) * t * t + 1,
  easeInOutCubic: t => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
};

/**
 * Creates a smooth animation loop
 * @param {Function} callback - Function to call on each frame
 * @param {number} duration - Animation duration in ms
 * @param {string} easing - Easing function name
 * @returns {Function} Function to cancel animation
 */
export function animate(callback, duration = 1000, easing = 'easeInOutQuad') {
  let startTime = null;
  let animationId = null;
  const ease = easingFunctions[easing] || easingFunctions.linear;

  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = ease(progress);
    
    callback(easedProgress, progress);
    
    if (progress < 1) {
      animationId = requestAnimationFrame(step);
    }
  }
  
  animationId = requestAnimationFrame(step);
  
  return () => {
    if (animationId) {
      cancelAnimationFrame(animationId);
    }
  };
}

/**
 * Particle system for quantum photon visualization
 */
export class ParticleSystem {
  constructor(canvas, options = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.options = {
      particleCount: 50,
      particleSize: 3,
      speed: 2,
      color: '#00E5FF',
      trailLength: 20,
      ...options
    };
  }

  createParticle(x, y) {
    return {
      x,
      y,
      vx: (Math.random() - 0.5) * this.options.speed,
      vy: (Math.random() - 0.5) * this.options.speed,
      life: 1,
      decay: 0.02,
      size: Math.random() * this.options.particleSize + 1,
      trail: []
    };
  }

  emit(x, y, count = 1) {
    for (let i = 0; i < count; i++) {
      this.particles.push(this.createParticle(x, y));
    }
  }

  update() {
    this.particles = this.particles.filter(particle => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.life -= particle.decay;
      
      // Add to trail
      particle.trail.push({ x: particle.x, y: particle.y });
      if (particle.trail.length > this.options.trailLength) {
        particle.trail.shift();
      }
      
      return particle.life > 0;
    });
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.particles.forEach(particle => {
      // Draw trail
      particle.trail.forEach((point, index) => {
        const alpha = (index / particle.trail.length) * particle.life;
        this.ctx.beginPath();
        this.ctx.arc(point.x, point.y, particle.size * (index / particle.trail.length), 0, Math.PI * 2);
        this.ctx.fillStyle = this.hexToRgba(this.options.color, alpha);
        this.ctx.fill();
      });
      
      // Draw particle
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      this.ctx.fillStyle = this.hexToRgba(this.options.color, particle.life);
      this.ctx.fill();
    });
  }

  hexToRgba(hex, alpha) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
}

/**
 * Creates a wave animation for quantum channels
 * @param {HTMLElement} element - Element to animate
 * @param {Object} options - Animation options
 */
export function createWaveAnimation(element, options = {}) {
  const defaultOptions = {
    amplitude: 10,
    frequency: 0.02,
    speed: 0.05,
    color: '#00E5FF',
    thickness: 2,
    opacity: 0.3
  };
  
  const config = { ...defaultOptions, ...options };
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  let animationId = null;
  let time = 0;
  
  canvas.style.position = 'absolute';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.pointerEvents = 'none';
  element.style.position = 'relative';
  element.appendChild(canvas);
  
  function resize() {
    canvas.width = element.offsetWidth;
    canvas.height = element.offsetHeight;
  }
  
  function drawWave() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    
    for (let x = 0; x < canvas.width; x++) {
      const y = canvas.height / 2 + 
                Math.sin(x * config.frequency + time) * config.amplitude +
                Math.cos(x * config.frequency * 0.7 + time * 1.3) * config.amplitude * 0.5;
      
      if (x === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    
    ctx.strokeStyle = config.color;
    ctx.lineWidth = config.thickness;
    ctx.globalAlpha = config.opacity;
    ctx.stroke();
    
    // Draw glow effect
    ctx.shadowBlur = 15;
    ctx.shadowColor = config.color;
    ctx.stroke();
    ctx.shadowBlur = 0;
  }
  
  function animateWave() {
    time += config.speed;
    drawWave();
    animationId = requestAnimationFrame(animateWave);
  }
  
  resize();
  window.addEventListener('resize', resize);
  animateWave();
  
  return {
    stop: () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      window.removeEventListener('resize', resize);
      element.removeChild(canvas);
    },
    updateOptions: (newOptions) => {
      Object.assign(config, newOptions);
    }
  };
}

/**
 * Creates a pulsating effect for security alerts
 * @param {HTMLElement} element - Element to animate
 * @param {Object} options - Animation options
 */
export function createPulseAnimation(element, options = {}) {
  const defaultOptions = {
    minScale: 1,
    maxScale: 1.1,
    duration: 1000,
    color: '#FF2E5C',
    intensity: 0.3
  };
  
  const config = { ...defaultOptions, ...options };
  const originalColor = window.getComputedStyle(element).backgroundColor;
  let animationId = null;
  let startTime = null;
  
  function pulse(timestamp) {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const progress = (elapsed % config.duration) / config.duration;
    const scale = config.minScale + 
                 (config.maxScale - config.minScale) * 
                 Math.abs(Math.sin(progress * Math.PI));
    
    // Apply scale transform
    element.style.transform = `scale(${scale})`;
    
    // Apply color pulse if color is specified
    if (config.color) {
      const intensity = Math.sin(progress * Math.PI) * config.intensity;
      element.style.boxShadow = `0 0 20px ${intensity * 20}px ${config.color}`;
    }
    
    animationId = requestAnimationFrame(pulse);
  }
  
  animationId = requestAnimationFrame(pulse);
  
  return {
    stop: () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      element.style.transform = '';
      element.style.boxShadow = '';
    },
    updateOptions: (newOptions) => {
      Object.assign(config, newOptions);
    }
  };
}

/**
 * Creates a typing animation effect for text
 * @param {HTMLElement} element - Element to animate
 * @param {string} text - Text to type
 * @param {Object} options - Animation options
 */
export function typeText(element, text, options = {}) {
  const defaultOptions = {
    speed: 50, // ms per character
    cursor: '|',
    cursorBlinkSpeed: 500,
    onComplete: () => {}
  };
  
  const config = { ...defaultOptions, ...options };
  let index = 0;
  let cursorVisible = true;
  let cursorInterval;
  
  function typeCharacter() {
    if (index < text.length) {
      element.textContent = text.substring(0, index + 1) + config.cursor;
      index++;
      setTimeout(typeCharacter, config.speed);
    } else {
      // Start cursor blinking
      cursorInterval = setInterval(() => {
        cursorVisible = !cursorVisible;
        element.textContent = text + (cursorVisible ? config.cursor : '');
      }, config.cursorBlinkSpeed);
      
      config.onComplete();
    }
  }
  
  // Start typing
  typeCharacter();
  
  return {
    stop: () => {
      clearInterval(cursorInterval);
      element.textContent = text;
    },
    skip: () => {
      clearInterval(cursorInterval);
      element.textContent = text;
      index = text.length;
      config.onComplete();
    }
  };
}

/**
 * Creates a particle explosion effect
 * @param {number} x - X coordinate
 * @param {number} y - Y coordinate
 * @param {Object} options - Particle options
 */
export function createExplosion(x, y, options = {}) {
  const defaultOptions = {
    count: 30,
    colors: ['#00E5FF', '#00FF9D', '#4DABFF'],
    size: 3,
    speed: 5,
    gravity: 0.1,
    decay: 0.02,
    spread: Math.PI * 2
  };
  
  const config = { ...defaultOptions, ...options };
  const particles = [];
  
  for (let i = 0; i < config.count; i++) {
    const angle = Math.random() * config.spread;
    const velocity = Math.random() * config.speed;
    
    particles.push({
      x,
      y,
      vx: Math.cos(angle) * velocity,
      vy: Math.sin(angle) * velocity,
      color: config.colors[Math.floor(Math.random() * config.colors.length)],
      size: Math.random() * config.size + 1,
      life: 1,
      decay: config.decay + Math.random() * 0.01
    });
  }
  
  return {
    particles,
    update: () => {
      particles.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vy += config.gravity;
        particle.life -= particle.decay;
      });
      
      return particles.filter(p => p.life > 0);
    }
  };
}

/**
 * Helper for managing multiple animations
 */
export class AnimationManager {
  constructor() {
    this.animations = new Map();
    this.nextId = 1;
  }
  
  add(animation, name = null) {
    const id = name || `anim_${this.nextId++}`;
    this.animations.set(id, animation);
    return id;
  }
  
  get(id) {
    return this.animations.get(id);
  }
  
  stop(id) {
    const animation = this.animations.get(id);
    if (animation && animation.stop) {
      animation.stop();
    }
    this.animations.delete(id);
  }
  
  stopAll() {
    this.animations.forEach(animation => {
      if (animation && animation.stop) {
        animation.stop();
      }
    });
    this.animations.clear();
  }
  
  has(id) {
    return this.animations.has(id);
  }
}

// Export default animation manager instance
export default new AnimationManager();