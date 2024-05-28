<template>
  <div :class="[theme , 'page']">
    <div class="stud-dash">
      <div class="welcome">
        <div class="right">
          <p class="up-welcome">
            Bienvenue <span>{{ firstName }}</span>
          </p>
          <p class="under-welcome">
            N'oubliez pas de générer le rapport à la fin de la journée. Votre rapport reflète le travail accompli et ne peut être rempli qu'une fois par jour.
          </p>
          <div class="blue"></div>
        </div>
        <div class="left">
          <img class="welcome-img" src="@/assets/images/bm_prime_capital_llc_logo.jpeg" alt="dashboard" />
        </div>
      </div>
    </div>
    <div class="statistics-component">
      <h2>Statistiques du jour</h2>
      <div class="percentage-of-the-day">
        <p>Percentage du jour: {{ percentageOfDay }}%</p>
      </div>
      <div class="chart">
        <h3>Diagramme à barres</h3>
        <canvas ref="barChartCanvas"></canvas>
      </div>
      <div class="chart">
        <h3>Diagramme en courbes</h3>
        <canvas ref="lineChartCanvas"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Chart from 'chart.js/auto';
import axios from 'axios';
import { API_BASE_URL } from '@/config.js';

export default {
  data() {
    return {
      percentageOfDay: 0,
      userData: [],
      firstName: ''
    };
  },
  computed: {
    ...mapState(['theme'])
  },
  mounted() {
    this.fetchUserDataFromBackend();
    this.firstName = localStorage.getItem('user');
  },
  methods: {
    async fetchUserDataFromBackend() {
      try {
        const token = localStorage.getItem('token');
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        };
        const response = await axios.get(`${API_BASE_URL}/statistic/userStatistic`, { headers });
        this.userData = response.data;
        this.percentageOfDay = this.userData.percentage // Utilisation directe du pourcentage du jour du backend
        this.populateCharts();
      } catch (error) {
        console.error('Error fetching user data from backend:', error);
      }
    },
    populateCharts() {
      // const barLabels = this.userData.map(user => user.name);
      const barData = this.userData.map(user => user.percentage);
      const lineLabels = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5'];
      // const lineData = this.userData.map(user => user.variations);
      
      const barCtx = this.$refs.barChartCanvas.getContext('2d');
      new Chart(barCtx, {
        type: 'bar',
        data: {
          // labels: barLabels,
          datasets: [{
            label: 'Percentage',
            data: barData,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });

      const lineCtx = this.$refs.lineChartCanvas.getContext('2d');
      new Chart(lineCtx, {
        type: 'line',
        data: {
          labels: lineLabels,
          // datasets: this.userData.map((user, index) => ({
          //   label: user.name,
          //   data: lineData[index],
          //   borderColor: '#' + ((Math.random() * 0xFFFFFF) << 0),
          //   fill: false
          // }))
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  }
};
</script>



<style scoped>

.dark.page {
  background-color: #525050;
  color: #fff;
}
.light.page {
  background-color: #fff;
  color: #333;
}

.statistics-component {
  margin-top: 20px;
  margin-left: 20px;
}

.percentage-of-the-day {
  margin-bottom: 20px;
}

.chart {
  margin-top: 20px;
}
body {
  background-color: white;
  padding-top: 5rem;
}
/* .stud-dash {
  height: 100vh;
  width: 100%;


} */
.welcome {
  height: 10rem;
  width: 100%;
  background-color: rgb(255, 255, 255);
  border-bottom: 2px solid rgb(215, 213, 213);
  /* box-shadow: 0 0 3px 3px rgb(233, 232, 232); */
  display: flex;
  justify-content: space-between;
}
.welcome-img {
  width: 9.5rem;
}
.up-welcome {
  color: #2e1c6c;
  font-weight: bolder;
  font-size: 3rem;
  padding-top: 1rem;
  width:100%;
}
.under-welcome {
  color: #737372;
  font-size: 1rem;
  width: 45rem;
}




@media (max-width: 768px) {
  .welcome {
    flex-direction: column; /* Disposition verticale sur les appareils mobiles */
    align-items: center; /* Centrage des éléments */
  }

  .welcome-img {
    width: 10%; /* Ajustez la largeur de l'image */
  }

  .up-welcome {
    font-size: 2rem; /* Réduisez la taille de la police */
    text-align: center; /* Centrage du texte */
  }

  .under-welcome {
    font-size: 0.8rem; /* Réduisez la taille de la police */
    width: 80%; /* Ajustez la largeur du paragraphe */
    text-align: center; /* Centrage du texte */
  }

 

  .welcome {
    padding: 1rem; /* Ajoutez un peu de rembourrage */
  }
}
</style>
