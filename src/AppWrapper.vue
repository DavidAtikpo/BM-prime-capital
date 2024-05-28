<template>
    <div v-if="isReady">
      <App />
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import App from './App.vue';
  import { useRouter } from 'vue-router';
  
  export default {
    components: { App },
    setup() {
      const isReady = ref(false);
      const router = useRouter();
  
      onMounted(() => {
        // Restore the route from localStorage
        const currentRoute = localStorage.getItem('currentRoute');
        if (currentRoute && currentRoute !== window.location.pathname) {
          router.replace(currentRoute).finally(() => {
            isReady.value = true;
          });
        } else {
          isReady.value = true;
        }
      });
  
      return { isReady };
    }
  };
  </script>
  