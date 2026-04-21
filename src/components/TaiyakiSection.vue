<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const titleRef = ref<HTMLElement | null>(null);
const desc1Ref = ref<HTMLElement | null>(null);
const desc2Ref = ref<HTMLElement | null>(null);

const isTitleVisible = ref(false);
const isDesc1Visible = ref(false);
const isDesc2Visible = ref(false);

let observer: IntersectionObserver | null = null;

onMounted(() => {
  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.target === titleRef.value) isTitleVisible.value = entry.isIntersecting;
      if (entry.target === desc1Ref.value) isDesc1Visible.value = entry.isIntersecting;
      if (entry.target === desc2Ref.value) isDesc2Visible.value = entry.isIntersecting;
    });
  }, { threshold: 0.2 });

  if (titleRef.value) observer.observe(titleRef.value);
  if (desc1Ref.value) observer.observe(desc1Ref.value);
  if (desc2Ref.value) observer.observe(desc2Ref.value);
});

onUnmounted(() => {
  observer?.disconnect();
});
</script>

<template>
  <section class="taiyaki-section" id="taiyaki">
    <div class="taiyaki-background-container">
      <img src="/taiyaki-section/taiyaki-background.png" alt="Taiyaki Background" class="background-image" />
      
      <div class="taiyaki-content">
        <!-- Title -->
        <div class="title-wrapper" ref="titleRef" :class="{ 'is-visible': isTitleVisible }">
          <img src="/taiyaki-section/taiyaki-title.svg" alt="Taiyaki Title" class="taiyaki-title-svg" />
        </div>

        <!-- Description Grid -->
        <div class="descriptions-container">
          <div class="desc-card desc-left" ref="desc1Ref" :class="{ 'is-visible': isDesc1Visible }">
            <img src="/taiyaki-section/taiyaki-description-1.svg" alt="Taiyaki Description Left" class="desc-svg" />
          </div>
          
          <div class="desc-card desc-right" ref="desc2Ref" :class="{ 'is-visible': isDesc2Visible }">
            <img src="/taiyaki-section/taiyaki-description-2.svg" alt="Taiyaki Description Right" class="desc-svg" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.taiyaki-section {
  position: relative;
  width: 100%;
  min-height: 80vh;
  background-color: #F8F8F8;
  margin-top: -18vh;
  
  /* Top slant: rise 18vh from left to right to match ProductSection bottom edge */
  clip-path: polygon(0 18vh, 100% 0, 100% 100%, 0 100%);
  z-index: 4;
  overflow: hidden;
}

.taiyaki-background-container {
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.background-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.taiyaki-content {
  position: relative;
  z-index: 5;
  width: 100%;
  max-width: 1400px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 5%;
}

.title-wrapper {
  margin-bottom: 50px;
  opacity: 0;
  transform: translateY(30px);
  transition: all 1s ease;
}

.title-wrapper.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.taiyaki-title-svg {
  width: 100%;
  max-width: 600px;
  height: auto;
}

.descriptions-container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 300px;
  margin-top: 50px;
}

.desc-card {
  width: auto;
  opacity: 0;
  transition: all 1s ease;
}

.desc-left {
  transform: translateX(-50px);
}

.desc-right {
  transform: translateX(50px);
}

.desc-card.is-visible {
  opacity: 1;
  transform: translateX(0);
}

.desc-svg {
  width: 100%;
  max-width: 294px;
  height: auto;
}

/* Responsive */
@media (max-width: 1024px) {
  .descriptions-container {
    flex-direction: column;
    gap: 40px;
  }
  .desc-card {
    width: 90%;
    transform: translateY(30px);
  }
}

@media (max-width: 768px) {
  .taiyaki-section {
    clip-path: polygon(0 12vh, 100% 0, 100% 100%, 0 100%);
    margin-top: -12vh;
  }
  .taiyaki-title-svg {
    max-width: 90%;
  }
}
</style>
