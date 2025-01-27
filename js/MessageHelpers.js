
import { TAMUC_ORIGIN } from './config.js';
export const filterTabsAndOrigin = (func) =>  {
    return async function(tab) {
      if (!tab?.url) return;

      const url = new URL(tab.url);
      if (url.origin !== TAMUC_ORIGIN) {
        return;
      }
        console.log('is appropriate origin and tab exists')
        return func(tab)
    }
}
export const sendMessageHandler = sender => async () => {
  try {
    const [tab] = await chrome.tabs.query({
      active: true,
      lastFocusedWindow: true,
    });
      sender(tab)
  } catch (error) {
    console.log("error trying to get active tab", { error });
  }
};

