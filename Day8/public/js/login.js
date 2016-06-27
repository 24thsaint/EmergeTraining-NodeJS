window.onload = function() {
    document.getElementById('loginForm').onsubmit = function(event) {
        event.preventDefault()
        var xhr = new XMLHttpRequest()
        xhr.onreadystatechange = function() {
            if(xhr.readyState == 4) {
                var json = JSON.parse(xhr.responseText)
                console.log(json);
                if (json.authResponse) {
                    window.location.href = "/admin?access_token=" + json.accessToken
                } else {
                    document.getElementById("notification").className = "notification error"
                    document.getElementById("notification").innerHTML = json.message
                }
            }
        }
        xhr.open("POST", "/admin/login", true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify({
            username: document.getElementById("username").value,
            password: document.getElementById("password").value
        }));
    }
}
