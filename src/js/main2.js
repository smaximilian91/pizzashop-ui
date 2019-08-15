let $ = require('jquery');

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

$.getJSON("http://localhost:3000/api/test/api/orders/" + id, function (json) {

    let tableDiv = $('#table');

    let table = $("<table>");
    tableDiv.append(table);

    let tr = $("<tr>");
    table.append(tr);
    tr.append($("<th>").text("Name"));
    tr.append($("<th>").text("Amount"));
    tr.append($("<th>").text("Preis"));


    let totalAmount = 0;
    for (let i = 0; i < json.pizzaOrders.length; i++) {
        let tr = $("<tr>");
        table.append(tr);

        tr.append((`<td> ${JSON.stringify(json.pizzaOrders[i].pizza.name)}</td>`));
        tr.append((`<td> ${JSON.stringify(json.pizzaOrders[i].amount)}</td>`));
        tr.append((`<td> ${JSON.stringify(json.pizzaOrders[i].pizza.price)} CHF</td>`));
        totalAmount += json.pizzaOrders[i].amount;
    }

    tr = $("<tr>");
    table.append(tr);

    tr.append($("<td class = 'total'>").text("Total"));
    tr.append($("<td class = 'total'>").text(`${totalAmount}`));
    tr.append($("<td class = 'total'>").text(`${json.total} CHF`));

    let addressDiv = $('#addressAndPhone');
    addressDiv.append(` ${json.address},  ${json.phone}`);
});

