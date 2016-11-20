// background.js


var bad = [];

// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
  // Send a message to the active tab
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action"});
  });
});


//sends message when tab is updated to an illegal url 
chrome.tabs.onUpdated.addListener(
	//sends a message that 
	function(tabId, changeInfo, tab){
		chrome.storage.get("sites", function(response){
			response["sites"].forEach(function(site){
				if(site["url"]===chrome.tabs.url){
					chrome.tabs.sendMessage{tabId, {"message": "opened_bad_tab"}};
					bad.push({url:site["url"], timeOpened:new Date});
				}
			})
			
		}
		)
		//chrome.tabs.sendMessage(tab.id, {"message": "tab_updated"})
	}
);

//opens new tab when open_new_tab message is sent
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "open_new_tab" ) {
      chrome.tabs.create({"url": request.url});
    }
  }
);


function 
