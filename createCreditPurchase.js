function createCreditPurchase(amt, merchant_name) {

    var merchant_string = JSON.stringify(merchant_json)
    var merchant_info = JSON.parse(merchant_string)

    var user_string = JSON.stringify(user_json)
    var user_info = JSON.parse(user_string)

    var d = {}
    var bank_url = ""

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
