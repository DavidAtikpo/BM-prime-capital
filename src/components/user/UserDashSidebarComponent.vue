<template>
  <div class="side-bar">
    <div class="content">
      <div class="logo">
        <img class="logo-rr" src="@/assets/images/bm_prime_capital_llc_logo.jpeg" alt="CDE koinonia" />
      </div>
      <div class="side-buttons">
        <router-link to="/user/analytics" active-class="active" exact-active-class="exact-active" class="default-link">
          <div class="nav">Dashboard</div>
        </router-link>
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
export default {
  data() {
    return {
      isMenuOpen: false
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    }
  }
};
</script>

<style scoped>
.side-bar {
  width: 200px;
  background-color: #08083b;
  color: white;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  padding: 20px;
}

.logo {
  text-align: center;
  margin-bottom: 20px;
}

.logo-rr {
  width: 100px;
  height: auto;
}

.side-buttons {
  display: flex;
  flex-direction: column;
}

.nav {
  padding: 10px;
  cursor: pointer;
  margin-bottom: 10px;
  color: white;
}

.default-link {
  text-decoration: none;
  color: inherit;
}

.active {
  font-weight: bold;
}
</style>
