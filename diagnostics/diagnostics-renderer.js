function displayReady() {  
    sessionStorage.setItem("displayReady", true);
}

function InitDiagnosticsRenderer() {
    sessionStorage.removeItem("displayReady");

    document.getElementById('scrollbox').style.maxHeight = "440px";
    document.getElementById('loader-id').style.opacity = 1;

    document.getElementById('loader-text-id').innerText = "";
    document.getElementById('loader-text-id').style.opacity = 1;

    setTimeout(displayReady, 100);
}

InitDiagnosticsRenderer();