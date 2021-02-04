<template>
  <div v-show="hasPageNav">
    <span
      id="toggle-page-nav-button"
      :class="['glyphicon', { 'nav-menu-close-icon': show }]"
      @click="togglePageNav"
    ></span>
    <div ref="pageNavMenu" :class="['page-nav-menu', { 'nav-menu-open': show }]">
      <overlay
        :type="'pageNav'"
        :src="src"
        :fragment="'page-nav'"
        :hasIdentifier="hasIdentifier"
      />
    </div>
  </div>
</template>

<script>
import $ from './utils/NodeList';

export default {
  data() {
    return {
      hasPageNav: false,
      hasIdentifier: false,
      show: false,
      src: '',
    };
  },
  inject: ['initPageNav'],
  methods: {
    togglePageNav() {
      this.show = !this.show;
      this.toggleSiteNavButton();
    },
    toggleSiteNavButton() {
      const siteNavButton = document.getElementById('toggle-site-nav-button');
      if (siteNavButton !== null) {
        if (this.show) {
          siteNavButton.classList.add('hide-nav-button');
        } else {
          siteNavButton.classList.remove('hide-nav-button');
        }
      }
    },
  },
  mounted() {
    const $el = $(this.$refs.pageNavMenu);
    const pageNav = document.getElementById('page-nav');
    this.src = window.location.pathname;

    if (pageNav !== null) {
      this.initPageNav();
      this.hasPageNav = true;
      this.hasIdentifier = true;
    } else if (document.getElementsByClassName('page-nav-title')[0].length !== 0) {
      this.initPageNav();
      this.hasPageNav = true;
    }

    $el.find('a').on('click', () => {
      this.togglePageNav();
    });
  },
  beforeDestroy() {
    const $el = $(this.$refs.pageNavMenu);
    $el.find('a').off();
  },
};
</script>

<style scoped>
    .page-nav-menu {
        display: none;
        padding: 0 10px;
        position: fixed;
        top: 0;
        z-index: 1000;
    }

    #toggle-page-nav-button {
        cursor: pointer;
        padding: 15px;
        z-index: 1001;
    }

    #toggle-page-nav-button::before {
        content: "\e235";
        font-size: 20px;
    }
</style>
