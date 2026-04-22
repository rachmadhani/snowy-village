<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const sectionRef = ref<HTMLElement | null>(null);

const parallaxOffset = ref(0);
const isVisible = ref(false);

let observer: IntersectionObserver | null = null;

const handleScroll = () => {
  if (!sectionRef.value) return;
  const rect = sectionRef.value.getBoundingClientRect();
  const windowHeight = window.innerHeight;
  if (rect.top < windowHeight && rect.bottom > 0) {
    parallaxOffset.value = (rect.top) * 0.15;
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);

  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        isVisible.value = true;
      }
    });
  }, { threshold: 0.1 });

  if (sectionRef.value) observer.observe(sectionRef.value);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  observer?.disconnect();
});
</script>

<template>
  <section class="drinks-section" ref="sectionRef" id="drinks">
    <!-- Parallax Background -->
    <div 
      class="parallax-bg" 
      :style="{ transform: `translateY(${parallaxOffset}px)` }"
    ></div>
    
    <div class="drinks-overlay">
      <div class="drinks-container">
        <!-- Left Side: Title -->
        <div class="title-column" :class="{ 'animate-left': isVisible }">
          <img src="/parallax-2-slide/parallax-2-title.svg" alt="Our Drinks" class="drinks-title-svg" />
        </div>

        <!-- Right Side: Drink Lists -->
        <div class="lists-column" :class="{ 'animate-right': isVisible }">
          <div class="drink-category">
            <div class="category-header">
              <div class="category-badge">01</div>
              <h3 class="category-title">Hot Coffee & Tea</h3>
            </div>
            <p class="drink-list">
              Caramel Macchiato, Cafe Mocha, Cafe Latte, Cappuccino, Americano, Espresso, 
              Affogato, Hot Chocolate, Red Bean Latte, Green Tea Latte, 
              Green Tea, Jasmine Tea, Chamomile Tea, Earl Grey Tea
            </p>
          </div>
          <div class="drink-category">
            <div class="category-header">
              <div class="category-badge">02</div>
              <h3 class="category-title">Iced Coffee & Tea</h3>
            </div>
            <p class="drink-list">
              Iced Caramel Macchiato, Iced Cafe Mocha, Iced Cafe Latte, 
              Iced Americano, Red Bean Smoothie
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.drinks-section {
  position: relative;
  width: 100%;
  height: 90vh;
  min-height: 700px;
  background-color: #000;
  margin-top: -18vh;
  /* Top falls from left to right, Bottom rises from right to left */
  clip-path: polygon(0 0, 100% 18vh, 100% calc(100% - 18vh), 0 100%);
  z-index: 5;
  overflow: hidden;
}

.parallax-bg {
  position: absolute;
  top: -20%;
  left: 0;
  width: 100%;
  height: 140%;
  background-image: url('/parallax-2-slide/parallax-2-background.jpg');
  background-size: cover;
  background-position: center;
  opacity: 0.8;
  will-change: transform;
}

.drinks-overlay {
  position: relative;
  z-index: 10;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.4) 100%);
}

.drinks-container {
  width: 100%;
  max-width: 1400px;
  padding: 0 8%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 5%;
}

.title-column {
  flex: 1;
  max-width: 500px;
  opacity: 0;
  transform: translateX(-50px);
  transition: all 1s ease-out;
}

.title-column.animate-left {
  opacity: 1;
  transform: translateX(0);
}

.drinks-title-svg {
  width: 332px;
  height: auto;
  filter: drop-shadow(0 0 20px rgba(0,0,0,0.5));
}

.lists-column {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 100px;
  opacity: 0;
  transform: translateX(50px);
  transition: all 1s ease-out;
  transition-delay: 0.3s;
}

.lists-column.animate-right {
  opacity: 1;
  transform: translateX(0);
}

.category-header {
  /* display: flex; */
  align-items: center;
  gap: 15px;
  margin-bottom: 15px;
}
 
.category-badge {
  width: 30px;
  height: 28px;
  background: #C5D82D;
  /* border-radius: 50%; */
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 700;
  color: #fff;
  border-bottom-left-radius: 40%;
  border-top-left-radius: 40%;
  border-bottom-right-radius: 40%;
  border-top-right-radius: 40%;
  margin-bottom: 20px;
}
 
.category-title {
  font-size: 24px;
  font-weight: 300;
  color: #C5D82D;
  text-transform: uppercase;
  margin: 0;
  letter-spacing: 0.05em;
}
 
.drink-list {
  font-size: 15px;
  line-height: 1.8;
  color: #eee;
  font-weight: 200;
  max-width: 440px;
  margin: 0;
  opacity: 0.9;
}

/* Responsive */
@media (max-width: 1024px) {
  .drinks-container {
    flex-direction: column;
    text-align: center;
    gap: 60px;
    padding-top: 10vh;
  }
  .drinks-section {
    height: auto;
    padding: 25vh 5% 20vh;
  }
  .title-column, .lists-column {
    max-width: 600px;
  }
}

@media (max-width: 768px) {
  .drinks-section {
    clip-path: polygon(0 0, 100% 12vh, 100% calc(100% - 12vh), 0 100%);
    margin-top: -12vh;
  }
}
</style>
