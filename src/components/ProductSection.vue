<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const products = [
  { id: 1, image: '/product-section/sample-product-1.png', info: '/product-section/sample-product-title-description-1.svg', popular: true },
  { id: 2, image: '/product-section/sample-product-1.png', info: '/product-section/sample-product-title-description-2.svg', popular: false },
  { id: 3, image: '/product-section/sample-product-3.png', info: '/product-section/sample-product-title-description-3.svg', popular: false },
  { id: 4, image: '/product-section/sample-product-1.png', info: '/product-section/sample-product-title-description-1.svg', popular: false },
  { id: 5, image: '/product-section/sample-product-1.png', info: '/product-section/sample-product-title-description-2.svg', popular: true },
  { id: 6, image: '/product-section/sample-product-3.png', info: '/product-section/sample-product-title-description-3.svg', popular: false },
  { id: 7, image: '/product-section/sample-product-1.png', info: '/product-section/sample-product-title-description-1.svg', popular: false },
  { id: 8, image: '/product-section/sample-product-1.png', info: '/product-section/sample-product-title-description-2.svg', popular: false },
  { id: 9, image: '/product-section/sample-product-3.png', info: '/product-section/sample-product-title-description-3.svg', popular: true },
];

const visibleItems = ref<Set<number>>(new Set());
let observer: IntersectionObserver | null = null;

onMounted(() => {
  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const id = parseInt(entry.target.getAttribute('data-id') || '0');
      if (entry.isIntersecting) {
        visibleItems.value.add(id);
      } else {
        // Keep it visible once it has appeared, or reset if desired.
        // For Snowy Village style, we usually want it to stay or re-animate.
        // Let's reset so it re-animates on scroll up/down as requested before.
        visibleItems.value.delete(id);
      }
    });
  }, { threshold: 0.1 });

  const items = document.querySelectorAll('.product-card');
  items.forEach(item => observer?.observe(item));
});

onUnmounted(() => {
  observer?.disconnect();
});
</script>

<template>
  <section class="product-section" id="products">
    <div class="product-container">
      <div class="header-container">
        <img src="/product-section/product-section-title.svg" alt="Our Products" class="section-title-svg" />
        <img src="/process-section/product-subtitle.svg" alt="Order for Pick up" class="section-subtitle-svg" />
      </div>

      <div class="product-grid">
        <div 
          v-for="(product, index) in products" 
          :key="index" 
          class="product-card"
          :class="{ 'is-visible': visibleItems.has(index + 1) }"
          :data-id="index + 1"
          :style="{ transitionDelay: (index % 3) * 0.1 + 's' }"
        >
          <div class="image-wrapper">
            <img v-if="product.popular" src="/product-section/product-section-badges-popular.svg" class="popular-badge" alt="Popular" />
            <img :src="product.image" :alt="'Product ' + product.id" class="product-image" />
            <img src="/product-section/cake-shadow.png" class="cake-shadow" alt="" />
          </div>
          <div class="info-wrapper">
            <img :src="product.info" alt="Product Description" class="info-svg" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.product-section {
  position: relative;
  width: 100%;
  background-color: #F2F2F2;
  /* Match ContactSection bottom slant: (0, 82%) to (100%, 100%) */
  /* Top of ProductSection must be (0, 0) to (100%, 18vh) */
  clip-path: polygon(0 0, 100% 18vh, 100% calc(100% - 18vh), 0 100%);
  margin-top: -18vh;
  padding: 30vh 10% 25vh;
  z-index: 3;
}

.product-container {
  max-width: 1400px;
  margin: 0 auto;
}

.header-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  margin-bottom: 80px;
}

.section-title-svg {
  width: 100%;
  max-width: 600px;
  height: auto;
}

.section-subtitle-svg {
  width: 100%;
  max-width: 400px;
  height: auto;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(3, 350px);
  gap: 60px 40px;
  justify-content: center;
  width: 100%;
}

.product-card {
  width: 199px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
}

/* Cards are now visible by default, logic preserved for children animations */
.product-card.is-visible {
  opacity: 1;
}

.image-wrapper {
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  margin-bottom: 20px;
}

.product-image {
  width: 199px;
  height: auto;
  object-fit: contain;
  filter: drop-shadow(0 10px 20px rgba(0,0,0,0.1));
}

.popular-badge {
  position: absolute;
  top: -7%;
  left: -10%;
  width: 60px;
  z-index: 2;
  opacity: 0;
}

.product-card.is-visible .popular-badge {
  animation: fadeInUp 0.8s both;
  animation-delay: 0.5s; /* Slight delay after card appears */
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

.cake-shadow {
  position: absolute;
  bottom: 0;
  right: -20px;
  width: 162px;
  height: auto;
  z-index: 0;
  pointer-events: none;
  opacity: 0.8;
}

.info-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
}

.info-svg {
  width: 312px;
  height: auto;
}

/* Responsive */
@media (max-width: 1024px) {
  .product-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .product-section {
    padding-top: 25vh;
    clip-path: polygon(0 0, 100% 12vh, 100% 100%, 0 100%);
    margin-top: -12vh;
  }
  
  .product-grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  
  .popular-badge {
    width: 45px;
  }
}
</style>
