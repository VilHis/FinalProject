<template>      
    <div class="RegisterWrapper">
        <div class="regUser">
            <h1>Регистрация</h1>
            <input v-model="user.username" placeholder="Имя">
            <input v-model="user.lastname" placeholder="Фамилия">
            <input v-model="user.email" placeholder="Почта">
            <input v-model="user.password" placeholder="Пароль"> 
            <select placeholder="Ваш Статус" v-model="user.status">
                <option>Я работник</option>
                <option>Я Начальник</option>
            </select>
            <button v-on:click="addUser">Зарегистрироваться</button>
            <a href="/signin">Войти</a>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
    export default {
        name: 'RegisterUser',
        data() {
            return { 
                user:
                [{
                    username:"",
                    email:"",
                    status:"",
                    password:"",
                    lastname:""
                }],
                workers:[],
                name: '',
                lastname: '',
                status:'',
                email:'',
                regflag:null
            }
        },
        mounted() {
            if (localStorage.name) {
                this.name = localStorage.name;
            }
            if (localStorage.lastname) {
                this.lastname = localStorage.status;
            }
            if (localStorage.status) {
                this.status = localStorage.status;
            }
            if (localStorage.regflag) {
                this.regflag = localStorage.regflag;
            }
            if (localStorage.email) {
                this.email = localStorage.email;
            }
        },
        methods: {
            getUser(){
                axios.get('http://localhost:9909/workers').then((res) =>{
                    console.log('ok');
                    const users = res.data;
                    this.workers=users;
            })
            },
            addUser(){
                axios.post('http://localhost:9909/workers',{
                    username :this.user.username,
                    email :this.user.email,
                    status :this.user.status,
                    password:this.user.password,
                    lastname:this.user.lastname,
                }).then(() => console.log('ok'))
                localStorage.name = this.user.username;
                localStorage.lastname = this.user.lastname;
                localStorage.status = this.user.status;
                localStorage.email = this.user.email;
                localStorage.regflag = true;
            }
        }
    }        
</script>

<style>
        .regUser{
            width: 25%;
            margin-left: 15%;
            margin-top: 5%;
            display: flex;
            flex-direction: column;
            align-items: center;
            border-radius: 10px;
          }
          .regUser *{
            width: 40%;
            height: 35px;
            margin: 1%;
            border: none;
            border-radius: 8px;
            color: black;
          }
          .regUser input{
            border-radius: 8px;
            z-index: 1;
          }
          .regUser input:hover{
            transition: all 0.2s;
            box-shadow: 0 7px 14px rgb(65 132 144 / 10%), 0 3px 6px rgb(0 0 0 / 8%);
            }
          .regUser select:hover{
                transition: all 0.2s;
                box-shadow: 0 7px 14px rgb(65 132 144 / 10%), 0 3px 6px rgb(0 0 0 / 8%);
            }
</style>