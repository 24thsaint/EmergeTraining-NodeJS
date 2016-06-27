function edit(id) {
    console.log(id);
    console.log(document.getElementById("accessToken").value);
    event.preventDefault()
    var xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function() {
        if(xhr.readyState == 4) {
            document.getElementById("content").innerHTML = xhr.responseText
        }
    }
    xhr.open("POST", "/admin/announcement/edit", true)
    xhr.setRequestHeader("Content-Type", "application/json")
    xhr.send(JSON.stringify({
        announcementId: id,
        accessToken: document.getElementById("accessToken").value
    }))
}

function deleteAction(id) {
    var confirmation = confirm("Are you sure that you want to delete this post?")

    if (confirmation) {
        var xhr = new XMLHttpRequest()
        xhr.onreadystatechange = function() {
            if(xhr.readyState == 4) {
                var json = JSON.parse(xhr.responseText)
                if (json.successful) {
                    document.getElementById("content-child").className = "hide"
                    document.getElementById("notification").className = "notification success"
                    document.getElementById("notification").innerHTML = json.message
                } else {
                    document.getElementById("content-child").className = "hide"
                    document.getElementById("notification").className = "notification success"
                    document.getElementById("notification").innerHTML = json.error
                }
            }
        }
        xhr.open("POST", "/admin/announcement/delete", true)
        xhr.setRequestHeader("Content-Type", "application/json")
        xhr.send(JSON.stringify({
            announcementId: id,
            accessToken: document.getElementById("accessToken").value
        }))
    } else {

    }
}

function announcementEditAction(event) {
    event.preventDefault()

    var xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function() {
        if(xhr.readyState == 4) {
            console.log(xhr.responseText);
            var json = JSON.parse(xhr.responseText)
            if (json.successful) {
                document.getElementById("notification").className = "notification success"
                document.getElementById("announcementForm").className = "hide"
                document.getElementById("image-display").className = "hide"
                document.getElementById("notification").innerHTML = json.message
            } else {
                document.getElementById("notification").className = "notification error"
                document.getElementById("announcementForm").className = "hide"
                document.getElementById("image-display").className = "hide"
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
            xhr.open("POST", "/admin/announcement/edit/action", true)
            xhr.setRequestHeader("Content-Type", "application/json")
            xhr.send(JSON.stringify({
                announcementId: document.getElementById("announcementId").value,
                admin: document.getElementById("accessToken").value,
                title: document.getElementById("title").value,
                content: document.getElementById("text-content").value,
                type: document.getElementById("type").value,
                editedOn: new Date(),
                file: contents
            }))
        }
        fileReader.readAsDataURL(imageDataRaw)
    } else {
        xhr.open("POST", "/admin/announcement/edit/action", true)
        xhr.setRequestHeader("Content-Type", "application/json")
        xhr.send(JSON.stringify({
            announcementId: document.getElementById("announcementId").value,
            admin: document.getElementById("accessToken").value,
            title: document.getElementById("title").value,
            content: document.getElementById("text-content").value,
            type: document.getElementById("type").value,
            editedOn: new Date(),
            file: null
        }))
    }
}
