import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Buefy from "buefy";
import "buefy/dist/buefy.css";
import Vuex from "vuex";
import store from "./store/store";

Vue.use(Vuex);

Vue.use(Buefy);

Vue.config.productionTip = false;

new Vue({
	store: store,
	router,
	render: (h) => h(App),
}).$mount("#app");
