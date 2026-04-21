<script setup lang="ts">
import Sidebar from './components/Sidebar.vue'
import HomeHero from './components/HomeHero.vue'
import AboutSection from './components/AboutSection.vue'
import ParallaxSection from './components/ParallaxSection.vue'
import ProcessSection from './components/ProcessSection.vue'
import BingsooSection from './components/BingsooSection.vue'
import ContactSection from './components/ContactSection.vue'
import ProductSection from './components/ProductSection.vue'
import TaiyakiSection from './components/TaiyakiSection.vue'
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
    <ProductSection />
    <TaiyakiSection />
  </main>
</template>

<style>
/* Global resets or overrides if needed */
</style>
