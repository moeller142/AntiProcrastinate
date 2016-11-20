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

//alerts content if bad page has been opened
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab){
	if(changeInfo.status === "complete"){
		var already_on = false;
		current_bad_open.forEach(function(open_site){
			if(open_site.url === tab.url){
				already_on = true;
			}
		});
		if(!already_on){
			var bad = isBad(tab.url, tabId);
		}

	}

});

// chrome.tabs.onRemoved.addListener(function (tabId, removeInfo){
// 	console.log("closed tab")
// 	var closing_url = "";
// 	chrome.tabs.get(tabId, function(tab){
// 		closing_url = tab.url;
// 	});

// 	console.log("closing" closing_url);

// 	for(i = 0; i <current_bad_open.length; i++){
// 		open_site = current_bad_open[i];
// 		if(open_site.url === closing_url){
// 			current_bad_open.splice(i, 1);
// 			console.log("removing" closing_url);
// 			chrome.tabs.sendMessage(tabId, {"message": "closed_bad_tab"});

// 		}
// 	}




function isBad(url, tabId){
	var bad = false;
	chrome.storage.sync.get("sites", function(response){
		var bad_sites = Object.keys(response.sites).map(function (key) { return response.sites[key]; });
		for(var i=0; i < bad_sites.length; i++){
			if(bad_sites[i].url == url){
				console.log("opened bad tab");
				current_bad_open.push({url: tab.url, time_opened: new Date()});
				chrome.tabs.sendMessage(tabId, {"message": "opened_bad_tab"});
				console.log("BAD");
			}
		}
	});
}
