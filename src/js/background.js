chrome.browserAction.onClicked.addListener(function() {
    chrome.tabs.executeScript(null, {file: "src/js/content_script.js"});
});


chrome.storage.local.set({"isConverted": false});
