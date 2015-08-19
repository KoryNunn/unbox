module.exports = function set(reference, pathParts, value) {
    var index = 0,
        pathLength = pathParts.length;

    var result = reference,
        previousresult,
        previousKey;

    for(; index < pathLength; index++){
        var key = pathParts[index];

        if ((typeof result !== 'object' || result === null) && index < pathLength) {
            if (!isNaN(key)) {
                result = previousresult[previousKey] = [];
            }
            else {
                result = previousresult[previousKey] = {};
            }
        }
        if (index === pathLength - 1) {
            result[key] = value;
        }
        else {
            previousresult = result;
            previousKey = key;
            result = result[key];
        }
    }
};