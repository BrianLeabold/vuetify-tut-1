import Vue from 'vue';
import VueRouter from 'vue-router';
import Dashboard from '../views/Dashboard.vue';
import Projects from '@/views/Projects';
import Project from '@/views/Project';
import NewProject from '@/views/NewProject';
import Team from '@/views/Team';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: Dashboard
  },
  {
    path: '/projects',
    name: 'projects',
    component: Projects
    // route level code-splitting
    // this generates a separate chunk (projects.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    //component: () => import(/* webpackChunkName: "projects", webpackPrefetch: true */ '../views/Projects.vue')
  },
  {
    path: '/project/:id',
    name: 'project',
    props: true,
    component: Project,
  },
  {
    path: '/projects/new',
    name: ' newProject',
    component: NewProject,
  },
  {
    path: '/team',
    name: 'team',
    component: Team
    //component: () => import(/* webpackChunkName: "team", webpackPrefetch: true */ '../views/Team.vue')
  },
  {
    path: '/todo',
    name: 'todos',
    component: () => import(/* webpackChunkName: "todos", webpackPrefetch: true */ '../views/Todos.vue')

  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login", webpackPrefetch: true */ '../views/User/Login.vue')

  },
  {
    path: '/logout',
    name: 'logout',
    component: () => import(/* webpackChunkName: "logout", webpackPrefetch: true */ '../views/User/Logout.vue')

  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "register", webpackPrefetch: true */ '../views/User/Register.vue')

  },
  {
    path: '/user/profile',
    name: 'profile',
    component: () => import(/* webpackChunkName: "profile", webpackPrefetch: true */ '../views/User/Profile.vue')

  },

];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
