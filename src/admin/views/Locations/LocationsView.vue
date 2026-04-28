<template>
  <AdminLayout>
    <!-- Table Header with Search and Add Button -->
    <div class="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
      <div class="relative w-full max-w-sm">
        <span class="absolute inset-y-0 left-0 flex items-center pl-3">
          <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </span>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search locations..."
          class="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none text-sm transition"
        />
      </div>
      <button
        @click="openAddModal"
        class="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-500 py-2.5 px-6 text-center font-semibold text-white hover:bg-brand-600 transition shadow-sm active:scale-95"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        Add Location
      </button>
    </div>

    <!-- Table Container -->
    <div class="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
      <div class="max-w-full overflow-x-auto">
        <table class="w-full table-auto">
          <thead>
            <tr class="bg-gray-50/50 dark:bg-gray-800/50 text-left border-b border-gray-100 dark:border-gray-800">
              <th class="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">ID</th>
              <th class="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">City / Address</th>
              <th class="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Phone</th>
              <th class="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Opening Hours</th>
              <th class="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100 dark:divide-gray-800">
            <tr v-for="location in filteredLocations" :key="location.id" class="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition">
              <td class="py-5 px-6">
                <span class="text-sm font-medium text-gray-600 dark:text-gray-400">#{{ location.id }}</span>
              </td>
              <td class="py-5 px-6">
                <div class="flex flex-col">
                  <span class="text-sm font-semibold text-gray-800 dark:text-white">{{ location.city_name }}</span>
                  <span class="text-xs text-gray-400 mt-0.5">{{ location.address }}</span>
                </div>
              </td>
              <td class="py-5 px-6">
                <span class="text-sm text-gray-600 dark:text-gray-400">{{ location.phone_number }}</span>
              </td>
              <td class="py-5 px-6">
                <div v-if="location.formatted_hours && location.formatted_hours.length" class="space-y-0.5">
                  <p v-for="(hour, idx) in location.formatted_hours.slice(0, 1)" :key="idx" class="text-xs text-brand-500 dark:text-brand-400">
                    {{ hour }}
                  </p>
                  <p v-if="location.formatted_hours.length > 1" class="text-[10px] text-gray-400 italic">
                    +{{ location.formatted_hours.length - 1 }} more days
                  </p>
                </div>
                <p v-else class="text-xs text-gray-400 italic">No hours set</p>
              </td>
              <td class="py-5 px-6 text-right">
                <div class="flex items-center justify-end gap-3">
                  <a v-if="location.map_url" :href="location.map_url" target="_blank" class="p-1.5 text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg transition">
                    <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </a>
                  <button @click="openEditModal(location)" class="p-1.5 text-gray-400 hover:text-brand-500 hover:bg-brand-50 dark:hover:bg-brand-500/10 rounded-lg transition">
                    <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button @click="handleDelete(location.id)" class="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition">
                    <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="filteredLocations.length === 0">
              <td colspan="5" class="py-12 text-center text-gray-400 text-sm italic">
                {{ loading ? 'Loading locations...' : 'No locations found matches your search.' }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modals -->
    <LocationModal 
      v-if="isModalOpen" 
      :location="selectedLocation" 
      :loading="modalLoading"
      @close="closeModal" 
      @submit="handleSave"
    />
  </AdminLayout>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import AdminLayout from '../../components/layout/AdminLayout.vue'
import LocationModal from '../../components/modals/LocationModal.vue'
import { locationService, type Location } from '@/services/locationService'
import { useToast } from 'vue-toastification'

const locations = ref<Location[]>([])
const loading = ref(false)
const modalLoading = ref(false)
const isModalOpen = ref(false)
const selectedLocation = ref<Location | null>(null)
const searchQuery = ref('')
const toast = useToast()

const filteredLocations = computed(() => {
  if (!searchQuery.value) return locations.value
  const query = searchQuery.value.toLowerCase()
  return locations.value.filter(l => 
    l.city_name.toLowerCase().includes(query) || 
    l.address.toLowerCase().includes(query) ||
    l.id.toString().includes(query)
  )
})

const fetchLocations = async () => {
  loading.value = true
  try {
    const response = await locationService.getAll()
    locations.value = response.data
  } catch (error) {
    toast.error('Failed to fetch locations')
  } finally {
    loading.value = false
  }
}

const openAddModal = () => {
  selectedLocation.value = null
  isModalOpen.value = true
}

const openEditModal = (location: Location) => {
  selectedLocation.value = location
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
  selectedLocation.value = null
}

const handleSave = async (data: any) => {
  modalLoading.value = true
  try {
    if (selectedLocation.value) {
      await locationService.update(selectedLocation.value.id, data)
      toast.success('Location updated successfully')
    } else {
      await locationService.create(data)
      toast.success('Location created successfully')
    }
    closeModal()
    fetchLocations()
  } catch (error) {
    toast.error('Failed to save location')
  } finally {
    modalLoading.value = false
  }
}

const handleDelete = async (id: number) => {
  if (confirm('Are you sure you want to delete this location?')) {
    try {
      await locationService.delete(id)
      toast.success('Location deleted successfully')
      fetchLocations()
    } catch (error) {
      toast.error('Failed to delete location')
    }
  }
}

onMounted(fetchLocations)
</script>
