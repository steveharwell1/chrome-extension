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

detail("Meta Description", "meta-description", async () => {
  const elem = document.querySelector('meta[name="description"]');
  if (!elem) {
    return failDetail("Meta description does not exist.");
  } else if ((elem?.content || "").length == 0) {
    return failDetail("Meta description has no content.");
  }
  return okDetail({ content: elem.content });
});

detail("Content Group", "content-group", async () => {
  const elem = document.querySelector("body");
  if (!elem) {
    return failDetail("Body does not exists.");
  } else if ((elem.dataset?.pageType || "").length == 0) {
    return failDetail("This page does not have a content group.");
  }
  return okDetail({ content: elem.dataset.pageType });
});

detail("Featured Image", "featured-image", async () => {
  const elem = document.querySelector('meta[property="og:image"]');
  if (!elem) {
    return failDetail(
      "Featured image tag doesn't exist. Please check Yoast settings.",
    );
  } else if ((elem.content || "").length === 0) {
    failDetail("Featured image value is empty. Please check Yoast settings.");
  }
  return okDetail({ src: elem.content });
});

detail("Alt Text", "alt-text", async () => {
  const elems = document.querySelectorAll("main img[alt]:not(.tamuc-intro-page-link__arrow)");
  const imagesData = [];
  elems.forEach((e) => {
    const alt = e.alt == "" ? "Hidden from screen readers" : e.alt;
    imagesData.push({ src: e.src, alt });
  });
  const missing = document.querySelectorAll("main img:not([alt]):not(.tamuc-intro-page-link__arrow)");
  missing.forEach((e) => {
    imagesData.push({ src: e.src, alt: "Missing" });
  });
    return okDetail({imagesData});
});
