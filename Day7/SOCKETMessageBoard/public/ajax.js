window.onload = function() {

    init()

    var ws = null

    function init() {
        var url = document.URL.replace("http://", "ws://")
        ws = new WebSocket(url)
        ws.onopen = function(evt) {}
        ws.onclose = function(evt) {}
        ws.onmessage = function(evt) {
            var parsedJSON = JSON.parse(evt.data)
            var body = "<div class='item'>("+ new Date(parsedJSON.timestamp).toLocaleString() +") <span class='userText'>"+parsedJSON.user+"</span>: " + parsedJSON.content + "</div>"
            document.getElementById('messages').innerHTML = document.getElementById('messages').innerHTML + body
        }
        ws.onerror = function(evt) {}
    }
    function send() {
        ws.send(document.getElementById("message").value)
    }

    requestMessages() // Load messages immediately on first load

    window.scrollTop = window.scrollHeight

    document.getElementById("messageForm").onsubmit = function(event) {
        event.preventDefault()
        var xhr = new XMLHttpRequest()
        xhr.onreadystatechange = function() {
            if(xhr.readyState == 4) {
                if (xhr.status == 403) {
                    document.write(xhr.responseText)
                } else {
                    updateMessages(xhr)
                }
            }
        }
        xhr.open('POST', '/messages', true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify({
            timestamp: new Date(),
            user: document.getElementById('user').value,
            content: document.getElementById('message').value,
            accessToken: document.getElementById('accessToken').value,
        }));
        document.getElementById('message').value = ""
    }

    function updateMessages(xhr) {
        var jsonResponse = xhr.responseText
        var jsonMessages = JSON.parse(jsonResponse)
        var body = ""
        jsonMessages.forEach(function(content) {
            var parsedJSON = content
            body += "<div class='item'>("+ new Date(parsedJSON.timestamp).toLocaleString() +") <span class='userText'>"+parsedJSON.user+"</span>: " + parsedJSON.content + "</div>"
        })
        document.getElementById('messages').innerHTML = body
    }

    function requestMessages() {
        var xhr = new XMLHttpRequest()
        xhr.onreadystatechange = function() {
            if(xhr.readyState == 4) {
                updateMessages(xhr)
            }
        }
        xhr.open('GET', '/messages', true);
        xhr.send();
    }

    var time = 11

    function updateTimerDisplay() {
        time--
        if (time == 0) {
            time = 10
        }
        document.getElementById('timerDisplay').innerHTML = time
    }

    setInterval(updateTimerDisplay, 1000)
    setInterval(requestMessages, 10000)
}
