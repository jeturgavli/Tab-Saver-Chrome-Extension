document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('saveTabs').addEventListener('click', saveTabs);
    document.getElementById('openTabs').addEventListener('click', openTabs);
  });
  
  function saveTabs() {
    chrome.tabs.query({}, function(tabs) {
      const tabUrls = tabs.map(tab => tab.url);
      chrome.storage.local.set({ 'savedTabs': tabUrls }, function() {
        alert('Tabs saved!');
      });
    });
  }
  
  function openTabs() {
    chrome.storage.local.get(['savedTabs'], function(result) {
      const savedTabs = result.savedTabs || [];
      for (const url of savedTabs) {
        chrome.tabs.create({ url: url });
      }
    });
  }
  