SC.initialize({
    client_id: "QyPi1UIiAXHektIfaZyKDQSp25ZaerWL"
})

function busqueda() 
{
    var grupo = $("input").val();

    SC.get("/tracks", {
        q: grupo
    }).then(function (tracks) {
        // console.log("Listado de canciones: " + JSON.stringify(tracks, null, 2));
        for(var i=0; i<tracks.length-4; i++)
        {
            // $(".lista").append("<div class='imagen_mini' col-2><img src='"+tracks[i].artwork_url + "'id = '" + 
            // tracks[i].id + "'draggrable='true' ondragragstart='onDragStart(event)'></div>");
            $(".lista").append("<img class='img_bus' src='"+tracks[i].artwork_url + "'id = '" + 
            tracks[i].id + "'draggrable='true' ondragstart='onDragStart(event)'>");
        }
    })
}

function onDragStart(event){
    event.dataTransfer.setData("text",event.target.id);
    console.log("moviendo => " + event.target.id);
}

function onDrop(event){
    event.preventDefault();
    var data = event.dataTransfer.getData("text");
    event.target.appendChild(document.getElementById(data));
    console.log(data);

    SC.stream("/tracks/"+ data).then(function (player) {
        player.play();
    }).catch(function (error) {
        alert("Error, no se puede reproducir por: ->" + error);
    })
}

function onDragOver(event){
    event.preventDefault();
}
