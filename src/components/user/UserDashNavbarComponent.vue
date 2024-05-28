<template>
  <nav class="navigation">
    <!-- Bouton "Plus" pour les éléments de navigation -->
    <button class="menu-btn" @click="toggleMenu">Plus</button>

    <!-- Liste des éléments de navigation -->
    <ul :class="{ 'show-menu': isMenuOpen }">
      <li>
        <router-link to="/user/analytics" class="nav-link" active-class="active">Dashboard</router-link>
      </li>
      <li>
        <router-link to="/user/suivi" class="nav-link" active-class="active">Objectif</router-link>
      </li>
      <li>
        <router-link to="/user/rapport" class="nav-link" active-class="active">Rapport</router-link>
      </li>
      <li>
        <router-link to="/user/ActiviteHebdomadaire" class="nav-link" active-class="active">Objectifs Heb</router-link>
      </li>
      <li>
        <router-link to="/user/inscription" class="nav-link" active-class="active">Inscription</router-link>
      </li>
      <li>
        <router-link to="/user/listOfchildren" class="nav-link" active-class="active">Presents</router-link>
      </li>
      <li>
        <router-link to="/user/Absent" class="nav-link" active-class="active">Absents</router-link>
      </li>
    </ul>

    <div class="search-container">
      <div class="search">
        <input type="text" v-model="searchQuery" @input="search" placeholder="Rechercher...">
        <ul v-if="searchResults.length > 0" class="dropdown">
          <li v-for="(result, index) in searchResults" :key="index" @click="displayResult(result)">{{ result }}</li>
        </ul>
        <p v-if="searchQuery.length > 0 && searchResults.length === 0" class="dropdown">Aucun résultat trouvé.</p>
      </div>
    </div>

    <div class="icons">
      <div class="notification-wrapper" @click="toggleNotificationDropdown">
        <img src="@/assets/icons/new-message-icon.svg" alt="Notification" class="notification-icon">
        <span :class="{'notification-count': true, 'few-notifications': notifications.length <= 2}">
          {{ notifications.length }}
        </span>
      </div>
      <div v-if="isNotificationDropdownOpen" class="dropdown">
        <ul>
          <li v-if="notifications.length === 0">Aucune notification</li>
          <li v-for="(notification, index) in notifications" :key="index">{{ notification.user }},{{ notification.entry }}</li>
        </ul>
      </div>
      <img :src="profilePhotoURL" @click="toggleProfileDropdown" alt="Profile Icon" class="profile-icon">
      <div v-if="isProfileDropdownOpen" class="dropdown">
        <ul>
          <li>
            <router-link to="/user/userInfo">Éditer photo</router-link>
          </li>
          <li>
            <router-link to="/user/gererCount">Gérer le compte</router-link>
          </li>
          <li>
            <router-link to="/user/Parametre">Paramètres</router-link>
          </li>
        </ul>
        <div @click="confirmLogout">Déconnexion</div>
      </div>
    </div>
  </nav>
  <div class="side-bar">
  <div><Sidebar v-if="isMenuOpen" class="accordion-menu" /></div>
    <div class="content">
      <!-- <div class="logo">
        <img class="logo-rr" src="@/assets/images/O1fwRfHZHUkuh80hZOZnugDg84F1686830307718_200x200.png" alt="CDE koinonia" />
      </div> -->
      <div class="side-buttons">
        <!-- <router-link to="/user/analytics" active-class="active" exact-active-class="exact-active" class="default-link">
          <div class="nav">Dashboard</div>
        </router-link> -->
        <router-link to="/user/review" active-class="active" exact-active-class="exact-active" class="default-link">
          <div class="nav">Review</div>
        </router-link>
        <router-link to="/user/feedback" active-class="active" exact-active-class="exact-active" class="default-link">
          <div class="nav">Feedback</div>
        </router-link>
        <router-link to="/user/Message" active-class="active" exact-active-class="exact-active" class="default-link">
          <div class="nav">Message</div>
        </router-link>
        <router-link to="/user/statistic" active-class="active" exact-active-class="exact-active" class="default-link">
          <div class="nav">Statistique</div>
        </router-link>
        <router-link to="/user/setting" active-class="active" exact-active-class="exact-active" class="default-link">
          <div class="nav">Paramettre</div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from './UserDashSidebarComponent.vue';
import { notificationsMixin } from '@/mixins/notificationMixins';
import axios from 'axios';
import { API_BASE_URL } from '@/config.js';

