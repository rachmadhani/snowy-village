<script setup lang="ts">
import Sidebar from './components/Sidebar.vue'
import HomeHero from './components/HomeHero.vue'
import AboutSection from './components/AboutSection.vue'
import ParallaxSection from './components/ParallaxSection.vue'
import ProcessSection from './components/ProcessSection.vue'
import BingsooSection from './components/BingsooSection.vue'
import ContactSection from './components/ContactSection.vue'
</script>

<template>
  <Sidebar />
  <main>
    <HomeHero />
    <AboutSection />
    <ParallaxSection />
    <ProcessSection />
    <BingsooSection />
    <ContactSection />
  </main>
</template>

<style>
/* Global resets or overrides if needed */
</style>
