"use strict";
function usingCommand(command) {
  return function (func) {
    return function (request, sender, sendResponse) {
      if (request.command !== command) {
        return;
      }
      func(request, sender, sendResponse);
    };
  };
}

chrome.runtime.onMessage.addListener(
  usingCommand("hello")(function (request, sender, sendResponse) {
    if(location.href.includes('post.php?post='))
    {
      const idMatch =location.href.match(/post\.php\?post=(\d+)/) 
      const typeMatch = document.body.className.match(/post-type-(\S+)/);
      if(idMatch && idMatch.length > 1 && typeMatch && typeMatch.length > 1) {
       sendResponse({apiURL: `https://www.tamuc.edu/wp-json/wp/v2/${convertType(typeMatch[1])}/${idMatch[1]}`})
      }
      sendResponse({ apiURL: null })
    } else {
      const apiLink = document.querySelector(
        'link[rel="alternate"][type="application/json"]',
      );
      const apiURL = apiLink?.href;
      sendResponse({ apiURL });
    }
  }),
);

function convertType(str)
{
  const chart = {
    post: 'posts',
    program: 'program',
    page: 'pages',
    people: 'people',
    guide: 'guides',
    section: 'section',
    research_post: 'research_post',
  }
  return chart?.[str]
}

chrome.runtime.onMessage.addListener(
  usingCommand("hello")(function (request, sender, sendResponse) {
    const apiLink = document.querySelector(
      'link[rel="alternate"][type="application/json"]',
    );
    const apiURL = apiLink?.href;
    sendResponse({ apiURL });
  }),
);

chrome.runtime.onMessage.addListener(
  usingCommand("test")(function (request, sender, sendResponse) {
    console.log("running tests");
    runTests().then(result => {
      sendResponse(result)
    })
   return true;
  }),
);


chrome.runtime.onMessage.addListener(
  usingCommand("detail")(function (request, sender, sendResponse) {
    runDetails().then(result => {
      sendResponse(result)
    })
   return true;
  }),
);
