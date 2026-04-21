<script setup lang="ts">
// Contact Location and Order Section
</script>

<template>
  <section class="contact-section" id="contact">
    <div class="contact-container">
      <div class="contact-content">
        <!-- Main Header SVG -->
        <div class="contact-header">
          <img 
            src="/contact-section/contact-location-section.svg" 
            alt="Contact Location and Order" 
            class="header-svg" 
          />
        </div>

        <!-- Ordering Steps SVG -->
        <div class="contact-steps">
          <img 
            src="/contact-section/contact-pick-step-section.svg" 
            alt="Step 1: Pick and choose, Step 2: Scroll to bottom, Step 3: Go to location" 
            class="steps-svg" 
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact-section {
  position: relative;
  width: 100%;
  min-height: 100vh;
  /* Use the same textured paper background as About section */
  background-color: #F2F2F2;
  background-image: url('/about-section/divider02-recovered.png');
  background-size: cover;
  background-position: center top;
  
  /* Negative margin to overlap with Bingsoo section's bottom slant */
  margin-top: -30vh;
  padding: 35vh 10% 32vh;
  
  /* Top slant falls from left to right to match Bingsoo bottom edge precisely */
  /* clip-path: polygon(0 18vh, 100% 0, 100% 100%, 0 100%); */
  z-index: 2;
  color: #111;
}

.contact-container {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
}

.contact-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 80px;
  width: 100%;
  max-width: 900px;
}

.contact-header {
  width: 100%;
  display: flex;
  justify-content: center;
}

.header-svg {
  width: 100%;
  max-width: 800px;
  height: auto;
}

.contact-steps {
  width: 100%;
  display: flex;
  justify-content: center;
}

.steps-svg {
  width: 100%;
  max-width: 550px;
  height: auto;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .contact-section {
    padding: 20vh 5% 10vh;
    margin-top: -10vh;
    clip-path: polygon(0 10vh, 100% 0, 100% 100%, 0 100%);
  }
  
  .contact-content {
    gap: 40px;
  }
}
</style>
