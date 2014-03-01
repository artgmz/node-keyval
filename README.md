# Node-Keyval

## Description:
Hashmap key-value storage service for Redis with NodeJS, using promises to allow cleaner way of getting values. Aside from setting and getting values, you can also delete them and set expiration time for auto-delete after a certain number of seconds.

Can also be used with ExpressJS.

## Dependencies:
* NodeJS 0.10.x
* Q 1.0.x
* Redis 0.10.x

## Notes:
* You must set up a configuration variable in a file in your root directory. This variable should be a POJO with properties named "redisPort", "redisHost", and "redisAuth". These properties should contain the port number, hostname, and auth string for your Redis instance, respectively.
* Getting a value is asynch. All other functions are synchronous.
* Errors are output to the console and then returned when a promise is rejected. You should handle these in your app.

## Sample Usage:
```
var keyval = require("./node-keyval.js");

// Getting a hashmap.
keyval.getHM(value).then(function (result) {
    // Do something with result.
}, function (err) {
    // Do something with error.
}).done();
```