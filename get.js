module.exports = function set(reference, pathParts, value) {
    var index = 0,
        pathLength = pathParts.length;

    var result = reference;

    for(; index < pathLength; index++){
        var key = pathParts[index];

        if (reference == null) {
            break;
        } else if (typeof reference[key] === "object") {
            reference = reference[key];
        } else {

            if(index < pathLength - 1){
                return;
            }

            reference = reference[key];
        }
    }
};