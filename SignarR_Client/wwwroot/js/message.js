

var connection = new signalR.HubConnectionBuilder()
    .withUrl("/SignalR_Hub/messages")
    .build();

connection.on("MsgFromServer", function (message) {
    var div = document.createElement("div");
    div.innerHTML = message + "<hr/>";
    document.getElementById("receivedMsg").append(div);
});

connection.on("userConnected", function (connectionIds) {
    for (i = 0; i < connectionIds.length; i++) {
        var group = document.getElementById("group");
        var option = document.createElement("option");
        option.value = connectionIds[i];
        option.text = connectionIds[i];
        group.add(option);
    }
});

connection.start().catch(function (err) { alert(err); });

// connection.start({ transport: ['webSockets', 'longPolling'] });
// "webSockets"
// "foreverFrame"
// "serverSentEvents"
// "longPolling"


setTimeout(function () {
    connection.invoke("SendMsg").catch(function (err) { alert(err); });
}, 2000);


function sendMessage() {

    var groupElement = document.getElementById("group");
    var selectedVal = groupElement.options[groupElement.selectedIndex].value;
    if (selectedVal == 'All') {
        connection.invoke("SendMsgToOthers", document.getElementById("txtip").value)
            .catch(function (err) { });
    }
    else {
        connection.invoke("SendMsgToClient", document.getElementById("group").value, document.getElementById("txtip").value)
            .catch(function (err) { });
    }
    //connection.invoke("SendMsg").catch(function (err) { }
    //);
}


function SendMsgToOthers() {
  
}


function SendMsgToClient() {

   
}

