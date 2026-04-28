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
          placeholder="Search products..."
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
        Add Product
      </button>
    </div>

    <!-- Table Container -->
    <div class="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
      <div class="max-w-full overflow-x-auto">
        <table class="w-full table-auto">
          <thead>
            <tr class="bg-gray-50/50 dark:bg-gray-800/50 text-left border-b border-gray-100 dark:border-gray-800">
              <th class="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">ID</th>
              <th class="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Product</th>
              <th class="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Description</th>
              <th class="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
              <th class="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100 dark:divide-gray-800">
            <tr v-for="product in filteredProducts" :key="product.id" class="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition">
              <td class="py-5 px-6">
                <span class="text-sm font-medium text-gray-600 dark:text-gray-400">#{{ product.id }}</span>
              </td>
              <td class="py-5 px-6">
                <div class="flex items-center gap-4">
                  <div class="h-12 w-12 rounded-lg overflow-hidden flex-shrink-0 border border-gray-100 dark:border-gray-800">
                    <img v-if="product.product_image" :src="product.product_image" alt="Product" class="h-full w-full object-cover" />
                    <div v-else class="h-full w-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                      <svg class="h-6 w-6 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                    </div>
                  </div>
                  <span class="text-sm font-semibold text-gray-800 dark:text-white">{{ product.product_title }}</span>
                </div>
              </td>
              <td class="py-5 px-6">
                <p class="text-sm text-brand-500 dark:text-brand-400 line-clamp-1 hover:underline cursor-pointer">
                  {{ product.product_description }}
                </p>
              </td>
              <td class="py-5 px-6">
                <span 
                  v-if="product.product_badge_popular"
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                >
                  Popular
                </span>
                <span v-else class="text-xs text-gray-400">Standard</span>
              </td>
              <td class="py-5 px-6 text-right">
                <div class="flex items-center justify-end gap-3">
                  <button @click="openEditModal(product)" class="p-1.5 text-gray-400 hover:text-brand-500 hover:bg-brand-50 dark:hover:bg-brand-500/10 rounded-lg transition">
                    <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button @click="handleDelete(product.id)" class="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition">
                    <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="filteredProducts.length === 0">
              <td colspan="5" class="py-12 text-center text-gray-400 text-sm italic">
                {{ loading ? 'Loading products...' : 'No products found matches your search.' }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modals -->
    <ProductModal 
      v-if="isModalOpen" 
      :product="selectedProduct" 
      :loading="modalLoading"
      @close="closeModal" 
      @submit="handleSave"
    />
  </AdminLayout>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import AdminLayout from '../../components/layout/AdminLayout.vue'
import ProductModal from '../../components/modals/ProductModal.vue'
import { productService, type Product } from '@/services/productService'
import { useToast } from 'vue-toastification'

const products = ref<Product[]>([])
const loading = ref(false)
const modalLoading = ref(false)
const isModalOpen = ref(false)
const selectedProduct = ref<Product | null>(null)
const searchQuery = ref('')
const toast = useToast()

const filteredProducts = computed(() => {
  if (!searchQuery.value) return products.value
  const query = searchQuery.value.toLowerCase()
  return products.value.filter(p => 
    p.product_title.toLowerCase().includes(query) || 
    p.product_description.toLowerCase().includes(query) ||
    p.id.toString().includes(query)
  )
})

const fetchProducts = async () => {
  loading.value = true
  try {
    const response = await productService.getAll()
    products.value = response.data
  } catch (error) {
    toast.error('Failed to fetch products')
  } finally {
    loading.value = false
  }
}

const openAddModal = () => {
  selectedProduct.value = null
  isModalOpen.value = true
}

const openEditModal = (product: Product) => {
  selectedProduct.value = product
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
  selectedProduct.value = null
}

const handleSave = async (formData: FormData) => {
  modalLoading.value = true
  try {
    if (selectedProduct.value) {
      await productService.update(selectedProduct.value.id, formData)
      toast.success('Product updated successfully')
    } else {
      await productService.create(formData)
      toast.success('Product created successfully')
    }
    closeModal()
    fetchProducts()
  } catch (error) {
    toast.error('Failed to save product')
  } finally {
    modalLoading.value = false
  }
}

const handleDelete = async (id: number) => {
  if (confirm('Are you sure you want to delete this product?')) {
    try {
      await productService.delete(id)
      toast.success('Product deleted successfully')
      fetchProducts()
    } catch (error) {
      toast.error('Failed to delete product')
    }
  }
}

onMounted(fetchProducts)
</script>
