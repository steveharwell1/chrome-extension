const TAMUC_ORIGIN = "https://www.tamuc.edu";
import { Store } from "./js/store.js";

import { updateDOM } from "./js/App.js";
import {
  getTaskCommentsJSON,
  getDocumentMetaData,
} from "./js/NetworkHelpers.js";

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

const sendMessage = async (tab) => {
  if (!tab?.url) return;

  const url = new URL(tab.url);
  if (url.origin !== TAMUC_ORIGIN) {
    return;
  }
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

const sendMessageHandler = async () => {
  try {
    const [tab] = await chrome.tabs.query({
      active: true,
      lastFocusedWindow: true,
    });
    sendMessage(tab);
  } catch (error) {
    console.log("error trying to get active tab", { error });
  }
};
sendMessageHandler();

chrome.tabs.onUpdated.addListener(async () => {
  sendMessageHandler();
});

chrome.tabs.onActivated.addListener(async () => {
  sendMessageHandler();
});
