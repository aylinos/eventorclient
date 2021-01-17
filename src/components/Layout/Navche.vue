<template>
    <b-nav-item class="nav-item" v-if="currentUser"> 
        <b-button v-b-toggle.sidebar-right>{{ currentUser.firstName }}</b-button>
        <b-sidebar id="sidebar-right" no header right shadow>
            <div class="px-3 py-2">
                <p>
                    Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
                    in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                </p>
                <b-img src="https://picsum.photos/500/500/?image=54" fluid thumbnail></b-img>
            </div>
        </b-sidebar>
    </b-nav-item>
</template>