<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const slides = [
  '/hero-image/02greentea_landing.jpg',
  '/hero-image/03strawberry_landing.jpg',
  '/hero-image/04injeolmi_landing.jpg',
  '/hero-image/05oreo_landing.jpg'
]

const currentIndex = ref(0)
let timer: any = null

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % slides.length
}

onMounted(() => {
  timer = setInterval(nextSlide, 5000)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<template>
  <section class="hero-container">
    <!-- Background Slideshow -->
    <div class="slideshow">
      <transition-group name="fade">
        <div 
          v-for="(slide, index) in slides" 
          :key="slide"
          v-show="index === currentIndex"
          class="slide"
          :style="{ backgroundImage: `url(${slide})` }"
        ></div>
      </transition-group>
    </div>

    <!-- UI Overlay -->
    <div class="overlay">
      <!-- Left Logo -->
      <div class="logo-wrapper animate-fade-in">
        <img src="/hero-image-content/main_logo.png" alt="Snowy Village Logo" class="main-logo" />
      </div>

      <!-- Right Content -->
      <div class="hero-content animate-fade-in" style="animation-delay: 0.3s">
        <div class="content-wrapper">
          <img src="/hero-image-content/main_since.png" alt="Franchisee Message" class="franchisee-text" />
          <a href="#" class="menu-btn">
            <img src="/hero-image-content/main_our_menu.png" alt="See Our Menu" />
          </a>
        </div>
      </div>

    <!-- Side Bar -->
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
          <svg viewBox="0 0 24 24" class="svg-icon"><path d="M12 2.04c-5.5 0-9.96 4.46-9.96 9.96 0 4.97 3.64 9.1 8.4 9.87v-6.98h-2.54v-2.89h2.54v-2.2c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.24.19 2.24.19v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.77l-.44 2.89h-2.33v6.98c4.76-.77 8.4-4.9 8.4-9.87 0-5.5-4.46-9.96-9.96-9.96z" fill="currentColor"/></svg>
        </a>
        <a href="#" class="social-link">
          <svg viewBox="0 0 24 24" class="svg-icon"><path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8A3.6 3.6 0 0 0 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6A3.6 3.6 0 0 0 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z" fill="currentColor"/></svg>
        </a>
      </div>
    </div>

      <!-- Bottom Decorations -->
      <div class="bottom-ui">
        <div class="scroll-down">
          <img src="/hero-bottom-content/scroll_down.svg" alt="Scroll Down" class="scroll-text-svg" />
          <img src="/hero-bottom-content/arrow.svg" alt="Arrow" class="scroll-arrow-svg" />
        </div>
      </div>
      
      <div class="slant-divider"></div>
    </div>
  </section>
</template>


