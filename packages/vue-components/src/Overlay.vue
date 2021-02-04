<template>
  <retriever
      v-if="hasIdentifier"
      :src="src"
      :fragment="fragment"
  />
  <div ref="navigationMenu" v-else></div>
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
  data() {
    return {
    
    }
  },
  mounted() {
    const navMenu = this.$refs.navigationMenu;
    const buildNav = (navMenuItems) => {
      for (let i = 0; i < navMenuItems.childNodes.length; i += 1) {
        navMenu.appendChild(navMenuItems.childNodes[i].cloneNode(true));
      }
    };

    if (!this.hasIdentifier) {
      if (this.type === "siteNav") {
        const siteNav = document.getElementsByClassName('site-nav-root')[0];
        buildNav(siteNav);
      } else if (this.type === "pageNav") {
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
    }
  },
}
</script>