window.onload = function() {
    document.getElementById('registrationForm').onsubmit = function(event) {
        event.preventDefault()
        var xhr = new XMLHttpRequest()
        xhr.onreadystatechange = function() {
            if(xhr.readyState == 4) {
                var json = JSON.parse(xhr.responseText)
                if (json.authResponse) {
                    document.getElementById("notification").className = "notification success"
                    document.getElementById("registrationForm").className = "hide"
                    document.getElementById("notification").innerHTML = json.message
                } else {
                    document.getElementById("notification").className = "notification error"
                    document.getElementById("notification").innerHTML = json.message
                }
            }
        }
        xhr.open("POST", "/admin/register", true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify({
            fullname:   document.getElementById("fullname").value,
            course:     document.getElementById("course").value,
            username:   document.getElementById("username").value,
            password:   document.getElementById("password").value
        }));
    }
}