export default {
  components: {
    Sidebar
  },
  mixins: [notificationsMixin],
  data() {
    return {
      isMenuOpen: false,
      searchQuery: '',
      searchResults: [],
      isNotificationDropdownOpen: false,
      isProfileDropdownOpen: false,
      profilePhotoURL: '',
    };
  },
  mounted() {
    this.fetchProfilePicture();
    document.addEventListener('click', this.handleClickOutside);
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside);
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    toggleNotificationDropdown() {
      this.isNotificationDropdownOpen = !this.isNotificationDropdownOpen;
    },
    toggleProfileDropdown() {
      this.isProfileDropdownOpen = !this.isProfileDropdownOpen;
    },
    fetchProfilePicture() {
      const token = localStorage.getItem('token');
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      };

      axios.get(`${API_BASE_URL}/admin/getprofil`, { headers })
        .then(res => {
          this.profilePhotoURL = res.data.profilePhotoUrl;
        })
        .catch(error => {
          console.error('Error fetching profile picture:', error);
        });
    },
    search() {
      this.searchResults = [];
      if (this.searchQuery.length === 0) {
        return;
      }
      axios.get(`${API_BASE_URL}/search?q=` + this.searchQuery)
        .then(response => {
          this.searchResults = response.data;
        })
        .catch(error => {
          console.error('Error fetching search results:', error);
        });
    },
    displayResult(result) {
      console.log('Informations sur le résultat sélectionné:', result);
    },
    async logout() {
      try {
        await axios.post(`${API_BASE_URL}/user/logout`, {}, { withCredentials: true });
        localStorage.removeItem('authToken');
        sessionStorage.removeItem('authToken');
        this.$router.push('/login');
      } catch (error) {
        console.error('Error during logout:', error);
      }
    },
    confirmLogout() {
      if (confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
        this.logout();
      }
    },
    handleClickOutside(event) {
      const notificationWrapper = this.$refs.notificationWrapper;
      const profileIcon = this.$refs.profileIcon;
      const clickedOutsideNotification = notificationWrapper && !notificationWrapper.contains(event.target);
      const clickedOutsideProfile = profileIcon && !profileIcon.contains(event.target);

      if (clickedOutsideNotification && this.isNotificationDropdownOpen) {
        this.isNotificationDropdownOpen = false;
      }

      if (clickedOutsideProfile && this.isProfileDropdownOpen) {
        this.isProfileDropdownOpen = false;
      }
    },
    shouldReceiveNotification(notification) {
      return notification.role !== 'Coordinateur';
    }
  }
};
</script>


<style scoped>
.navigation {
  width: 100%;
  height: 1rem;
  background-color: #08083b;
  padding: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.icons {
  display: flex;
  align-items: center;
}

.notification-icon {
  width: 30px;
  height: 30px;
  margin-right: 10px;
}

.notification-wrapper {
  position: relative;
}

.notification-count {
  position: absolute;
  top: -10px;
  right: -10px;
  background-color: grey;
  color: white;
  border-radius: 50%;
  padding: 5px;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
}

.few-notifications {
  background-color: red;
}

.profile-icon {
  width: 30px;
  height: 30px;
  margin-right: 10px;
  border-radius: 50%;
}

.menu-btn {
  display: none; /* Masquer le bouton "Plus" par défaut */
  margin-left: 55%;
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

li {
  display: inline;
  margin-right: 20px;
}

.nav-link {
  color: white;
  text-decoration: none;
  font-size: 20px;
  padding-right: 40px;
}

.active {
  font-weight: bold;
}

/* Media query pour afficher le bouton "Plus" lorsque l'écran est réduit */
@media (max-width: 600px) {
  .menu-btn {
    display: block;
    margin-left: 0px;
  }
  ul {
    display: none;
  }
  .show-menu {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 50px;
    background-color: #08083b;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    text-align: center;
    z-index: 1;
    width: 100%;
  }
}

.search-container {
  max-width: 500px;
  margin: auto;
}

input[type="text"] {
  width: 100%;
  padding: 1px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.dropdown {
  position: absolute;
  top: 50px;
  right: 0;
  background-color: #f9f9f9;
  width: 20%;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  z-index: 1;
  text-align: center;
  border-radius: 5%;
}

.dropdown ul {
  margin-top: 20%;
}

.dropdown li {
  padding: 10px;
  cursor: pointer;
  display: flex;
}

.dropdown li:hover {
  background-color: #ddd;
}

@media screen and (max-width: 768px) {
  .dropdown {
    display: block;
  }
}

.accordion-menu {
  position: absolute;
  top: 70px;
  left: 0;
  width: 200px;
  background-color: #08083b;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  z-index: 1;
  padding: 20px;
  border-radius: 5px;
}
/* seconde  nav bar  */

.side-bar {
  margin-top: 20px;
  margin-left: 30px;
  width: 100%;
  height: 4rem;
  background-color: #ccc;
}

.logo {
  margin-left: 10px;
  /* text-align: center; */
  /* margin-bottom: 20px; */
}

.logo-rr {
  width: 100px;
  height: auto;
}

.side-buttons {
  display: flex;
  /* flex-direction: column; */
}

.nav {
  padding: 20px;
  cursor: pointer;
  margin-left: 30px;
  color: rgb(12, 11, 11);
  font-size: 20px;

}

.default-link {
  text-decoration: none;
  color: inherit;
}

.active {
  font-weight: bold;
}
.content{
  text-align: justify;
}

</style>
