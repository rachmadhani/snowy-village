<template>
  <div class="fixed inset-0 z-[999999] flex items-center justify-center p-4 sm:p-6">
    <!-- Backdrop -->
    <div 
      class="fixed inset-0 bg-gray-900/40 backdrop-blur-md transition-opacity animate-fade-in"
      @click="$emit('close')"
    ></div>

    <!-- Modal Content -->
    <form 
      @submit.prevent="$emit('submit')"
      class="relative w-full max-w-lg bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden animate-fade-in-up z-10"
    >
      <!-- Header -->
      <div class="px-6 py-5 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-white dark:bg-gray-900 sticky top-0 z-20">
        <h3 class="text-xl font-bold text-gray-800 dark:text-white">
          {{ title }}
        </h3>
        <button @click="$emit('close')" class="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Body (Scrollable) -->
      <div class="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
        <slot name="fields"></slot>
      </div>

      <!-- Footer -->
      <div class="px-6 py-5 bg-gray-50 dark:bg-gray-800/50 flex justify-end gap-3 border-t border-gray-100 dark:border-gray-800 sticky bottom-0 z-20">
        <button 
          type="button" 
          @click="$emit('close')"
          class="px-6 py-2.5 text-sm font-semibold text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all active:scale-95"
        >
          Cancel
        </button>
        <button 
          type="submit" 
          :disabled="loading"
          class="px-8 py-2.5 text-sm font-bold text-white bg-brand-500 hover:bg-brand-600 rounded-xl shadow-lg shadow-brand-500/20 transition-all active:scale-95 disabled:opacity-50 flex items-center gap-2"
        >
          <svg v-if="loading" class="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {{ loading ? 'Saving...' : submitText }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string
  submitText?: string
  loading?: boolean
}

withDefaults(defineProps<Props>(), {
  submitText: 'Save Changes',
  loading: false
})

defineEmits(['close', 'submit'])
</script>
