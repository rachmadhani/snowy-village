import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AdminWrapper from '../admin/AdminWrapper.vue'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(_to, _from, savedPosition) {
    return savedPosition || { left: 0, top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/franchise',
      name: 'franchise',
      component: () => import('../views/FranchiseView.vue'),
    },
    {
      path: '/careers',
      name: 'careers',
      component: () => import('../views/CareersView.vue'),
    },
    {
      path: '/admin/login',
      name: 'admin-login',
      component: () => import('../admin/views/Auth/Signin.vue'),
      meta: { title: 'Admin Login', guest: true },
    },
    {
      path: '/admin',
      component: AdminWrapper,
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'Dashboard',
          component: () => import('../admin/views/Ecommerce.vue'),
          meta: { title: 'Dashboard' },
        },
        {
          path: 'products',
          name: 'Products',
          component: () => import('../admin/views/Products/ProductsView.vue'),
          meta: { title: 'Manage Products' },
        },
        {
          path: 'locations',
          name: 'Locations',
          component: () => import('../admin/views/Locations/LocationsView.vue'),
          meta: { title: 'Manage Locations' },
        },
        {
          path: 'profile',
          name: 'Profile',
          component: () => import('../admin/views/Others/UserProfile.vue'),
          meta: { title: 'Profile' },
        },
      ],
    },
  ],
})

router.beforeEach((to, _from, next) => {
  const authStore = useAuthStore()

  if (to.meta.title) {
    document.title = `${to.meta.title} | Snowy Village Admin`
  } else if (to.path.startsWith('/admin')) {
    document.title = 'Snowy Village Admin'
  } else {
    document.title = 'Snowy Village'
  }

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'admin-login' })
  } else if (to.meta.guest && authStore.isAuthenticated) {
    next({ name: 'Dashboard' })
  } else {
    next()
  }
})

export default router
