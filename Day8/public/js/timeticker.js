window.onload = function() {
    function time() {
        document.getElementById("frontpage-date-time").innerHTML = new Date().toLocaleString()
    }
    setInterval(function() {time()}, 1000)
}
