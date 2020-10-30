import Vue from "vue";
import Vuex from "vuex";
import firebaseApp from "../firebaseConfig";

Vue.use(Vuex);

// eslint-disable-next-line no-unused-vars
const store = new Vuex.Store({
	state: {
		user: {
			displayName: null,
			email: null,
			id: null,
			startTime: null,
			endTime: null,
			solvedTech: null,
			solvedNotTech: null,
		},
	},
	mutations: {
		EDIT_USER: (state, payload) => {
			console.log(state, payload);
			firebaseApp.db.collection("test").add({
				email: "iresh.sharma8@gmail.com",
			});
		},
	},
	// actions: {
	// 	FETCH_USER: (state, payload) => {},
	// },
});

export default store;