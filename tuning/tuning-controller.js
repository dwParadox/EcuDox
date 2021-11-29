let mapBase = null;

function displayReady() {  
    sessionStorage.setItem("displayReady", true);
}

function InitTuningController() {
    sessionStorage.removeItem("displayReady");

    document.getElementById('scrollbox').style.maxHeight = "440px";
    document.getElementById('loader-id').style.opacity = 1;

    document.getElementById('loader-text-id').innerText = "";
    document.getElementById('loader-text-id').style.opacity = 1;

    mapBase = document.getElementById('existing-map-base');

    setTimeout(displayReady, 100);
}

InitTuningController();

window.AddMap = function AddMap(mapid, mapname, active) {
    mapBase.innerHTML += "<div id=\"" + mapid + "\" class=\"long-menu-option\"><p class=\"long-item-text\">" + mapname + "</p></div>";
}