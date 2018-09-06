<template>
  <div id="app">
    <h1 v-text="title"></h1>
    <input type="text" v-model="newItem" v-on:keyup.enter='addName' >
    <!-- <HelloWorld/>   -->
    <ul>
      <li v-for="item in items" v-bind:class="{finished:item.isFinished}" v-on:click="toggleFinish(item)">{{item.label}}</li>
    </ul>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld'
// //引入hello组件现在暂时关闭
// export default {
//   name: 'App',
//   components: {
//     HelloWorld
//   }
// }
export default{
  data:function () {
    return{
      title:'this is my todo list',
      items:[

      ],
      newItem:''
    }
  },
  methods:{
    toggleFinish:function (item) {
      item.isFinished = ! item.isFinished
    },
    addNew:function () {
      this.items.push({
        label:this.newItem,
        isFinished:false
      })
      this.newItem=''
    }
  }
}


</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
