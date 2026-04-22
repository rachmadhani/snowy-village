<template>
  <slot></slot>
</template>

<script setup lang="ts">
import { useSidebarProvider } from '@admin/composables/useSidebar'

useSidebarProvider()
</script>
