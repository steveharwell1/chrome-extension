"use strict";
const tests = [];
const runTests = async function () {
  return Promise.all(tests.map((func) => func()));
};

function test(title, func) {
  tests.push(async function () {
    const result = await func();
    if (!result) {
      return { title, ...fail("Test exited without declaring pass or fail") };
    }
    return { title, ...result };
  });
}

function ok(message) {
  return { status: "OK", message };
}

function fail(message) {
  return { status: "FAIL", message };
}

test("Manual Check: Links and Attached Documents", async () => {
  return ok(
    "Please manually check all links on this page. Ensure they work and make sense",
  );
});

test("Has Meta Description", async () => {
  const elem = document.querySelector('meta[name="description"]');
  if (!elem) {
    return fail("Meta description does not exist.");
  } else if ((elem?.content || "").length == 0) {
    return fail("Meta description has no content.");
  }
  return ok("PASSED");
});

test("Alt tags", async () => {
  // Check the tags you can and advise for the other to be checked
  // in the Details tab/page
  return fail("Not Implemented");
});


test("URL Policy", async () => {
  // What is our url policy? no swcpf=1, no redirect=none, no _gl
  return fail("Not Implemented");
});


test("Manual Check: Notify Stakeholder", async () => {
  return ok(
    "Manual Checklist: Notify Stakeholder of publication and inform them of the process for submitting edit requests",
  );
});

test("Action: Copy card to Maintenance project 22028", async () => {
  return ok(
    "Once the checklist is complete, migrate the teamwork card to Maintenance Project 22028",
  );
});

