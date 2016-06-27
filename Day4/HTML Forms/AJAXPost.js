window.onload = function() {
    document.getElementById("registrationForm").onsubmit = function(event) {
        event.preventDefault()
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if(xhr.readyState == 4) {
                alert("Registration Successful!");
                document.write(xhr.responseText);
            }
        }
        xhr.open('POST', '/people', true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify({
            firstname: document.getElementById('firstname').value,
            lastname: document.getElementById('lastname').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
        }));
    }
}
