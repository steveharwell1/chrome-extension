
import { TAMUC_ORIGIN } from './config.js';
export const filterTabsAndOrigin = (func) =>  {
    return async function(tab) {
      if (!tab?.url) return;

      const url = new URL(tab.url);
      if (url.origin !== TAMUC_ORIGIN) {
        return;
      }
        return func(tab)
    }
}


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

export const filterTabsAndOrigin2 = sender => async () => {
    const tab = await getActiveTab();
    console.log('sendMessageHandler', {tab});
    if(tab && tab.url && tab.url.includes('tamuc.edu')) {
      //await chrome.sidePanel.setOptions({ enabled: true });
      sender(tab)
    } else {
      //await chrome.sidePanel.setOptions({ enabled: false });
    }
};

