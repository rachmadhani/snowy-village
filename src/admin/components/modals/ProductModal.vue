<template>
  <AdminFormModal 
    :title="isEdit ? 'Edit Product' : 'Create New Product'"
    :loading="loading"
    @close="$emit('close')"
    @submit="handleSubmit"
  >
    <template #fields>
      <div class="space-y-5">
        <div>
          <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Product Title</label>
          <input 
            v-model="form.product_title" 
            type="text" 
            required
            class="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition"
            placeholder="e.g. Strawberry Snow"
          />
        </div>

        <div>
          <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Description</label>
          <textarea 
            v-model="form.product_description" 
            rows="3"
            required
            class="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition"
            placeholder="Enter detailed description..."
          ></textarea>
        </div>

        <div>
          <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Product Image</label>
          <div class="relative group">
            <input 
              type="file" 
              @change="handleFileChange" 
              accept="image/*"
              class="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              :required="!isEdit"
            />
            <div class="flex items-center gap-3 px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 group-hover:border-brand-500 transition">
              <div class="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-md text-xs font-semibold text-gray-600 dark:text-gray-300">
                Browse...
              </div>
              <span class="text-sm text-gray-500 truncate">
                {{ selectedFile ? selectedFile.name : (isEdit ? 'Keep existing image' : 'No file selected.') }}
              </span>
            </div>
          </div>
          <div v-if="previewUrl" class="mt-3">
            <img :src="previewUrl" alt="Preview" class="h-24 w-24 object-cover rounded-xl shadow-sm border border-gray-100 dark:border-gray-800" />
          </div>
        </div>

        <div class="flex items-center gap-3 p-3 bg-blue-50/50 dark:bg-blue-900/10 rounded-xl border border-blue-100/50 dark:border-blue-800/30">
          <input 
            v-model="form.product_badge_popular" 
            type="checkbox" 
            id="popular"
            class="w-5 h-5 text-brand-500 border-gray-300 rounded-lg focus:ring-brand-500 transition"
          />
          <label for="popular" class="text-sm font-semibold text-blue-900 dark:text-blue-300 cursor-pointer selection:bg-transparent">Mark as Popular</label>
        </div>
      </div>
    </template>
  </AdminFormModal>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AdminFormModal from '@/admin/components/ui/AdminFormModal.vue'
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
  product_badge_popular: String(props.product?.product_badge_popular).toLowerCase() === 'true'
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
  formData.append('product_badge_popular', form.value.product_badge_popular ? 'true' : 'false')
  
  if (selectedFile.value) {
    formData.append('product_image', selectedFile.value)
  }

  emit('submit', formData)
}
</script>
