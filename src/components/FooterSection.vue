<script setup lang="ts">
// Footer Section
</script>

<template>
  <footer class="footer-section">
    <div class="footer-container">
      <div class="social-icons">
        <a href="#" class="social-link">
          <img src="/footer-section/footer-facebook-icon.svg" alt="Facebook" class="social-svg" />
        </a>
        <a href="#" class="social-link">
          <img src="/footer-section/footer-instagram-icon.svg" alt="Instagram" class="social-svg" />
        </a>
      </div>

      <div class="footer-info">
        
        <div class="divider"></div>

        <!-- <p class="bottom-contact">
          28 Royal Ave, New Westminister BC | TEL. <span class="highlight">+1 604.553.3550</span>, <span class="highlight">+1 778.837.6939</span> | <a href="mailto:info@snowyvillages.ca" class="highlight email-link">info@snowyvillages.ca</a>
        </p> -->
        <p class="copyright">Copyright(C) <b>SNOWY VILLAGE</b> 2019 All Rights Reserved.</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer-section {
  position: relative;
  width: 100%;
  background-color: #F2F2F2;
  background-image: url('/about-section/divider02-recovered.png');
  background-size: cover;
  background-position: center;
  /* Top slant: rises from left to right to match Locations bottom */
  clip-path: polygon(0 36vh, 100% 0, 100% 100%, 0 100%);
  margin-top: -32vh;
  padding: 25vh 10% 8vh;
  z-index: 7;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
}

.social-icons {
  display: flex;
  gap: 15px;
}

.social-link {
  transition: opacity 0.3s ease;
}

.social-link:hover {
  opacity: 0.7;
}

.social-svg {
  width: 32px;
  height: auto;
}

.footer-info {
  text-align: center;
  color: #333;
  font-size: 0.85rem;
  letter-spacing: 0.3px;
  line-height: 1.8;
  width: 100%;
}

.highlight {
  color: #829f45; /* The green accent color */
  font-weight: 500;
}

.office-info {
  margin-bottom: 2px;
  color: #555;
}

.email-link {
  color: #829f45;
  text-decoration: none;
  transition: color 0.3s ease;
}

.email-link:hover {
  color: #829f45;
}

.divider {
  display: none; /* Hide the divider as per screenshot simplicity */
}

.bottom-contact {
  margin-bottom: 5px;
  color: #555;
}

.copyright {
  opacity: 0.9;
  font-weight: 400;
  color: #333;
}

.copyright strong {
  font-weight: 700;
}

@media (max-width: 768px) {
  .footer-section {
    padding: 20vh 5% 6vh;
    clip-path: polygon(0 12vh, 100% 0, 100% 100%, 0 100%);
    margin-top: -12vh;
  }
}
</style>
