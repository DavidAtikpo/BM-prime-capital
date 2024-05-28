<template>
  <div class="page-content">
    <div class="bg-img" :class="{ blurred: popupVisible }">
      <img src="../assets/images/Screenshot from 2024-05-22 16-42-31.png" alt="Background Image" />
    </div>
    <div class="right-content" :class="{ blurred: popupVisible }">
      <div class="nav">
        <a href="/">
          <img class="logo" src="../assets/images/bm_prime_capital_llc_logo.jpeg" alt="Logo" />
        </a>
      </div>
      <form @submit.prevent="registerStudent">
        <div class="form-field">
          <div class="top-content">
            <h2>Enregistrez</h2>
            <div class="user-pic">
              <!-- Add a user picture if needed -->
            </div>
          </div>
          <div class="full-name">
            <div>
              <label class="last-name" for="lName">Nom<span>*</span></label>
              <input
                class="input-field name"
                type="text"
                id="lName"
                required
                placeholder="Doe"
                v-model="data.lastName"
                @input="clearError('lastNameError')"
                :class="{ 'is-invalid': lastNameError }"
              />
              <div class="error" v-if="lastNameError">{{ lastNameError }}</div>
            </div>
            <div>
              <label class="first-name" for="fName">Prénom<span>*</span></label>
              <input
                class="input-field name"
                type="text"
                id="fName"
                required
                placeholder="John"
                v-model="data.firstName"
                @input="clearError('firstNameError')"
                :class="{ 'is-invalid': firstNameError }"
              />
              <div class="error" v-if="firstNameError">{{ firstNameError }}</div>
            </div>
          </div>
          <div>
            <label for="role">Role<span>*</span></label>
            <input
              type="text"
              class="input-field"
              id="role"
              required
              placeholder="ex: Sante, Comptable..."
              v-model="data.role"
              @input="clearError('roleExistError')"
              :class="{ 'is-invalid': roleExistError }"
            />
            <div class="error" v-if="roleExistError">{{ roleExistError }}</div>
          </div>
          <div>
            <label for="email">Email<span>*</span></label>
            <input
              type="email"
              class="input-field"
              id="email"
              required
              placeholder="example@email.com"
              v-model="data.email"
              @input="clearError('emailFormatError', 'emailExistError')"
              :class="{ 'is-invalid': emailFormatError || emailExistError }"
            />
            <div class="error" v-if="emailFormatError">{{ emailFormatError }}</div>
            <div class="error" v-else-if="emailExistError">{{ emailExistError }}</div>
          </div>
          <div>
            <label for="phone">Téléphone<span>*</span></label>
            <input
              class="input-field"
              type="tel"
              id="phone"
              required
              placeholder="0123456789"
              v-model="data.phoneNumber"
              @input="clearError('phoneNumberError')"
              :class="{ 'is-invalid': phoneNumberError }"
            />
            <div class="error" v-if="phoneNumberError">{{ phoneNumberError }}</div>
          </div>
          <div>
            <label for="password">Mot de passe<span>*</span></label>
            <div class="password-container">
              <input
                class="input-field"
                :type="passwordFieldType"
                id="password"
                placeholder="Enter password"
                v-model="data.password"
                @input="clearError('passwordError')"
                :class="{ 'is-invalid': passwordError }"
              />
              <i
                class="toggle-password-icon"
                :class="{ 'fas fa-eye-slash': !showPassword, 'fas fa-eye': showPassword }"
                @click="togglePasswordVisibility"
              ></i>
            </div>
            <div class="error" v-if="passwordError">{{ passwordError }}</div>
          </div>
          <div>
            <label for="confirm-password">Confirme Mot de passe<span>*</span></label>
            <div class="password-container">
              <input
                class="input-field"
                :type="confirmPasswordFieldType"
                id="confirm-password"
                required
                placeholder="Confirm password"
                v-model="data.confirmPassword"
                @input="clearError('confirmPasswordError')"
                :class="{ 'is-invalid': confirmPasswordError }"
              />
              <i
                class="toggle-password-icon"
                :class="{ 'fas fa-eye-slash': !showConfirmPassword, 'fas fa-eye': showConfirmPassword }"
                @click="toggleConfirmPasswordVisibility"
              ></i>
            </div>
            <div class="error" v-if="confirmPasswordError">{{ confirmPasswordError }}</div>
          </div>
          <button type="submit">Submit</button>
          <span class="login">Avez-vous déjà un compte? <a @click.prevent="goToLogin" href="#">Connectez</a></span>
        </div>
      </form>
    </div>
    <div class="popup" v-if="popupVisible">
      <img class="check" src="@/assets/images/check.png" alt="Checkmark" />
      <h2>Sign Up Successful</h2>
      <p>
        A verification link has been sent to
        <span style="font-weight: bold">{{ data.email }}</span>
      </p>
      <button @click="closePopup" type="button">OK</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { API_BASE_URL } from '@/config.js';

