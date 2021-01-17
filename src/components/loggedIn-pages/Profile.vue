<template>
    <div class="myProfile center"> 

        <!-- Image upload -->
        <div v-if="currentFile" class="progress">
            <div
                class="progress-bar progress-bar-info progress-bar-striped"
                role="progressbar"
                :aria-valuenow="progress"
                aria-valuemin="0"
                aria-valuemax="100"
                :style="{ width: progress + '%' }"
            >
                {{ progress }}%
            </div>
        </div>

    <label class="btn btn-default">
      <input type="file" ref="file" @change="selectFile" />
    </label>

    <button class="btn btn-success" :disabled="!selectedFiles" @click="upload">
      Upload
    </button>

    <div class="alert alert-light" role="alert">{{ message }}</div>
        <b-row>
            <b-col class="image">
                <b-avatar :src="'http://localhost:8080/eventor/files/file/' + currentUser.profile_img" size="lg" class="profile-image" badge badge-offset="13px" badge-variant="light">
                    <template #badge><a href="#a"><b-icon icon="camera"></b-icon></a></template>
                </b-avatar>
            </b-col>

            <!-- Personal info -->
            <b-col cols="8">

                <b-form class="is-readonly">
                    <b-form-row id="names">
                        <b-col id="firstName">
                            <b-form-input
                                id="input-firstName"
                                v-model="currentUser.firstName"
                                v-validate="'min:2|max:20'"
                                placeholder="First name"
                                name="firstName"
                                data-vv-scope="info">
                            ></b-form-input>
                            <div
                                v-if="updating && 
                                errors.has('info.firstName')"
                                class="alert-danger"
                            >{{errors.first('info.firstName')}}</div>
                        </b-col>
                        
                        <b-col id="lastName">
                            <b-form-input
                                id="input-lastName"
                                v-model="currentUser.lastName"
                                v-validate="'min:2|max:30'"
                                placeholder="Last name"
                                name="firstName"
                                data-vv-scope="info">
                            ></b-form-input>
                            <div
                                v-if="updating && 
                                errors.has('info.lastName')"
                                class="alert-danger"
                            >{{errors.first('info.lastName')}}</div>
                        </b-col>
                    </b-form-row>

                    <b-form-row>
                        <b-col id="icon">
                            <b-icon icon="people-fill" scale="1.5"></b-icon>
                        </b-col>
                        <b-col id="username">
                            <b-form-input disabled
                                id="input-username"
                                v-model="currentUser.username"
                                placeholder="Username"
                            ></b-form-input>
                        </b-col>
                    </b-form-row>

                    <b-form-row>
                        <b-col id="icon">
                            <b-icon icon="lock-fill" scale="1.5"></b-icon>
                        </b-col>
                        <b-col id="password">
                            <b-form-input disabled
                                id="input-password"
                                value="password"
                                type="password"
                            ></b-form-input>
                        </b-col>
                    </b-form-row>

                    <b-form-row>
                        <b-col id="icon">
                            <b-icon icon="envelope" scale="1.5"></b-icon>
                        </b-col>
                        <b-col id="email">
                            <b-form-input
                                id="input-email"
                                v-model="currentUser.email"
                                v-validate="'required|email|max:50'"
                                type="email"
                                placeholder="Email"
                                name="email"
                                data-vv-scope="info"
                            ></b-form-input>
                            <div
                                v-if="updating && 
                                errors.has('info.email')"
                                class="alert-danger"
                            >{{errors.first('info.email')}}</div>
                        </b-col>
                    </b-form-row>

                    <b-form-row>
                        <b-col id="icon">
                            <b-icon icon="phone" scale="1.5"></b-icon>
                        </b-col>
                        <b-col id="phone">
                            <b-form-input
                                id="input-phone"
                                v-model="currentUser.phone"
                                v-validate="'min:2|max:15'"
                                placeholder="Phone number"
                                name="phone"
                                data-vv-scope="info"
                            ></b-form-input>
                            <div
                                v-if="updating && 
                                errors.has('info.phone')"
                                class="alert-danger"
                            >{{errors.first('info.phone')}}</div>
                        </b-col>
                    </b-form-row>

                    <b-form-row>
                        <b-col id="icon">
                            <b-icon icon="flag" scale="1.5"></b-icon>
                        </b-col>
                        <b-col id="nationality">
                            <b-form-input
                                id="input-nationality"
                                v-model="currentUser.nationality"
                                v-validate="'min:2|max:50'"
                                placeholder="Nationality"
                                name="nationality"
                                data-vv-scope="info"
                            ></b-form-input>
                            <div
                                v-if="updating && 
                                errors.has('info.nationality')"
                                class="alert-danger"
                            >{{errors.first('info.nationality')}}</div>
                        </b-col>
                    </b-form-row>

                    <b-form-row>
                        <b-col id="icon">
                            <b-icon icon="calendar2-event" scale="1.5"></b-icon>
                        </b-col>
                        <b-col id="birthday">
                            <b-form-datepicker 
                                v-model="currentUser.birthday" 
                                name="birthday"
                                data-vv-scope="info"
                            ></b-form-datepicker> 
                            <div
                                v-if="updating && 
                                errors.has('info.birthday')"
                                class="alert-danger"
                            >{{errors.first('info.birthday')}}</div>
                        </b-col>
                    </b-form-row>

                    <b-form-row>
                        <b-col id="icon">
                            <b-icon icon="person" scale="1.5"></b-icon>
                        </b-col>
                        <b-col id="gender">
                            <b-form-row>
                                <b-col><b-form-radio v-model="currentUser.gender" value="Male">Male</b-form-radio></b-col>
                                <b-col><b-form-radio v-model="currentUser.gender" value="Female">Female</b-form-radio></b-col>
                                <b-col><b-form-radio v-model="currentUser.gender" value="Other">Other</b-form-radio></b-col>
                            </b-form-row>
                        </b-col>
                    </b-form-row>
                </b-form>

                <button type="submit" class="badge badge-success"
                        @click="updateUser">Update
                </button>
                <p v-if="updateMessage"
                    class="alert"
                    :class="updated ? 'alert-success' : 'alert-danger'">
                     {{updateMessage.message}}
                </p>
            </b-col>
            
        </b-row>
    </div>
