module.exports = function set(reference, pathParts, value) {
    if(typeof pathParts === 'string'){
        pathParts = pathParts.split('.');
    }

    var index = 0,
        pathLength = pathParts.length,
        result = reference,
        previousresult,
        previousKey;

    for(; index < pathLength; index++){
        var key = pathParts[index];

        if ((typeof result !== 'object' || result === null) && index < pathLength) {
            if (typeof key !== 'symbol' && !Number.isNaN(Number(key))) {
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
