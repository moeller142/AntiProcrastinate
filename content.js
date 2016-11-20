// content.js
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "clicked_browser_action" ) {
      var firstHref = $("a[href^='http']").eq(0).attr("href");

      console.log(firstHref);

      // This line is new!
      chrome.runtime.sendMessage({"message": "open_new_tab", "url": firstHref});
    }

    if( request.message === "opened_bad_tab" ){
    	console.log("alerting bad tab");
      chrome.storage.sync.get("accountNum", function(response){console.log(response)});
    	alert("BAD TAB");
    }

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
