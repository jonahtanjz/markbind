<template>
  <div>
    <span id="toggle-page-nav-button" @click="togglePageNav" :class="['glyphicon', { 'nav-menu-close-icon': show }]"></span>
    <div ref="pageNavMenu" :class="['page-nav-menu', { 'nav-menu-open': show }]"></div>
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
    togglePageNav() {
      this.show = !this.show;
    },
  },
  mounted() {
    const $el = $(this.$refs.pageNavMenu);
    const pageNavMenu = this.$refs.pageNavMenu;
    const pageNav = document.getElementById("page-nav");
    for (let i = 0; i < pageNav.childNodes.length; i++) {
      pageNavMenu.appendChild(pageNav.childNodes[i].cloneNode(true));
    }
    $el.find('a').on('click', (e) => {
      this.togglePageNav();
    })
  },
};
</script>

<style scoped>
    .page-nav-menu {
      display: none;
    }
</style>
