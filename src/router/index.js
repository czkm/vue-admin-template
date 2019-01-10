import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import login from '@/components/login'
import notfound from '@/components/404'
import main from '@/pages/main'
import DistributionCenter from '@/pages/DistributionCenter'
import UserManage from '@/pages/UserManage'
import UserOption from '@/pages/UserOption'
import OrderManage from '@/pages/OrderManage'
import OrderDetail from '@/pages/OrderDetail'
import PlanCenter from '@/pages/PlanCenter'
import LandDetail from '@/pages/LandDetail'
import LandManage from '@/pages/LandManage'
import MessageCenter from '@/pages/MessageCenter'
import RoleManage from '@/pages/RoleManage'
import FinancialManage from '@/pages/FinancialManage'
import VegetableManage from '@/pages/VegetableManage'
import SliderManage from '@/pages/SliderManage'
import AppUsermanage from '@/pages/AppUsermanage'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      component: login,
      name: 'login'
    },

    {
      path: '*',
      name: 'notfound',
      component: notfound
    },
    {
      path: '/',
      redirect: '/main',
      component: HelloWorld,
      name: 'HelloWorld',
      children: [{
        path: '/main',
        component: main,
        name: 'main'
      }]
    },
    {
      path: '/',
      component: HelloWorld,
      name: 'HelloWorld',
      children: [{
        path: '/PlanCenter',
        component: PlanCenter,
        name: 'PlanCenter'
      }]
    },
    {
      path: '/',
      component: HelloWorld,
      name: 'HelloWorld',
      children: [{
        path: '/AppUsermanage',
        component: AppUsermanage,
        name: 'AppUsermanage'
      }]
    },
    {
      path: '/',
      component: HelloWorld,
      name: 'HelloWorld',
      children: [{
        path: '/DistributionCenter',
        component: DistributionCenter,
        name: 'DistributionCenter'
      }]
    },
    {
      path: '/',
      component: HelloWorld,
      name: 'UserCenter',
      children: [{
        path: '/UserManage',
        component: UserManage,
        name: 'UserManage'
      }, {
        path: '/UserOption',
        name: 'UserOption',
        component: UserOption
      }]
    },
    {
      path: '/',
      component: HelloWorld,
      name: 'OrderCenter',
      children: [{
        path: '/OrderManage',
        component: OrderManage,
        name: 'OrderManage'
      }, {
        path: '/OrderDetail',
        name: 'OrderDetail',
        component: OrderDetail
      }]
    },
    {
      path: '/',
      component: HelloWorld,
      name: 'LandCenter',
      children: [{
        path: '/LandManage',
        component: LandManage,
        name: 'LandManage'
      }, {
        path: '/LandDetail',
        name: 'LandDetail',
        component: LandDetail
      }]
    },
    {
      path: '/',
      component: HelloWorld,
      name: 'HelloWorld',
      children: [{
        path: '/MessageCenter',
        component: MessageCenter,
        name: 'MessageCenter'
      }, {
        path: '/SliderManage',
        component: SliderManage,
        name: 'SliderManage'
      }
      ]
    },
    {
      path: '/',
      component: HelloWorld,
      name: 'HelloWorld',
      children: [{
        path: '/RoleManage',
        component: RoleManage,
        name: 'RoleManage'
      }]
    },
    {
      path: '/',
      component: HelloWorld,
      name: 'HelloWorld',
      children: [{
        path: '/FinancialManage',
        component: FinancialManage,
        name: 'FinancialManage'
      }]
    },
    {
      path: '/',
      component: HelloWorld,
      name: 'HelloWorld',
      children: [{
        path: '/VegetableManage',
        component: VegetableManage,
        name: 'VegetableManage'
      }]
    }

  ]
})
