// content.js
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "clicked_browser_action" ) {
      var firstHref = $("a[href^='http']").eq(0).attr("href");
      console.log(firstHref);
      chrome.runtime.sendMessage({"message": "open_new_tab", "url": firstHref});
    }

    if( request.message === "opened_bad_tab" ){
    	console.log("alerting bad tab");
      chrome.storage.sync.get("accountNum", function(response){console.log(response)});
    	alert("BAD TAB");
    }

<<<<<<< HEAD
	if( request.message === "test" ){
    	alert("test");
    }


    // if( request.message === "updated_tab" ){
    // 	console.log("updated a tab");
    //   	chrome.runtime.sendMessage({"message": "examine_url", "url": window.location.href});
    // }

    //  if( request.message === "current_url" ){
    // 	console.log(window.location.href);
    // }
  }
);
=======
    if( request.message === "closed_bad_tab" ){
    	console.log("alerting bad tab closed");
    	alert("YAY BACK TO WORK!");
    }});

>>>>>>> 4c49485d1609b741f98c6cbce93b2520b50ee016
