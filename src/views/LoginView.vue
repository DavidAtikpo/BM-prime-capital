<template>
  <div class="overall">
    <div class="login-pic-container" :class="{ blurred: popupVisible }">
      <img class="login-pic" src="@/assets/images/Screenshot from 2024-05-22 16-41-35.png" alt="login-picture" />
    </div>
    <div class="login-container" :class="{ blurred: popupVisible }">
      <div>
        <a href="http://localhost:8080/">
          <img class="login-logo" src="@/assets/images/bm_prime_capital_llc_logo.jpeg" alt="logo" />
        </a>
      </div>
      <h2 class="login-title">Connectez ici</h2>
      <div class="login-user">
        <img class="user-logo" src="" alt="" />
      </div>
      <form class="login-form" @submit.prevent="handleLogin">
        <input
          v-model="loginData.email"
          class="form-input"
          type="email"
          name="email"
          placeholder="Email"
          @input="clearError"
          required
        />
        <div class="password-container">
          <input
            id="password"
            class="form-input inner-pswd"
            :type="showPassword ? 'text' : 'password'"
            name="password"
            v-model="loginData.password"
            placeholder="Password"
            :class="{ 'is-invalid': errorMessage }"
            @input="clearError"
            required
          />
          <i
            class="toggle-password-icon"
            :class="{ 'fas fa-eye-slash': !showPassword, 'fas fa-eye': showPassword }"
            @click="togglePasswordVisibility"
          >
          </i>
        </div>
        <span class="error" v-if="errorMessage">{{ errorMessage }}</span>
        <div>
          <a class="forgot" @click="gotToForgot">Mot de passe oublié?</a>
        </div>

        <button class="form-button" type="submit" @click="handleLogin" :disabled="loading">
          <i v-if="loading" class="fas fa-circle-notch fa-spin"></i>
          <span v-else>Connecte</span>
        </button>
        <div class="login-p">
          Vous n'avez pas de compte?
          <a @click="goToRegister" class="sign-up-link" href="#">Inscription</a>
        </div>
      </form>
    </div>
    <div class="popup" id="popup">
      <img class="check" src="@/assets/images/check.png" />
      <h2>Login was successful</h2>
      <button @click="closePopup" type="button">OK</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { API_BASE_URL } from '@/config';
