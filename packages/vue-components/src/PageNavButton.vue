<template>
  <overlay v-if="showPageNav"
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
  computed: {
    showPageNav() {
      return this.show && this.hasPageNav;
    }
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
    this.hasPageNav = document.getElementById('mb-page-nav') !== null;
    this.toggleNavMenuButton();
    $(window).on('resize', this.toggleNavMenuButton);
  },
};
</script>
