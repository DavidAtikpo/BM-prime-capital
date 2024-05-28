<template>
  <div :class="[theme, 'page']">
    <div v-if="loading">Loading...</div>
    <div v-else>
      <!-- Statistiques du jour -->
      <h2>Statistiques du jour</h2>
      <div class="percentage-of-the-day">
        <p>Percentage du jour: {{ percentageOfDay }}%</p>
      </div>
      <div class="chart">
        <h3>Diagramme à barres</h3>
        <canvas ref="dayBarChartCanvas"></canvas>
      </div>
      
      <!-- Statistiques de la semaine -->
      <h2>Statistiques de la semaine</h2>
      <div class="percentage-of-the-week">
        <!-- <p>Percentage de la semaine (Aujourd'hui): {{ percentageOfWeek.todayPercentage }}%</p> -->
        <p>Percentage de la semaine (Moyenne): {{ percentageOfWeek.averagePercentage }}%</p>
      </div>
      <div class="chart">
        <h3>Diagramme à barres</h3>
        <canvas ref="weekBarChartCanvas"></canvas>
      </div>
      
      <!-- Statistiques du mois -->
      <h2>Statistiques du mois</h2>
      <div class="percentage-of-the-month">
        <p>Percentage du mois: {{ percentageOfMonth }}%</p>
      </div>
      <div class="chart">
        <h3>Diagramme en courbes</h3>
        <canvas ref="monthLineChartCanvas"></canvas>
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
      loading: true,
      percentageOfDay: 0,
      percentageOfWeek: {
        todayPercentage: 0,
        averagePercentage: 0
      },
      percentageOfMonth: 0
    };
  },
  computed: {
    ...mapState(['theme'])
  },
  mounted() {
    // Fetch user data from the backend
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const token = localStorage.getItem('token');
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        };
        const [dayData, weekData, monthData] = await Promise.all([
          axios.get(`${API_BASE_URL}/admin/percent`, { headers }),
          axios.get(`${API_BASE_URL}/admin/weekperc`, { headers }),
          axios.get(`${API_BASE_URL}/admin/monthperc`, { headers })
        ]);

        this.percentageOfDay = dayData.data;
        this.percentageOfWeek = weekData.data;
        this.percentageOfMonth = monthData.data;

        // Log data to verify correctness
        console.log('Day Data:', this.percentageOfDay);
        console.log('Week Data:', this.percentageOfWeek);
        console.log('Month Data:', this.percentageOfMonth);

        this.populateCharts();
        this.loading = false;
      } catch (error) {
        console.error('Error fetching data:', error);
        this.loading = false; // Ensure loading indicator is hidden in case of error
      }
    },
    populateCharts() {
      // Populate day bar chart
      const dayBarCtx = this.$refs.dayBarChartCanvas.getContext('2d');
      new Chart(dayBarCtx, {
        type: 'bar',
        data: {
          labels: ['Today'],
          datasets: [{
            label: 'Percentage',
            data: [this.percentageOfDay],
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
      
      // Populate week bar chart
      const weekBarCtx = this.$refs.weekBarChartCanvas.getContext('2d');
      new Chart(weekBarCtx, {
        type: 'bar',
        data: {
          labels :['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'], // Labels to represent today and the average
          datasets: [{
            label: 'Percentage',
            data: [
              this.percentageOfWeek.todayPercentage,
              this.percentageOfWeek.averagePercentage
            ],
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

      // Populate month line chart
      const monthLineCtx = this.$refs.monthLineChartCanvas.getContext('2d');
      new Chart(monthLineCtx, {
        type: 'line',
        data: {
          labels: ['Month'], // You can expand this to actual month labels
          datasets: [{
            label: 'Percentage',
            data: [this.percentageOfMonth],
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            fill: false
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
    }
  }
};
</script>




<style scoped>
.page {
  margin-top: 20px;
}
.dark.page {
  background-color:#858282;
  color: #fff;
}
.light.page {
  background-color: #fff;
  color: #333;
}
.statistics-section {
  margin-top: 40px;
}

.percentage-of-the-day {
  margin-bottom: 20px;
}

.chart {
  margin-top: 20px;
}
</style>
