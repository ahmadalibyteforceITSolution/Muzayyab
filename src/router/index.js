import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import OrderView from '../views/OrderView.vue';
import BudgetView from '../views/BudgetView.vue';
import GuestsView from '../views/GuestsView.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/order',
    name: 'Order',
    component: OrderView
  },
  {
    path: '/budget',
    name: 'Budget',
    component: BudgetView
  },
  {
    path: '/guests',
    name: 'Guests',
    component: GuestsView
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' };
    }
    return { top: 0 };
  }
});

export default router;
