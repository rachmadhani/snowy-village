<template>
  <Modal :fullScreenBackdrop="true" @close="$emit('close')">
    <template #body>
      <div class="w-full max-w-lg p-6 bg-white rounded-2xl dark:bg-gray-900 shadow-xl overflow-y-auto max-h-[90vh]">
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-xl font-bold text-gray-800 dark:text-white">
            {{ isEdit ? 'Edit Product' : 'Add New Product' }}
          </h3>
          <button @click="$emit('close')" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Product Title</label>
            <input 
              v-model="form.product_title" 
              type="text" 
              required
              class="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none"
              placeholder="Enter product title"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
            <textarea 
              v-model="form.product_description" 
              rows="3"
              required
              class="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none"
              placeholder="Enter product description"
            ></textarea>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Product Image</label>
            <div class="flex flex-col items-center justify-center p-4 border-2 border-dashed rounded-lg dark:border-gray-700 relative">
              <input 
                type="file" 
                @change="handleFileChange" 
                accept="image/*"
                class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                :required="!isEdit"
              />
              <div v-if="previewUrl" class="mb-2">
                <img :src="previewUrl" alt="Preview" class="h-32 w-32 object-cover rounded-lg shadow-md" />
              </div>
              <div v-else class="text-center">
                <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <p class="mt-1 text-sm text-gray-500">Click or drag to upload image</p>
              </div>
            </div>
            <p v-if="isEdit && !previewUrl" class="text-xs text-gray-500 mt-1 italic">Leave empty to keep existing image</p>
          </div>

          <div class="flex items-center gap-2">
            <input 
              v-model="form.product_badge_popular" 
              type="checkbox" 
              id="popular"
              class="w-4 h-4 text-brand-500 border-gray-300 rounded focus:ring-brand-500"
            />
            <label for="popular" class="text-sm font-medium text-gray-700 dark:text-gray-300">Popular Badge</label>
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
              {{ loading ? 'Saving...' : (isEdit ? 'Update Product' : 'Add Product') }}
            </button>
          </div>
        </form>
      </div>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Modal from '@/admin/components/ui/Modal.vue'
import type { Product } from '@/services/productService'

const props = defineProps<{
  product?: Product | null
  loading?: boolean
}>()

const emit = defineEmits(['close', 'submit'])

const isEdit = !!props.product
const previewUrl = ref<string | null>(props.product?.product_image || null)
const selectedFile = ref<File | null>(null)

const form = ref({
  product_title: props.product?.product_title || '',
  product_description: props.product?.product_description || '',
  product_badge_popular: props.product?.product_badge_popular || false
})

const handleFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  if (target.files && target.files[0]) {
    const file = target.files[0]
    selectedFile.value = file
    previewUrl.value = URL.createObjectURL(file)
  }
}

const handleSubmit = () => {
  const formData = new FormData()
  formData.append('product_title', form.value.product_title)
  formData.append('product_description', form.value.product_description)
  formData.append('product_badge_popular', form.value.product_badge_popular ? '1' : '0')
  
  if (selectedFile.value) {
    formData.append('product_image', selectedFile.value)
  }

  emit('submit', formData)
}
</script>
