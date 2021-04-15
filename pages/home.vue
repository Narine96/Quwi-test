<template class="template">
    <div>
        <div class="menu">
            <div>
                <h1 class="logo_q">Q</h1>
            </div>
            <div>
                <button class="button" @click="redirection('home')">PROJECTS</button>
                <button class="button" @click="redirection('logout')">LOGOUT</button>
            </div>
        </div>
        <div v-if="projects.length" class="project_root">
                <div v-for="project in projects[0]['projects']" :key="project.id" class="project" @click="edit(project.id)">
                    <div class="project_left">
                        <img v-bind:src="project['logo_url']" alt="logo" class="project_logo">
                        <p class="project_name">{{project['name']}}</p>
                    </div>
                    <div v-if="project['is_active'] == 1" class="active">Active</div>
                    <div v-else class="inactive">Inctive</div>
                    <div class="time">
                        <p class="time_line"><span>time this week</span> <span class="time_hour">00:00:00</span></p>
                        <p class="time_line"><span>this month</span> <span class="time_hour">00:00:00</span></p>
                        <p class="time_line"><span>total</span> <span class="time_hour">00:00:00</span></p>
                    </div>
                </div>
        </div>
    </div>
</template>
<script>
import {mapActions} from 'vuex';

export default {
    name:'home',
    data() {
        return {
            projects:[]
        }
    },
    created() {
        this.$axios.get('https://api.quwi.com/v2/projects-manage/index',{
            'headers':{'Authorization':'Bearer '+ this.$cookies.get('token')}
        })
        .then(response => {
                   this.projects.push(response.data)
                   this.setProject(this.projects[0]['projects'])
                   console.log(this.projects)
                })
                .catch(error =>{
                   console.log(error)
                })
},
    methods: {
       redirection(link) {
           if(link === 'home'){
                this.$router.push({
                    name: 'home',
                })
           }else if(link === 'logout'){
               this.$cookies.remove('token')
                this.$router.push({
                    name: 'login',
                })
           }
       },
       edit(id) {
        let editing = this.projects[0]['projects'].filter((item) =>{
            return item['id'] == id
        })
        this.setEditingProject(editing)
           this.$router.push({ 
               name: 'projects-editproject_id',
               params:{'editproject_id':id}
            })
       },
        ...mapActions({
            setProject:'user/setProject',
            setEditingProject:'user/setEditingProject',
        }),
    },
    
   
}
</script>
<style>
.template {
    background: #F4F4F4;
}
.menu {
    height: 70px;
    width: 100%;
    background: lightgray;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 35px;
    box-shadow: 0px 0px 6px 3px black;
    position: fixed;
    top: 0;
}
.logo_q {
    font-weight: 700;
    font-size: 35px;
}
.button {
    background: transparent;
    border: none;
    cursor: pointer;
}
.project_root {
    padding: 80px 40px;
}
.project {
    display: flex;
    justify-content: space-between;
    height: 110px;
    width: 650px;
    border-radius: 8px;
    border: 1px solid gainsboro;
    margin: 0 auto;
    margin-top: 10px;
    padding: 0 20px;
    background: white;
    cursor: pointer;
}
.project_left {
    display: flex;
    align-items: center;
    width: 45%;
}
.project_logo {
    height: 55%;
}
.project_name {
    font-weight: 700;
    margin-left: 15px;
}
.active {
    font-weight: 700;
    color: green;
    display: flex;
    align-items: center;
    width: 20%;
}
.inactive {
    font-weight: 700;
    color: red;
    display: flex;
    align-items: center;
    width: 20%;
}
.time {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    font-weight: 400;
    width: 35%;
}
.time_hour {
    font-weight: 700;
}
.time_line {
    display: flex;
    justify-content: space-between;
}

</style>