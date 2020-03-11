module.exports = function has(reference, pathParts) {
    if(typeof pathParts === 'string'){
        pathParts = pathParts.split('.');
    }

    var index = 0,
        pathLength = pathParts.length;

    for(; index < pathLength; index++){
        var key = pathParts[index];

        if (reference == null) {
            break;
        } else if (
            typeof reference[key] === 'object' &&
            index !== pathLength - 1
        ) {
            reference = reference[key];
        } else {

            if(index < pathLength - 1){
                break;
            }

            return true;
        }
    }

    return false;
};
