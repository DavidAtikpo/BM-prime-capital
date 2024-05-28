// router/index.js
const { createRouter, createWebHistory } = require('vue-router');
const HomePage = require('@/views/HomePage.vue').default;
const Login = require('@/views/LoginView.vue').default;
const Register = require('@/views/RegisterView.vue').default;
const userDashboard = require('@/views/userDashboard.vue').default;
const adminDashboard = require('@/views/adminDashboard.vue').default;
const ChildPicture = require('@/components/uploadChildPictureComponent.vue').default;

const router = createRouter({
  history: createWebHistory('/'), // Remplacez `import.meta.env.BASE_URL` par '/'
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/login',
      name: 'LoginPage',
      component: Login,
    },
    {
      path: '/user/signup',
      name: 'Register',
      component: Register,
    },
    {
      path: '/user/:id',
      name: 'userDashboard',
      component: userDashboard,
    },
    {
      path: '/admin/:id',
      name: 'adminDashboard',
      component: adminDashboard,
    },
    {
      path: '/admin/childPicture/:id',
      name: 'ChildPicture',
      component: ChildPicture,
    },
  ],
});

module.exports = router;
