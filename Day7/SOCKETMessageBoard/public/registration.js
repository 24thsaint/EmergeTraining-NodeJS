window.onload = function() {
    document.getElementById('registrationForm').onsubmit = function(event) {
        event.preventDefault()
        var xhr = new XMLHttpRequest()
        xhr.onreadystatechange = function() {
            if(xhr.readyState == 4) {
                var json = JSON.parse(xhr.responseText)
                window.location.href = '/landing?status=' + json.authResponse
            }
        }
        xhr.open("POST", "/register", true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify({
            username: document.getElementById("username").value,
            password: document.getElementById("password").value
        }));
    }
}
