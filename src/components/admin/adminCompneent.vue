<template>
  <div :class="[theme, 'page']">
  <div class="user-dashboard">
    <h2>Tableau des utilisateurs</h2>
    <div v-if="users.length">
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Téléphone</th>
            <th>Rôle</th>
            <th>Objectif</th>
            <th>Rapport</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in users" :key="index">
            <td>{{ user.date }}</td>
            <td>{{ user.nom }}</td>
            <td>{{ user.prenom }}</td>
            <td>{{ user.tel }}</td>
            <td>{{ user.role }}</td>
            <td>{{ user.objectif }}</td>
            <td>{{ user.rapport }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      <p>Aucun utilisateur à afficher.</p>
    </div><br>
    <div class="personnel">
      <h2>Les personnels</h2>
      <div v-if="personnels.length">
        <table>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Prenom</th>
              <th>Nationalite</th>
              <th>Niveau d'etude</th>
              <th>Specialite</th>
              <th>Numero de la carte d'idente</th>
              <th>contact</th>
              <th>Email</th>
              <th>Poste occuper</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(personnel, index) in personnels" :key="index">
              <td>{{ personnel.nom }}</td>
              <td>{{ personnel.prenom }}</td>
              <td>{{personnel.nationalite }}</td>
              <td>{{ personnel.niveau }}</td>
              <td>{{ personnel.specialite }}</td>
              <td>{{ personnel.carte }}</td>
              <td>{{ personnel.contact }}</td>
              <td>{{ personnel.email }}</td>
              <td>{{ personnel.post }}</td>
            </tr>
          </tbody>
        </table>

      </div>
    </div>
   </div>
</div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  data() {
    return {
      users: [
        {
          date: '2024-05-27',
          nom: 'Doe',
          prenom: 'John',
          tel: '123-456-7890',
          role: 'Sante',
          objectif: 'Oui',
          rapport: '60%'
        },
        {
          date: '2024-05-27',
          nom: 'Smith',
          prenom: 'Jane',
          tel: '098-765-4321',
          role: 'Comptable',
          objectif: 'oui',
          rapport: '80%'
        },
        {
          date: '2024-05-27',
          nom: 'Rene',
          prenom: 'Djemi',
          tel: '098-765-4321',
          role: 'Assistante',
          objectif: 'non',
          rapport: 'non'
        },
        {
          date: '2024-05-27',
          nom: 'Roland',
          prenom: 'cyrile',
          tel: '098-765-4321',
          role: 'Surveillant',
          objectif: 'oui',
          rapport: '100%'
        }
        // Ajoutez plus d'utilisateurs ici
      ],
      personnels:[
       {
        nom:'Atikpo',
        prenom:'David',
        nationalite:'Togolaise',
        niveau:'Bachelier',
        specialite:'developpeur web',
        carte:'0023458960385902843',
        contact:'99058645',
        email:'davidatikpo44@gmail.com',
        post:'informatique'
       },
       {
        nom:'Roger',
        prenom:'Millan',
        nationalite:'Camerounaise',
        niveau:'BT',
        specialite:'constructeur mecanique',
        carte:'0023458960385902843',
        contact:'99058645',
        email:'davidatikpo44@gmail.com',
        post:'informatique'
       },
       {
        nom:'AYALE',
        prenom:'Pele',
        nationalite:'Togolaise',
        niveau:'Bac+2',
        specialite:'Ressources humaine',
        carte:'0023458960385902841',
        contact:'79058645',
        email:'davidatikpo44@gmail.com',
        post:'Culture des enfants'
       },
       {
        nom:'Jean',
        prenom:'Davido',
        nationalite:'Ivoirienne',
        niveau:'Bachelier',
        specialite:'developpeur mobile',
        carte:'0023458960385978967',
        contact:'92591228',
        email:'davido@gmail.com',
        post:'informatique'
       }
      ]
    };
  },
  computed:{
    ...mapState(['theme'])
  }
};
</script>

<style>
.dark.page{
  background-color: #535151;
  color: #fff;
}
.light.page{
  background-color: #fff;
  color: #181818;
}
.user-dashboard {
  margin: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
}

th {
  background-color: #535151;
  color: white;
}

th, td {
  text-align: left;
}
</style>



<!-- <template>
    <div class="activity-dashboard">
      <h2>Activity Dashboard</h2>
      <div v-if="activities.length">
        <ul>
          <li v-for="(activity, index) in activities" :key="index">
            {{ activity.user }} - {{ activity.timestamp }}: {{ activity.description }}
          </li>
        </ul>
      </div>
      <div v-else>
        <p>No activities to display.</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        activities: [] // Initialize with an empty array to store activities
      };
    },
    created() {
      // Simulated data for demonstration purposes
      this.activities = [
        { user: 'User 1', timestamp: '2024-04-05 10:00 AM', description: 'Logged in' },
        { user: 'User 2', timestamp: '2024-04-05 10:15 AM', description: 'Viewed dashboard' },
        { user: 'User 3', timestamp: '2024-04-05 10:30 AM', description: 'Updated profile' }
      ];
    }
  };
  </script>
  
  <style scoped>
  .activity-dashboard {
    margin: 20px;
  }
  
  ul {
    list-style-type: none;
    padding: 0;
  }
  
  li {
    margin-bottom: 10px;
  }
  </style>
   -->