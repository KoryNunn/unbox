# unbox

Get or set values on an object from an array of keys.

## Usage

### get(object, pathArray/dotNotation)

```javascript
var get = require('unbox/get');

var myObject = {
    a: {
        b: 1
    }
};

value = get(myObject, 'a.b'); // 1
// OR
value = get(myObject, ['a', 'b']); // 1
```


### set(object, pathArray/dotNotation, value)

```javascript
var set = require('unbox/set');

set(myObject, 'a.b.c', 2);
// OR
set(myObject, ['a', 'b', 'c'], 2);
```

myObject will now be:

```javascript
{
    a: {
        b: {
            c: 2
        }
    }
}

```
