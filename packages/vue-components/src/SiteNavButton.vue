<template>
  <div v-show="hasSiteNav">
    <span
      id="toggle-site-nav-button"
      :class="['glyphicon', { 'nav-menu-close-icon': show }]"
      @click="toggleSiteNav"
    ></span>
    <div ref="siteNavMenu" :class="['site-nav-menu', { 'nav-menu-open': show }]">
      <overlay
        :type="'siteNav'"
        :src="src"
        :fragment="'site-nav'"
        :hasIdentifier="hasIdentifier"
      />
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
  data() {
    return {
      hasIdentifier: false,
      hasSiteNav: false,
      show: false,
      src: '',
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
    this.src = window.location.pathname;

    if (document.getElementById('site-nav') !== null) {
      this.initSiteNav();
      this.hasSiteNav = true;
      this.hasIdentifier = true;
    } else if (document.getElementsByClassName('site-nav-root').length !== 0) { 
      const siteNav = document.getElementsByClassName('site-nav-root')[0];
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
        padding: 0 10px 20px;
        position: fixed;
        top: 0;
        overflow-y: scroll;
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
