exports.getData = {
    life: [
        {
            text: 'I will survive',
            reference: 'Gloria Gaynor',
        },
        {
            text: 'How are you?',
            reference: 'Tristan Karlo',
        },
    ],
    game: [
        {
            text: 'Greetings Summoner',
            reference: 'SONA',
        },
    ],
    people: [
        {
            text: 'He who lies shall inherit the kindom of hell and all the fires within.',
            reference: 'Rave Realonso',
        },
        {
            text: 'Magic is all around us, just listen.',
            reference: 'August Rush',
        },
    ],
}

exports.getFields = function() {
    var fields = ["text", "reference"]

    function parser(value) {
        fields.push(value)
    }

    Object.keys(quotes).forEach(parser)
    return fields;
}

exports.allCategoriesParser = function() {
    var response = []
    for (var category in exports.getData) {
        response.push(category)
    }
    return response
}

exports.quoteWrapper = function(text, reference) {
    return "<blockquote><p>" + text + "</p></blockquote><cite>-- by: "+ reference +"</cite>"
}
