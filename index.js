import { TAMUC_ORIGIN } from './js/config.js';
import { Store } from "./js/store.js";

import { updateDOM } from "./js/App.js";
import {
  getTaskCommentsJSON,
  getDocumentMetaData,
} from "./js/NetworkHelpers.js";
import { filterTabsAndOrigin, sendMessageHandler } from './js/MessageHelpers.js';
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
const defaultData = {
  store,
  currentPage: "/discussion",
  teamworkData: null,
  router,
};
store.setValue(defaultData);
updateDOM(defaultData);
store.onUpdate(updateDOM);

const startupMessage = async (tab) => {
  // Enables the side panel on google.com
  let apiURL;
  let twId;
  try {
    const { apiURL: tryApiUrl } = await chrome.tabs.sendMessage(tab.id, {
      command: "hello",
    });
    apiURL = tryApiUrl;
  } catch (error) {
    console.log("error trying to get apiURL from tab", { error });
    return;
  }
  try {
    const {
      acf: { teamwork_task_url: twId_temp },
    } = await getDocumentMetaData(apiURL);
    twId = twId_temp;
  } catch (error) {
    console.log("error trying to get twId", { error });
    return;
  }
  try {
    const teamworkData = await getTaskCommentsJSON(twId);
    console.log("sendMessage", { teamworkData });
    store.transformValue((data) => {
      data.teamworkData = teamworkData;
      data.twId = twId;
      return data;
    });
  } catch (error) {
    console.log("error trying to get teamworkData", { error });
    return;
  }
};

const sendStartupMessage = sendMessageHandler(filterTabsAndOrigin(startupMessage));

sendStartupMessage()
chrome.tabs.onUpdated.addListener(async () => {
  sendStartupMessage();
});

chrome.tabs.onActivated.addListener(async () => {
  sendStartupMessage();
});
