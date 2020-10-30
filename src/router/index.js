import Vue from "vue";
import VueRouter from "vue-router";
import firebaseApp from "../firebaseConfig";

Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		name: "Login",
		component: () => import("../views/login.vue"),
		meta: {
			requiresAuth: false,
		},
	},
	{
		path: "/quiz",
		name: "Quiz",
		component: () => import("../views/Quiz.vue")
		// Auth temporarily disabled for development purpose. please uncomment in production
		// meta: {
		// 	requiresAuth: true,
		// },
	},
	{
		path: "/final",
		name: "Final",
		component: () => import("../views/liveLeaderBoard.vue"),
		meta: {
			requiresAuth: true,
		},
	},
];

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes,
});

router.beforeEach((to, from, next) => {
	const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
	if (!requiresAuth) {
		next();
	} else {
		if (firebaseApp.auth.currentUser) {
			next();
		} else {
			router.replace({
				path: "/",
			});
		}
	}
});

export default router;
