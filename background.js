// background.js


var current_bad_open = [];

var bad_sites = [{url:"https://www.reddit.com/", initial_cost:5, additional_cost:1}];

// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
  // Send a message to the active tab
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action"});
  });
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab){
	//console.log(tab.url);
	//chrome.tabs.sendMessage(tabId, {"message": "test"});

	var bad = isBad(tab.url, tabId);

	//chrome.tabs.sendMessage(tabId, {"message": "updated_tab"});
});


function isBad(url, tabId){
	var bad = false;
  chrome.storage.sync.get("sites", function(response){
    var bad_sites = Object.keys(response.sites).map(function (key) { return response.sites[key]; });
  	for(var i=0; i < bad_sites.length; i++){
  		if(bad_sites[i].url == url){
  			console.log("opened bad tab");
        chrome.tabs.sendMessage(tabId, {"message": "opened_bad_tab"});
    console.log("BAD");
  		}
  	}
  });
}

//opens new tab when open_new_tab message is sent
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "open_new_tab" ) {
      chrome.tabs.create({"url": request.url});
    }

    if(request.message === 'examine_url'){
    	if(isBad(request.url)){
    		alert("BAD BAD BAD TAB");
    		// chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    		// var activeTab = tabs[0];
    		// chrome.tabs.sendMessage(activeTab.id, {"message": "opened_bad_tab"});

    	}
    }
  }
);
