<template>
  <AdminFormModal 
    :title="isEdit ? 'Edit Location' : 'Create New Location'"
    :loading="loading"
    @close="$emit('close')"
    @submit="handleSubmit"
  >
    <template #fields>
      <div class="space-y-5">
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              City Name <span class="text-red-500">*</span>
            </label>
            <input 
              v-model="form.city_name" 
              type="text" 
              required
              class="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition text-sm"
              placeholder="e.g. Jakarta"
            />
          </div>
          <div>
            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Phone Number <span class="text-red-500">*</span>
            </label>
            <input 
              v-model="form.phone_number" 
              type="text" 
              required
              class="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition text-sm"
              placeholder="e.g. 021-123456"
            />
          </div>
        </div>

        <div>
          <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Address <span class="text-red-500">*</span>
          </label>
          <textarea 
            v-model="form.address" 
            rows="2"
            required
            class="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition text-sm"
            placeholder="Full address details..."
          ></textarea>
        </div>

        <div>
          <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Google Maps URL <span class="text-red-500">*</span>
          </label>
          <input 
            v-model="form.map_url" 
            type="url" 
            required
            class="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition text-sm"
            placeholder="https://goo.gl/maps/..."
          />
        </div>

        <!-- Opening Hours -->
        <div>
          <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Opening Hours
          </label>
          <div class="space-y-3 bg-gray-50 dark:bg-gray-800/20 p-4 rounded-2xl border border-gray-100 dark:border-gray-800/50">
            <div v-for="day in days" :key="day" class="flex items-center gap-4">
              <span class="w-20 text-xs font-bold text-gray-400 uppercase tracking-wider">{{ day.substring(0,3) }}</span>
              <input 
                v-model="form.opening_hours[day][0]" 
                type="text" 
                placeholder="e.g. 09:00 - 21:00"
                class="flex-1 px-3 py-1.5 text-xs border border-gray-200 dark:border-gray-700 rounded-lg dark:bg-gray-800 dark:text-white outline-none focus:border-brand-500 transition"
              />
            </div>
          </div>
        </div>
      </div>
    </template>
  </AdminFormModal>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AdminFormModal from '@/admin/components/ui/AdminFormModal.vue'
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
