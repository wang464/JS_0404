'use strict';
function sayhello() {
    console.log('hello');    
}

function callfun(fun) {
    fun();
}
function ni() {
    console.log(world);
    
}

callfun(sayhello);

// callfun 回调函数调用函数. 