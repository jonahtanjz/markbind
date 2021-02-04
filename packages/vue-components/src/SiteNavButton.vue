<template>
  <overlay v-if="showSiteNav"
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
  computed: {
    showSiteNav() {
      return this.show && this.hasSiteNav;
    }
  },
  mounted() {
    this.src = window.location.pathname;
    this.hasIdentifier = document.getElementById("site-nav") !== null;
    this.hasSiteNav = document.getElementsByClassName('site-nav-root').length !== 0;
    this.toggleNavMenuButton();
    $(window).on('resize', this.toggleNavMenuButton);
  },
};
</script>
