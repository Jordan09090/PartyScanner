let guestList = [
    "Jordan Bantleman", "Hugh Chen", Marie Bantleman", Charriot Bantleman", "Luke Terri", "Josh Terri", Ezra Holland", "Pricilla Dinardo", "Guande Cen", "Rick Bantleman"
];

let scannedNames = JSON.parse(localStorage.getItem("scannedNames")) || {};

function scanName() {
    let name = document.getElementById('nameInput').value;
    processGuest(name, true);
}

function checkGuestStatus() {
    let name = document.getElementById('statusCheckInput').value;
    processGuest(name, false);
    document.getElementById('statusCheckInput').value = ''; // Clear check status input field
}

function processGuest(name, isScanning) {
    let resultElement = isScanning ? document.getElementById('result') : document.getElementById('statusCheckResult');

    if (guestList.includes(name)) {
        if (name in scannedNames) {
            resultElement.innerHTML = isScanning ? `${name} has already been scanned.` : `${name} is present.`;
        } else if (isScanning) {
            scannedNames[name] = true;
            localStorage.setItem("scannedNames", JSON.stringify(scannedNames));
            resultElement.innerHTML = `${name} is on the list and now scanned.`;
            updateScannedList();
            updateGuestCount();
        } else {
            resultElement.innerHTML = `${name} has not arrived yet.`;
        }
    } else {
        resultElement.innerHTML = `${name} is not on the guest list.`;
    }
    if (isScanning) {
        document.getElementById('nameInput').value = ''; // Clear scan input field
    }
}

function clearScannedList() {
    localStorage.removeItem("scannedNames");
    scannedNames = {};
    updateScannedList();
    updateGuestCount();
    document.getElementById('result').innerHTML = '';
    document.getElementById('statusCheckResult').innerHTML = '';
}

function updateScannedList() {
    document.getElementById('scannedList').innerHTML = Object.keys(scannedNames).join(', ');
}

function updateGuestCount() {
    document.getElementById('guestCount').innerHTML = `Total guests arrived: ${Object.keys(scannedNames).length} out of 80`;
}

// Initial update on page load
updateScannedList();
updateGuestCount();
