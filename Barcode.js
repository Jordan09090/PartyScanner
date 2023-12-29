let guestList = [
    "Aiden Smith", "Isabella Johnson", "Mingyu Kim", "Fatima Al-Hassan",
    "Santiago Garcia", "Emma Martinez", "Hiroshi Tanaka", "Chloe Dubois",
    "Raj Patel", "Sofia Rodriguez", "Liam O'Reilly", "Amelia Ivanova",
    "Juan Perez", "Mia Nguyen", "Oliver Kowalski", "Zoe Schwartz",
    "Lucas Silva", "Abigail Muller", "Noah Levi", "Lily Popova",
    "Ethan Goldberg", "Aisha Khan", "Mateo Fernandez", "Ella Smirnova",
    "Benjamin Cohen", "Nora Kaur", "Samuel Wong", "Charlotte Meunier",
    "Jackson Ortiz", "Harper Schneider", "Alexander Vasquez", "Emily Rasmussen",
    "Michael Santos", "Ava Rossi", "William Garcia", "Sofia Singh",
    "Daniel Hernandez", "Madison Yamamoto", "Logan Gupta", "Isla Fischer",
    "James Ali", "Olivia Johansson", "Jacob Zhang", "Emily Díaz",
    "Henry Chaudhry", "Grace Ochoa", "Sebastian Lin", "Mia Moreau",
    "Gabriel Santos", "Elizabeth Gutiérrez", "Aiden Patel", "Sophia Chen",
    "Jack Sharma", "Avery Gonzalez", "Dylan Kim", "Riley Jansen",
    "Caleb Nkosi", "Layla Petrova", "Isaac Lee", "Zoe Nguyen",
    "Joshua Castillo", "Scarlett Johansen", "Andrew Gomes", "Victoria Zhao",
    "Wyatt Ahmed", "Ella Ivanovic", "Nathan Lopez", "Harper Chatterjee",
    "Elijah Ng", "Lillian Yoshida", "Connor Da Silva", "Aria Kapoor",
    "Gavin O'Neil", "Maya Agarwal", "Levi Martinez", "Penelope Santos",
    "Christian Zhou", "Hannah Schmidt", "Grayson Li", "Amelia Wong"
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
