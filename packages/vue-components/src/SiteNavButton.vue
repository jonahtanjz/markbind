<template>
  <div v-show="hasSiteNav">
    <span
      id="toggle-site-nav-button"
      :class="['glyphicon', { 'nav-menu-close-icon': show }]"
      @click="toggleSiteNav"
    ></span>
    <div ref="siteNavMenu" :class="['site-nav-menu', { 'nav-menu-open': show }]"></div>
  </div>
</template>

<script>
import $ from './utils/NodeList';

export default {
  data() {
    return {
      hasSiteNav: false,
      show: false,
    };
  },
  inject: ['initSiteNav'],
  methods: {
    toggleSiteNav() {
      this.show = !this.show;
      this.togglePageNavButton();
    },
    togglePageNavButton() {
      const pageNavButton = document.getElementById('toggle-page-nav-button');
      if (pageNavButton !== null) {
        if (this.show) {
          pageNavButton.classList.add('hide-nav-button');
        } else {
          pageNavButton.classList.remove('hide-nav-button');
        }
      }
    },
  },
  mounted() {
    const $el = $(this.$refs.siteNavMenu);
    const { siteNavMenu } = this.$refs;
    const siteNav = document.getElementById('site-nav')
      || document.getElementsByClassName('site-nav-root')[0];

    if (siteNav) {
      this.initSiteNav();
      this.hasSiteNav = true;
      for (let i = 0; i < siteNav.childNodes.length; i += 1) {
        siteNavMenu.appendChild(siteNav.childNodes[i].cloneNode(true));
      }
    }

    $el.find('a').on('click', () => {
      this.toggleSiteNav();
    });
  },
  beforeDestroy() {
    const $el = $(this.$refs.siteNavMenu);
    $el.find('a').off();
  },
};
</script>

<style scoped>
    .site-nav-menu {
        display: none;
        padding: 0 10px;
        position: fixed;
        z-index: 1000;
    }

    #toggle-site-nav-button {
        cursor: pointer;
        padding: 15px;
        z-index: 1001;
    }

    #toggle-site-nav-button::before {
        content: "\e236";
        font-size: 20px;
    }

    @media (min-width: 992px) {
        #toggle-site-nav-button {
            display: none !important;
        }
    }
</style>
