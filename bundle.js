(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const fetch = require('node-fetch');

var obj = {
    NewProposals: 0,
    proposalsId: [],
    expireTimeStamp: []
};




async function getData() {
    const data = JSON.stringify({
        query: `
        {
          proposals 
            {
              id
              title
              end
            }`
    });


    const response = await fetch(
        'https://hub.snapshot.org/graphql?operationName=Proposals&query=query%20Proposals%20%7B%0A%20%20proposals%20(%0A%20%20%20%20first%3A%2010%2C%0A%20%20%20%20where%3A%20%7B%0A%20%20%20%20%20%20space_in%3A%20%5B%223.spaceshot.eth%22%5D%2C%0A%20%20%20%20%20%20state%3A%20%22open%22%0A%20%20%20%20%7D%0A%20%20)%20%7B%0A%20%20%20%20id%0A%20%20%20%20end%0A%20%20%20%0A%20%20%7D%0A%7D', {
            method: 'post',
            body: data,
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': data.length,
                'User-Agent': 'Node',
            },
        }
    )

    // let lastTimestamp = response.data.proposals[4].end
    const json = await response.json();




    for (let index = 0; index < json.data.proposals.length; index++) {

        obj.proposalsId.push(
            json.data.proposals[index].id
        );

        obj.expireTimeStamp.push(
            json.data.proposals[index].end
        )
        obj.NewProposals++;



    }
    var lastjson = JSON.stringify(obj);


    console.log(lastjson);
    document.getElementById("json").innerHTML = JSON.stringify(obj, null, 4);
}

getData();
},{"node-fetch":2}],2:[function(require,module,exports){
(function (global){(function (){
"use strict";

// ref: https://github.com/tc39/proposal-global
var getGlobal = function () {
	// the only reliable means to get the global object is
	// `Function('return this')()`
	// However, this causes CSP violations in Chrome apps.
	if (typeof self !== 'undefined') { return self; }
	if (typeof window !== 'undefined') { return window; }
	if (typeof global !== 'undefined') { return global; }
	throw new Error('unable to locate global object');
}

var global = getGlobal();

module.exports = exports = global.fetch;

// Needed for TypeScript and Webpack.
if (global.fetch) {
	exports.default = global.fetch.bind(global);
}

exports.Headers = global.Headers;
exports.Request = global.Request;
exports.Response = global.Response;
}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[1]);
