<template>
<div class="navbar-div">
    <navbar class="navbar fixed-top navbar-light navbar-expand-lg navbar-template">
        <b-navbar-brand class="mr-auto logo-item">
            <a class="logo-link" href="#landingPage" v-smooth-scroll="{ duration: 2000 }">
                <img src="../../assets/logo.png" id="logo" alt="Eventor logo">
            </a>
        </b-navbar-brand>

    <div class="d-flex flex-row order-2 order-lg-3">
        <ul class="navbar-nav flex-row">
            <li class="nav-item"><a class="nav-link px-2" href="#"><span class="fa fa-facebook"></span></a></li>
            <li class="nav-item"><a class="nav-link px-2" href="#"><span class="fa fa-twitter"></span></a></li>
            <li class="nav-item"><a class="nav-link px-2" href="#"><span class="fa fa-youtube"></span></a></li>
            <li class="nav-item"><a class="nav-link px-2" href="#"><span class="fa fa-linkedin"></span></a></li>
        </ul>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown">
            <span class="navbar-toggler-icon"></span>
        </button>
    </div>
    <div class="collapse navbar-collapse order-3 order-lg-2" id="navbarNavDropdown">
        <ul class="navbar-nav ml-auto">
            <li class="nav-item"><a class="nav-link" href="#">Home</a></li>
            <li class="nav-item"><a class="nav-link" href="#">Features</a></li>
            <li class="nav-item"><a class="nav-link" href="#">Pricing</a></li>
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="http://example.com" id="navbarDropdownMenuLink" data-toggle="dropdown">Dropdown link</a>
                <div class="dropdown-menu dropdown-menu-right">
                    <a class="dropdown-item" href="#">Action</a>
                    <a class="dropdown-item" href="#">Another action</a>
                    <a class="dropdown-item" href="#">Something else here</a>
                </div>
            </li>
        </ul>
    </div>
    </navbar>
</div>
</template>

<style scoped>
.navbar-div{
        height: 80px;
        margin-bottom: 3px;
        font-size: 24px;
}

#logo {
        width: 300px;
    }
</style>