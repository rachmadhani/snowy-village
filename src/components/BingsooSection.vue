<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const callout1Ref = ref<HTMLElement | null>(null);
const callout2Ref = ref<HTMLElement | null>(null);
const callout3Ref = ref<HTMLElement | null>(null);

const is1Visible = ref(false);
const is2Visible = ref(false);
const is3Visible = ref(false);

let observer: IntersectionObserver | null = null;

onMounted(() => {
  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.target === callout1Ref.value) is1Visible.value = entry.isIntersecting;
      if (entry.target === callout2Ref.value) is2Visible.value = entry.isIntersecting;
      if (entry.target === callout3Ref.value) is3Visible.value = entry.isIntersecting;
    });
  }, {
    threshold: 0.1
  });

  if (callout1Ref.value) observer.observe(callout1Ref.value);
  if (callout2Ref.value) observer.observe(callout2Ref.value);
  if (callout3Ref.value) observer.observe(callout3Ref.value);
});

onUnmounted(() => {
  if (observer) {
    observer.disconnect();
  }
});
</script>

<template>
  <section class="bingsoo-section" id="bingsoo">
    <div class="bingsoo-container">
      
      <!-- Main Visual Area -->
      <div class="bingsoo-visual-area">
        <img src="/bingsoo-section/bingsoo-background.jpg" alt="Matcha Bingsoo" class="main-bingsoo-image" />

        <!-- Callouts Overlay -->
        <div class="callout-overlays">
          
          <!-- Header (Integrated Title) -->
          <div class="bingsoo-header">
            <img src="/bingsoo-section/bingsoo-header-title.svg" alt="What's a Bingsoo?" class="header-svg" />
          </div>

          <!-- Callout 1: Fresh Toppings (Top Left) -->
          <div class="callout callout-1" ref="callout1Ref">
            <div :class="['animated-content', is1Visible ? 'animated fadeInRight' : '']">
              <div class="callout-header">
                <img src="/bingsoo-section/bingsoo-green-circle.svg" class="dot" alt="" />
                <img src="/bingsoo-section/bingsoo-title-1.svg" class="title-svg" alt="Fresh Toppings" />
              </div>
              <p class="description-text">We have a wide range of toppings. From fresh fruits to chocolate and sweet beans.</p>
            </div>
            <div class="pointer-line line-1"></div>
          </div>

          <!-- Callout 2: Great Combinations (Middle Right) -->
          <div class="callout callout-2" ref="callout2Ref">
            <div :class="['animated-content', is2Visible ? 'animated fadeInLeft' : '']">
              <div class="callout-header">
                <img src="/bingsoo-section/bingsoo-green-circle.svg" class="dot" alt="" />
                <img src="/bingsoo-section/bingsoo-title-2.svg" class="title-svg" alt="Great Combinations" />
              </div>
              <p class="description-text">In Snowy Village we never stop innovating. We made sure that every ingredients in our products compliment each other perfectly.</p>
            </div>
            <div class="pointer-line line-2"></div>
          </div>

          <!-- Callout 3: Silky Snowy Base (Bottom Right) -->
          <div class="callout callout-3" ref="callout3Ref">
            <div :class="['animated-content', is3Visible ? 'animated fadeInLeft' : '']">
              <div class="callout-header">
                <img src="/bingsoo-section/bingsoo-green-circle.svg" class="dot" alt="" />
                <img src="/bingsoo-section/bingsoo-title-3.svg" class="title-svg" alt="Silky Snowy Base" />
              </div>
              <p class="description-text">We only use 100% Natural milk and this makes our bingsoo silky smooth!</p>
            </div>
            <div class="pointer-line line-3"></div>
          </div>

          <!-- Allergy Advice (Bottom Left) -->
          <div class="allergy-advice">
            <img src="/bingsoo-section/bingsoo-allergy.svg" class="allergy-svg" alt="Allergy Advice" />
          </div>

        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
