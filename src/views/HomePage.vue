<template>
  <div>
    <component :is="NavigationComponent"></component>
    <component :is="TestimonialComponent"></component>
    <component :is="FooterComponent"></component>
  </div>
</template>

<script>
export default {
  data() {
    return {
      NavigationComponent: require('../components/NavigationComponent.vue').default,
      TestimonialComponent: require('@/components/TestimonialComponent.vue').default,
      FooterComponent: require('../components/FooterComponent.vue').default,
    };
  },
};
</script>

<style scoped>
</style>

