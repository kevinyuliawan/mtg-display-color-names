chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({mtgGuildColorsEnabled: true}, function() {
    console.log("Colors enabled:", true);
  });
});

chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
  chrome.declarativeContent.onPageChanged.addRules([{
    conditions: [
      // new chrome.declarativeContent.PageStateMatcher({
      //   pageUrl: {hostEquals: 'developer.chrome.com'},
      // })
    ],
    actions: [new chrome.declarativeContent.ShowPageAction()]
  }]);
});
