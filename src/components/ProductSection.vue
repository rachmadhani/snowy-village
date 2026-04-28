<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { productService, type Product } from '@/services/productService';

const products = ref<Product[]>([]);
const loading = ref(true);

const visibleItems = ref<Set<number>>(new Set());
let observer: IntersectionObserver | null = null;

const fetchProducts = async () => {
  try {
    const response = await productService.getAll();
    products.value = response.data;
  } catch (error) {
    console.error('Failed to fetch products:', error);
  } finally {
    loading.value = false;
  }
};

const setupObserver = () => {
  if (observer) observer.disconnect();
  
  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const id = parseInt(entry.target.getAttribute('data-id') || '0');
      if (entry.isIntersecting) {
        visibleItems.value.add(id);
      } else {
        visibleItems.value.delete(id);
      }
    });
  }, { threshold: 0.1 });

  const items = document.querySelectorAll('.product-card');
  items.forEach(item => observer?.observe(item));
};

onMounted(async () => {
  await fetchProducts();
  setupObserver();
});

// Re-setup observer when products change
watch(products, () => {
  setTimeout(setupObserver, 100);
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

      <div class="product-grid" v-if="!loading">
        <div 
          v-for="(product, index) in products" 
          :key="product.id" 
          class="product-card"
          :class="{ 'is-visible': visibleItems.has(product.id) }"
          :data-id="product.id"
          :style="{ transitionDelay: (index % 3) * 0.1 + 's' }"
        >
          <div class="image-wrapper">
            <img v-if="product.product_badge_popular === 'true'" src="/product-section/product-section-badges-popular.svg" class="popular-badge" alt="Popular" />
            <img :src="product.product_image || '/product-section/sample-product-1.png'" :alt="product.product_title" class="product-image" />
            <img src="/product-section/cake-shadow.png" class="cake-shadow" alt="" />
          </div>
          <div class="info-wrapper">
            <div class="product-info-text">
              <h3 class="product-title">{{ product.product_title }}</h3>
              <p class="product-desc">{{ product.product_description }}</p>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="loading-state">
        <p>Loading products...</p>
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
  text-align: center;
}

.product-info-text {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  width: 312px;
}

.product-title {
  font-family: 'Outfit', sans-serif;
  font-size: 24px;
  font-weight: 700;
  color: #111;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin: 0;
}

.product-desc {
  font-family: 'Outfit', sans-serif;
  font-size: 14px;
  line-height: 1.5;
  color: #666;
  margin: 0;
}

.loading-state {
  text-align: center;
  padding: 50px;
  font-family: 'Outfit', sans-serif;
  color: #888;
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