.bingsoo-section {
  position: relative;
  width: 100%;
  background-color: #f1f1f1;
  margin-top: -58vh;
  padding: 25vh 0 0;
  /* Top slant matches Process bottom (rising right-to-left): fall 18vh from left to right */
  /* clip-path: polygon(0 18vh, 100% 0, 100% calc(100% - 18vh), 0 100%); */
  z-index: 3;
}

.bingsoo-container {
  max-width: 1400px;
  margin: 0 auto;
  position: relative;

}

.bingsoo-header {
  position: absolute;
  top: 26%;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  z-index: 5;
  pointer-events: auto;
}

.header-svg {
  width: 300px;
  /* max-width: 90%;
  height: auto; */
}

.bingsoo-visual-area {
  position: relative;
  width: 100%;
  aspect-ratio: 4541 / 3027;
  display: flex;
  justify-content: center;
}

.main-bingsoo-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.callout-overlays {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.callout {
  position: absolute;
  display: flex;
  flex-direction: column;
  pointer-events: auto;
}

.animated-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.callout-header {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-top: 15px; /* Space for the absolute dot */
}

.dot {
  position: absolute;
  width: 12px;
  height: auto;
}

.callout-1 .dot {
  top: 25%;
  left: -15%;
}

.callout-2 .dot,
.callout-3 .dot {
  top: 10%;
  right: -10%;
}

.title-svg {
  height: 24px;
  width: 177px;
}

.description-text {
  font-size: 13px;
  line-height: 1.5;
  color: #333;
  max-width: 201px;
  margin: 0;
  font-weight: 400;
  opacity: 0.9;
}

/* Positioning */
.callout-1 {
  top: 35%;
  left: 20%;
  align-items: flex-start;
}

.callout-2 {
  top: 48%;
  right: 18%;
  align-items: flex-start;
  text-align: left;
}

.callout-3 {
  top: 65%;
  right: 18%;
  align-items: flex-start;
  text-align: left;
}

.allergy-advice {
  position: absolute;
  bottom: 15%;
  left: 20%;
}

.allergy-svg {
  width: 133px;
  height: auto;
}

/* Pointer Lines */
.pointer-line {
  position: absolute;
  background-color: #333;
  height: 1.2px;
  z-index: 10;
}

.line-1 {
  top: 27px; /* aligns with title center (15px padding + 12px half-title-height) */
  left: 100%;
  width: 130px;
  margin-left: 15px;
}

.line-2 {
  top: 27px;
  right: 100%;
  width: 120px;
  margin-right: 15px;
}

.line-3 {
  top: 27px;
  right: 100%;
  width: 150px;
  margin-right: 15px;
}

/* Animations */
.animated {
  animation-duration: 1s;
  animation-fill-mode: both;
}

@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translate3d(-50px, 0, 0);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

.fadeInLeft {
  animation-name: fadeInLeft;
}

@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translate3d(50px, 0, 0);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

.fadeInRight {
  animation-name: fadeInRight;
}

/* Responsive */
@media (max-width: 1100px) {
  .callout-1 { left: 5%; top: 25%; }
  .callout-2 { right: 5%; top: 40%; }
  .callout-3 { right: 5%; top: 55%; }
  .line-1, .line-2, .line-3 { display: none; }
}

@media (max-width: 600px) {
  .bingsoo-section {
    margin-top: -20vh;
    padding-top: 10vh;
  }
  
  .bingsoo-visual-area {
    aspect-ratio: 1 / 1.6; /* More vertical for mobile */
  }

  .bingsoo-header {
    top: 15%;
  }
  
  .header-svg {
    width: 220px;
  }

  .callout {
    max-width: 160px;
  }

  .callout-1 {
    top: 22%;
    left: 8%;
  }

  .callout-2 {
    top: 42%;
    right: 8%;
  }

  .callout-3 {
    top: 62%;
    right: 8%;
  }

  .title-svg {
    height: 18px;
    width: auto;
  }

  .description-text {
    font-size: 11px;
    color:#f1f1f1;
    max-width: 140px;
  }

  .allergy-advice {
    bottom: 13%;
    left: 50%;
    transform: translateX(-50%);
  }

  .allergy-svg {
    width: 100px;
  }
  
  .animated-content {
    gap: 10px;
  }
}
</style>
