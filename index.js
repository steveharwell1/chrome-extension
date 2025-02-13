import { TAMUC_ORIGIN } from "./js/config.js";
import { Store } from "./js/store.js";

import { updateDOM } from "./js/App.js";
import {
  getTaskCommentsJSON,
  getDocumentMetaData,
} from "./js/NetworkHelpers.js";
import {
  filterTabsAndOrigin,
  filterTabsAndOrigin2,
} from "./js/MessageHelpers.js";
import { Router } from "./js/components/Router.js";
import { DiscussionPage } from "./js/components/DiscussionPage.js";
import { SettingsPage } from "./js/components/SettingsPage.js";
import { DetailsPage } from "./js/components/DetailsPage.js";
import { FeedbackPage } from "./js/components/FeedbackPage.js";
import { NotFoundPage } from "./js/components/NotFoundPage.js";

const router = new Router();
router.addDefaultComponent(NotFoundPage);
router.addRoute("Discussion", "/discussion", DiscussionPage);
router.addRoute("Details", "/details", DetailsPage);
router.addRoute("Feedback", "/feedback", FeedbackPage);
router.addRoute("Settings", "/settings", SettingsPage);

const store = new Store();

const getDefaultData = () => {
  return {
    store,
    currentPage: "/discussion",
    teamworkData: null,
    recipients: [],
    router,
    detail: null,
    test: null,
    tabUrl: null,
  };
};

store.setValue(getDefaultData());
updateDOM(getDefaultData());
store.onUpdate(updateDOM);

const getApiUrl = async (tab) => {
  try {
    const { apiURL } = await chrome.tabs.sendMessage(tab.id, {
      command: "hello",
    });
    return apiURL;
  } catch (error) {
    console.log("error trying to get apiURL from tab", { error });
    return null;
  }
};

const getTeamworkId = async (apiURL) => {
  try {
    const {
      acf: { teamwork_task_url },
    } = await getDocumentMetaData(apiURL);
    return teamwork_task_url;
  } catch (error) {
    console.log("error trying to get twId", { error });
    return null;
  }
};

const getCommentData = async (twId) => {
  try {
    const teamworkData = await getTaskCommentsJSON(twId);
    return teamworkData;
  } catch (error) {
    console.log("error trying to get teamworkData", { error });
    return null;
  }
};

const startupMessage = async (tab) => {
  const apiURL = await getApiUrl(tab);
  if (!apiURL) {
    return;
  }
  console.log({ apiURL });
  const twId = await getTeamworkId(apiURL);
  if (!twId) {
    return;
  }
  console.log({ twId });
  const teamworkData = await getCommentData(twId);
  console.log({ teamworkData });
  if (teamworkData) {
    const recipients = Object.values(teamworkData?.included?.users || {});
    store.transformValue((data) => {
      data.teamworkData = teamworkData;
      data.twId = twId;
      data.tabUrl = tab.url;
      data.recipients = recipients;
      return data;
    });
  }
};

const sendStartupMessage = filterTabsAndOrigin2(startupMessage,);

sendStartupMessage();
let initialTabId = null
getActiveTab().then(tab => {
  if(tab) {
    initialTabId = tab.id
  }
})


chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tabInfo) => {
  if(changeInfo.status == 'complete' && tabId == initialTabId) {
    console.log("Calling from updated");
      console.log("Update Info", {tabId, changeInfo, tabInfo})
    store.setValue(getDefaultData());
    sendStartupMessage();
  }
});

async function getActiveTab () {
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

// Called when the active tab is changed
// chrome.tabs.onActivated.addListener(async ({tabId}) => {
//   console.log("Calling from Activated");
//   var tabInfo = await getActiveTab()
//   console.log("Activate Info", {tabId, tabInfo})
//   if (tabInfo?.url?.includes('tamuc.edu')) {
//     //await chrome.sidePanel.setOptions({ tabId, enabled: true });
//     store.setValue(getDefaultData());
//     sendStartupMessage();
//   } else {
//     //await chrome.sidePanel.setOptions({ tabId, enabled: false });
//   }
// });

console.log("panel setup complete");