export default {
  data() {
    return {
      popupVisible: false,
      showPassword: false,
      showConfirmPassword: false,
      data: {
        lastName: '',
        firstName: '',
        role: '',
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: ''
      },
      lastNameError: '',
      firstNameError: '',
      roleExistError: '',
      phoneNumberError: '',
      emailFormatError: '',
      emailExistError: '',
      passwordError: '',
      confirmPasswordError: ''
    };
  },
  computed: {
    passwordFieldType() {
      return this.showPassword ? 'text' : 'password';
    },
    confirmPasswordFieldType() {
      return this.showConfirmPassword ? 'text' : 'password';
    }
  },
  methods: {
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    toggleConfirmPasswordVisibility() {
      this.showConfirmPassword = !this.showConfirmPassword;
    },
    registerStudent() {
      axios
        .post(`${API_BASE_URL}/user/register`, this.data)
        .then((res) => {
          if (res.status === 201) {
            this.popupVisible = true;
            console.log('data', res.data);
          }
        })
        .catch((error) => {
          console.error(error);
          // Gérer les erreurs d'inscription ici
        });
    },
    closePopup() {
      this.popupVisible = false;
      this.$router.push('/login');
      this.resetForm();
    },
    resetForm() {
      this.data = {
        lastName: '',
        firstName: '',
        role: '',
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: ''
      };

      this.clearAllErrors();
    },
    clearError(...errors) {
      errors.forEach(error => {
        this[error] = '';
      });
    },
    clearAllErrors() {
      this.lastNameError = '';
      this.firstNameError = '';
      this.roleExistError = '';
      this.phoneNumberError = '';
      this.emailFormatError = '';
      this.emailExistError = '';
      this.passwordError = '';
      this.confirmPasswordError = '';
    },
    goToLogin() {
      this.$router.push('/login');
    }
  }
};
</script>



<style scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.page-content {
  display: flex;
  padding: 0;
  margin: 0;
  gap: 3%;
  height: 100vh;
}

.blurred {
  filter: blur(5px); /* ajustez la quantité de flou si nécessaire */
}

.bg-img {
  display: flex;
  background: black;
  position: relative;
  align-items: center;
  justify-content: center;
  width: 55%;
  height: 100vh;
}

.bg-img img {
  object-fit: cover;
  width: 100%;
  height: 100vh;
  opacity: 0.7;
}

.right-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 45%;
}

.nav {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.nav img {
  height: 80px;
  width: 80px;
  border-radius: 50%;
}

.form-wrapper {
  width: 100%;
}

h2 {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 1rem;
}

.form-field {
  margin: auto;
  width: 80%;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.full-name {
  display: flex;
  gap: 10px;
}

span {
  color: red;
}

label {
  font-size: 1rem;
}

.input-field {
  width: 100%;
  padding: 8px 12px;
  font-size: 1rem;
  border: 1px solid grey;
  border-radius: 5px;
  margin-top: 5px;
}

.name {
  width: 100%;
}

.password-container {
  position: relative;
}

.password-container i {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
}

.error {
  color: red;
  font-size: 0.9rem;
}

button {
  width: 100%;
  padding: 10px;
  font-size: 1.1rem;
  background: #090255;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 15px;
}

button:hover {
  background: #1fdf5f;
}

.login {
  text-align: center;
  margin-top: 10px;
  font-size: 1rem;
}

.login a {
  color: blue;
  cursor: pointer;
}

.popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  border-radius: 5px;
}

.popup img {
  width: 50px;
}

@media screen and (max-width: 768px) {
  .page-content {
    flex-direction: column;
    align-items: center;
    gap: 5px;
  }

  .bg-img {
    display: none;
  }

  .right-content {
    width: 80%;
  }

  .form-field {
    width: 90%;
  }

  .img-text {
    font-size: 1.5rem;
  }
}
</style>


