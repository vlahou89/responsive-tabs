const TABLIST = document.querySelector('#tablist');
const TABS = [...TABLIST.querySelectorAll('.tab')];
const TABPANELS = [...document.querySelectorAll('.tabpanel')];

// Hide all panels and make visible only the selected one by using the aria-labelledby
//and selectedId
const showActivePanel = (element) => {
  const selectedId = element.id;
  TABPANELS.forEach((e) => {
    e.hidden = 'true';
  });
  const activePanel = document.querySelector(
    `[aria-labelledby="${selectedId}"]`
  );
  activePanel.removeAttribute('hidden');
};

// set the new selected tab and deselect the first tab which was selected as default
// loop through the tabs and check which one if the selected id is the current id
//if yes -> set aria-selected to true and make it focusable
const setSelectedTab = (element) => {
  const selectedId = element.id;
  TABPANELS[0].classList.remove('visible');
  TABS.forEach((e) => {
    const id = e.getAttribute('id');
    if (id === selectedId) {
      e.removeAttribute('tabindex', '0');
      e.setAttribute('aria-selected', 'true');
    } else {
      e.setAttribute('tabindex', '-1');
      e.setAttribute('aria-selected', 'false');
    }
  });
};

// Add the keyboard navigation to the
// ArrowUp & Arrow left focus on the precious tab
// ArrowDown & ArrowRight focus on the next tab
const createArrowNavigation = () => {
  const firstTab = TABS[0];
  const lastTab = TABS[TABS.length - 1];

  TABS.forEach((element) => {
    element.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        if (element == firstTab) {
          e.preventDefault();
          lastTab.focus();
        } else {
          e.preventDefault();
          const focusableElement = TABS.indexOf(element) - 1;
          TABS[focusableElement].focus();
        }
      } else if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        if (element == lastTab) {
          e.preventDefault();
          firstTab.focus();
        } else {
          e.preventDefault();
          const focusableElement = TABS.indexOf(element) + 1;
          TABS[focusableElement].focus();
        }
      }
    });
  });
};

// On  click set the selected tab and the selected panel
const handleClick = () => {
  TABS.forEach((element) => {
    element.addEventListener('click', function () {
      setSelectedTab(element);
      showActivePanel(element);
    });
  });
};

handleClick();
createArrowNavigation();

// Initialize tabs

//Initialize tabs on load
const activateFirstPanel = () => {
  TABS[0].setAttribute('tabindex', '0');
  TABS[0].setAttribute('aria-selected', 'true');
  TABPANELS[0].classList.add('visible');
};

const checkInitialSelectedTab = () => {
  const targetedTabPanel = document
    .querySelector('.tabpanel:target')
    .getAttribute('aria-labelledby');
  const selectedTab = document.querySelector(`#${targetedTabPanel}`);
  selectedTab.setAttribute('aria-selected', 'true');
  selectedTab.removeAttribute('tabindex');
};

const handleInitialState = () => {
  TABS.forEach((e) => {
    e.setAttribute('tabindex', '-1');
    e.setAttribute('aria-selected', 'false');
  });

  window.location.href.indexOf('#panel') === -1
    ? activateFirstPanel()
    : checkInitialSelectedTab();
};

window.onload = handleInitialState;
