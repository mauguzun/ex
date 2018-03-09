
$(".orange , #mytable").click(function () {
    location.replace("order.html")
})  

var total = 60;

setInterval(function () {
    $(".lastpack").effect("pulsate")
    if (total > 12) {
        total -= Math.floor(Math.random() * (3 - 1 + 1)) + 2;
        $('.lastpack').text(total)

    }


}, Math.random() * (7000 - 2000) + 2000);


$(".send-email,.send-phone").submit(function () {

    $.post("send.php", $(this).serialize(), function (data) {
       alert(data);
      
    });

    return false;
})

