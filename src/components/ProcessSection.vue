<template>
  <section class="process-section" id="process">
    <div class="process-container">
      
      <!-- Header -->
      <div class="process-header animate-fade-in">
        <img src="/process-section/process-title.svg" alt="3 Process" class="process-title-svg" />
      </div>

      <!-- Process Rows -->
      <div class="process-rows">
        
        <!-- Step 01 -->
        <div class="process-row row-1">
          <div class="text-col">
            <div class="process-card">
              <div class="step-badge">01</div>
              <div class="card-content">
                <h3 class="step-title">Fresh Fruits local + international</h3>
                <p class="step-body">We get our fresh fruit supplies from local farmers in season and international suppliers when out of season.</p>
              </div>
            </div>
          </div>
          <div class="image-col">
            <img src="/process-section/slide-image-1.png" class="process-photo photo-1" alt="Fruits preparation" />
          </div>
        </div>

        <!-- Step 02 -->
        <div class="process-row row-2">
          <div class="text-col">
            <div class="process-card">
              <div class="step-badge">02</div>
              <div class="card-content">
                <h3 class="step-title">Fresh Milk 100% Natural milk</h3>
                <p class="step-body">We only use 100% Natural milk for all of our bingsoo products. This gives our bingsoo a smooth and silky texture,</p>
              </div>
            </div>
          </div>
          <div class="image-col">
            <img src="/process-section/slide-image-2.png" class="process-photo photo-2" alt="Milk preparation" />
          </div>
        </div>

        <!-- Step 03 -->
        <div class="process-row row-3">
          <div class="text-col">
            <div class="process-card">
              <div class="step-badge">03</div>
              <div class="card-content">
                <h3 class="step-title">Fresh Cream sweetened cream</h3>
                <p class="step-body">We make sure that we only use the freshest whipped cream to compliment our bingsoo products.</p>
              </div>
            </div>
          </div>
          <div class="image-col">
            <img src="/process-section/slide-image-3.png" class="process-photo photo-3" alt="Cream preparation" />
          </div>
        </div>

      </div>

    </div>
  </section>
</template>

<style scoped>
.process-section {
  position: relative;
  /* width: 100%; */
  background-color: #fafafa;
  background-image: url('/about-section/divider02-recovered.png');
  /* background-size: cover;  */
  background-size: auto; 
  background-repeat: repeat;
  background-position: center center;
  margin-top: -34vh;
  padding: 40vh 0 27vh; /* Reduced top/bottom padding */
  /* Top slant matches Parallax bottom (rising right-to-left): fall 18vh from left to right */
  clip-path: polygon(0 18vh, 100% 0, 100% 100%, 0 calc(100% - 18vh));
  z-index: 4;
  color: #111;
}

.process-container {
  max-width: 1400px;
  margin: 0 auto;
}

.process-header {
  display: flex;
  justify-content: center;
  margin-bottom: 60px;
}

.process-title-svg {
  width: 520px;
  max-width: 90%;
  height: auto;
  filter: brightness(0.1);
}

.process-rows {
  display: flex;
  flex-direction: column;
}

.process-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  min-height: 450px;
  margin-bottom: -93px; /* Slight overlap for slanted images */
}

/* Texture/Card side */
.text-col {
  flex: 1;
  display: flex;
  justify-content: center;
  padding: 0 5%;
  z-index: 5;
}
 
.process-card {
  position: relative;
  width: 440px;
  max-width: 100%;
  border: 1.5px solid #111;
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(4px);
  padding: 50px 40px 40px;
  text-align: left;
}
 
.step-badge {
  position: absolute;
  top: -17px;
  left: 37px;
  width: 45px;
  height: 30px;
  background: #111;
  color: #C5D82D;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 700;
  z-index: 6;
}
 
.step-title {
  font-size: 18px;
  font-weight: 500;
  color: #111;
  text-transform: uppercase;
  margin: 0 0 8px;
  line-height: 1.1;
}
 
.step-subtitle {
  display: block;
  font-size: 14px;
  font-weight: 400;
  color: #666;
  text-transform: lowercase;
  margin-bottom: 24px;
}
 
.step-body {
  font-size: 16px;
  line-height: 1.6;
  color: #333;
  margin: 0;
}

/* Photo side */
.image-col {
  flex: 2;
  position: relative;
  overflow: hidden;
  margin-left: -50%; /* Significant shift to the left */
  z-index: 2;
}

.process-photo {
  width: 100%;
  object-fit: cover;
  display: block;
}

/* Interlocking slants for photos - falling left to right */
.photo-1 {
  /* clip-path: polygon(0 0, 100% 0, 100% calc(100% - 12vh), 0 100%); */
}

.photo-2 {
  /* clip-path: polygon(0 12vh, 100% 0, 100% calc(100% - 12vh), 0 100%); */
  /* margin-top: -12vh; */
}

.photo-3 {
  /* clip-path: polygon(0 12vh, 100% 0, 100% 100%, 0 100%); */
  /* margin-top: -12vh; */
}

/* Responsive */
@media (max-width: 1100px) {
  .process-row {
    flex-direction: column;
    margin-bottom: 60px;
  }
  
  .image-col {
    width: 100%;
    margin-top: 30px;
  }
  
  .process-photo {
    height: 400px;
    clip-path: none !important;
    margin-top: 0 !important;
  }

  .process-section {
    padding-top: 20vh;
  }
}
</style>
