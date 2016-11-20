document.getElementById('save').addEventListener('click',
    save_options);


function save_options() {
  var acctNum = document.getElementById('accountNum').value;

  var penalizedSites = {};
  var sites = document.getElementsByClassName('url');
  sites = Array.prototype.slice.call(sites, 0);

  sites.forEach( function(site, index){
    var initial = document.getElementById('initialPenalty' + index).value || 0,
        additional = document.getElementById('additionalPenalty' + index).value || 0;

    if(site.value != ""){
    penalizedSites[index] = { url: site.value,
                              initialPenalty: initial,
                              additionalPenalty: additional};
                            }
  });

  chrome.storage.sync.set({
    accountNum: acctNum,
    sites: penalizedSites
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });


}
