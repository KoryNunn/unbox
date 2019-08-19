var test = require('tape'),
    get = require('../get'),
    set = require('../set');
    deepStrictEqual = require('deep-strict-equal');

function testGet(path, testObject, expectedValue) {
    test(path, function(t) {
        t.plan(1);
        t.ok(deepStrictEqual(get(testObject, path), expectedValue), 'Got correct value');
    });
}

function testSet(path, testObject, expectedObject, value) {
    test(path, function(t) {
        t.plan(1);
        set(testObject, path, value);
        t.ok(deepStrictEqual(testObject, expectedObject), 'Value set correctly');
    });
}

var getTestData = [
    [['a'], {a:1}, 1],
    [['a', 'b'], {a:{b:1}}, 1],
    ['a.b', {a:{b:1}}, 1],
    [['a', 'b'], {}, undefined],
    ['a.b', {a:{b:{c:1}}}, {c:1}],
    [['a', Symbol.for('b')], {a:{[Symbol.for('b')]:{c:1}}}, {c:1}],
];

var setTestData = [
    [['a'], {a:1}, {a:2}, 2],
    [['a', 'b'], {a:{b:1}}, {a:{b:2}}, 2],
    ['a.b', {a:{b:1}}, {a:{b:2}}, 2],
    [['a', 'b', 'c'], {a:{b:null}}, {a:{b:{c:1}}}, 1],
    [['a', 'b'], {a:{b:null}}, {a:{b:{c:1}}}, {c:1}],
    [['a', 'b', 'c'], {a:{b:1}}, {a:{b:{c:2}}}, 2],
    [['a', 'b', 'c'], {}, {a:{b:{c:1}}}, 1],
    [['a', 'b', 'c'], { a: { b: 1 } }, {a:{b:{c:1}}}, 1],
    [['a', Symbol.for('b')], {}, { a: { [Symbol.for('b')]: 1 }}, 1],
];

getTestData.forEach(function(data){
    testGet.apply(null, data);
});

setTestData.forEach(function(data){
    testSet.apply(null, data);
});

test('get performance', function(t){
    t.plan(1);

    var testObject = {
        foo: {
            bar: 2
        }
    }

    var startTime = Date.now();

    for(var i = 0 ; i < 1000000; i++){
        get(testObject, 'foo')
        get(testObject, 'foo.bar')
        get(testObject, 'foo.bar.baz')
        get(testObject, 'foo.bazinga.baz')
    }

    t.pass(`Took ${Date.now() - startTime}ms`);
})

test('set performance', function(t){
    t.plan(1);

    var testObject = {
        foo: {
            bar: 2
        }
    }

    var startTime = Date.now();

    for(var i = 0 ; i < 1000000; i++){
        set(testObject, 'majigger', 1)
        set(testObject, 'foo.bar', 3)
        set(testObject, 'foo.bar.baz', 4)
        set(testObject, 'foo.bazinga.baz', 5)
    }

    t.pass(`Took ${Date.now() - startTime}ms`);
})