// background.js

console.log("APP IS STARTING");
alert("app STARTING");
var user_bank_info = "user_json = {\"first_name\": \"John\",\"last_name\": \"Doe\",\"id\": \"583114ce360f81f10455404d\",\"account_id\": \"5831329b360f81f10455405e\"}";
// var user_bank_info = chrome.storage.sync.get("credentials"function(credentials){
// 	return credentials; 
// });
var current_bad_open = [];
var charity = "Favorite Charity";

// var charity = chrome.storage.sync.get("charity"function(chosen_charity){
// 	return chosen_charity; 
// });

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
			if(tab.url.includes(open_site.url)){
				already_on = true;
			}
		});
		if(!already_on){
			isBad(tab.url, tabId);
		}

	}

});

chrome.storage.onChanged.addListener(function (changes, areaName){
	for (i =0; i<)
})


chrome.tabs.onRemoved.addListener(function (tabId, removeInfo){

	console.log("closing");

	for(i = 0; i <current_bad_open.length; i++){
		open_site = current_bad_open[i];

		//if closed site is a bad page
		if(open_site.id === tabId){
			console.log("removing");

			var current_time = new Date();
			var time_spent = new Date(open_site.time_opened - current_time);

			//minutes spent on site
			var minutes_spent = Math.round(((time_spent % 86400000) % 3600000) / 60000);

			//money the user will be charged
			var money_charged = (Math.floor(minutes_spent/15) * open_site.additional_penalty) +  open_site.intial_penalty;

			console.log("mins- " + minutes_spent + " money_charged- "+ money_charged);

			//TO DO: get users bank json from storage

			//makes payment from user's account specified in json string of the amount money_charged to the charity specified

			makePayment(user_bank_info, money_charged, charity);

			//removes site from current bad open sites
			current_bad_open.splice(i, 1);

			alert("YAY BACK TO WORK!\n You just donated $" + money_charged);
		}
	}
});



function isBad(url, tabId){
	var bad = false;
	chrome.storage.sync.get("sites", function(response){
		var bad_sites = Object.keys(response.sites).map(function (key) { return response.sites[key]; });
		for(var i=0; i < bad_sites.length; i++){
			if(url.includes(bad_sites[i].url)){
				console.log("opened bad tab");
				console.log(parseInt(bad_sites[i].initialPenalty));
				current_bad_open.push({url: url, time_opened: new Date(), id: tabId, intial_penalty: parseInt(bad_sites[i].initialPenalty) , additional_penalty: parseInt(bad_sites[i].additionalPenalty)});
				chrome.tabs.sendMessage(tabId, {"message": "opened_bad_tab"});
				console.log("BAD");
			}
		}
	});
}

function makePayment(user_string, amt, merchant_name) {

    user_info = JSON.parse(JSON.stringify(user_string));

    var merchant_info = {
      "merchants": [
        {
          "name": "Favorite Charity",
          "id": "583129f9360f81f104554055"
        },

        {
            "name": "Fake Imposter",
            "id": "123456781234568"
        },

        {
            "name": "ASDFASDFASDF",
            "id": ";lsdf;lsdf"
        }

      ]
    };

    var d = {};
    var bank_url = "";

    merchant_info["merchants"].forEach(function(merchant){
        if(merchant["name"] === merchant_name){

            d = {
              "merchant_id": merchant["id"],
              "medium": "balance",
              "purchase_date": "2016-11-20",
              "amount": amt,
              "description": "Donation from script"
            };

            bank_url = "http://api.reimaginebanking.com/accounts/" + user_info["account_id"]
                + "/purchases?key=355f3102e837501d7620a220cd1ebd37"


        }
    })


    $.ajax({
        url: bank_url,
        type: "post",
        data: JSON.stringify(d),
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        dataType: "json",
        success: function(data) {
            alert("Charged " + amt)
            console.info(data)
        }

    });
}
