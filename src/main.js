// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import VueFire from 'vuefire'
import VueRouter from 'vue-router'
import App from './App'
import Login from './components/Login'
import CreateAccount from './components/CreateAccount'
import Profile from './components/Profile'

Vue.use(Vuex)
Vue.use(VueFire)
Vue.use(VueRouter)

const router = new VueRouter({
  mode: "history",
  base: __dirname,
  routes: [
    {path: "/", component: App},
    {path: "/login", component: Login},
    {path: "/create-account", component: CreateAccount},
    {path: "/profile/:id", name:'user', component: Profile}

  ]
});
export default router;

new Vue({
  router,
  template: `
    <div id="app">
      <router-view></router-view>
    </div>
  `
}).$mount('#app')

/* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   template: '<App/>',
//   components: { App }
// })
