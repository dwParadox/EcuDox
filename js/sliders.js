function addBar(ctrlId, lblId, valType) {
    var ctrl = document.getElementById(ctrlId);
    var lbl = document.getElementById(lblId);
    lbl.innerHTML = ctrl.value + valType;
    
    ctrl.oninput = function() {
        lbl.innerHTML = this.value + valType;
    }   
}

addBar('traction-strength', 'traction-strength-lbl', '%');
addBar('launch-rpm', 'launch-rpm-lbl', 'RPM');
addBar('fuel-economy', 'fuel-economy-lbl', '%');
addBar('throttle-sens', 'throttle-sens-lbl', '%');
addBar('ign-retard', 'ign-retard-lbl', '%');
