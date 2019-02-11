import Vue from 'vue'
import Router from 'vue-router'

// import HelloWorld from '@/components/HelloWorld'
// import login from '@/components/login'
// import notfound from '@/components/404'
// import main from '@/pages/main'
// import DistributionCenter from '@/pages/DistributionCenter'
// import UserManage from '@/pages/UserManage'
// import UserOption from '@/pages/UserOption'
// import OrderManage from '@/pages/OrderManage'
// import OrderDetail from '@/pages/OrderDetail'
// import PlanCenter from '@/pages/PlanCenter'
// import LandDetail from '@/pages/LandDetail'
// import LandManage from '@/pages/LandManage'
// import MessageCenter from '@/pages/MessageCenter'
// import RoleManage from '@/pages/RoleManage'
// import FinancialManage from '@/pages/FinancialManage'
// import VegetableManage from '@/pages/VegetableManage'
// import SliderManage from '@/pages/SliderManage'
// import AppUsermanage from '@/pages/AppUsermanage'
import VegetableMiniatures from '@/pages/VegetableMiniatures '

const HelloWorld = () => import('@/components/HelloWorld')
const login = () => import('@/components/login')
const notfound = () => import('@/components/404')
const main = () => import('@/pages/main')
const DistributionCenter = () => import('@/pages/DistributionCenter')
const UserManage = () => import('@/pages/UserManage')
const UserOption = () => import('@/pages/UserOption')
const OrderManage = () => import('@/pages/OrderManage')
const OrderDetail = () => import('@/pages/OrderDetail')
const PlanCenter = () => import('@/pages/PlanCenter')
const LandDetail = () => import('@/pages/LandDetail')
const LandManage = () => import('@/pages/LandManage')
const MessageCenter = () => import('@/pages/MessageCenter')
const RoleManage = () => import('@/pages/RoleManage')
const FinancialManage = () => import('@/pages/FinancialManage')
const VegetableManage = () => import('@/pages/VegetableManage')
const SliderManage = () => import('@/pages/SliderManage')
const AppUsermanage = () => import('@/pages/AppUsermanage')
// const VegetableMiniatures = () => import('@/pages/VegetableMiniatures')

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
        name: '首页'
      }]
    },
    {
      path: '/',
      component: HelloWorld,
      name: 'HelloWorld',
      children: [{
        path: '/PlanCenter',
        component: PlanCenter,
        name: '种植中心'
      }]
    },
    {
      path: '/',
      component: HelloWorld,
      name: 'HelloWorld',
      children: [{
        path: '/AppUsermanage',
        component: AppUsermanage,
        name: 'App用户管理'
      }]
    },
    {
      path: '/',
      component: HelloWorld,
      name: 'HelloWorld',
      children: [{
        path: '/DistributionCenter',
        component: DistributionCenter,
        name: '配送中心'
      }]
    },
    {
      path: '/',
      component: HelloWorld,
      name: 'UserCenter',
      children: [{
        path: '/UserManage',
        component: UserManage,
        name: '用户管理'
      }, {
        path: '/UserOption',
        name: '用户设置',
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
        name: '订单管理'
      }, {
        path: '/OrderDetail',
        name: '订单详情',
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
        name: '土地管理'
      }, {
        path: '/LandDetail',
        name: '土地规划',
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
        name: '消息中心'
      }, {
        path: '/SliderManage',
        component: SliderManage,
        name: '轮播管理'
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
        name: '权限管理'
      }]
    },
    {
      path: '/',
      component: HelloWorld,
      name: 'HelloWorld',
      children: [{
        path: '/FinancialManage',
        component: FinancialManage,
        name: '财务管理'
      }]
    },
    {
      path: '/',
      component: HelloWorld,
      name: 'HelloWorld',
      children: [{
        path: '/VegetableManage',
        component: VegetableManage,
        name: '蔬菜管理'
      }, {
        path: '/VegetableMiniatures',
        component: VegetableMiniatures,
        name: '蔬菜略缩图'
      }
      ]
    }

  ]
})
