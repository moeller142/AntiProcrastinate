load_options();

document.getElementById('save').addEventListener('click',
    save_options);
document.getElementById('updateAccount').addEventListener('click',
    show_account_form);
document.getElementById('addAccount').addEventListener('click',
    add_account);

function save_options() {
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

function load_options() {
  chrome.storage.sync.get("credentials", function(response){
    if(response.credentials){
      document.getElementById('userform').style.display = "none";
      document.getElementById('userinfo').style.display = "block";
      document.getElementById('name').textContent = response.credentials.first_name + " " + response.credentials.last_name;
      document.getElementById('account').textContent = response.credentials.account_id;

    } else {
      document.getElementById('userform').style.display = "table";
      document.getElementById('userinfo').style.display = "none";
    }
  });

  chrome.storage.sync.get("sites", function(response){
    if(response.sites){
      var bad_sites = Object.keys(response.sites).map(function (key) { return response.sites[key]; });
  		for(var i=0; i < bad_sites.length; i++){
        document.getElementById('url' + i).value = bad_sites[i].url;
        document.getElementById('initialPenalty' + i).value = bad_sites[i].initialPenalty;
        document.getElementById('additionalPenalty' + i).value = bad_sites[i].additionalPenalty;
      }
    }
  });

}

function show_account_form(){
    document.getElementById('userform').style.display = "table";
    document.getElementById('userinfo').style.display = "none";
}

function add_account(){
  var first = document.getElementById('firstName').value,
      last = document.getElementById('lastName').value,
      account = document.getElementById('accountName').value,
      user = {};

  createUser(first, last, first+last+account, user);


}
