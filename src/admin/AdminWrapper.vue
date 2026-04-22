<template>
  <div class="admin-root">
    <ThemeProvider>
      <SidebarProvider>
        <router-view />
      </SidebarProvider>
    </ThemeProvider>
  </div>
</template>

<script setup lang="ts">
import ThemeProvider from '@admin/components/layout/ThemeProvider.vue'
import SidebarProvider from '@admin/components/layout/SidebarProvider.vue'

// Import Admin-specific styles
import '@admin/assets/main.css'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'jsvectormap/dist/jsvectormap.css'
import 'flatpickr/dist/flatpickr.css'
</script>

<style scoped>
/* Scoping admin styles if needed */
</style>
