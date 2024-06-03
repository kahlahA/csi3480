document.getElementById('generate-btn').addEventListener('click', generatePassword);
document.getElementById('copy-btn').addEventListener('click', copyPassword);

function generatePassword() {
    const length = document.getElementById('length').value;
    const includeUppercase = document.getElementById('uppercase').checked;
    const includeNumbers = document.getElementById('numbers').checked;
    const includeSymbols = document.getElementById('symbols').checked;

    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+[]{}|;:,.<>?';

    let characters = lowercase;
    if (includeUppercase) characters += uppercase;
    if (includeNumbers) characters += numbers;
    if (includeSymbols) characters += symbols;

    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        password += characters[randomIndex];
    }

    document.getElementById('password').value = password;
    evaluateStrength(password);
}

function copyPassword() {
    const passwordField = document.getElementById('password');
    passwordField.select();
    document.execCommand('copy');
    alert('Password copied to clipboard');
}

function evaluateStrength(password) {
    let strength = 0;
    const length = password.length;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumbers = /[0-9]/.test(password);
    const hasSymbols = /[!@#$%^&*()_+[\]{}|;:,.<>?]/.test(password);

    if (length >= 8) strength += 20;
    if (hasLowercase) strength += 20;
    if (hasUppercase) strength += 20;
    if (hasNumbers) strength += 20;
    if (hasSymbols) strength += 20;

    const strengthMeter = document.getElementById('strength-meter');
    const strengthMessage = document.getElementById('strength-message');

    strengthMeter.value = strength;

    if (strength <= 40) {
        strengthMessage.textContent = 'Password strength: Weak';
        strengthMessage.style.color = 'red';
    } else if (strength <= 60) {
        strengthMessage.textContent = 'Password strength: Medium';
        strengthMessage.style.color = 'orange';
    } else {
        strengthMessage.textContent = 'Password strength: Strong';
        strengthMessage.style.color = 'green';
    }
}
