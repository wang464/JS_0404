Vue.component('todo-item',{
    props:['todo'],
    template:'<li>{{ todo.text }}</li>'
})
var app = new Vue({
    el:'#ap',
    data:{
        groceryList:[
            {id:0,text:'我是谁?'},
            {id:1,text:'我在哪儿?'},
            {id:2,text:'我我我我我'},
        ]
    }
})