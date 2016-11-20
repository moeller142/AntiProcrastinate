function createUser(firstName, lastName, acctName, accountJson) {

    // url for customer list GET request
    var customer_url = "http://api.reimaginebanking.com/customers?key=355f3102e837501d7620a220cd1ebd37";

    // begin GET call for customer list
    $.ajax({
        url: customer_url,
        type: "get",
        headers: {
            "Accept": "applications/json"
        },
        success: function(response){

            var customer;

            // loop through reponse and find customer with matching name
            response.forEach(function(person){
                if(person["first_name"] === firstName && person["last_name"] === lastName){
                    customer = person;
                }
            })

            // use found customer id to get account list url
            var account_url = "http://api.reimaginebanking.com/customers/" + customer["_id"] 
                + "/accounts?key=355f3102e837501d7620a220cd1ebd37";

            // begin GET request for account list
            $.ajax({
                url: account_url,
                type: "get",
                headers: {
                    "Accept": "applications/json"
                },
                success: function(response){
                    // loop through response and find account with matching nickname
                    response.forEach(function(account){
                        // once found set account json object to correct
                        if(account["nickname"] === acctName){
                            accountJson = {
                                "first_name": customer["first_name"],
                                "last_name": customer["last_name"],
                                "id": customer["_id"],
                                "account_id": account["_id"]
                            }
                        }
                    })
                }
            });
        }
    });
}
