<script setup lang="ts">
import Sidebar from './components/Sidebar.vue'
import HomeHero from './components/HomeHero.vue'
import AboutSection from './components/AboutSection.vue'
import ParallaxSection from './components/ParallaxSection.vue'
</script>

<template>
  <Sidebar />
  <main>
    <HomeHero />
    <AboutSection />
    <ParallaxSection />
    <!-- Spacer to view the bottom slant transition -->
    <div style="height: 50vh; background: white;"></div>
  </main>
</template>

<style>
/* Global resets or overrides if needed */
</style>
