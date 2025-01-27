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

function ok(data) {
  return { status: "OK", data };
}

function fail(message) {
  return { status: "FAIL", message };
}

detail("Meta Description", 'meta-description', async () => {
  const elem = document.querySelector('meta[name="description"]');
  if (!elem) {
    return fail("Meta description does not exist.");
  } else if ((elem?.content || "").length == 0) {
    return fail("Meta description has no content.");
  }
  return ok({content: elem.content});
});
