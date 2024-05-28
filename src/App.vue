<template>

  <RouterView />
  <RouterLink/>

</template>


<style>
/* Add your CSS styles here */
@import url('https://fonts.googleapis.com/css?family=Roboto+Condensed');
* {
font-family: 'Roboto', sans-serif;
margin: 0;
padding: 0;
}
</style>

<!-- <template>
  <div id="app">
    <AdminDashNavbar v-if="isAdminLoggedIn" :notifications="adminNotifications" />
    <UserDashNavbar v-else :notifications="userNotifications" />
    <router-view />
  </div>
</template> -->

<!-- <script>
import { io } from 'socket.io-client';
import AdminDashNavbar from './components/admin/AdminDashNavbarComponent.vue';
import UserDashNavbar from './components/user/UserDashNavbarComponent.vue';

export default {
  name: 'App',
  components: {
    AdminDashNavbar,
    UserDashNavbar,
  },
  data() {
    return {
      adminNotifications: [],
      userNotifications: [],
      isAdminLoggedIn: false, // Vous pouvez définir cela en fonction de la logique de votre application
    };
  },
  created() {
    this.setupSocket();
    this.checkUserRole(); // Vérifiez le rôle de l'utilisateur et définissez isAdminLoggedIn en conséquence
  },
  methods: {
    setupSocket() {
      const socket = io('http://192.168.1.211:8000'); // Remplacez par l'URL de votre backend

      socket.on('notification', (notification) => {
        if (notification.role === 'admin') {
          this.adminNotifications.push(notification);
        } else if (notification.role === 'user') {
          this.userNotifications.push(notification);
        }
      });
    },
    checkUserRole() {
      // Logique pour vérifier le rôle de l'utilisateur
      // Par exemple, vous pourriez vérifier un token ou faire une requête à votre backend
      // Exemple:
      const userRole = localStorage.getItem('userRole'); // suppose que le rôle est stocké dans le localStorage
      this.isAdminLoggedIn = (userRole === 'admin');
    }
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto+Condensed');
* {
  font-family: 'Roboto', sans-serif;
  margin: 0;
  padding: 0;
}
</style> -->

