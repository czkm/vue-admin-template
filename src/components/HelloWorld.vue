 <!-- eslint-disable -->
<template lang="html">
<!-- <div class="home-container"> -->
  <el-row class="container">
    <el-col :span="24" class="header">
            <el-col :span="10" class="logo" :class="collapsed?'logo-collapse-width':'logo-width'">{{collapsed?'':sysName}}</el-col>
            <el-col :span="5">
        <div class="tools" @click.prevent="collapseFun">
          <i v-if="collapsed" class="fa el-icon-caret-right"></i>
           <i v-else class="fa el-icon-caret-left"></i>
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
                        <el-dropdown-item @click.native="useroption()">设置</el-dropdown-item>
                        <el-dropdown-item divided @click.native="logout()">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-col>
        </el-col>
  <!-- <Sidebar :menuList="menuList"/> -->

    <el-col :span="24" class="main">
   <aside :class="collapsed?'menu-collapsed':'menu-expanded'" class="el-col-6">

        <!--左侧导航菜单-->

       <el-menu  class="el-menu-vertical-demo" :collapse="collapsed" :unique-opened ="true" :router ="true" >
           <el-menu-item :index="'/'+child1.location" v-for="child1 in menuList" :key="child1.id" v-if="!child1.children">
                <i :class="child1.iconCls" style="font-size: 16px;"></i>
                <span slot="title">{{child1.title}}</span>
            </el-menu-item>
                <!-- 1级菜单 -有子节点-->
            <el-submenu :index="'/'+child1.location" v-for="child1 in menuList" :key="child1.id" v-if="child1.children">

                <!-- 2级菜单 无子节点-->
                <el-menu-item :index="'/'+child2.location" v-for="child2 in child1.children" :key="child2.id" v-if="!child2.children" class="menuTwo"><i :class="child2.iconCls"></i>
                {{child2.title}}
                </el-menu-item>
                    <template slot="title" v-if="child1.children">
                        <i :class="child1.iconCls"></i>
                        <span slot="title">{{child1.title}}</span>
                    </template>

            <!-- 判断二级 有子节点  eslint-disable -->
                <el-submenu :index="'/'+child2.location" v-for="child2 in child1.children" :key="child2.id" v-if="child2.children" class="menuTwo">
                        <template slot="title">
  <i :class="child2.iconCls"></i>
  <!-- <span slot="title">{{child2.title}}</span> -->
</template>
                <!-- 三级菜单     -->
                    <el-menu-item-group class="menuThree">
                        <el-menu-item :index="'/'+child3.location" v-for="child3 in child2.children" :key="child3.id" v-if="!child3.children"  style="font-size: 16px"><i :class="child3.iconCls">{{child3.title}}</i></el-menu-item>
                    </el-menu-item-group>
            </el-submenu>
        </el-submenu>
       </el-menu>
       
     </aside>

     <section class="content-container">
       <div class="grid-content bg-purple-light">
         <el-col :span="24" class="breadcrumb-container">
           <!-- <strong class="title">{{$route.name}}</strong> -->
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
           <!-- 用户设置操作dialog -->
          <el-dialog
            title="用户信息"
            :visible.sync="Editdiolog"
            width="30%"
            center>
              <el-form :model="optionform">
            <el-form-item label="用户头像">
              <div style = "text-align:center">
              <img class="formuserimg" :src="this.sysUserAvatar" />
              <el-button type="primary" @click="Changeimg()">上传头像</el-button>
              </div>
              
            </el-form-item>
            <el-form-item label="用户名" :label-width="formLabelWidth">
              <el-input v-model="optionform.username"></el-input>
            </el-form-item>
             <el-form-item label="邮箱" :label-width="formLabelWidth">
              <el-input v-model="optionform.useremail"></el-input>
            </el-form-item>
              <el-form-item label="旧密码" :label-width="formLabelWidth">
              <el-input v-model="optionform.oldpassw"></el-input>
            </el-form-item>
             <el-form-item label="新密码" :label-width="formLabelWidth">
              <el-input v-model="optionform.passw"></el-input>
            </el-form-item>
             <el-form-item label="确认密码" :label-width="formLabelWidth">
              <el-input v-model="optionform.confirmpassw"></el-input>
            </el-form-item>
