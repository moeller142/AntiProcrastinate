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
