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

function neutral(message) {
  return { status: "NEUTRAL", message };
}

//
//test("Words of Note", async () => {
//  return fail("Not Implemented");
//});
//
//
//test("URL Policy", async () => {
//  // What is our url policy? no swcpf=1, no redirect=none, no _gl
//  return fail("Not Implemented");
//});


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
  const elem = Array.from(
    document.querySelectorAll("main :where(img):not([alt]):not([aria-hidden])"),
  );

  if (elem.length === 0) {
    return ok("All images have alt text or are hidden from screen readers");
  } else {
    const text = elem.map((e) => e.src).join(" ");
    return fail(text);
  }
});

function isProgram(href) {
  return /programs\/[^?]/.test(href);
}

function getPostId() {
  const link = document.querySelector(
    'link[rel=alternate][type="application/json"]',
  )?.href;
  const ptrn = /wp\/v2\/[a-z_]+\/(\d+)/;
  return link.match(ptrn)?.[1];
}

test("In Program Finder", async () => {
  if (!isProgram(location.href)) {
    return ok("This test does not apply to this page");
  }
  const id = getPostId();
  try {
    const result = await fetch("https://www.tamuc.edu/programs/");
    const body = await result.text();
    const hasProgram = body.includes(`&quot;${id}&quot;`);
    console.log({ body, id, hasProgram });
    if (hasProgram) {
      return ok("Program is listed in program finder");
    } else {
      return fail("Please list program in program finder");
    }
  } catch {
    return fail("Could not access program finder");
  }
});

function getProgramParentDepartment() {
  const elem = document.querySelector(
    ".breadcrumb-nav--desktop .breadcrumb-nav__item--desktop:nth-last-child(2) > a",
  );
  return elem?.href;
}

test("Program is listed in department page.", async () => {
  if (!isProgram(location.href)) {
    return ok("This test does not apply to this page");
  }
  const id = getPostId();
  const deptURL = getProgramParentDepartment();
  if (!deptURL) {
    return fail("Program breadcrumb is not correct");
  }
  try {
    const result = await fetch(deptURL);
    const body = await result.text();
    const hasProgram = body.includes(`post-${id}`);
    console.log({ body, id, hasProgram });
    if (hasProgram) {
      return ok("Program is listed in its department page");
    } else {
      return fail(
        "Please list program on its department page, or correct breadcrumb.",
      );
    }
  } catch {
    return fail("Could not access the associated department page");
  }
});