export default {
  data() {
    return {
      loading: false,
      showPassword: false,
      popupVisible: false,
      loginData: {
        email: '',
        password: ''
      },
      errorMessage: ''
    }
  },
  methods: {
    gotToForgot() {
      this.$router.push('/forgot-password')
    },
    goToRegister() {
      this.$router.push('/user/signup')
    },
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword
    },
    handleLogin() {
      this.loading = true;
      axios.post(`${API_BASE_URL}/user/login`, this.loginData, { withCredentials: true })
        .then((res) => {
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('user', res.data.firstName);
          if (res.status == 200) {
            this.popupVisible = true; // Afficher la popup après une connexion réussie
            if (res.data.role === 'Coordinateur') {
              this.$router.push(`/admin/adminDashboard`);
            } else {
              this.$router.push(`/user/suivi`);
            }
          }
        })
        .catch((error) => {
          console.log('Error submitting login:', error);
          this.errorMessage = error.response.data.message;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    clearError() {
      this.errorMessage = ''
    },
    closePopup() {
      this.popupVisible = false; // Fermer la popup lorsque l'utilisateur clique sur OK
      this.$router.push('/student/analytics'); // Rediriger l'utilisateur (à adapter selon votre logique)
    }
  }
}
</script>

<style scoped>
.overall {
  display: flex;
  padding: 0;
  margin: 0;
  gap: 2em;
  height: 100vh;
}
.blurred {
  filter: blur(5px); /* ajustez la quantité de flou si nécessaire */
}

.login-pic-container {
  display: flex;
  background: black;
  position: relative;
  align-items: center;
  justify-content: center;
  width: 56em;
  overflow: hidden; 
}
.login-pic {
  object-fit: cover;
  width: 100%;
  height: 100vh;
  transition: transform 1.5s ease;
}
.login-pic:hover {
  transform: scale(1.1) rotate(5deg); /* Agrandir légèrement et faire pivoter l'image */
}

@keyframes move {
  0% {
    transform: translateX(0); /* Pas de mouvement initial */
  }
  50% {
    transform: translateX(50px); /* Mouvement vers la droite */
  }
  100% {
    transform: translateX(0); /* Retour à la position initiale */
  }
}

.login-pic.animated {
  animation: move 2s infinite; /* Exécutez l'animation indéfiniment */
}

.login-intro {
  position: absolute;
  color: white;
  font-size: 3.5rem;
}

.login-title {
  color: #1f2bd3;
  font-size: 2.25rem;
  padding-top: 0.625rem;
}

.login-logo {
  padding-top: 1rem;
  width: 100px;
}

.login-user {
  padding-top: 0.313rem;
  font-size: 1.5rem;
  font-weight: 700;
  padding-bottom: 3.125rem;
}

.login-container {
  text-align: center;
  height: 100vh;
  width: 34rem;
}

.login-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.25rem;
  width: 100%;
}

.form-input {
  width: 26rem;
  height: 2.844rem;
  padding-left: 0.5em;
  border: 1px solid #ccc;
  border-radius: 0.25em;
}
.is-invalid {
  border: 2px solid red;
}

.error {
  display: block;
  font-size: 1rem;
  margin-top: 1px;
  color: red;
}

@keyframes error-shake {
  0% {
    transform: translateX(-10px);
  }
  20% {
    transform: translateX(8px);
  }
  40% {
    transform: translateX(-6px);
  }
  60% {
    transform: translateX(4px);
  }
  80% {
    transform: translateX(-2px);
  }
  100% {
    transform: translateX(0);
  }
}

.inner-pswd {
  border: none;
  display: inline-block;
  width: 26rem;
}

.inner-pswd:active, .inner-pswd:invalid {
  border: none;
}

.password-container {
  display: flex;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  position: relative;
}

.password-container:invalid {
  border: 2px solid red;
}

.toggle-password-icon {
  border: none;
  position: absolute;
  right: 0.375rem;
  top: 0.875rem;
  cursor: pointer;
}

.form-button {
  width: 26rem;
  height: 3rem;
  border: none;
  background-color: #1f2bd3;
  border-radius: 0.25em;
  cursor: pointer;
  color: white;
  font-weight: bold;
}

.form-button:hover {
  background-color: #06d73a;
}

.fa-spinner {
  font-size: 25px;
}

.login-p {
  color: grey;
  font-size: 14px;
}

.forgot {
  color: black;
  text-decoration: none;
  font-size: 1rem;
  display: block;
  margin-bottom: 0;
}

.forgot:hover {
  color: red;
  cursor: pointer;
}

.sign-up-link {
  color: #1f2bd3;
  font-weight: 900;
  font-size: 1rem;
  text-decoration: underline;
}

.sign-up-link:hover {
  color: #06d73a;
}

/* Vue Mobile */
@media only screen and (max-width: 600px) {
  .overall {
    display: flex;
    justify-content: center;
    height: 100vh;
  }
  .login-pic-container {
    display: none;
  }
  .login-logo {
    padding-top: 0;
    margin-bottom: 4rem;
    width: 100px;
  }
  .login-container {
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
    justify-content: center;
    margin-top: 0%;
  }
  .form-input {
    width: 20rem;
    height: 2rem;
  }
  .form-button {
    width: 20rem;
    height: 2rem;
  }
  .login-title {
    font-size: 1.5rem;
  }
  .user-logo {
    width: 3rem;
  }
  .toggle-password-icon {
    top: 0.6rem;
  }
}

.check {
  width: 100px;
  margin-top: -50px;
  border-radius: 50%;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.popup {
  width: 400px;
  background: #fff;
  border-radius: 6px;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -50%) scale(0.1);
  text-align: center;
  padding: 0 30px 30px;
  color: #333;
  visibility: hidden;
  z-index: 1;
  transition: transform 0.4s, top 0.4s;
}

.open-popup {
  visibility: visible;
  top: 50%;
  transform: translate(-50%, -50%) scale(1);
}

.popup h2 {
  font-size: 38px;
  font-weight: 500;
  margin: 30px 0 10px;
}

.popup button {
  width: 30%;
  margin-top: 50px;
  padding: 10px 0;
  background: #32c671;
  color: #fff;
  border: 0;
  outline: none;
  font-size: 18px;
  border-radius: 4px;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.fas {
  color: #333; /* Changer la couleur de l'icône */
  font-size: 24px; /* Changer la taille de l'icône */
}

.fa-circle-notch {
  color: #06d73a; /* Changer la couleur du cercle tournant */
}

.fa-spin {
  animation: spin 2s linear infinite; /* Ajouter l'animation de rotation */
}

@keyframes spin {
  from {
    transform: rotate(0deg); /* Commence la rotation à 0 degrés */
  }
  to {
    transform: rotate(360deg); /* Rotation à 360 degrés */
  }
}
</style>
