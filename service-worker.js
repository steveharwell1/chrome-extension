// Redefining this since I can't import as a module
const TAMUC_ORIGIN = "https://www.tamuc.edu";

chrome.action.onClicked.addListener( (tab) => {
  chrome.sidePanel.open({tabId: tab.id})
});

chrome.runtime.onMessage.addListener((message, sender) => {
  // The callback for runtime.onMessage must return falsy if we're not sending a response
  (async () => {
    if (message.type === 'open_side_panel') {
      // This will open a tab-specific side panel only on the current tab.
      await chrome.sidePanel.open({ tabId: sender.tab.id });
    }
  })();
  return false;
});

function check_origin(tab) {
  if(!tab?.url) {
    return false;
  }
  const url = new URL(tab.url);
  return url.origin === TAMUC_ORIGIN
}

chrome.tabs.onUpdated.addListener(async (tabId, info, tab) => {
  var is_origin = check_origin(tab)
  console.log('Service worker on update', {tabId, info, tab, is_origin})
  // Enables the side panel on google.com
  if (is_origin && info.status == 'complete') {
    console.log('Service worker on update opening panel')
    await chrome.sidePanel.setOptions({ 
      tabId,
      path:  "index.html",
      enabled: true
    });
  }
  if(!is_origin) {
    console.log('Service worker on update closing panel')
    await chrome.sidePanel.setOptions({
      tabId,
      path:  "index.html",
      enabled: false
    });
  }
});

const getActiveTab = async () => {
  try {
    const [tab] = await chrome.tabs.query({
      active: true,
      lastFocusedWindow: true,
    });
      return tab;
  } catch (error) {
    console.log("error trying to get active tab", { error });
      return null;
  }
}
