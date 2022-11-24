const tabs = document.querySelector('.tabs');
const tabButtons = tabs.querySelectorAll('[role="tab"]');
const tabContent = Array.from(tabs.querySelectorAll('[role="tabpanel"]'));

function handleTabClick(event) {
  // hide all tab panels
  tabContent.forEach((panel) => {
    panel.hidden = true;
  });
  // unselect all tabs :  tab.ariaSelected = false;
  tabButtons.forEach((tab) => {
    tab.setAttribute('aria-selected', false);
  });
  // select the clicked tab
  event.currentTarget.setAttribute('aria-selected', true);
  // display the relevalt tab
  const { id } = event.currentTarget;

  // find in the array of tabContent
  console.log(tabContent);
  const tabPanel = tabContent.find(
    (panel) => panel.getAttribute('aria-labelledby') === id
  );
  tabPanel.hidden = false;
}

tabButtons.forEach((button) =>
  button.addEventListener('click', handleTabClick)
);
