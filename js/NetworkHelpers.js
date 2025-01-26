import { origin } from "./config.js";

const getFormattedKey = () => btoa(localStorage.getItem("teamworkKey") + ":");
const optionsFromVerb = (verb) => {
  return {
    method: verb,
    headers: {
      authorization: `Basic ${getFormattedKey()}`,
    },
  };
};
const getOptions = optionsFromVerb("GET");
const postOptions = (body) => {
  body = JSON.stringify(body);
  const options = optionsFromVerb("POST");
  options.body = body;
  return options;
};

export const getTaskCommentsJSON = async (taskId) => {
  return fetch(
    `${origin}/projects/api/v3/tasks/${taskId}/comments.json?include=users`,
    getOptions,
  ).then((response) => response.json());
};

export const getTaskData = async (taskId) => {
  return fetch(
    `${origin}/projects/api/v3/tasks/${taskId}.json?include=comments,users`,
    getOptions,
  ).then((response) => response.json());
};

export const addMessageToTask = async (taskId, message) => {
  const options = postOptions({
    objectId: taskId,
    objectType: "task",
    comment: {
      body: message,
      //"author-id": userId,
      "content-type": "TEXT",
      //notify: notifyUserId, //Add empty quotes when no notification is required
      "notify-current-user": false,
      skipNotifications: false,
      "remove-other-files": true,
      "grant-access-to": "",
      private: 0,
      pendingFileAttachments: [],
      updateFiles: true,
      fileIds: "",
      attachmentsCategoryIds: "",
      pendingFileAttachmentsCategoryIds: "",
    },
  });
  return fetch(`${origin}/tasks/${taskId}/comments.json`, options);
};
export const getDocumentMetaData = async (apiURL) => {
  console.log("getDocumentMetaData", { apiURL });
  return fetch(`${apiURL}?_fields=acf`).then((e) => e.json());
};
