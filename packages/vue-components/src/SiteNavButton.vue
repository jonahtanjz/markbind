<template>
  <overlay v-if="show"
    :type="'siteNav'"
    :src="src"
    :fragment="'site-nav'"
    :hasIdentifier="hasIdentifier"
  />
</template>

<script>
export default {
  data() {
    return {
      hasIdentifier: false,
      hasSiteNav: false,
      show: false,
      src: '',
    };
  },
  methods: {
    toggleNavMenuButton() {
      if (window.innerWidth < 992) {
        this.show = true;
      } else {
        this.show = false;
      }
    }
  },
  mounted() {
    this.src = window.location.pathname;
    this.hasIdentifier = document.getElementById("site-nav") !== null;
    this.toggleNavMenuButton();
    $(window).on('resize', this.toggleNavMenuButton);
  },
};
</script>

<style scoped>
    
</style>
