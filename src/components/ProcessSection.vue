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
            <div class="svg-container">
              <img src="/process-section/process-1.svg" class="process-step-svg" alt="01 Fresh Fruits" />
            </div>
          </div>
          <div class="image-col">
            <img src="/process-section/slide-image-1.png" class="process-photo photo-1" alt="Fruits preparation" />
          </div>
        </div>

        <!-- Step 02 -->
        <div class="process-row row-2">
          <div class="text-col">
            <div class="svg-container">
              <img src="/process-section/process-2.svg" class="process-step-svg" alt="02 Fresh Milk" />
            </div>
          </div>
          <div class="image-col">
            <img src="/process-section/slide-image-2.png" class="process-photo photo-2" alt="Milk preparation" />
          </div>
        </div>

        <!-- Step 03 -->
        <div class="process-row row-3">
          <div class="text-col">
            <div class="svg-container">
              <img src="/process-section/process-3.svg" class="process-step-svg" alt="03 Fresh Cream" />
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

/* Texture/SVG side */
.text-col {
  flex: 1;
  display: flex;
  justify-content: center;
  padding: 0 5%;
}

.svg-container {
  width: 440px;
  max-width: 100%;
}

.process-step-svg {
  width: 100%;
  height: auto;
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
