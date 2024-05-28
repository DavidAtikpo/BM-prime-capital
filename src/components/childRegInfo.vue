<template>
  <div :class="[theme, 'page']">
    <div class="container">
      <div class="info1">
        <div v-if="currentStep === 1">
          <h2>{{ getTranslatedText('childInformation') }}</h2><br>

          <div class="form-group">
            <label for="Nom">{{ getTranslatedText('lastName') }} <span>*</span></label>
            <input type="text" v-model="child.lastName" class="input-field">
          </div><br>

          <div class="form-group">
            <label>{{ getTranslatedText('firstName') }} <span>*</span></label>
            <input type="text" v-model="child.firstName" class="input-field">
          </div><br>

          <div class="form-group">
            <label>{{ getTranslatedText('gender') }}</label>
            <select v-model="child.sex" class="input-field">
              <option value="Masculin">{{ getTranslatedText('male') }}</option>
              <option value="Féminin">{{ getTranslatedText('female') }}</option>
            </select>
          </div><br>

          <div class="form-group">
            <label>{{ getTranslatedText('class') }}</label>
            <select v-model="child.class" class="input-field">
              <option value="CP1">CP1</option>
              <option value="CP2">CP2</option>
              <option value="CE1">CE1</option>
              <option value="CE2">CE2</option>
              <option value="CM1">CM1</option>
              <option value="CM2">CM2</option>
              <option value="6eme">6eme</option>
              <option value="5eme">5eme</option>
              <option value="4eme">4eme</option>
              <option value="3eme">3eme</option>
              <option value="Seconde">Seconde</option>
              <option value="Premiere">Premiere</option>
              <option value="Terminal">Terminal</option>
            </select>
          </div><br>

          <div class="form-group">
            <label>{{ getTranslatedText('school') }}</label>
            <input type="text" v-model="child.school" class="input-field">
          </div><br>

          <div class="form-group">
            <label>{{ getTranslatedText('birthDate') }} <span>*</span></label>
            <input type="date" v-model="child.birthDate" class="input-field">
          </div><br>

          <div class="form-group">
            <label>{{ getTranslatedText('birthPlace') }} <span>*</span></label>
            <input type="text" v-model="child.birthPlace" class="input-field">
          </div><br>

          <div class="form-group">
            <label>{{ getTranslatedText('residence') }} <span>*</span></label>
            <input type="text" v-model="child.live" class="input-field">
          </div><br>

          <button class="button" @click="nextStep">{{ getTranslatedText('next') }}</button>
        </div>
      </div>

      <div class="info2">
        <div v-if="currentStep === 2">
          <h2>{{ getTranslatedText('parentInformation') }}</h2><br>

          <div class="form-group">
            <label>{{ getTranslatedText('fatherName') }} <span>*</span></label>
            <input type="text" v-model="parent.fatherName" class="input-field">
          </div><br>

          <div class="form-group">
            <label>{{ getTranslatedText('motherName') }}</label>
            <input type="text" v-model="parent.motherName" class="input-field">
          </div><br>

          <div class="form-group">
            <label>{{ getTranslatedText('phone') }}</label>
            <input type="text" v-model="parent.phoneNumber" class="input-field">
          </div><br>

          <div class="form-group">
            <label>{{ getTranslatedText('occupation') }}</label>
            <input type="text" v-model="parent.occupation" class="input-field">
          </div>

          <button class="previous" @click="previousStep">{{ getTranslatedText('back') }}</button>
          <button class="submit" @click="nextStep">{{ getTranslatedText('next') }}</button>
        </div>
      </div>

      <div class="info3">
        <div v-if="currentStep === 3">
          <h2>{{ getTranslatedText('entranceDate') }}</h2><br>

          <div class="form-group">
            <label>{{ getTranslatedText('entranceDate') }}</label>
            <input type="date" v-model="date.dateOfEntrance" class="input-field">
          </div><br>

          <div class="form-group">
            <label>{{ getTranslatedText('otherInfo') }}</label>
            <textarea v-model="date.otherInfo" class="input-field"></textarea>
            <p>{{ getTranslatedText('additionalInfoPrompt') }}</p>
          </div><br>

          <button class="previous" @click="previousStep">{{ getTranslatedText('back') }}</button>
          <button class="submit" @click="nextStep">{{ getTranslatedText('next') }}</button>
        </div>
      </div>

      <div v-if="currentStep === 4">
        <h2>{{ getTranslatedText('addPhoto') }}</h2>
        <input type="file" @change="onFileChange" accept="image/*">
        <img v-if="profileImage" :src="profileImageURL" alt="Photo de profil">
        <button class="previous" @click="previousStep">{{ getTranslatedText('back') }}</button>
        <button class="submit" @click="submit">{{ getTranslatedText('submit') }}</button>
      </div>
    </div>
    <div v-if="showPopup" class="popup">
      <h3>{{ getTranslatedText('formSubmitted') }}</h3>
    </div>
  </div>
</template>


<script>
import axios from 'axios';
import { mapState } from 'vuex';
import { API_BASE_URL } from '@/config.js';