<!-- 
            <el-form-item label="内容":label-width="formLabelWidth">
              <el-input type="textarea" v-model="optionform.content"></el-input>
            </el-form-item> -->
            <el-form-item>
              <el-button type="primary" @click="Changeoption()">提交修改</el-button>
              <el-button  @click="Editdiolog = false">取消</el-button>
            </el-form-item>
          </el-form>
              <!-- <el-button @click="Editdiolog = false">取 消</el-button>
              <el-button type="primary" @click="Editdiolog = false">确 定</el-button> -->
          
          </el-dialog>
          <!-- ----------------------- -->
         </el-col>
       </div>
     </section>
   </el-col>
 </el-row>
</div>

</template>

<script>
// import Sidebar form './sidebar'
export default {
  //   components: {Sidebar},
  data () {
    return {
      sysUserAvatar:
        'https://y.gtimg.cn/music/photo_new/T001R300x300M000002eEEYT4ACDdX.jpg',
      sysName: '五蕴神农',
      QueryUrl: this.$store.state.BaseUrl,
      sysTitle: '玩开心农场吃有机蔬菜',
      sysUserName: 'admin', // 用户名
      collapsed: false,
      rootArry: this.$store.state.rootArry,
      Editdiolog: false, // 编辑框
      formLabelWidth: '80px',
      optionform: {
        userimg: '',
        username: '',
        useremail: '0',
        oldpassw: '',
        passw: '',
        confirmpassw: ''
      },
      menuList: [
        {
          title: '首页',
          pid: 0,
          id: 1,
          location: 'main',
          iconCls: 'fa fa-id-card-o'
        },
        {
          title: 'app用户管理',
          pid: 0,
          id: 10,
          location: 'AppUsermanage',
          iconCls: 'fa fa-id-card-o'
        },
        {
          title: '用户中心',
          pid: 0,
          id: 2,
          location: 'UserCenter',
          iconCls: 'fa el-icon-service',
          children: [
            {
              title: '用户管理',
              pid: 2,
              id: 21,
              location: 'UserManage',
              iconCls: 'fa el-icon-document'
              // children: [
              //   {
              //     title: '实时监测1-1-1',
              //     pid: 21,
              //     id: 212,
              //     location: 'test11',
              //     iconCls: 'fa el-icon-bell'
              //   },
              //   {
              //     title: '实时监测1-1-2',
              //     pid: 21,
              //     id: 213,
              //     location: 'test12',
              //     iconCls: 'fa el-icon-mobile-phone'
              //   }
              // ]
            },
            {
              title: '用户设置',
              pid: 2,
              id: 22,
              location: 'UserOption',
              iconCls: 'fa el-icon-goods'
            }
          ]
        },
        {
          title: '订单中心',
          pid: 0,
          id: 3,
          location: 'OrderCenter',
          iconCls: 'fa el-icon-news',
          children: [
            {
              title: '订单管理',
              pid: 3,
              id: 31,
              iconCls: 'fa el-icon-message',
              location: 'OrderManage'
              // children: [
              //   {
              //     title: '巡查详情',
              //     pid: 31,
              //     id: 311,
              //     location: 'add11'
              //   },
              //   {
              //     title: '巡查统计',
              //     pid: 31,
              //     id: 312,
              //     location: 'add12'
              //   }
              // ]
            },
            {
              title: '订单详情',
              pid: 3,
              id: 32,
              iconCls: 'fa el-icon-edit',
              location: 'OrderDetail'

              //  children: []
            }
            // {
            //   title: '消控up',
            //   pid: 3,
            //   id: 33,
            //   location: 'up1'
            //   //  children: []
            // }
          ]
        },
        {
          title: '种植中心',
          pid: 0,
          id: 4,
          location: 'PlanCenter',
          iconCls: 'fa el-icon-time'
        },
        {
          title: '配送中心',
          pid: 0,
          id: 44,
          location: 'DistributionCenter',
          iconCls: 'fa el-icon-setting'
        },
        {
          title: '土地中心',
          pid: 0,
          id: 5,
          location: 'LandCenter',
          iconCls: 'fa el-icon-printer',
          children: [
            {
              title: '土地管理',
              pid: 5,
              id: 52,
              location: 'LandManage',
              iconCls: 'fa el-icon-sort'
            },
            {
              title: '土地规划',
              pid: 5,
              id: 51,
              location: 'LandDetail',
              iconCls: 'fa el-icon-document'
            }
          ]
        },
        {
          title: '消息中心',
          pid: 0,
          id: 6,
          location: 'MessageManage',
          iconCls: 'fa el-icon-refresh',
          children: [
            {
              title: '消息管理',
              pid: 6,
              id: 61,
              location: 'MessageCenter',
              iconCls: 'fa el-icon-sort'
            },
            {
              title: '轮播管理',
              pid: 6,
              id: 62,
              location: 'SliderManage',
              iconCls: 'fa el-icon-document'
            }
          ]
        },
        {
          title: '角色管理',
          pid: 0,
          id: 7,
          location: 'RoleManage',
          iconCls: 'fa el-icon-info'
        },
        {
          title: '财务管理',
          pid: 0,
          id: 8,
          location: 'FinancialManage',
          iconCls: 'fa el-icon-warning'
        },
        {
          title: '蔬菜中心',
          pid: 0,
          id: 9,
          location: 'VegetableCenter',
          iconCls: 'fa el-icon-refresh',
          children: [
            {
              title: '蔬菜管理',

              location: 'VegetableManage',
              iconCls: 'fa el-icon-document'
            },
            {
              title: '蔬菜略缩图',

              location: 'VegetableMiniatures',
              iconCls: 'fa el-icon-circle-plus'
            },
            {
              title: '蔬菜统计',

              location: 'VegetableCount',
              iconCls: 'fa el-icon-document'
            },
            {
              title: '心愿蔬菜',

              location: 'VegetableWish',
              iconCls: 'fa el-icon-circle-plus'
            }
          ]
        }
      ]
      // menuList: [
      //   {
      //     title: '首页',

      //     location: 'main',
      //     iconCls: 'fa fa-id-card-o'
      //   },
      //   {
      //     title: 'app用户管理',

      //     location: 'AppUsermanage',
      //     iconCls: 'fa fa-id-card-o'
      //   },
      //   {
      //     title: '用户中心',

      //     location: 'UserCenter',
      //     iconCls: 'fa el-icon-service',
      //     children: [
      //       {
      //         title: '用户管理',

      //         location: 'UserManage',
      //         iconCls: 'fa el-icon-document'
      //       }]
      //   }
      // ]
    }
  },
  mounted () {
    let userneme = this.getCookie('sjhm')
    if (userneme) {
      this.sysUserName = userneme || ''
    }
    this.optionMeun()
  },
  methods: {
    // 配置菜单
    optionMeun () {
      // 判断菜单是否有值
      if (this.rootArry.length) {
        console.log('菜单有值')
        this.menuList = this.rootArry
      } else {
        console.log('无值')
      }
    },
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
    logout: function () {
      let _this = this
      this.$Haxios(
        this.QueryUrl + '/admin/logout',
        {},
        null,
        this.getCookie('token')
      )

        .then(res => {
          console.log(res)
          _this.msgalert(res)
          if (res.data.code === 200) {
            _this.$router.push('/login')
          }
        })
        .catch(e => {
          console.log(e)
        })
    },
    // tab切换时，动态的切换路由
    tabClick (tab) {
      let path = this.activeIndex
      // 用户详情页的时候，对应了二级路由，需要拼接添加第二级路由
      // if (this.activeIndex === '/userInfo') {
      //   path = this.activeIndex + '/' + this.$store.state.userInfo.name
      // }
      this.$router.push({ path: path })
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
          this.$store.commit(
            'set_active_index',
            this.options[this.options.length - 1].route
          )
          this.$router.push({ path: this.activeIndex })
        } else {
          this.$router.push({ path: '/' })
        }
      }
    },
    // 打开用户设置
    useroption () {
      this.Editdiolog = true
    },
    // 用户头像上传
    Changeimg () {

    },
    // 提交用户更改信息
    Changeoption () {

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
    $route (to) {
      let flag = false
      for (let option of this.options) {
        if (option.name === to.name) {
          flag = true
          this.$store.commit('set_active_index', '/' + to.path.split('/')[1])
          break
        }
      }
      if (!flag) {
        this.$store.commit('add_tabs', {
          route: '/' + to.path.split('/')[1],
          name: to.name
        })
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
    .formuserimg {
      width: 100px;
      height: 100px;
      border-radius: 100px;

      margin: 0 auto
    }
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
