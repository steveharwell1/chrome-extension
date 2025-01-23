chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        console.log(sender.tab ?
            "from a content script:" + sender.tab.url :
            "from the extension");
        if (request.greeting === "hello") {
            const apiLink = document.querySelector('link[rel="alternate"][type="application/json"]')
            const apiURL = apiLink?.href
            sendResponse({ apiURL });
        }
    }
);

console.log('content script loaded')