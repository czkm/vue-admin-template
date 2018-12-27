 <!-- eslint-disable -->
<template lang="html">
<!-- <div class="home-container"> -->
  <el-row class="container">
    <el-col :span="24" class="header">
            <el-col :span="10" class="logo" :class="collapsed?'logo-collapse-width':'logo-width'">{{collapsed?'':sysName}}</el-col>
            <el-col :span="5">
        <div class="tools" @click.prevent="collapseFun">
          <i class="fa fa-align-justify"></i>
                </div>
            </el-col>
            <el-col :span="5">
              {{sysTitle}}
            </el-col>
            <el-col :span="4" class="userinfo">
              <!-- <el-col :span="2" class="usericon" ><img  class="userimg" :src="image" width="45" height="45"/></el-col> -->
                <el-dropdown :span="2" trigger="hover">
                    <!-- <span class="el-dropdown-link userinfo-inner">{{sysUserName}}</span> -->
                    <span class="el-dropdown-link userinfo-inner"><img class="userimg" :src="this.sysUserAvatar" /> {{sysUserName}}</span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>我的消息</el-dropdown-item>
                        <el-dropdown-item>设置</el-dropdown-item>
                        <el-dropdown-item divided @click.native="logoutFun">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-col>
        </el-col>
  <!-- <Sidebar :menuList="menuList"/> -->

    <el-col :span="24" class="main">
   <aside :class="collapsed?'menu-collapsed':'menu-expanded'" class="el-col-4">

        <!--左侧导航菜单-->

       <el-menu  class="el-menu-vertical-demo" :collapse="collapsed" :unique-opened ="true" :router ="true" >
           <el-menu-item :index="'/'+child1.url" v-for="child1 in menuList" :key="child1.id" v-if="!child1.childNode">
                <i :class="child1.iconCls" style="font-size: 16px;"></i>
                <span slot="title">{{child1.name}}</span>
            </el-menu-item>
                <!-- 1级菜单 -有子节点-->
            <el-submenu :index="'/'+child1.url" v-for="child1 in menuList" :key="child1.id" v-if="child1.childNode">

                <!-- 2级菜单 无子节点-->
                <el-menu-item :index="'/'+child2.url" v-for="child2 in child1.childNode" :key="child2.id" v-if="!child2.childNode" class="menuTwo"><i :class="child2.iconCls"></i>
                {{child2.name}}
                </el-menu-item>
                    <template slot="title" v-if="child1.childNode">
                        <i :class="child1.iconCls"></i>
                        <span slot="title">{{child1.name}}</span>
                    </template>

            <!-- 判断二级 有子节点  eslint-disable -->
                <el-submenu :index="'/'+child2.url" v-for="child2 in child1.childNode" :key="child2.id" v-if="child2.childNode" class="menuTwo">
                        <template slot="title">
                          <i :class="child2.iconCls"></i>
                          <!-- <span slot="title">{{child2.name}}</span> -->
                        </template>
                <!-- 三级菜单     -->
                    <el-menu-item-group class="menuThree">
                        <el-menu-item :index="'/'+child3.url" v-for="child3 in child2.childNode" :key="child3.id" v-if="!child3.childNode"  style="font-size: 16px"><i :class="child3.iconCls">{{child3.name}}</i></el-menu-item>
                    </el-menu-item-group>
            </el-submenu>
        </el-submenu>
       </el-menu>
     </aside>

     <section class="content-container">
       <div class="grid-content bg-purple-light">
         <el-col :span="24" class="breadcrumb-container">
           <strong class="title">{{$route.name}}</strong>
           <!-- 面包屑组件 -->
           <!-- <el-breadcrumb separator="/" class="breadcrumb-inner">
             <el-breadcrumb-item v-for="item in $route.matched" :key="item.path" :to="{path: item.path}">{{ item.name }}</el-breadcrumb-item>
           </el-breadcrumb> -->
           <!-- 标签组件 -->
          <el-tabs
            v-model="activeIndex"
            type="card"
            closable
            @tab-click="tabClick"
            v-if="options.length"
            @tab-remove="tabRemove">
            <el-tab-pane
              :key="item.name"
              v-for="(item, index) in options"
              :label="item.name"
              :name="item.route">
            </el-tab-pane>
          </el-tabs>
       
         </el-col>
         <el-col :span="24" class="content-wrapper">
           <transition name="fade" mode="out-in">
             <router-view></router-view>
           </transition>
         </el-col>
       </div>
     </section>
   </el-col>
 </el-row>
