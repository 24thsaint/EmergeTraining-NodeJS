// App.js

var myModule = require('./MyModule.js')
myModule.getData(function(list) {
    console.log(list)
})
