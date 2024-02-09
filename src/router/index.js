import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../view/HomePage.vue';
import FloodBook from '../view/FloodBook.vue';
import HisTory from '../view/HisTory.vue';
import FloodManage from '../view/FloodManage.vue';

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage,
  },
  {
    path: '/FloodBook',
    name: 'FloodBook',
    component: FloodBook
  }
,
  {
    path: '/HisTory',
    name: 'HisTory',
    component: HisTory,
  },

  {
    path: '/FloodManage',
    name: 'FloodManage',
    component: FloodManage,
  },
  
  // ...more routes here
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});



export default router;
