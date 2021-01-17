<template>
    <div>
        <b-row class="infos">
            <b-col class="col-md-2 image" v-if="userInfo.profileImg">
                <b-avatar 
                :src="'http://localhost:8080/eventor/files/file/' + userInfo.profileImg" 
                size="lg" 
                class="profile-image">
                </b-avatar>
            </b-col>
            <b-col class="col-md-7">
                <p class="names"> {{ userInfo.firstName }} {{ userInfo.lastName }} </p>
                <p class="username"> {{ userInfo.username }} </p>
            </b-col>

        </b-row>
        <b-row class="infos">
            <b-col cols="8">

                <b-row>
                    <b-col id="icon">
                        <b-icon icon="envelope" scale="1.5"></b-icon>
                    </b-col>
                    <b-col>
                        <p class="info"> {{ userInfo.email }} </p>
                    </b-col>
                </b-row>

                <b-row v-if="userInfo.phone">
                    <b-col id="icon">
                        <b-icon icon="phone" scale="1.5"></b-icon>
                    </b-col>
                    <b-col>
                        <p class="info"> {{ userInfo.phone }} </p>
                    </b-col>
                </b-row>

                <b-row v-if="userInfo.birthday">
                    <b-col id="icon">
                        <!-- <b-icon icon="calendar2-event" scale="1.5"></b-icon> -->
                        <i class="fas fa-birthday-cake" scale="1.5"></i>
                    </b-col>
                    <b-col>
                        <p class="info"> {{ birthday }} </p>
                    </b-col>
                </b-row>

                <b-row v-if="userInfo.nationality">
                    <b-col id="icon">
                        <b-icon icon="flag" scale="1.5"></b-icon>
                    </b-col>
                    <b-col>
                        <p class="info"> {{ userInfo.nationality }} </p>
                    </b-col>
                </b-row>

                <b-row v-if="userInfo.gender">
                    <b-col id="icon">
                        <b-icon icon="person" scale="1.5"></b-icon>
                    </b-col>
                    <b-col>
                        <p class="info"> {{ userInfo.gender }} </p>
                    </b-col>
                </b-row>

            </b-col>
        </b-row>

        <!-- <b-button class="mt-3" variant="outline-danger" block @click="hideModal">Close Me</b-button> -->
    </div>
</template>

<script>
import moment from 'moment';
export default {
    props: {
        userInfo:Object,
        text:String
    },
    computed: {
        birthday() {
            // return moment(this.userInfo.birthday).format('MMMM Do YYYY'); //shows birth date
            return moment().diff(this.userInfo.birthday, 'years',false); //shows years
        }
    }
}
</script>

<style scoped>
.infos {
    justify-content: center;
}

</style>