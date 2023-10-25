<template>
    <UserTable v-if="status === 'Я работник'"/>
    <AdminTable v-if="status === 'Я начальник'"/>

</template>
  
<script>
import AdminTable from './AdminTable.vue';
import UserTable from './UserTable.vue';


  export default {
    name: 'PersonalTab',
    components: {
        AdminTable,
        UserTable,
    },
    data() {
        return { 
            status:localStorage.status
        }
    },
  }
 </script>
  
<style>
</style>
  