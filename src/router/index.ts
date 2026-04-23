import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AdminWrapper from '../admin/AdminWrapper.vue'

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
      path: '/admin',
      component: AdminWrapper,
      children: [
        {
          path: '',
          name: 'Ecommerce',
          component: () => import('../admin/views/Ecommerce.vue'),
          meta: { title: 'eCommerce Dashboard' },
        },
        {
          path: 'calendar',
          name: 'Calendar',
          component: () => import('../admin/views/Others/Calendar.vue'),
          meta: { title: 'Calendar' },
        },
        {
          path: 'profile',
          name: 'Profile',
          component: () => import('../admin/views/Others/UserProfile.vue'),
          meta: { title: 'Profile' },
        },
        {
          path: 'form-elements',
          name: 'Form Elements',
          component: () => import('../admin/views/Forms/FormElements.vue'),
          meta: { title: 'Form Elements' },
        },
        {
          path: 'basic-tables',
          name: 'Basic Tables',
          component: () => import('../admin/views/Tables/BasicTables.vue'),
          meta: { title: 'Basic Tables' },
        },
        {
          path: 'line-chart',
          name: 'Line Chart',
          component: () => import('../admin/views/Chart/LineChart/LineChart.vue'),
          meta: { title: 'Line Chart' },
        },
        {
          path: 'bar-chart',
          name: 'Bar Chart',
          component: () => import('../admin/views/Chart/BarChart/BarChart.vue'),
          meta: { title: 'Bar Chart' },
        },
        {
          path: 'alerts',
          name: 'Alerts',
          component: () => import('../admin/views/UiElements/Alerts.vue'),
          meta: { title: 'Alerts' },
        },
        {
          path: 'avatars',
          name: 'Avatars',
          component: () => import('../admin/views/UiElements/Avatars.vue'),
          meta: { title: 'Avatars' },
        },
        {
          path: 'badges',
          name: 'Badges',
          component: () => import('../admin/views/UiElements/Badges.vue'),
          meta: { title: 'Badges' },
        },
        {
          path: 'buttons',
          name: 'Buttons',
          component: () => import('../admin/views/UiElements/Buttons.vue'),
          meta: { title: 'Buttons' },
        },
        {
          path: 'images',
          name: 'Images',
          component: () => import('../admin/views/UiElements/Images.vue'),
          meta: { title: 'Images' },
        },
        {
          path: 'videos',
          name: 'Videos',
          component: () => import('../admin/views/UiElements/Videos.vue'),
          meta: { title: 'Videos' },
        },
      ],
    },
  ],
})

router.beforeEach((to, _from, next) => {
  if (to.meta.title) {
    document.title = `${to.meta.title} | Snowy Village Admin`
  } else if (to.path.startsWith('/admin')) {
    document.title = 'Snowy Village Admin'
  } else {
    document.title = 'Snowy Village'
  }
  next()
})

export default router