</div>
</template>

<script>
// import Sidebar from './sidebar'
export default {
  //   components: {Sidebar},
  data () {
    return {
      sysUserAvatar:
        'https://y.gtimg.cn/music/photo_new/T001R300x300M000002eEEYT4ACDdX.jpg',
      sysName: 'VueDemo',
      sysTitle: '玩开心农场吃有机蔬菜',
      sysUserName: 'admin',
      collapsed: false,
      menuList: [
        {
          name: '首页',
          pid: 0,
          id: 1,
          url: 'main',
          iconCls: 'fa fa-id-card-o'
        },
        {
          name: '用户中心',
          pid: 0,
          id: 2,
          url: 'UserCenter',
          iconCls: 'fa el-icon-service',
          childNode: [
            {
              name: '用户管理',
              pid: 2,
              id: 21,
              url: 'UserManage',
              iconCls: 'fa el-icon-document'
              // childNode: [
              //   {
              //     name: '实时监测1-1-1',
              //     pid: 21,
              //     id: 212,
              //     url: 'test11',
              //     iconCls: 'fa el-icon-bell'
              //   },
              //   {
              //     name: '实时监测1-1-2',
              //     pid: 21,
              //     id: 213,
              //     url: 'test12',
              //     iconCls: 'fa el-icon-mobile-phone'
              //   }
              // ]
            },
            {
              name: '用户设置',
              pid: 2,
              id: 22,
              url: 'UserOption',
              iconCls: 'fa el-icon-goods'
            }
          ]
        },
        {
          name: '订单中心',
          pid: 0,
          id: 3,
          url: 'OrderCenter',
          iconCls: 'fa el-icon-news',
          childNode: [
            {
              name: '订单管理',
              pid: 3,
              id: 31,
              iconCls: 'fa el-icon-message',
              url: 'OrderManage'
              // childNode: [
              //   {
              //     name: '巡查详情',
              //     pid: 31,
              //     id: 311,
              //     url: 'add11'
              //   },
              //   {
              //     name: '巡查统计',
              //     pid: 31,
              //     id: 312,
              //     url: 'add12'
              //   }
              // ]
            },
            {
              name: '订单详情',
              pid: 3,
              id: 32,
              iconCls: 'fa el-icon-edit',
              url: 'OrderDetail'

              //  childNode: []
            }
            // {
            //   name: '消控up',
            //   pid: 3,
            //   id: 33,
            //   url: 'up1'
            //   //  childNode: []
            // }
          ]
        },
        {
          name: '种植中心',
          pid: 0,
          id: 4,
          url: 'PlanCenter',
          iconCls: 'fa el-icon-time'
        },
        {
          name: '配送中心',
          pid: 0,
          id: 44,
          url: 'DistributionCenter',
          iconCls: 'fa el-icon-setting'
        },
        {
          name: '土地中心',
          pid: 0,
          id: 5,
          url: 'LandCenter',
          iconCls: 'fa el-icon-printer',
          childNode: [
            {
              name: '土地管理',
              pid: 5,
              id: 52,
              url: 'LandManage',
              iconCls: 'fa el-icon-sort'
            },
            {
              name: '土地详情',
              pid: 5,
              id: 51,
              url: 'LandDetail',
              iconCls: 'fa el-icon-document'
            }
          ]
        },
        {
          name: '消息中心',
          pid: 0,
          id: 6,
          url: 'MessageCenter',
          iconCls: 'fa el-icon-refresh'
        },
        {
          name: '角色管理',
          pid: 0,
          id: 7,
          url: 'RoleManager',
          iconCls: 'fa el-icon-info'
        },
        {
          name: '财务管理',
          pid: 0,
          id: 8,
          url: 'FinancialManager',
          iconCls: 'fa el-icon-warning'
        },
        {
          name: '蔬菜管理',
          pid: 0,
          id: 9,
          url: 'VegetableManager',
          iconCls: 'fa el-icon-document'
        }
      ]
    }
  },
  mounted () {
    var user = sessionStorage.getItem('user')
    if (user) {
      user = JSON.parse(user)
      this.sysUserName = user.username || ''
    }
  },
  methods: {
    // 折叠导航栏
    collapseFun: function () {
      this.collapsed = !this.collapsed
    },
    showMenu (i, status) {
      this.$refs.menuCollapsed.getElementsByClassName(
        'submenu-hook-' + i
      )[0].style.display = status ? 'block' : 'none'
    },
    // 退出登录
    logoutFun: function () {
      var _this = this
      this.$confirm('确认退出吗?', '提示', {
        // type: 'warning'
      })
        .then(() => {
          sessionStorage.removeItem('user')
          _this.$router.push('/login')
        })
        .catch(() => {})
    },
    // tab切换时，动态的切换路由
    tabClick (tab) {
      let path = this.activeIndex
      // 用户详情页的时候，对应了二级路由，需要拼接添加第二级路由
      // if (this.activeIndex === '/userInfo') {
      //   path = this.activeIndex + '/' + this.$store.state.userInfo.name
      // }
      this.$router.push({path: path})
    },
    tabRemove (targetName) {
      // 首页不可删除
      if (targetName === '/') {
        return
      }
      this.$store.commit('delete_tabs', targetName)
      if (this.activeIndex === targetName) {
        // 设置当前激活的路由
        if (this.options && this.options.length >= 1) {
          this.$store.commit('set_active_index', this.options[this.options.length - 1].route)
          this.$router.push({path: this.activeIndex})
        } else {
          this.$router.push({path: '/'})
        }
      }
    }
  },
  computed: {
    options () {
      return this.$store.state.options
    },
    activeIndex: {
      get () {
        return this.$store.state.activeIndex
      },
      set (val) {
        this.$store.commit('set_active_index', val)
      }
    }
  },
  watch: {
    '$route' (to) {
      let flag = false
      for (let option of this.options) {
        if (option.name === to.name) {
          flag = true
          this.$store.commit('set_active_index', '/' + to.path.split('/')[1])
          break
        }
      }
      if (!flag) {
        this.$store.commit('add_tabs', {route: '/' + to.path.split('/')[1], name: to.name})
        this.$store.commit('set_active_index', '/' + to.path.split('/')[1])
      }
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  .header {
    height: 60px;
    line-height: 60px;
    background: #bbdbfb;
    color: #fff;
    .usericon {
      width: 60px;
      height: 60px;
      // background-color: #475669
    }
    .userimg {
      width: 40px;
      height: 40px;
      border-radius: 20px;
      margin: 10px 0px 10px 10px;
      float: left;
    }

    .userinfo {
      text-align: center;
      padding-right: 35px;
      float: right;
      .userinfo-inner {
        cursor: pointer;
        color: #fff;
      }
    }
    .logo {
      height: 60px;
      font-size: 22px;
      padding-left: 20px;
      padding-right: 20px;
      border-color: rgba(238, 241, 146, 0.3);
      border-right-width: 1px;
      border-right-style: solid;
    }
    .logo-width {
      width: 230px;
    }
    .logo-collapse-width {
      width: 60px;
    }
    .tools {
      padding: 0 23px;
      width: 14px;
      height: 60px;
      line-height: 60px;
      cursor: pointer;
    }
  }
  .main {
    display: flex;
    position: absolute;
    top: 60px;
    bottom: 0;
    overflow: hidden;
    aside {
      flex: 0 0 230px;
      width: 230px;
      .el-menu {
        height: 100%;
      }
      .collapsed {
        width: 60px;
        .item {
          position: relative;
        }
        .submenu {
          position: absolute;
          top: 0;
          left: 60px;
          z-index: 99999;
          height: auto;
          display: none;
        }
      }
    }
    .menu-collapsed {
      flex: 0 0 60px;
      width: 60px;
    }
    .menu-expanded {
      flex: 0 0 230px;
      width: 230px;
    }
    .content-container {
      flex: 1;
      overflow-y: scroll;
      padding: 20px;
      .breadcrumb-container {
        .title {
          width: 200px;
          float: left;
          color: #475669;
        }
        .breadcrumb-inner {
          float: right;
        }
      }
      .content-wrapper {
        background-color: #fff;
        box-sizing: border-box;
      }
    }
  }
  .el-pagination {
    text-align: center;
  }
}
</style>
