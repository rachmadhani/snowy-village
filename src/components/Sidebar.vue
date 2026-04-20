<script setup lang="ts">
// Logic for menu toggle or social links could go here later
</script>

<template>
  <div class="fixed-side-bar">
    <button class="menu-block">
      <span class="menu-label">MENU</span>
      <div class="hamburger">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </button>
    
    <div class="social-block">
      <a href="#" class="social-link">
        <svg viewBox="0 0 24 24" class="svg-icon">
          <path d="M12 2.04c-5.5 0-9.96 4.46-9.96 9.96 0 4.97 3.64 9.1 8.4 9.87v-6.98h-2.54v-2.89h2.54v-2.2c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.24.19 2.24.19v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.77l-.44 2.89h-2.33v6.98c4.76-.77 8.4-4.9 8.4-9.87 0-5.5-4.46-9.96-9.96-9.96z" fill="currentColor"/>
        </svg>
      </a>
      <a href="#" class="social-link">
        <svg viewBox="0 0 24 24" class="svg-icon">
          <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8A3.6 3.6 0 0 0 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6A3.6 3.6 0 0 0 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z" fill="currentColor"/>
        </svg>
      </a>
    </div>
  </div>
</template>

<style scoped>
.fixed-side-bar {
  position: fixed;
  top: 80px;
  right: 0;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.menu-block {
  width: 80px;
  height: auto;
  min-height: 80px;
  padding: 18px 10px;
  background: black;
  border: none;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border-radius: 2px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.menu-block:hover {
  background: #111;
}

.menu-label {
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 2px;
}

.hamburger {
  width: 24px;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.hamburger span {
  display: block;
  width: 100%;
  height: 2px;
  background: white;
}

.social-block {
  width: 80px;
  border-radius: 2px;
  background: black;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 12px 0;
}

.social-link {
  color: white;
  transition: transform 0.2s ease;
  display: flex;
}

.social-link:hover {
  transform: scale(1.1);
}

.svg-icon {
  width: 20px;
  height: 20px;
}

@media (max-width: 768px) {
  .fixed-side-bar {
    width: 60px;
    padding-top: 20px;
  }
}
</style>
