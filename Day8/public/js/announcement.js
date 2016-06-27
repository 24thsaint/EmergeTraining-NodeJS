window.onload = function() {
    document.getElementById('announcementForm').onsubmit = function(event) {
        event.preventDefault()

        var xhr = new XMLHttpRequest()
        xhr.onreadystatechange = function() {
            if(xhr.readyState == 4) {
                var json = JSON.parse(xhr.responseText)
                if (json.successful) {
                    document.getElementById("notification").className = "notification success"
                    document.getElementById("announcementForm").className = "hide"
                    document.getElementById("notification").innerHTML = json.message
                } else {
                    document.getElementById("notification").className = "notification error"
                    document.getElementById("announcementForm").className = "hide"
                    document.getElementById("notification").innerHTML = json.message
                }
            }
        }

        var imageDataRaw = document.getElementById("image").files[0]

        if (imageDataRaw) {
            var fileReader = new FileReader()
            var imageData = null
            fileReader.onload = function(e) {
                var contents = e.target.result
                xhr.open("POST", "/admin/announcement/add", true)
                xhr.setRequestHeader("Content-Type", "application/json")
                xhr.send(JSON.stringify({
                    admin: document.getElementById("accessToken").value,
                    title: document.getElementById("title").value,
                    content: document.getElementById("content").value,
                    type: document.getElementById("type").value,
                    timestamp: new Date(),
                    file: contents
                }))
            }
            fileReader.readAsDataURL(imageDataRaw)
        } else {
            xhr.open("POST", "/admin/announcement/add", true)
            xhr.setRequestHeader("Content-Type", "application/json")
            xhr.send(JSON.stringify({
                admin: document.getElementById("accessToken").value,
                title: document.getElementById("title").value,
                content: document.getElementById("content").value,
                type: document.getElementById("type").value,
                timestamp: new Date(),
                file: null
            }))
        }
    }
}
