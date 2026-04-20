<script setup lang="ts">
import Sidebar from './components/Sidebar.vue'
import HomeHero from './components/HomeHero.vue'
import AboutSection from './components/AboutSection.vue'
import ParallaxSection from './components/ParallaxSection.vue'
import ProcessSection from './components/ProcessSection.vue'
</script>

<template>
  <Sidebar />
  <main>
    <HomeHero />
    <AboutSection />
    <ParallaxSection />
    <ProcessSection />
  </main>
</template>

<style>
/* Global resets or overrides if needed */
</style>
