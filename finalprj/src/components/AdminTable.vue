<template>
  <div class="adminWrapper">
    <div class="postTask">
      <h3>Добавление Задачи</h3>
      <input v-model="postSet.user" placeholder="Кому">
      <input v-model="postSet.email" placeholder="Почта">
      <input v-model="postSet.taskname" placeholder="Имя Задачи">
      <input v-model="postSet.task" placeholder="задача">
      <button v-on:click="postTask">Отправить</button>
      <button v-on:click="deleteTask" class="deleteTask" >Удалить Задачу №:<input v-model="postSet.id"></button>
    </div>
    <div class="Tasks">
      <dl v-for="el in users" :key="el.id">
        <div class="tasks">
          <div class="titleTask">
            <h1>№{{el.id}}</h1>
            <h1>Задача: {{el.taskname}}</h1> 
          </div>
          <h1>Описание Задачи: {{el.task}}</h1> 
          <h1>Статус Задачи: {{el.status}}</h1> 
          <button v-on:click=activStatus(el.id) class="yes">Начать Задачу</button>
          <button v-on:click=deactivStatus(el.id) class="no">Закончить Задачу</button>
        </div>
      </dl>
      <button v-on:click='getTask'>Обновить</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'


export default {
  name: 'AdminTable',
  data() {
    return { 
      users:[],
      taskStarted:[],
      taskFinished:[],
      taskUnChecked:[],
      postSet:[{
        user:"",
        email:"",
        taskname:"",
        task:"",
        id:null
      }]
    }
  },
  mounted(){
      this.getTask();
    },
  methods: {
    getTask(){
      axios.get('http://localhost:9909').then((res) =>{
        console.log('ok');
        const users = res.data;
        this.users=users;
      })
    },
    postTask(){
      axios.post('http://localhost:9909/user',{
        username :this.postSet.user,
        email :this.postSet.email,
        taskname :this.postSet.taskname,
        task :this.postSet.task,
        status :"Не начато"
      }).then(() => console.log('ok'))
    },
    deleteTask(){
      axios.post('http://localhost:9909/user/delete',{
        id:this.postSet.id,
      }).then(() => console.log('ok'))
    }
  }
}
</script> 

<style>
  .adminWrapper{
    margin-top: 50px;
    display:flex
}
  .postTask{
    width: 25%;
    margin-left: 15%;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 10px;
  }
  .postTask *{
    width: 40%;
    height: 35px;
    margin: 1%;
    border: none;
    color: black;
  }
  .postTask input{
    border-radius: 8px;
    z-index: 1;
  }
  .postTask input:hover{
    transition: all 0.2s;
    box-shadow: 0 7px 14px rgb(65 132 144 / 10%), 0 3px 6px rgb(0 0 0 / 8%);
  }
  .deleteTask input{
    width: 5%;
    height: 50%;
    border:none;
    border-radius: 1px;
    background-color: rgba(0, 0, 0, 0.158);
  }

</style>