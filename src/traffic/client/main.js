import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store/store.js'

const a = r => require.ensure([], () => r(require('./pages/a.vue')), 'a')
const b = r => require.ensure([], () => r(require('./pages/b.vue')), 'b')
const c = r => require.ensure([], () => r(require('./pages/c.vue')), 'c')

// import Index from './page/index'
// import About from './page/about'
// import List from './page/list'

Vue.use(VueRouter)

const routes = [{
    path: '/a',
    component: a
}, {
    path: '/b',
    component: b
}, {
    path: '/c',
    component: c
}]

const router = new VueRouter({
    routes // （缩写）相当于 routes: routes
})

router.afterEach(route => {
    store.dispatch('increment')
})

const app = new Vue({
    store,
    router
}).$mount('#vue-box')
