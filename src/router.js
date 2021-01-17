import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export const router = new Router({
  mode: "history",
  scrollBehavior: function(to) {
    if (to.hash) {
        return {selector: to.hash}
    } else {
        return { x: 0, y: 0 }
    }
  },
  routes: [
    {
      path: "/",
      name: "visitor-pages",
      component: () => import("./components/VisitorPages")
    },
    {
        path: "/eventor",
        name: "visitor-pages",
        component: () => import("./components/VisitorPages.vue")
    },
    {
      path: '/eventor/profile',
      name: 'profile',
      // lazy-loaded
      // component: () => import('./views/Profile.vue')
      component: () => import("./components/loggedIn-pages/Profile")
    },
    {
      path: "/eventor/myProfile",
      name: "my-profile",
      component: () => import("./components/loggedIn-pages/Profile")
    },
    {
      path: '/eventor/admin',
      name: 'admin',
      // lazy-loaded
      component: () => import('./views/BoardAdmin.vue')
    },
    {
      path: '/eventor/mod',
      name: 'moderator',
      // lazy-loaded
      component: () => import('./views/BoardModerator.vue')
    },
    {
      path: '/eventor/user',
      name: 'user',
      // lazy-loaded
      component: () => import('./views/BoardUser.vue')
    },
    {
      path: "/eventor/users",
      // alias: "/events",
      name: "users",
      component: () => import("./components/loggedIn-pages/UsersList")
    },
    {
      path: "/eventor/events/my",
      // alias: "/events",
      name: "events-my",
      component: () => import("./components/loggedIn-pages/MyEvents")
    },
    {
      path: "/eventor/events/subscriptions",
      // alias: "/events",
      name: "events-subscribed",
      component: () => import("./components/loggedIn-pages/MySubscriptions")
    },
    {
      path: "/eventor/events",
      // alias: "/events",
      name: "events",
      component: () => import("./components/EventsList")
    },
    {
      path: "/eventor/events/add",
      name: "add",
      component: () => import("./components/AddEvent")
    },
    {
      path: "/eventor/events/:id",
      name: "event-details",
      component: () => import("./components/Event")
    }
  ]
});

//   New for auth
  // router.beforeEach((to, from, next) => {
  //   const publicPages = ['/login', '/register', '/home'];
  //   const authRequired = !publicPages.includes(to.path);
  //   const loggedIn = localStorage.getItem('user');
  
  //   // trying to access a restricted page + not logged in
  //   // redirect to login page
  //   if (authRequired && !loggedIn) {
  //     next('/login');
  //   } else {
  //     next();
  //   }
  // });