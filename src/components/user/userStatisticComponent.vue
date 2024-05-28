<template>
  <div>
    <div class="user-statistics">
      <h2>Statistiques de travail de l'utilisateur</h2>
      <div class="statistics-item">
        <h3>Nombre d'heures travaillées aujourd'hui</h3>
        <p>{{ hoursWorkedToday }} heures</p>
      </div>
      <div class="statistics-item">
        <h3>Productivité moyenne</h3>
        <p>{{ averageProductivity }}%</p>
      </div>
      <!-- Autres statistiques à afficher -->
    </div>

    <div class="chart-container">
      <canvas ref="barChart"></canvas>
    </div>
  </div>
</template>


  
<script>
import { Chart } from 'chart.js/auto';
import axios from 'axios';
import { API_BASE_URL } from '@/config.js'; // Assurez-vous que ce chemin est correct

export default {
  data() {
    return {
      hoursWorkedToday: 0,
      averageProductivity: 0,
      dailyHours: [] // Données pour le graphique
    };
  },
  mounted() {
    this.fetchUserStatistics();
  },
  methods: {
    async fetchUserStatistics() {
      try {
        const token = localStorage.getItem('token');
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        };

        // Assurez-vous que l'URL est correcte
        const response = await axios.get(`${API_BASE_URL}/statistic/userStatistic`, { headers });

        // Supposons que l'API renvoie un objet avec les champs nécessaires
        const data = response.data;
        this.hoursWorkedToday = data.hoursWorkedToday;
        this.averageProductivity = data.percentage;
        this.dailyHours = data.percentage;

        // Appelez la méthode pour créer le graphique
        this.createChart();
      } catch (error) {
        console.error('Error fetching user statistics:', error);
      }
    },
    createChart() {
      const labels = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
      const data = {
        labels: labels,
        datasets: [{
          label: 'Nombre d\'heures travaillées par jour',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
          data: this.dailyHours // Utilisez les données réelles
        }]
      };

      const options = {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      };

      // Créez le graphique
      new Chart(this.$refs.barChart, {
        type: 'bar',
        data: data,
        options: options
      });
    }
  }
};
</script>

  
  <style scoped>
  .user-statistics {
    max-width: 600px;
    margin: auto;
  }

  .user-statistics {
  max-width: 600px;
  margin: auto;
}

.statistics-item {
  margin-bottom: 10px;
}

h3 {
  margin-bottom: 5px;
}
  </style>
  