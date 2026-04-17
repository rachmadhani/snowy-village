<script setup lang="ts">
// No extra logic needed for now
</script>

<template>
  <section class="hero-section">
    <div class="glow-container">
      <div class="glow glow-1"></div>
      <div class="glow glow-2"></div>
    </div>
    
    <div class="content animate-fade-in">
      <h1 class="hero-title">
        <span class="text-gradient">Snowy Village</span><br />
        Winter Reimagined.
      </h1>
      <p class="hero-subtitle">
        Discover the magic of a digital winter wonderland. A premium Vue.js experience 
        crafted with Vite and modern aesthetics.
      </p>
      
      <div class="actions">
        <button class="btn-primary">Explore Now</button>
        <button class="btn-secondary">Learn More</button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-section {
  position: relative;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0 20px;
  overflow: hidden;
  background: radial-gradient(circle at center, var(--color-bg-alt) 0%, var(--color-bg) 100%);
}

.glow-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
}

.glow {
  position: absolute;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  filter: blur(120px);
  opacity: 0.2;
}

.glow-1 {
  background: var(--color-primary);
  top: -100px;
  right: -100px;
}

.glow-2 {
  background: var(--color-secondary);
  bottom: -100px;
  left: -100px;
}

.content {
  position: relative;
  z-index: 2;
  max-width: 800px;
}

.hero-title {
  font-size: 5rem;
  margin-bottom: 24px;
  letter-spacing: -2px;
}

.hero-subtitle {
  font-size: 1.25rem;
  color: var(--color-text-dim);
  margin-bottom: 40px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.actions {
  display: flex;
  gap: 16px;
  justify-content: center;
}

.btn-secondary {
  padding: 12px 28px;
  border-radius: 100px;
  border: 1px solid var(--glass-border);
  background: var(--glass-bg);
  backdrop-filter: blur(4px);
  color: var(--color-text);
  font-weight: 600;
  font-family: var(--font-main);
  cursor: pointer;
  transition: var(--transition-smooth);
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.2);
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 3rem;
  }
}
</style>
