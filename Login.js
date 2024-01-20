document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const usernameInput = document.getElementById('username').value;
    const passwordInput = document.getElementById('password').value;

    // A simple obfuscation for demonstration (splitting the password into parts)
    const obfuscatedPasswordParts = ['A', '$', '$', '2', '2', '3', 'M', 'i', 'N'];
    const obfuscate = (arr) => arr.map((c, i) => String.fromCharCode(c.charCodeAt(0) + i)).join('');
    const deobfuscate = (str) => str.split('').map((c, i) => String.fromCharCode(c.charCodeAt(0) - i)).join('');
    const obfuscatedPassword = obfuscate(obfuscatedPasswordParts);
    const inputPasswordObfuscated = obfuscate(passwordInput.split(''));

    if (usernameInput === 'ADMIN' && inputPasswordObfuscated === obfuscatedPassword) {
        // Correct credentials, redirect to the Barcode page
        window.location.href = 'Barcode.html';
    } else {
        // Incorrect credentials, display error
        document.getElementById('loginError').textContent = 'Incorrect username or password.';
    }
});
