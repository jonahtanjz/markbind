<template>
  <div>
    <span id="toggle-site-nav-button" @click="toggleSiteNav" :class="['glyphicon', { 'nav-menu-close-icon': show }]"></span>
    <div ref="siteNavMenu" :class="['site-nav-menu', { 'nav-menu-open': show }]"></div>
  </div>  
</template>

<script>
import $ from './utils/NodeList';

export default {
  data() {
    return {
      show: false,
    }
  },
  methods: {
    toggleSiteNav() {
      this.show = !this.show;
    },
  },
  mounted() {
    const el = this.$refs.siteNavMenu;
    const siteNav = document.getElementById("site-nav") || document.getElementsByClassName("site-nav-root")[0];
    if (siteNav !== undefined) {
      for (let i = 0; i < siteNav.childNodes.length; i++) {
        el.appendChild(siteNav.childNodes[i].cloneNode(true));
      }
    }
  },
};
</script>

<style scoped>
    .site-nav-menu {
      display: none;
    }
</style>
