<template>
  <Modal :fullScreenBackdrop="true" @close="$emit('close')">
    <template #body>
      <div class="w-full max-w-2xl p-6 bg-white rounded-2xl dark:bg-gray-900 shadow-xl overflow-y-auto max-h-[90vh]">
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-xl font-bold text-gray-800 dark:text-white">
            {{ isEdit ? 'Edit Location' : 'Add New Location' }}
          </h3>
          <button @click="$emit('close')" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">City Name</label>
              <input 
                v-model="form.city_name" 
                type="text" 
                required
                class="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none"
                placeholder="e.g. New York"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone Number</label>
              <input 
                v-model="form.phone_number" 
                type="text" 
                required
                class="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none"
                placeholder="e.g. +1 234 567 890"
              />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Address</label>
            <textarea 
              v-model="form.address" 
              rows="2"
              required
              class="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none"
              placeholder="Full address"
            ></textarea>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Map URL (Optional)</label>
            <input 
              v-model="form.map_url" 
              type="url" 
              class="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none"
              placeholder="Google Maps link"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Opening Hours</label>
            <div class="space-y-3 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl">
              <div v-for="day in days" :key="day" class="flex items-center gap-4">
                <span class="w-24 text-sm font-medium text-gray-600 dark:text-gray-400 capitalize">{{ day }}</span>
                <input 
                  v-model="form.opening_hours[day][0]" 
                  type="text" 
                  placeholder="e.g. 09:00 AM - 10:00 PM"
                  class="flex-1 px-3 py-1.5 text-sm border rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-white outline-none"
                />
              </div>
            </div>
          </div>

          <div class="flex gap-3 pt-4">
            <button 
              type="button" 
              @click="$emit('close')"
              class="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              :disabled="loading"
              class="flex-1 px-4 py-2 bg-brand-500 text-white rounded-lg hover:bg-brand-600 transition disabled:opacity-50"
            >
              {{ loading ? 'Saving...' : (isEdit ? 'Update Location' : 'Add Location') }}
            </button>
          </div>
        </form>
      </div>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Modal from '@/admin/components/ui/Modal.vue'
import type { Location } from '@/services/locationService'

const props = defineProps<{
  location?: Location | null
  loading?: boolean
}>()

const emit = defineEmits(['close', 'submit'])

const isEdit = !!props.location
const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']

const initialOpeningHours = () => {
  const obj: Record<string, string[]> = {}
  days.forEach(day => {
    obj[day] = props.location?.opening_hours[day] || ['']
  })
  return obj
}

const form = ref({
  city_name: props.location?.city_name || '',
  address: props.location?.address || '',
  phone_number: props.location?.phone_number || '',
  opening_hours: initialOpeningHours(),
  map_url: props.location?.map_url || ''
})

const handleSubmit = () => {
  emit('submit', { ...form.value })
}
</script>
