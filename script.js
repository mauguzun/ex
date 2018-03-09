function getPrice(count) {


    var result = priceTable.find(t => t.min <= count && t.max > count);
    if (count < 1)
        return priceTable.find(t => t.min == 1);
    if (result == undefined)
        return priceTable.find(t => t.min == 10);
    else
        return result;
}


var order = {
    quanity: 1, price: 39.00, user: {   }
}


var priceTable =
    [
        { min: 1, max: 3, price: 39, title: "from 1 to 3" },
        { min: 3, max: 5, price: 37, title: "from 3 to 5 " },
        { min: 5, max: 7, price: 35, title: "from 5 to 7 " },
        { min: 7, max: 10, price: 29, title: "from 7 to 10" },
        { min: 10, max: null, price: 23, title: "more then 10" },
    ]


$("input[name='quanity']").change(function () {

    var q = $(this).val();
    var qInt = parseInt(q);

    if (qInt > 0) {
        order.quanity = qInt;
        order.price = (getPrice(qInt).price * order.quanity).toFixed(2);

       

        $("#total").html(order.price);
       
    }
})

$("#order_form").submit(function () {


   
    $("#res-total").text(order.price);
    $("#res-quanity").text(order.quanity);

    order.user = objectifyForm($(this).serializeArray());

    console.log(order.user);

    $(this).fadeOut(function () {
        $("#result").fadeIn();
        
    });
    return false;
  
})
$("#back").click(function () {

    $("#result").fadeOut(function () { $("#order_form").fadeIn() });
   
})
function objectifyForm(formArray) {//serialize data function

    var returnArray = {};
    for (var i = 0; i < formArray.length; i++) {
        returnArray[formArray[i]['name']] = formArray[i]['value'];
    }
    return returnArray;
}

/**paupale*/

paypal.Button.render({
    env: 'production',
    // Pass the client ids to use to create your transaction on sandbox and production environments

    client: {
        sandbox: 'AVrzFQxWCX8bqs37CZnSZkAlMzpmakUu6IxuJyBJ7WwCFMH6w4qe5KgKuQbS0XZPfyWdn7Z9vdUze_Yf', // from https://developer.paypal.com/developer/applications/
        production: 'vstavlat sjuda'
  // from https://developer.paypal.com/developer/applications/
    },
    locale: 'de_DE',

    style: {
        size: 'responsive',
        color: 'blue',
        shape: 'rect',
        label: 'checkout'
    },


    // Pass the payment details for your transaction
    // See https://developer.paypal.com/docs/api/payments/#payment_create for the expected json parameters

    payment: function (data, actions) {



        return actions.payment.create({

            payment: {


                transactions: [
                    {
                        amount: { total: order.price, currency: 'EUR' },
                        invoice_number: "contact email  :"  + order.user.email + " - company : " + order.user.company + " - for : " + order.quanity,
                        description: Date.now,

                        item_list: {
                            shipping_address: {
                                recipient_name: order.user.name + " " + order.user.lastname,
                                line1: order.user.line1,
                                line2: '',
                                city: order.user.city,
                                country_code: order.user.country_code,
                                postal_code: order.user.postal_code,
                                phone: order.user.phone,
                                state: order.user.state
                            }
                        }
                    }
                ]
            }
        })
    },



    // Display a "Pay Now" button rather than a "Continue" button

    commit: true,

    // Pass a function to be called when the customer completes the payment

    onAuthorize: function (data, actions) {
        return actions.payment.execute().then(function (response) {
           alert("Thank You We cont")
        });
    },

    // Pass a function to be called when the customer cancels the payment

    onCancel: function (data) {
        console.log('The payment was cancelled!');
    }

}, '#myContainerElement');
