let dataURL = "DATA URL HERE";

$(document).ready(() => {
    updateTime();
    setInterval(() => {
        updateTime();
    }, 1000);

    fillTable();
    setInterval(() => {
        fillTable();
    }, 15000);

});

function updateTime() {
    let t = new Date;
    $('#time').text(`${('0' + t.getUTCHours()).slice(-2)}:${('0' + t.getUTCMinutes()).slice(-2)}:${('0' + t.getUTCSeconds()).slice(-2)}`);
}

async function getData() {
    return new Promise((resolve) => {
        $.getJSON(dataURL, data => {
            resolve(data);
        });
    });
}

async function fillTable() {
    await getData().then(data => {
        var r = new Array(), j = -1;
        for (let i = 0; i < data.length; i++) {
            r[++j] ='<tr><th scope="row" class="text-center">';
            r[++j] = data[i]["pilot"]["username"];
            r[++j] = '</th><td class="text-center">';
            r[++j] = data[i]["callsign"];
            r[++j] = '</td><td class="text-center">';
            r[++j] = data[i]["flight-number"]
            r[++j] = '</td><td class="text-center">';
            r[++j] = data[i]["arrival"]["icao"];
            r[++j] = '</td><td class="text-center">';
            r[++j] = data[i]["currentLocation"]["estimated_arrival_time"];
            r[++j] = '</td><td class="text-center">';
            r[++j] = data[i]["network"];
            r[++j] = '</td></tr>';
        }
        $('#flights').html(r.join(''));
    });
}
