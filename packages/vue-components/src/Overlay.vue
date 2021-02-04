<template>
<div>
  <span
    :id="buttonId"
    :class="['glyphicon', { 'nav-menu-close-icon': show }]"
    @click="toggleNavMenu"
  ></span>
  <div ref="navMenuContainer" :class="[navMenuIconClass, { 'nav-menu-open': show }]">
    <retriever
        v-if="hasIdentifier"
        :src="src"
        :fragment="fragment"
        @src-loaded="navMenuLoaded"
    />
    <div ref="navigationMenu" v-else></div>
  </div>
</div>
</template>

<script>
import retriever from './Retriever.vue';
import $ from './utils/NodeList';

export default {
  components: {
    retriever,
  },
  props: {
    type: {
      type: String,
      default: null,
    },
    src: {
      type: String,
      default: null,
    },
    fragment: {
      type: String,
      default: null,
    },
    hasIdentifier: {
      type: Boolean,
      default: false,
    },
  },
  inject: ['toggleLowerNavbar'],
  data() {
    return {  
      show: false,
    }
  },
  computed: {
    buttonId() {
      switch (this.type) {
        case 'siteNav': 
          return 'toggle-site-nav-button';
        case 'pageNav': 
          return 'toggle-page-nav-button';
        default:
          return '';  
      }
    },
    navMenuIconClass() {
      switch (this.type) {
        case 'siteNav': 
          return 'site-nav-menu';
        case 'pageNav': 
          return 'page-nav-menu';
        default:
          return '';  
      }
    },
  },
  methods: {
    toggleNavMenu() {
      this.show = !this.show;
    },
    navMenuLoaded() {
      this.toggleLowerNavbar();
      $(this.$refs.navMenuContainer).find('a').on('click', () => {
        this.toggleNavMenu();
      });
    },
  },
  mounted() {
    const navMenu = this.$refs.navigationMenu;
    const buildNav = (navMenuItems) => {
      for (let i = 0; i < navMenuItems.childNodes.length; i += 1) {
        navMenu.appendChild(navMenuItems.childNodes[i].cloneNode(true));
      }
      this.navMenuLoaded();
    };
    const buildPageNav = () => {
      const wrapper = document.createElement('div');
      const pageNavTitle = document.getElementsByClassName('page-nav-title')[0];
      const pageNavLinks = document.getElementById('mb-page-nav');
      if (pageNavTitle) {
        wrapper.appendChild(pageNavTitle.cloneNode(true));
      }
      if (pageNavLinks) {
        wrapper.appendChild(pageNavLinks.cloneNode(true));
      }
      buildNav(wrapper);
    }
    const buildSiteNav = () => {
      const siteNav = document.getElementsByClassName('site-nav-root')[0];
      buildNav(siteNav);
    }

    if (!this.hasIdentifier) {
      switch (this.type) {
        case 'siteNav':
          buildSiteNav();
          break;
        case 'pageNav':
          buildPageNav();
          break;
      }
    }
  },
}
</script>

<style scoped>
    .hide-nav-button {
        display: none;
    }

    #toggle-site-nav-button {
        position: absolute;
        left: 0;
    }

    #toggle-page-nav-button {
        position: absolute;
        right: 0;
    }

    .site-nav-menu,
    .page-nav-menu {
        padding-top: 50px;
    }

    .nav-menu-close-icon::before {
        content: "\e014" !important;
    }

    .nav-menu-open {
        display: block !important;
        width: 100% !important;
        background: #fff;
        height: 100%;
        clear: both;
    }

    .site-nav-menu,
    .page-nav-menu {
        display: none;
        padding: 50px 10px 20px;
        position: fixed;
        overflow-y: auto;
        z-index: -1;
    }

    #toggle-site-nav-button,
    #toggle-page-nav-button {
        cursor: pointer;
        padding: 15px;
        z-index: 1001;
    }

    #toggle-site-nav-button::before {
        content: "\e236";
        font-size: 20px;
    }

    #toggle-page-nav-button::before {
        content: "\e235";
        font-size: 20px;
    }

    /* @media (min-width: 992px) {
        #toggle-site-nav-button {
            display: none !important;
        }
    } */
</style>
