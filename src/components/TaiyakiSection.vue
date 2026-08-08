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
            <div class="card-badge">01</div>
            <h3 class="card-title">The Batter</h3>
            <p class="card-desc">
              Made with 100% natural butter in our dough.<br />
              Prepared hot and fresh all the time.
            </p>
          </div>
          
          <div class="desc-card desc-right" ref="desc2Ref" :class="{ 'is-visible': isDesc2Visible }">
            <div class="card-badge">02</div>
            <h3 class="card-title">The Fillings</h3>
            <p class="card-desc">
              Our Taiyaki comes with a variety of fillings.<br />
              Red bean, Custard, Nutella, Cheese, and more.
            </p>
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
  position: relative;
  width: 320px;
  /* background: #ffffff; */
  border: 2px solid #000000;
  padding: 42px 32px 32px 32px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  opacity: 0;
  transition: all 1s ease;
  text-align: left;
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

.card-badge {
  position: absolute;
  top: -16px;
  left: 24px;
  width: 52px;
  height: 32px;
  background: #000000;
  color: #B9C83E;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Outfit', sans-serif;
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0.05em;
}

.card-title {
  font-family: 'Outfit', sans-serif;
  font-size: 32px;
  font-weight: 300;
  color: #111111;
  margin: 0 0 16px 0;
  line-height: 1.2;
}

.card-desc {
  font-family: 'Outfit', sans-serif;
  font-size: 12px;
  line-height: 1.6;
  color: #222222;
  font-weight: 400;
  margin: 0;
}

/* Responsive */
@media (max-width: 1024px) {
  .descriptions-container {
    flex-direction: column;
    gap: 50px;
  }
  .desc-card {
    width: 100%;
    max-width: 340px;
    transform: translateY(30px);
  }
}

@media (max-width: 768px) {
  .taiyaki-section {
    clip-path: polygon(0 12vh, 200% 0, 100% 100%, 0 100%);
    margin-top: -12vh;
  }
  .taiyaki-title-svg {
    max-width: 90%;
  }
}
</style>