</template>

<script>
import UploadFilesService from "../../services/UploadFilesService";
import UserDataService from "../../services/UserDataService";

export default {
    data() {
        return {
            selectedFiles: undefined,
            currentFile: undefined,
            progress: 0,
            message: "",

            fileInfos: [],

            updating: false,
            updateMessage: '',
            updated: false,

            today: new Date()
        };
    },
    methods: {
        selectFile() {
            this.selectedFiles = this.$refs.file.files;
        },
          upload() {
            this.progress = 0;

            this.currentFile = this.selectedFiles.item(0);
            UploadFilesService.uploadProfileImage(this.currentUser.id, this.currentFile, event => {
                this.progress = Math.round((100 * event.loaded) / event.total);
            })
                .then(response => {
                this.message = response.data.message;
                return UploadFilesService.getProfileImage(this.currentUser.id);
                })
                .then(files => {
                    this.currentUser.profile_img = files.data.name;
                    localStorage.setItem('user', JSON.stringify(this.currentUser));
                })
                .catch(e => {
                    this.progress = 0;
                    this.message=
                    (e.response && e.response.data) ||
                            e.message ||
                            e.toString();
                    this.currentFile = undefined;
                });
                this.progress = 0;
                this.currentFile = undefined;
                

            this.selectedFiles = undefined;
        },
        updateUser() {
            this.updating = true;
            this.updated = false;
            this.updateMessage = "";

            this.$validator.validate("info.*").then(isValid => {
            if (isValid) {
                UserDataService.update(this.currentUser.id, this.currentUser)
                    .then(response => {
                        
                        if(response.status == '200')
                        { this.updated = true; }
                        else { this.updated = false; }
                        this.updateMessage = response.data;
                        
                        if(this.updated)
                        { return UserDataService.get(this.currentUser.id); }
                    })
                    .then(response => {
                        if(this.updated)
                        {
                            this.currentUser.firstName = response.data.firstName;
                            this.currentUser.lastName = response.data.lastName;
                            this.currentUser.email = response.data.email;
                            this.currentUser.birthday = response.data.birthday;
                            this.currentUser.gender = response.data.gender;
                            this.currentUser.phone = response.data.phone;
                            this.currentUser.nationality = response.data.nationality;
                            
                            localStorage.setItem('user', JSON.stringify(this.currentUser));
                        }
                    })
                    .catch(e => {
                        console.log(e);
                        this.updateMessage=
                        (e.response && e.response.data) ||
                            e.message ||
                            e.toString();
                    });
                }
            })
        }
    },
    computed: {
        currentUser() {
            return this.$store.state.auth.user;
        },
        currentDate() {
            return this.today.getDate();
        }
    },
    mounted() {
        if (!this.currentUser) {
            this.$router.push('/'); 
        }
    }
}
</script>

<style scoped>
input{
    border-top-style: hidden;
    border-right-style: hidden;
    border-left-style: hidden;
    border-bottom-style: hidden;
}

.profile-image {
        border: 3px solid whitesmoke;
        width: 170px;
        height: 170px;
}
.image {
    margin: auto;
    display: block;
}
</style>