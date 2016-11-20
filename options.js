load_options();

document.getElementById('save').addEventListener('click',
    save_options);
document.getElementById('updateAccount').addEventListener('click',
    show_account_form);
document.getElementById('addAccount').addEventListener('click',
    add_account);
document.getElementById('addRow').addEventListener('click', add_row);
var classname = document.getElementsByClassName('remove');


for (var i = 0; i < classname.length; i++) {
    classname[i].addEventListener('click', function(event){
      var index = event.target.id.substring(6);
      var table = document.getElementById('websites');
      console.log(table);
      table.deleteRow(index);
    });
}

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
  var select = document.getElementById('charity');
  localStorage.charity = select.children[select.selectedIndex].value;
}

function load_options() {
  chrome.storage.sync.get("credentials", function(response){
    if(response.credentials){
      document.getElementById('userform').style.display = "none";
      document.getElementById('userinfo').style.display = "block";
      document.getElementById('name').textContent = response.credentials.first_name + " " + response.credentials.last_name;

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

  createUser(first, last, account, user);


  document.getElementById('name').textContent = first + " " + last;
  document.getElementById('userform').style.display = "none";
  document.getElementById('userinfo').style.display = "block";

}

function add_row(){
  var table = document.getElementById('websites');
  var row = table.insertRow();
  var url = row.insertCell(0);
  var initial = row.insertCell(1);
  var additional = row.insertCell(2);
  var remove = row.insertCell(3);
  var index = table.rows.length - 3;

  url.innerHTML = '<input type="text" class="url" id="url' + index + '"></input>';
  initial.innerHTML = '$<input type="text" id="initialPenalty' + index + '"></input>';
  additional.innerHTML = '$<input type="text" id="additionalPenalty' + index + '"></input>'
  remove.innerHTML = '<button class="remove" id="remove' + index + '">X</button>';

  classname[i].addEventListener('click', function(event){
    var index = event.target.id.substring(6);
    var table = document.getElementById('websites');
    console.log(index);
    table.deleteRow(index);
    console.log("plz");
  });
}
