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
    const apiLink = document.querySelector(
      'link[rel="alternate"][type="application/json"]',
    );
    const apiURL = apiLink?.href;
    sendResponse({ apiURL });
  }),
);

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
      console.log('running tests')
    sendResponse({});
  }),
);
