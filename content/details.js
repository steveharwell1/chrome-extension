"use strict";
const details = [];
const runDetails = async function () {
  return Promise.all(details.map((func) => func()));
};

function detail(title, displayType, func) {
  details.push(async function () {
    const result = await func();
    return { title, displayType, ...result };
  });
}

function okDetail(data) {
  return { status: "OK", data };
}

function failDetail(message) {
  return { status: "FAIL", message };
}

detail("Meta Description", 'meta-description', async () => {
  const elem = document.querySelector('meta[name="description"]');
  if (!elem) {
    return failDetail("Meta description does not exist.");
  } else if ((elem?.content || "").length == 0) {
    return failDetail("Meta description has no content.");
  }
  return okDetail({content: elem.content});
});


detail("Content Group", 'content-group', async () => {
  const elem = document.querySelector('body');
  if (!elem) {
    return failDetail("Body does not exists.");
  } else if ((elem.dataset?.pageType || "").length == 0) {
    return failDetail("This page does not have a content group.");
  }
  return okDetail({content: elem.dataset.pageType});
});
