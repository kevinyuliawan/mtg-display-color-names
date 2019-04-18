chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({mtgGuildColorsEnabled: true}, function() {
    // console.log("Colors enabled:", true);
  });
});