export default {
  data() {
    return {
      currentStep: 1,
      showPopup: false,
      child: {
        lastName: '',
        firstName: '',
        sex: '',
        class: '',
        birthDate: '',
        birthPlace: '',
        live: '',
        school: '',
        // Other child fields
      },
      parent: {
        fatherName: '',
        motherName: '',
        phoneNumber: '',
        occupation: ''
        // Other parent fields
      },
      date: {
        dateOfEntrance: '',
        otherInfo: '',
      },
      profileImage: null,
      profileImageURL: null,
    };
  },
  computed: {
    ...mapState(['theme', 'language'])
  },
  methods: {
    getTranslatedText(key) {
      const translations = {
        childInformation: { en: "Child Information", fr: "Information de l'enfant" },
        lastName: { en: "Last Name", fr: "Nom" },
        firstName: { en: "First Name", fr: "Prénom" },
        gender: { en: "Gender", fr: "Sexe" },
        male: { en: "Male", fr: "Masculin" },
        female: { en: "Female", fr: "Féminin" },
        class: { en: "Class", fr: "Classe" },
        school: { en: "School", fr: "Établissement" },
        birthDate: { en: "Birth Date", fr: "Date de naissance" },
        birthPlace: { en: "Birth Place", fr: "Lieu de naissance" },
        residence: { en: "Residence", fr: "Quartier de résidence" },
        parentInformation: { en: "Parent/Guardian Information", fr: "Information de parent/Tuteur" },
        fatherName: { en: "Father's/Guardian's Name", fr: "Nom du père/tuteur" },
        motherName: { en: "Mother's Name", fr: "Nom de la mère" },
        phone: { en: "Phone", fr: "Téléphone" },
        occupation: { en: "Occupation", fr: "Profession" },
        entranceDate: { en: "Entrance Date to CDE 213", fr: "Date d'entrée au CDE 213" },
        otherInfo: { en: "Other Information", fr: "Autre information" },
        additionalInfoPrompt: { en: "Can you provide other information about the child's life, especially something touching or significant?", fr: "Pouvez-vous fournir une autre information concernant la vie de l'enfant, notamment quelque chose de touchant ou de significatif ?" },
        addPhoto: { en: "Add Child's Photo", fr: "Ajouter la photo de l'enfant" },
        submit: { en: "Submit", fr: "Soumettre" },
        formSubmitted: { en: "Form successfully submitted!", fr: "Formulaire soumis avec succès !" },
        next: { en: "Next", fr: "Suivant" },
        back: { en: "Back", fr: "Retour" }
      };
      return translations[key][this.language];
    },
    nextStep() {
      this.currentStep++;
    },
    previousStep() {
      this.currentStep--;
    },
    onFileChange(event) {
      const file = event.target.files[0];
      this.profileImageURL = URL.createObjectURL(file);
      this.profileImage = file;
    },
    submit() {
      const token = localStorage.getItem('token');
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      };
      const postData = {
        ...this.child,
        ...this.parent,
        ...this.date,
        profileImageURL: this.profileImageURL
      };
      console.log('Data to be sent:', postData);

      axios.post(`${API_BASE_URL}/child/childInfo`, postData, { headers })
        .then(res => {
          console.log('Data saved successfully:', res.data);
          this.showPopup = true;
          setTimeout(() => {
            this.showPopup = false;
          }, 1000);
          this.resetForm();
        })
        .catch(error => {
          console.log("backend error", error.response.data);
          console.error('Error saving data:', error);
        });
    },
    resetForm() {
      this.currentStep = 1;
      this.child = {
        lastName: '',
        firstName: '',
        sex: '',
        class: '',
        birthDate: '',
        birthPlace: '',
        live: '',
        school: ''
      };
      this.parent = {
        fatherName: '',
        motherName: '',
        phoneNumber: '',
        occupation: ''
      };
      this.date = {
        dateOfEntrance: '',
        otherInfo: ''
      };
      this.profileImageURL = null;
    }
  }
};
</script>





<style scoped>

h2{
color: rgb(180, 34, 34);
}
span{
  color: red;
}

.button {
  width: 100px; /* ajuster la largeur du bouton */
  margin-top: 10px;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.input-field {
  width: 100%; /* remplir la largeur disponible */
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 8px; /* ajouter un peu de marge intérieure pour plus de confort */
  box-sizing: border-box; /* inclure le rembourrage dans la largeur totale */
  margin-bottom: 10px; /* espace supplémentaire entre les champs */
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px; /* espace supplémentaire entre les étiquettes */
}

.submit {
  width: 100px; /* ajuster la largeur du bouton de soumission */
  margin-top: 20px;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.profile-icon {
  margin-top: 30px;
  cursor: pointer;
  width: 50px; /* ajuster la taille de l'icône de profil */
  display: block;
  margin-left: auto;
  margin-right: auto;
}


.container {
  width: 80%; /* Ajustement de la largeur du conteneur principal pour les petits écrans */
  margin: 0 auto; /* Centrage du conteneur */
  padding: 20px;
  background-color: #fff;
  margin-top: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.popup {
  position: fixed; /* Positionnement fixe pour afficher la popup par-dessus le contenu */
  top: 50%; /* Alignement vertical au milieu de l'écran */
  left: 50%; /* Alignement horizontal au milieu de l'écran */
  transform: translate(-50%, -50%); /* Centrage parfait */
  background-color: rgba(255, 255, 255, 0.9); /* Fond semi-transparent */
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.popup h2 {
  color: rgb(180, 34, 34);
  text-align: center; /* Centrage du texte */
}

@media only screen and (max-width: 768px) {
  .container {
    width: 90%; /* Ajustement de la largeur du conteneur principal pour les petits écrans */
  }

  .popup {
    width: 90%; /* Ajustement de la largeur de la popup pour les petits écrans */
  }
}
</style>
