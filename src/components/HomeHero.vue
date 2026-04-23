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
        <img src="/hero-image/SnowyVillageHD.jpg" alt="Snowy Village Logo" class="main-logo" />
      </div>

      <!-- Right Content -->
      <div class="hero-content animate-fade-in" style="animation-delay: 0.3s">
        <div class="content-wrapper">
          <img src="/hero-image-content/main_since.png" alt="Franchisee Message" class="franchisee-text" />
          <a href="#products" class="menu-btn">
            <img src="/hero-image-content/main_our_menu.png" alt="See Our Menu" />
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
      
    </div>
  </section>
</template>


