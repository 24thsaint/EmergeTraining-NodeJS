window.onload = function() {
    document.getElementById('loginForm').onsubmit = function(event) {
        event.preventDefault()
        var xhr = new XMLHttpRequest()
        xhr.onreadystatechange = function() {
            if(xhr.readyState == 4) {
                var json = JSON.parse(xhr.responseText)
                console.log(json);
                if (json.authResponse) {
                    document.write(json.username + " IS SUCCESSFULLY LOGGED IN with Access Token " + json.accessToken)
                } else {
                    document.write("INVALID USERNAME/PASSWORD COMBINATION")
                }
            }
        }
        xhr.open("POST", "/login", true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify({
            username: document.getElementById("username").value,
            password: document.getElementById("password").value
        }));
    }
}
