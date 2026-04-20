<template>
  <section class="about-section" id="about">
    <div class="about-container">

      <!-- Left: text content -->
      <div class="about-text-col">
        <div class="about-header">
          <h1 class="about-title">About</h1>
          <div class="about-divider"></div>
          <p class="about-subtitle">
            Snowy Village, a dessert café<br>introducing healthy and fresh desserts
          </p>
        </div>

        <div class="about-paragraphs">
          <img src="/about-section/about-description.svg" alt="About Description" class="about-description" />
        </div>
      </div>

      <!-- Right: cake composition -->
      <div class="cake-composition">
        <div class="cakes-group">
          <!-- Green diagonal lines (behind cakes) -->
          <div class="green-lines">
            <div class="green-line line-1 animate-jello"></div>
            <div class="green-line line-2 animate-jello"></div>
            <div class="green-line line-3 animate-jello"></div>
            <div class="green-line line-4 animate-jello"></div>
            <div class="green-line line-5 animate-jello"></div>
            <div class="green-line line-6 animate-jello"></div>
          </div>

          <!-- Cake Shadows -->
          <img src="/about-section/cake-shadow.png" class="cake-shadow shadow-left" alt="" />
          <img src="/about-section/cake-shadow.png" class="cake-shadow shadow-center" alt="" />
          <img src="/about-section/cake-shadow.png" class="cake-shadow shadow-right" alt="" />

          <img src="/about-section/about-cake-1.png" class="cake cake-left" alt="Injeolmi Bingsu" />
          <img src="/about-section/about-cake-2.png" class="cake cake-center" alt="Milk Bingsu" />
          <img src="/about-section/about-cake-3.png" class="cake cake-right" alt="Oreo Bingsu" />
        </div>

        <div class="comp-footer">
          <img src="/about-section/about-cake-description.svg" class="comp-caption" alt="Healthy Korean dessert" />
          <img src="/about-section/snowy-village-logos-cake.svg" class="comp-logo" alt="Snowy Village" />
        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
.about-section {
  position: relative;
  width: 100%;
  min-height: 100vh;
  /* Solid base so body (--color-bg) does not show through texture transparency */
  background-color: #fafafa;
  background-image: url('/about-section/divider02-recovered.png');
  background-size: cover;
  background-position: center top;
  margin-top: -18vh;
  padding: 25vh 10% 12vh;
  clip-path: polygon(0 18vh, 100% 0, 100% 100%, 0 calc(100% - 18vh));
  z-index: 10;
  color: #111;
}

/* ── Main two-column layout ── */
.about-container {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;         /* side-by-side */
  align-items: flex-start;
  gap: 60px;
  position: relative;         /* Stable context for absolute elements */
}

/* ── Left column ── */
.about-text-col {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 40px;
}

/* Header: "About | subtitle" inline */
.about-header {
  display: flex;
  align-items: center;
  gap: 20px;
}

.about-title {
  font-size: 48px;
  font-weight: 700;
  color: #111;
  margin: 0;
  line-height: 1;
}

.about-divider {
  width: 1.5px;
  height: 52px;
  background: #111;
  opacity: 0.6;
  flex-shrink: 0;
}

.about-subtitle {
  font-size: 14px;
  color: #333;
  line-height: 1.6;
  margin: 0;
}

.about-description {
  width: 594px;
  max-width: 100%;
  height: auto;
  filter: brightness(0.2);
}

/* ── Right column: cake composition ── */
.cake-composition {
  position: relative;
  bottom: auto;
  right: auto;
  width: 100%;
  max-width: 420px;
  height: 600px;
  padding-top: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  top: 350px;
}

.cakes-group {
  position: relative;
  width: 240px;           /* ← was 380px */
  height: 180px;          /* ← was 280px */
}

.cake {
  position: absolute;
  filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.12));
}


.cake-left  { 
  width: 75px; 
  height: 120px; 
  left: 0;   
  top: 0; 
  z-index: 2; 
  object-fit: contain; 
  object-position: bottom; 
}
.cake-center { width: 80px; left: 50%; transform: translateX(-50%); bottom: 0; z-index: 3; }
.cake-right { 
  width: 70px; 
  height: 120px; 
  right: 0;  
  top: 0; 
  z-index: 2; 
  object-fit: contain; 
  object-position: bottom; 
}

/* ── Cake Shadows ── */
.cake-shadow {
  position: absolute;
  height: auto;
  opacity: 0.4;
  z-index: 1;
  pointer-events: none;
}

.shadow-left   { width: 90px; left: 10px; top: 105px; }
.shadow-center { width: 100px; left: 55%; transform: translateX(-50%); bottom: -10px; }
.shadow-right  { width: 85px; right: -15px; top: 105px; }

/* ── Green diagonal lines ── */
.green-lines {
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  z-index: 4; /* behind cakes (z-index 2 & 3) */
  pointer-events: none;
}

.green-line {
  position: absolute;
  height: 1.5px;
  background: #B9C83E;
  opacity: 0.8;
  transform: rotate(-32deg);
  transform-origin: left center;
}

.line-1 { width: 36px;  top: 20%; left: 12%; animation-delay: 0s; }
.line-2 { width: 50px;  top: 15%; left: 46%; animation-delay: 0.5s; }
.line-3 { width: 70px; top: 60%; left: 20%;  animation-delay: 1.2s; }
.line-4 { width: 36px;  top: 25%; left: 80%; animation-delay: 0.8s; }
.line-5 { width: 60px;  top: 55%; left: 54%; animation-delay: 1.5s; }
.line-6 { width: 28px;  top: 78%; left: 52%; animation-delay: 0.3s; }

/* ── Caption + logo ── */
.comp-footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
  text-align: center;
}

.comp-caption { width: 200px; height: auto; }   /* ← was 320px */
.comp-logo    { width: 110px; height: auto; }   /* ← was 160px */

.animate-jello { 
  animation: jello-loop 1s infinite;
  transform-origin: center;
}

@keyframes jello-loop {
  0%, 11.1%, to { transform: rotate(-32deg); }
  22.2% { transform: rotate(-32deg) skewX(-12.5deg) skewY(-12.5deg); }
  33.3% { transform: rotate(-32deg) skewX(6.25deg) skewY(6.25deg); }
  44.4% { transform: rotate(-32deg) skewX(-3.125deg) skewY(-3.125deg); }
  55.5% { transform: rotate(-32deg) skewX(1.5625deg) skewY(1.5625deg); }
  66.6% { transform: rotate(-32deg) skewX(-0.78125deg) skewY(-0.78125deg); }
  77.7% { transform: rotate(-32deg) skewX(0.390625deg) skewY(0.390625deg); }
  88.8% { transform: rotate(-32deg) skewX(-0.1953125deg) skewY(-0.1953125deg); }
}

/* ── Responsive ── */
@media (max-width: 1100px) {
  .about-container {
    flex-direction: column;
    align-items: center;
  }
  .cake-composition {
    position: relative;
    bottom: auto;
    right: auto;
    width: 100%;
    max-width: 420px;
    padding-top: 0;
    margin-top: 32px;
  }
  .about-text-col { width: 100%; }
}
</style>