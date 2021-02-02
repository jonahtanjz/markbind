<template>
  <div v-show="hasPageNav">
    <span
      id="toggle-page-nav-button"
      :class="['glyphicon', { 'nav-menu-close-icon': show }]"
      @click="togglePageNav"
    ></span>
    <div ref="pageNavMenu" :class="['page-nav-menu', { 'nav-menu-open': show }]"></div>
  </div>
</template>

<script>
import $ from './utils/NodeList';

export default {
  data() {
    return {
      hasPageNav: false,
      show: false,
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
    const buildPageNavMenu = (pageNavItems) => {
      this.initPageNav();
      this.hasPageNav = true;
      const { pageNavMenu } = this.$refs;
      for (let i = 0; i < pageNavItems.childNodes.length; i += 1) {
        pageNavMenu.appendChild(pageNavItems.childNodes[i].cloneNode(true));
      }
    };

    const $el = $(this.$refs.pageNavMenu);
    const pageNav = document.getElementById('page-nav');

    if (pageNav !== null) {
      buildPageNavMenu(pageNav);
    } else {
      const wrapper = document.createElement('div');
      const pageNavTitle = document.getElementsByClassName('page-nav-title')[0];
      const pageNavLinks = document.getElementById('mb-page-nav');
      if (pageNavTitle) {
        wrapper.appendChild(pageNavTitle.cloneNode(true));
      }
      if (pageNavLinks) {
        wrapper.appendChild(pageNavLinks.cloneNode(true));
      }
      if (wrapper.hasChildNodes()) {
        buildPageNavMenu(wrapper);
      }
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
