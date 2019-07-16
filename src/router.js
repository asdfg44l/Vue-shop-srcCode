import Vue from 'vue'
import Router from 'vue-router'

// front plate
import index from '@/views/client/index'
import cart from '@/views/client/Cart'
import accessories from '@/views/client/Accessories'
import sendOrder from '@/views/client/sendOrder'
import motocycle from '@/views/client/motocycle'
import option from '@/components/client/bottomLink'
import maintenance from '@/views/client/maintenance'
import safetyDrive from '@/views/client/safetyDrive'
import question from '@/views/client/question'
import recallCar from '@/views/client/recallCar'

// dashboard
import Login from '@/views/dashboard/Login'
import Dashboard from '@/components/dashboard/Dashboard'
import Product from '@/views/dashboard/Product'
import orders from '@/views/dashboard/Orders'
import CustomOrder from "@/views/dashboard/CustomOrder"
import Coupons from "@/views/dashboard/Coupons"
import CustomCheckout from "@/views/dashboard/CustomCheckout"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'*',
      redirect: '/index'
    },
    {
      path: '/index',
      name: 'index',
      component: index
    },
    {
      path: '/cart',
      name: 'cart',
      component: cart
    },
    {
      path: '/accessories',
      name: 'accessories',
      component: accessories
    },
    {
      path: '/motocycle',
      name: 'motocycle',
      component: motocycle
    },
    {
      path: '/sendOrder',
      name: 'sendOrder',
      component: sendOrder,
      children:[
        {
          path: '/checkout/:orderID',
          name: 'userOrder',
          component: CustomCheckout,
        },
      ]
    },
    {
      path: '/option',
      name: 'option',
      component: option,
      children: [
        {
          path: '/option/maintenance',
          name: 'maintenance',
          component: maintenance,
        },
        {
          path: '/option/safetyDrive',
          name: 'safetyDrive',
          component: safetyDrive,
        },
        {
          path: '/option/question',
          name: 'question',
          component: question,
        },
        {
          path: '/option/recallCar',
          name: 'recallCar',
          component: recallCar,
        },
      ]
    },
    {
      path: '/admin',
      name: 'Dashboard',
      component: Dashboard,
      children:[
        {
          path: '/admin/product',
          name: 'product',
          component: Product,
          meta: { requiresAuth: true }
        },
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard,
      redirect: '/index',
      children:[
        {
          path: '/custom_order',
          name: 'CustomOrder',
          component: CustomOrder,
        },
        {
          path: '/coupon',
          name: 'Coupon',
          component: Coupons,
        },
        {
          path: '/custom_checkout/:orderID',
          name: 'customCheckout',
          component: CustomCheckout,
        },
        {
          path: '/orders',
          name: 'orderList',
          component: orders,
        },
      ]
    },
  ]
})
