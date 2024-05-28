<template>
  <div :class="[theme, 'page']">
    <div class="container">
      <h1>Paramètres</h1>
      <div class="button-group">
        <button @click="changeTheme('dark')">Thème Sombre</button>
        <button @click="changeTheme('light')">Thème Clair</button>
      </div>
      <div class="button-group">
        <button @click="changeLanguage('fr')">Changer en Français</button>
        <button @click="changeLanguage('en')">Switch to English</button>
      </div>
    </div>
  </div>
</template>


<script>
import { mapActions, mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['theme'])
  },
  methods: {
    ...mapActions(['setTheme', 'setLanguage']),
    changeTheme(theme) {
      this.setTheme(theme);
    },
    changeLanguage(language) {
      this.setLanguage(language);
    }
  }
};
</script>


<style scoped>
.page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  transition: background-color 0.3s, color 0.3s;
}

.container {
  text-align: center;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s, color 0.3s;
}

.button-group {
  margin-top: 20px;
}

button {
  padding: 10px 20px;
  margin: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s, color 0.3s;
}

button:hover {
  background-color: rgba(0, 0, 0, 0.1);
}

.dark.page {
  background-color: #333;
  color: #fff;
}

.light.page {
  background-color: #fff;
  color: #333;
}

.dark .container {
  background-color: #444;
  color: #fff;
}

.light .container {
  background-color: #f9f9f9;
  color: #333;
}

.dark button {
  background-color: #555;
  color: #fff;
}

.light button {
  background-color: #ddd;
  color: #333;
}

.dark button:hover {
  background-color: #666;
}

.light button:hover {
  background-color: #ccc;
}
</style>

