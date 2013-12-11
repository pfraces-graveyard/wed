# mix

Mix objeect properties

# Usage

```js
mix(a, b, c).in(target);
```

Any number of objects can be passed to the constructor. The mix algorithm
will not alter that source objects.

The `in` method returns the resulting mixed object and accepts a target
to mix the sources in. If no target is passed a new object is
created for that purpose.

```js
var mix = require('u.mix');

var fuz = mix({ a: 1 }, { b: 2, c: 3 }, { d: 4 }).in();
console.log(fuz); // { a: 1, b: 2, c: 3, d: 4 }
```
Last wins

```js
var fuz = mix({ a: 1 }, { a: 2 }, { a: 3 }).in();
console.log(fuz); // { a: 3 }
```

Objects received are unaltered

```js
var foo = { a: 1, b: 2 },
    bar = { a: 4, c: 3 },
    fuz = mix(foo, bar).in();

console.log(foo); // { a: 1, b: 2 }
console.log(bar); // { a: 4, c: 3 }
console.log(fuz); // { a: 4, b: 2, c: 3 }
```

Mix into a target

```js
var foo = { a: 1 },
    bar = { b: 2 },
    qux = { c: 3 },
    fuz = mix(bar, qux).in(foo);

console.log(foo);         // { a: 1, b: 2, c: 3 }
console.log(bar);         // { a: 2 }
console.log(qux);         // { b: 3 }
console.log(fuz === foo); // true
```

# install

    npm install u.mix

# Motivation

Straightforward oject mixing library, aimed for simple tasks.
