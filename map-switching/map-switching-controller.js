let availableMaps = null;

window.SetMapActive = function SetMapActive(mapid) {
    var i, menuoptions;

    menuoptions = document.getElementsByClassName("long-menu-option");
    for (i = 0; i < menuoptions.length; i++) {
        menuoptions[i].className = menuoptions[i].className.replace(" menu-glow", "");
    }

    document.getElementById(mapid).className += " menu-glow";

    _connection.send("MapChange", mapid, map => {});
}

function displayReady() {  
    sessionStorage.setItem("displayReady", true);
}

function InitMapController() {
    sessionStorage.removeItem("displayReady");

    document.getElementById('scrollbox').style.maxHeight = "440px";
    document.getElementById('loader-id').style.opacity = 1;

    document.getElementById('loader-text-id').innerText = "";
    document.getElementById('loader-text-id').style.opacity = 1;

    availableMaps = document.getElementById("available-maps");

    setTimeout(displayReady, 100);
}

InitMapController();

window.ResetMaps = function ResetMaps() {
    availableMaps.innerHTML = "";
}

window.AddMap = function AddMap(mapid, mapname, active) {
    availableMaps.innerHTML += "<div id=\"" + mapid + "\" class=\"long-menu-option\" onclick=\"SetMapActive('" + mapid + "')\"><p class=\"long-item-text\">" + mapname + "</p></div>";

    if (active == true) {
        document.getElementById(mapid).className += " menu-glow";
    }
}