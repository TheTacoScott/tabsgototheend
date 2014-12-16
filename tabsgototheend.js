var CurrentTabInWindow = {};

chrome.tabs.onCreated.addListener(function (tab) 
{
  chrome.tabs.move(tab.id, {"index": -1});
});

chrome.tabs.onSelectionChanged.addListener(function (tabId, selectInfo) 
{
  chrome.tabs.get(tabId, function (tab) 
  {
    CurrentTabInWindow[selectInfo.windowId] = tab.index;
    //console.log(CurrentTabInWindow);
    //console.log(tab.index);
  });
});

chrome.tabs.onRemoved.addListener(function (tabId, removeInfo) 
{
  if (removeInfo.isWindowClosing) { return; } //https://developer.chrome.com/extensions/tabs#event-onRemoved
  chrome.tabs.getAllInWindow(null, function (tabs) 
  {
    TabThatMatters = 0;
    if (tabs[0].windowId in CurrentTabInWindow)
    {
      TabThatMatters = CurrentTabInWindow[tabs[0].windowId];
    }

    if (tabs.length > TabThatMatters) 
    {
      chrome.tabs.update(tabs[TabThatMatters].id, { selected: true });
    }
    else 
    {
      chrome.tabs.update(tabs[tabs.length - 1].id, { selected: true });
    }
  });
});