// Key-value store service.
"use strict";

// Third-party modules.
var q = require("q"),         // Promises library.
    redis = require("redis"); // Redis database library.

var config = require("../config.js"),                                                          // App-specific module for env config.
    client = redis.createClient(config.redisPort, config.redisHost, { no_ready_check: true }); // Connect client.

client.auth(config.redisAuth); // Auth client.

module.exports = {
    // Set values indexed by the given key.
    // KEY: Indexing key.
    // VALS: { key: value } representing data to be stored.
    setHM: function (key, vals) { client.hmset(key, vals); },

    // Retrieve and return { key: value } for given key.
    // KEY: Index to retrieve data for.
    getHM: function (key) {
        var deferred = q.defer();

        client.hgetall(key, function (err, results) {
            if (err) {
                console.log("Error getting data from key-value store: " + err);
                deferred.reject(err);
            } else {
                deferred.resolve(results);
            }
        });

        return deferred.promise;
    },

    // Delete data for given key.
    // KEY: Index to delete data for.
    delete: function (key) { client.del(key); },

    // Set time-to-live, from now, for given key.
    // KEY: Index to set expiration for.
    // TIME: Seconds until expiration.
    setExpiry: function (key, time) { client.expire(key, time); }
};