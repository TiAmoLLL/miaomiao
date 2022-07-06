import Vue from 'vue'
import VueRouter from 'vue-router'
import MovieRouter from './movie'
import MineRouter from './mine'
import CinemaRouter from './cinema'
import ProtoRouter from './proto'
import VueJsonp from 'vue-jsonp'

Vue.use(VueRouter)
Vue.use(VueJsonp)

const routes = [
  MovieRouter,
  MineRouter,
  CinemaRouter,
  ProtoRouter,
  {
    path:'/*',
    redirect:'/movie'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
