### Background

If you are familiar with the ES6, you must have used such **variable declaration** in your program.

```js
const { name = 'apple', price = 100 } = store;
```

Generally, you declare the `name` and `price` variable, and the default values are `apple` and `100`. This will works well if the `store` is

```js
const store = { name: 'orange', price: 99 };
```

or

```js
const store = {name: 'orange'};
```

However, if the store is 

```js
const store = { name: 'apple', price: null };
```

What's the `name` and `price` now?

In fact, the `name` is apple, but the `price` is **null** not the default value `100` as we thought.

### Solution

Here is a webpack loader called `js-assign` by meself. Using the loader, you can get the default value even the `store` is

```js
const store = { name: 'apple', price: null };
```

First, add the follow function to your `Global Utils file`.

```js
const proxy = (obj) => {
    return new Proxy(obj, {
        get(target, key, value) {
            if(target[key] === null) {
                return void 0;
            } else  {
                return target[key];
            }
        }
    })
}
```

**You have to call this function by `GUtils.proxy(obj)`.**

*Otherwise, you have to change the source code at `src/proxy.js`*

Second, install the loader

```shell
npm i js-assign
```

Third, add the loader to your webpack config.

```js
{
	test: /\.js$/,
	use: [
		'js-assign'
	]
}
```

Now, you can write the `ObjectPattern` as usual, the code will be transformed.

```js
const store = { name: 'apple', price: null };
const { name = 'orange', price: 100 } = store;
```

Result:

```js
const store = { name: 'apple', price: null };
const { name = 'orange', price: 100 } = GUtils.proxy(store);
```

### Notice

This loader doesn't not support **JSX**. So, you should call it after `babel-loader` or any other loader can transform `JSX` to pure `JS`.