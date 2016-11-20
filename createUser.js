function createUser(firstName, lastName, acctName) {
   var all_users = JSON.parse(JSON.stringify(getAllUsers()));

    alert(all_users[0])
}

// NOTE: This does not work at all
function getAllUsers(){

    var api_url = "http://api.reimaginebanking.com/customers?key=355f3102e837501d7620a220cd1ebd37";
    var get_response = "";


    get_response = $.ajax({
        url: api_url,
        type: "get",
        headers: {
            "Accept": "applications/json"
        },
        success: function(response){
            return response
        }
    });
    console.info(get_response)

    return get_response;

}
