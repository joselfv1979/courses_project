import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import UserDataService from '../service/UserDataService'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      allowAnon: true
    }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue'),
    meta: {
      allowAnon: true
    }
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login"),
    meta: {
      allowAnon: true
    }
  },
  {
    path: "/registration",
    name: "Registration",
    component: () => import("../views/Registration"),
    meta: {
      allowAnon: true
    }
  },
  {
    path: "/mycourses",
    name: "MyCourses",
    component: () => import("../views/MyCourses"),
    meta: {
      allowAnon: false
    }
  },
  {
    path: "/courses/:id",
    name: "UpdateCourse",
    component: () => import("../views/UpdateCourse"),
    meta: {
      allowAnon: false
    }
  },
  {
    path: "/courses-add",
    name: "AddCourse",
    component: () => import("../views/AddCourse"),
    meta: {
      allowAnon: false
    }
  },
  {
    path: "/users",
    name: "Users",
    component: () => import("../views/Users"),
    meta: {
      allowAnon: false
    }
  },
  {
    path: "/users/:id",
    name: "UserDetails",
    component: () => import("../views/UserDetails"),
    meta: {
      allowAnon: false
    }
  },
  {
    path: '*',
    name: 'Error',
    component: () => import("../views/Error")
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// FUNCIÓN DE COMPROBACIÓN DE RESTRICCIÓN DE RUTA Y AUTENTICACIÓN DE USUARIO

router.beforeEach((to, from, next) => {
  if (!to.meta.allowAnon && !UserDataService.isLoggedIn()) {
    next({
      path: '/login',
      params: { redirect: to.fullPath }
    })
  }
  else {
    next()
  }
})

export default router
