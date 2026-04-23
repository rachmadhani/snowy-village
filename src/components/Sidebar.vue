<script setup lang="ts">
import { ref } from 'vue';

const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const closeMenu = () => {
  isMenuOpen.value = false;
};
</script>

<template>
  <div>
    <!-- Sidebar Controls -->
    <div class="fixed-side-bar">
      <button class="menu-block" @click="toggleMenu">
        <span class="menu-label">MENU</span>
        <div class="hamburger">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </button>
      
      <div class="social-block">
        <a href="#" class="social-link">
          <svg viewBox="0 0 24 24" class="svg-icon">
            <path d="M12 2.04c-5.5 0-9.96 4.46-9.96 9.96 0 4.97 3.64 9.1 8.4 9.87v-6.98h-2.54v-2.89h2.54v-2.2c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.24.19 2.24.19v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.77l-.44 2.89h-2.33v6.98c4.76-.77 8.4-4.9 8.4-9.87 0-5.5-4.46-9.96-9.96-9.96z" fill="currentColor"/>
          </svg>
        </a>
        <a href="#" class="social-link">
          <svg viewBox="0 0 24 24" class="svg-icon">
            <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8A3.6 3.6 0 0 0 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6A3.6 3.6 0 0 0 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z" fill="currentColor"/>
          </svg>
        </a>
      </div>
    </div>

    <!-- Full Screen Menu Overlay -->
    <Transition name="fade">
      <div v-if="isMenuOpen" class="menu-overlay">
        <div class="overlay-inner">
          <!-- Header -->
          <header class="overlay-header">
            <img src="/hero-image/SnowyVillageHD.jpg" alt="Snowy Village Logo" class="sidebar-logo" />
            <button class="close-btn" @click="closeMenu">
              <img src="/sidebar/close-sidebar.png" alt="Close" class="close-icon" />
            </button>
          </header>

          <!-- Main Nav -->
          <nav class="overlay-nav">
            <ul class="primary-links">
              <li class="nav-item"><a href="#products" @click="closeMenu">Menu</a></li>
              <li class="nav-item"><a href="#" @click="closeMenu">Franchise</a></li>
              <li class="nav-item"><a href="#locations" @click="closeMenu">Locations</a></li>
            </ul>
            <ul class="secondary-links">
              <li class="nav-item"><a href="#about" @click="closeMenu">About Us</a></li>
              <li class="nav-item"><a href="#" @click="closeMenu">News</a></li>
              <li class="nav-item"><a href="#" @click="closeMenu">Careers</a></li>
            </ul>
          </nav>

          <!-- Footer/Socials -->
          <footer class="overlay-footer">
            <div class="social-section">
              <div class="social-header">
                <span>Follow Us</span>
                <div class="social-icons">
                  <a href="#" class="social-link-icon">
                    <svg viewBox="0 0 24 24" class="svg-icon">
                      <path d="M12 2.04c-5.5 0-9.96 4.46-9.96 9.96 0 4.97 3.64 9.1 8.4 9.87v-6.98h-2.54v-2.89h2.54v-2.2c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.24.19 2.24.19v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.77l-.44 2.89h-2.33v6.98c4.76-.77 8.4-4.9 8.4-9.87 0-5.5-4.46-9.96-9.96-9.96z" fill="white"/>
                    </svg>
                  </a>
                  <a href="#" class="social-link-icon">
                    <svg viewBox="0 0 24 24" class="svg-icon">
                      <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8A3.6 3.6 0 0 0 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6A3.6 3.6 0 0 0 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z" fill="white"/>
                    </svg>
                  </a>
                </div>
              </div>
              <a href="#" class="policy-link">Read our User Policy</a>
            </div>

            <div class="locations-section">
              <span class="loc-title">Locations</span>
              <p class="loc-list">
                Richmond / Coquitlam / Surrey / Langley / Saskatoon / New Westminster Station / 
                New Westminster Victoria Hill / Edmonton / Victoria / Calgary
              </p>
            </div>
          </footer>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.fixed-side-bar {
  position: fixed;
  top: 80px;
  right: 0;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.menu-block {
  width: 80px;
  height: auto;
  min-height: 80px;
  padding: 18px 10px;
  background: black;
  border: none;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border-radius: 2px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.menu-block:hover {
  background: #111;
}

.menu-label {
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 2px;
}

.hamburger {
  width: 24px;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.hamburger span {
  display: block;
  width: 100%;
  height: 2px;
  background: white;
}

.social-block {
  width: 80px;
  border-radius: 2px;
  background: black;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 12px 0;
}

.social-link {
  color: white;
  transition: transform 0.2s ease;
  display: flex;
}

.social-link:hover {
  transform: scale(1.1);
}

.svg-icon {
  width: 20px;
  height: 20px;
}

/* Menu Overlay Styles */
.menu-overlay {
  position: fixed;
  top: 0;
  right: 0;
  width: 360px;
  height: 100vh;
  background-color: black;
  color: white;
  z-index: 2000;
  box-shadow: -10px 0 30px rgba(0, 0, 0, 0.15);
  overflow: hidden;
}

.overlay-inner {
  width: 100%;
  padding: 60px 40px;
  display: flex;
  flex-direction: column;
  min-height: 100%;
}

.overlay-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.sidebar-logo {
  height: 80px;
  width: auto;
}

.close-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
  transition: opacity 0.3s ease;
}

.close-btn:hover {
  opacity: 0.7;
}

.close-icon {
  width: 72px;
  height: 78px;
  margin-top: 30px;
  object-fit: contain;
}

.overlay-nav {
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-bottom: 60px;
}

.primary-links, .secondary-links {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.primary-links .nav-item a {
  font-size: 32px;
  font-weight: 700;
  text-decoration: none;
  color: white;
  transition: color 0.3s ease;
}

.secondary-links .nav-item a {
  font-size: 20px;
  font-weight: 400;
  text-decoration: none;
  color: #ccc;
  transition: color 0.3s ease;
}

.nav-item a:hover {
  color: #829f45;
  text-decoration: none;
  opacity: 1;
}

.overlay-footer {
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.social-section {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.social-header {
  display: flex;
  align-items: center;
  gap: 15px;
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 0;
}

.social-icons {
  display: flex;
  gap: 12px;
}

.social-link-icon:hover {
  opacity: 0.6;
}

.policy-link {
  font-size: 12px;
  color: #888;
  text-decoration: none;
  transition: color 0.3s ease;
}

.policy-link:hover {
  color: #829f45;
}

.locations-section {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.loc-title {
  font-size: 18px;
  font-weight: 700;
}

.loc-list {
  font-size: 12px;
  line-height: 1.5;
  color: #888;
  max-width: 320px;
  transition: color 0.3s ease;
}

.loc-list:hover {
  color: #829f45;
}

/* Transitions: Slide in from right */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .menu-overlay {
    width: 100%;
  }
  .overlay-inner {
    padding: 40px 20px;
  }
  .primary-links .nav-item a {
    font-size: 26px;
  }
}
</style>

