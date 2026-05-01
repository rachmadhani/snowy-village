<script setup lang="ts">
import { ref, onMounted } from 'vue'
import AdminLayout from '../../components/layout/AdminLayout.vue'
import PageBreadcrumb from '../../components/common/PageBreadcrumb.vue'
import { franchiseService, type FranchiseInquiry } from '@/services/franchiseService'
import { useToast } from 'vue-toastification'
import Modal from '../../components/profile/Modal.vue'

const toast = useToast()
const franchises = ref<FranchiseInquiry[]>([])
const loading = ref(true)
const selectedFranchise = ref<FranchiseInquiry | null>(null)
const isModalOpen = ref(false)

const fetchFranchises = async () => {
  loading.value = true
  try {
    const response = await franchiseService.getAll()
    franchises.value = response.data
  } catch (error) {
    console.error('Failed to fetch franchises:', error)
    toast.error('Failed to load franchise inquiries')
  } finally {
    loading.value = false
  }
}

const deleteFranchise = async (id: number) => {
  if (!confirm('Are you sure you want to delete this inquiry?')) return
  
  try {
    await franchiseService.delete(id)
    toast.success('Inquiry deleted successfully')
    fetchFranchises()
    if (selectedFranchise.value?.id === id) {
      isModalOpen.value = false
    }
  } catch (error) {
    console.error('Failed to delete franchise:', error)
    toast.error('Failed to delete inquiry')
  }
}

const viewDetails = (franchise: FranchiseInquiry) => {
  selectedFranchise.value = franchise
  isModalOpen.value = true
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

onMounted(fetchFranchises)
</script>

<template>
  <AdminLayout>
    <PageBreadcrumb pageTitle="Franchise Inquiries" />

    <div class="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
      <div v-if="loading" class="flex items-center justify-center py-20">
        <div class="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-brand-500"></div>
      </div>

      <div v-else-if="franchises.length === 0" class="flex flex-col items-center justify-center py-20">
        <p class="text-gray-500 dark:text-gray-400">No franchise inquiries found.</p>
      </div>

      <div v-else class="overflow-x-auto">
        <table class="w-full text-left">
          <thead>
            <tr class="border-b border-gray-100 dark:border-gray-800">
              <th class="pb-4 pt-0 font-medium text-gray-500 dark:text-gray-400">Name</th>
              <th class="pb-4 pt-0 font-medium text-gray-500 dark:text-gray-400">Email</th>
              <th class="pb-4 pt-0 font-medium text-gray-500 dark:text-gray-400">Location</th>
              <th class="pb-4 pt-0 font-medium text-gray-500 dark:text-gray-400">Date</th>
              <th class="pb-4 pt-0 text-right font-medium text-gray-500 dark:text-gray-400">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100 dark:divide-gray-800">
            <tr v-for="franchise in franchises" :key="franchise.id" class="group transition-colors hover:bg-gray-50 dark:hover:bg-white/[0.02]">
              <td class="py-4 font-medium text-gray-800 dark:text-white/90">{{ franchise.name }}</td>
              <td class="py-4 text-gray-600 dark:text-gray-400">{{ franchise.email }}</td>
              <td class="py-4 text-gray-600 dark:text-gray-400">{{ franchise.location }}</td>
              <td class="py-4 text-gray-600 dark:text-gray-400 text-sm">{{ formatDate(franchise.created_at) }}</td>
              <td class="py-4 text-right">
                <div class="flex items-center justify-end gap-3">
                  <button 
                    @click="viewDetails(franchise)"
                    class="rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-brand-500 dark:text-gray-400 dark:hover:bg-white/5"
                    title="View Details"
                  >
                    <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                  <button 
                    @click="deleteFranchise(franchise.id)"
                    class="rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-red-500 dark:text-gray-400 dark:hover:bg-white/5"
                    title="Delete"
                  >
                    <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Detail Modal -->
    <Modal v-if="isModalOpen" @close="isModalOpen = false">
      <template #body>
        <div class="relative w-full max-w-2xl rounded-2xl bg-white p-8 shadow-xl dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
          <div class="mb-6 flex items-center justify-between">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white">Franchise Inquiry Details</h3>
            <button @click="isModalOpen = false" class="text-gray-400 hover:text-gray-500">
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div v-if="selectedFranchise" class="space-y-6">
            <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label class="mb-1 block text-xs font-bold uppercase tracking-wider text-gray-400">Name</label>
                <p class="text-gray-900 dark:text-white">{{ selectedFranchise.name }}</p>
              </div>
              <div>
                <label class="mb-1 block text-xs font-bold uppercase tracking-wider text-gray-400">Email</label>
                <p class="text-gray-900 dark:text-white">{{ selectedFranchise.email }}</p>
              </div>
              <div>
                <label class="mb-1 block text-xs font-bold uppercase tracking-wider text-gray-400">Phone</label>
                <p class="text-gray-900 dark:text-white">{{ selectedFranchise.phone_number || '-' }}</p>
              </div>
              <div>
                <label class="mb-1 block text-xs font-bold uppercase tracking-wider text-gray-400">Location</label>
                <p class="text-gray-900 dark:text-white">{{ selectedFranchise.location }}</p>
              </div>
              <div>
                <label class="mb-1 block text-xs font-bold uppercase tracking-wider text-gray-400">Date Received</label>
                <p class="text-gray-900 dark:text-white">{{ formatDate(selectedFranchise.created_at) }}</p>
              </div>
            </div>

            <div>
              <label class="mb-1 block text-xs font-bold uppercase tracking-wider text-gray-400">Message</label>
              <div class="rounded-xl bg-gray-50 p-4 text-gray-700 dark:bg-white/[0.03] dark:text-gray-300">
                {{ selectedFranchise.message }}
              </div>
            </div>

            <div class="flex justify-end pt-4">
              <button 
                @click="deleteFranchise(selectedFranchise.id)"
                class="flex items-center gap-2 rounded-xl bg-red-500 px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-red-600 hover:shadow-lg hover:shadow-red-500/30"
              >
                Delete Inquiry
              </button>
            </div>
          </div>
        </div>
      </template>
    </Modal>
  </AdminLayout>
</template>

<style scoped>
.h-10 { height: 2.5rem; }
.w-10 { width: 2.5rem; }
.animate-spin { animation: spin 1s linear infinite; }
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>
