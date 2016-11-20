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
    	alert("This is not a productive website! You just donated $" + request.initialPenalty + "\n You will be charged $" + request.additionalPenalty + " for every 15 minutes this tab is open" );
    }

});
