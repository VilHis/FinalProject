<template>
  <div class="wrapperTask">
    <h1>Задачи:</h1>
      <dl v-for="el in users" :key="el.id">
        <div v-if="el.email == this.email" class="tasks">
          <div class="titleTask">
            <h1>№{{el.id}}</h1>
            <h1>Задача: {{el.taskname}}</h1> 
          </div>
          <h1>Описание Задачи: {{el.task}}</h1> 
          <h1>Статус Задачи: {{el.status}}</h1> 
          <button v-on:click=activStatus(el.id) class="yes1">Начать Задачу</button>
          <button v-on:click=deactivStatus(el.id) class="no1">Закончить Задачу</button>
        </div>
      </dl>
      <button v-on:click='getInfo' class="refresh">Обновить</button>
  </div>
</template>

<script>
import axios from 'axios'


export default {
  name: 'UserTable',
  data() {
    return { 
      users:[],
      email:''
    }
  },
  mounted(){
      this.getInfo();
      if (localStorage.email) {
      this.email = localStorage.email;
    }
    },
  methods: {
    getInfo(){
      axios.get('http://localhost:9909').then((res) =>{
        console.log('ok');
        const users = res.data;
        this.users=users;
      })
    },
    activStatus(id){
      axios.post('http://localhost:9909/user/status',{
        id:id,
        status :'Начата'
      }).then(() => console.log('ok'))
    },
    deactivStatus(id){
      axios.post('http://localhost:9909/user/status',{
        id:id,
        status :'Закончена'
      }).then(() => console.log('ok'))
    },
  }
}
</script> 

<style>
  button{
    display: inline-block;	
    box-sizing: border-box;
    outline: none;
    border: none;  
    border-radius: 4px;
    height: 36px;
    line-height: 36px;
    font-size: 14px;
    font-weight: 500;
    text-decoration: none;
    position: relative;
    overflow:hidden;
    vertical-align: top;
    cursor: pointer;
    user-select: none;
    appearance: none;
    touch-action: manipulation; 
    z-index: 1;
    padding: 0 15px;
    margin: 0 15px 15px 0;
    
  }
  button:hover{
    transition: all 0.2s;
    box-shadow: 0 7px 14px rgb(65 132 144 / 10%), 0 3px 6px rgb(0 0 0 / 8%);
  }
  .yes1{
    background-color: aquamarine;
  }
  .no1{
    background-color: rgb(255, 185, 185);
  }
  .wrapperTask{
    margin-left:0;
    margin-left:15px;
  }
  .titleTask{
    display: flex;
    
  }
  .titleTask h1{
    margin-right: 8px;
    
  }
</style>