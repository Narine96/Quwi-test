<template>
    <div class="edit_page">
        <div class="topbar">
            <button class="t_button" @click="back()">BACK</button>
        </div>
        <div class="card">
            <div>
                <p>Name</p></div>
            <div class="card_edit">
                <input type="text" name="" id="edit_input" :value="projectName" v-on:input="changeName($event)">
                <button class="accept"  @click="acceptNameChange()">OK</button>
            </div>
        </div>
    </div>
</template>
<script>
import {mapGetters} from 'vuex';

export default {
    data() {
      return {
            projectName:'',
            projectId:''
        }   
    },
    created() {
        this.projectId = this.$route.params.editproject_id 
    },
    computed:{
        ...mapGetters({
            getEditingProject:'user/getEditingProject',
        }),
    },
    methods: {
        back() {
             this.$router.push({
                    name: 'home',
                })
        },
        changeName(event) {
            this.projectName = event.target.value
        },
        acceptNameChange() {
            console.log(this.$cookies.get('token'))
            this.$axios.post('https://api.quwi.com/v2/projects-manage/update?id='+this.projectId,{
                    name:this.projectName,
                    },
                    {
                    'headers':{
                        'Authorization':'Bearer '+ this.$cookies.get('token'),
                        'Content-Type':'multipart/form-data'
                        }
            })
            .then(response => {
                    console.log(response)
                    })
                    .catch(error =>{
                    console.log(error)
                    })
        }
    }
}
</script>
<style scoped>
.edit_page {
    height: 100vh;
    background: #F4F4F4;
}
.t_button {
    height: 40px;
    width: 90px;
}
.topbar {
    height: 70px;
    padding: 15px 30px;
    background: #C1C8D2;
}
.card {
    display: flex;
    align-items: center;
    height: 120px;
    width: 450px;
    border-radius: 6px;
    border: 1px solid gainsboro;
    background: white;
    padding: 20px;
    margin: 30px;
}
.card_edit {
    margin-left: 50px;
    width: 100%;
}
#edit_input {
    height: 35px;
    width: 60%;
}
.accept {
    background: #395378;
    border-radius: 5px;
    height: 35px;
    width: 50px;
    color: white;
    border: none;
    cursor: pointer;
}
</style>