let $ = require('jquery');

$.getJSON("http://localhost:3000/api/test/api/pizzas/", function (json) {
    for (let i = 0; i < json.length; i++) {
        let pizzaDiv = $('#pizzen');
        let select = ($(`<select id = ${json[i].id}>`));
        pizzaDiv.append(select);
        for (let i = 0; i < json.length - 1; i++) {
            select.append($(`<option value= ${i}>${i}</option>`));
        }
        pizzaDiv.append("</select>");
        pizzaDiv.append("   " + json[i].name + " " + json[i].price + "<br>");

    }
});

function sendOrder() {

    let address = document.getElementById("address").value;
    let phone = document.getElementById("phone").value;

    if (address.length !== 0 && phone.length !== 0) {
        $.getJSON("http://localhost:3000/api/test/api/pizzas/", function (json) {
                let pizzaOrders = [];
                for (let i = 0; i < json.length; i++) {
                    let parameterName = json[i].id;
                    let amount = parseInt(document.getElementById(parameterName).value);
                    if (amount !== 0 && amount !== null) {
                        console.log("id: " + parameterName);
                        console.log("amount: " + amount);
                        console.log("amount type: " + (typeof amount));
                        let json2 = json[i];
                        let pizzaOrder = {
                            amount: amount,
                            pizza:
                                {
                                    id: json2.id,
                                    name: json2.name,
                                    price: json2.price
                                }
                        };
                        pizzaOrders.push(pizzaOrder);
                    }
                }
                let order = {
                    "address": address,
                    "phone": phone,
                    "date": Date.now(),
                    "pizzaOrders": pizzaOrders
                };
                console.log("Order: " + JSON.stringify(order, null, 2));
                if (pizzaOrders.length > 0) {
                    let http = new XMLHttpRequest();
                    http.open("POST", "http://localhost:3000/api/test/api/orders/", true);
                    http.setRequestHeader("Content-Type", "application/json");
                    http.onreadystatechange = function () {//Call a function when the state changes.
                        if (http.readyState === 4) { // when completed
                            if (http.status === 200) { // success
                                let json = JSON.parse(http.responseText);
                                console.log("successfully sent");
                                window.location = "http://localhost:3000/index2.html?id="+json.id;
                                console.log("Order: " + JSON.stringify(json, null, 2));

                            } else {
                                console.log("ERROR: " + http.status + " - " + http.responseText);
                            }
                        }
                    };
                    http.send(JSON.stringify(order));
                }
            }
        );
    }
}

$("form").on("submit", e => {
    e.preventDefault();
    sendOrder();
});
