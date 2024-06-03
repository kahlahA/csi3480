document.addEventListener('DOMContentLoaded', function() {
    var generateBtn = document.getElementById('generate-btn');
    var copyBtn = document.getElementById('copy-btn');
    var passwordInput = document.getElementById('password');
    var lengthInput = document.getElementById('length');
    var uppercaseInput = document.getElementById('uppercase');
    var numbersInput = document.getElementById('numbers');
    var symbolsInput = document.getElementById('symbols');
    var strengthMeter = document.getElementById('strength-meter');
    var strengthMessage = document.getElementById('strength-message');

    generateBtn.addEventListener('click', generatePassword);
    copyBtn.addEventListener('click', copyPassword);

    function generatePassword() {
        var length = parseInt(lengthInput.value);
        var charset = "abcdefghijklmnopqrstuvwxyz";
        var password = "";
        if (uppercaseInput.checked) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        if (numbersInput.checked) charset += "0123456789";
        if (symbolsInput.checked) charset += "!@#$%^&*()_+";
        for (var i = 0; i < length; i++) {
            var randomIndex = Math.floor(Math.random() * charset.length);
            password += charset[randomIndex];
        }
        passwordInput.value = password;
        var strength = checkPasswordStrength(password);
        updateStrengthMeter(strength);
        updateStrengthMessage(strength);
    }

    function checkPasswordStrength(password) {
        var strength = 0;
        if (password.length >= 8) {
            strength++;
        }
        if (password.match(/[a-z]/)) {
            strength++;
        }
        if (password.match(/[A-Z]/)) {
            strength++;
        }
        if (password.match(/[0-9]/)) {
            strength++;
        }
        if (password.match(/[!@#$%^&*()_+]/)) {
            strength++;
        }
        return strength * 20;
    }

    function updateStrengthMeter(strength) {
        strengthMeter.value = strength;
    }

    function updateStrengthMessage(strength) {
        if (strength < 40) {
            strengthMessage.textContent = "Password strength: Weak";
            strengthMessage.style.color = "red";
        } else if (strength < 80) {
            strengthMessage.textContent = "Password strength: Medium";
            strengthMessage.style.color = "orange";
        } else {
            strengthMessage.textContent = "Password strength: Strong";
            strengthMessage.style.color = "green";
        }
    }

    function copyPassword() {
        passwordInput.select();
        document.execCommand('copy');
        alert('Password copied to clipboard');
    }
});
