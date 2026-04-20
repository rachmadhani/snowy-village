<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const parallaxOffset = ref(0)
const sectionRef = ref<HTMLElement | null>(null)

const handleScroll = () => {
  if (!sectionRef.value) return
  
  const rect = sectionRef.value.getBoundingClientRect()
  const windowHeight = window.innerHeight
  
  // Only calculate if the section is in view
  if (rect.top < windowHeight && rect.bottom > 0) {
    // Basic parallax: move background at 20% of scroll speed relative to section top
    parallaxOffset.value = (rect.top) * 0.2
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <section class="parallax-section" ref="sectionRef">
    <div 
      class="parallax-bg" 
      :style="{ transform: `translateY(${parallaxOffset}px)` }"
    ></div>
    
    <div class="parallax-overlay">
      <a href="#" class="menu-link">
        <img src="/parallax-slide/parallax-menu.svg" alt="Menu" class="parallax-menu-svg" />
      </a>
    </div>
  </section>
</template>

<style scoped>
.parallax-section {
  position: relative;
  width: 100%;
  height: 80vh; 
  /* overflow: hidden removed to allow sticky position */
  background-color: #000;
  margin-top: -18vh; 
  z-index: 5;
  /* Mirrored slants: top falling, bottom rising */
  clip-path: polygon(0 0, 100% 18vh, 100% calc(100% - 18vh), 0 100%);
}

.parallax-bg {
  position: absolute;
  top: -20%; 
  left: 0;
  width: 100%;
  height: 140%; 
  background-image: url('/parallax-slide/parallax-slide.jpg');
  background-size: cover;
  background-position: center;
  opacity: 0.89;
  will-change: transform;
}

.parallax-overlay {
  position: relative;
  z-index: 10;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start; /* Moved to left */
  padding-left: 10%; /* 10% offset from left */
}

.menu-link {
  display: block;
  opacity: 0.9;
  transition: opacity 0.3s ease;
}

.menu-link:hover {
  opacity: 0.6;
}

.parallax-menu-svg {
  max-width: 320px; /* Refined size based on reference */
  height: auto;
  filter: drop-shadow(0 10px 30px rgba(0, 0, 0, 0.4));
}

@media (max-width: 1024px) {
  .parallax-overlay {
    padding-left: 5%;
  }
}

@media (max-width: 768px) {
  .parallax-section {
    height: 60vh;
  }
  .parallax-menu-svg {
    max-width: 80%;
  }
}
</style>
