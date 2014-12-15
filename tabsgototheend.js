chrome.tabs.onCreated.addListener(function (tab) 
{
  chrome.tabs.move(tab.id, {"index": -1});
});
