'use strict';

// console.log('hello, world');
// console.log(100+200+3300);  //  试验vscode调用node

var s = 'hello';

function greet(name){
    console.log(s + ',' + name + '!');
}

module.exports = greet;