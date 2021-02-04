<template>
  <overlay v-if="show"
    :type="'pageNav'"
    :src="src"
    :fragment="'page-nav'"
    :hasIdentifier="hasIdentifier"
  />
</template>

<script>
export default {
  data() {
    return {
      hasPageNav: false,
      hasIdentifier: false,
      show: false,
      src: '',
    };
  },
  methods: {
    toggleNavMenuButton() {
      if (window.innerWidth < 1300) {
        this.show = true;
      } else {
        this.show = false;
      }
    }
  },
  mounted() {
    this.src = window.location.pathname;
    this.hasIdentifier = document.getElementById('page-nav') !== null;
    this.toggleNavMenuButton();
    $(window).on('resize', this.toggleNavMenuButton);
  },
};
</script>

<style scoped>

</style>
