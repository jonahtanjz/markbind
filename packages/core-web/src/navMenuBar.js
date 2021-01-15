const navMenuStates = {};

function toggleSiteNav() {
  if (!navMenuStates.siteNavOpened) {
    document.getElementById('site-nav').classList.add('nav-menu-open');
    document.getElementById('toggle-site-nav-button').classList.add('nav-menu-close-icon');
    document.getElementById('toggle-page-nav-button').style.display = 'none';
    navMenuStates.siteNavOpened = true;
  } else {
    document.getElementById('site-nav').classList.remove('nav-menu-open');
    document.getElementById('toggle-site-nav-button').classList.remove('nav-menu-close-icon');
    if (navMenuStates.pageNav) {
      document.getElementById('toggle-page-nav-button').style.display = 'block';
    }
    navMenuStates.siteNavOpened = false;
  }
}

function togglePageNav() {
  if (!navMenuStates.pageNavOpened) {
    document.getElementById('page-nav').classList.add('nav-menu-open');
    document.getElementById('toggle-page-nav-button').classList.add('nav-menu-close-icon');
    document.getElementById('toggle-site-nav-button').style.display = 'none';
    navMenuStates.pageNavOpened = true;
  } else {
    closePageNav();
  }
}

function closePageNav() {
  document.getElementById('page-nav').classList.remove('nav-menu-open');
  document.getElementById('toggle-page-nav-button').classList.remove('nav-menu-close-icon');
  if (navMenuStates.siteNav) {
    document.getElementById('toggle-site-nav-button').style.display = 'block';
  }
  navMenuStates.pageNavOpened = false;
}

function initSiteNavButton() {
  navMenuStates.siteNav = true;
}

function initPageNavButton() {
  navMenuStates.pageNav = true;
}

function showNavMenuToggleButtons() {
  if (navMenuStates.siteNav || navMenuStates.pageNav) {
    document.getElementById('nav-menu-bar').style.display = 'block';
  }

  if (navMenuStates.siteNav) {
    document.getElementById('toggle-site-nav-button').style.display = 'block';
  }

  if (navMenuStates.pageNav) {
    document.getElementById('toggle-page-nav-button').style.display = 'block';
  }
}

window.toggleSiteNav = toggleSiteNav;
window.togglePageNav = togglePageNav;
window.initPageNavButton = initPageNavButton;
window.initSiteNavButton = initSiteNavButton;
window.showNavMenuToggleButtons = showNavMenuToggleButtons;
window.closePageNav = closePageNav;

function initNavMenuBar() {
  navMenuStates.siteNav = false;
  navMenuStates.pageNav = false;
  navMenuStates.siteNavOpened = false;
  navMenuStates.pageNavOpened = false;
}

export default initNavMenuBar;