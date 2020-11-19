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
			solvedNonTech: null,
			skippedQues: {
				tech: [],
				non: []
			}
		},
		techCurrent: 0,
		nonTechCurrent: 0,
		lang: 0,
		theme: 0,
		nonTechAttempt: 0,
		techAttempt: 0,
		totalUser: 0,
		skippTechNum: 0,
		skippNonTechNum: 0
	},
	mutations: {
		EDIT_USER: (state, payload) => {
			if(payload.displayName) {
				state.user.displayName = payload.displayName;
			}
			if(payload.email) {
				state.user.email = payload.email;
			}
			if(payload.id) {
				state.user.id = payload.id;
			}
			if(payload.startTime) {
				state.user.startTime = payload.startTime;
			}
			if(payload.endTime) {
				state.user.endTime = payload.endTime;
			}
			if(payload.solvedNonTech) {
				state.user.solvedNonTech = payload.solvedNonTech;
			}
			if(payload.solvedTech) {
				state.user.solvedTech = payload.solvedTech;
			}
		},
		ADD_SKIPPED_QUES: (state, payload) => {
			if(payload.type === "non") {
				state.user.skippedQues.non.push(payload.num);
			} else {
				state.user.skippedQues.tech.push(payload.num);
			}
		},
		TECH_INCREMENT: (state) => {
			state.techCurrent++;
		},
		NON_TECH_INCREMENT: (state) => {
			state.nonTechCurrent++;
		},
		TECH_DECREMENT: (state) => {
			state.techCurrent--;
		},
		NON_TECH_DECREMENT: (state) => {
			state.nonTechCurrent--;
		},
		TECH_ATTEMPT: (state) => {
			state.techAttempt++;
		},
		NON_TECH_ATTEMPT: (state) => {
			state.nonTechAttempt++;
		},
		UPDATE_LANG: (state, payload) => {
			state.lang = payload;
		},
		UPDATE_THEME: (state, payload) => {
			state.theme = payload;
		},
		TOTAL_USER: (state, payload) => {
			state.totalUser = payload.total;
		}
	},
	actions: {
		FETCH_USER: ({commit}, payload) => {
			firebaseApp.db.collection("user").doc(payload).get().then(val => {
				// // console.log(val.id, val.data());
				commit("EDIT_USER", val.data());
			}).catch(err => {
				console.error(err);
			});
		},
		TECH_INCREMENT_ACTION: (context, payload) => {
			// console.log(payload);
			context.state.user.skippedQues = context.state.user.skippedQues.filter((el) => el.id != payload.id && el.domain == "tech");
			context.commit("TECH_INCREMENT");
		},
		NON_TECH_INCREMENT_ACTION: (context, payload) => {
			context.state.user.skippedQues = context.state.user.skippedQues.filter((el) => el.id != payload.id && el.domain == "non");
			context.commit("NON_TECH_INCREMENT");
		}
	},
	getters:{
		GET_USER: state => state.user,
		GET_LANG: state => state.lang,
		GET_THEME: state => state.theme,
		GET_TECH: state => state.techCurrent,
		GET_NONTECH: state => state.nonTechCurrent,
		GET_TECH_AT: state => state.techAttempt,
		GET_NONTECH_AT: state => state.nonTechAttempt,
		GET_SKIPS: state => state.user.skippedQues.length,
		GET_START_TIME: state => state.user.startTime,
		GET_SKIPPED_NUMBERS_TECH: state => {
			var temp = [];
			state.user.skippedQues.forEach(el => {
				if(el.domain === "tech") temp.push(el.id);
			});
			return temp;
		},
		GET_SKIPPED_NUMBERS_NON_TECH: state => {
			var temp = [];
			state.user.skippedQues.forEach(el => {
				if(el.domain === "non") temp.push(el.id);
			});
			return temp;
		},
		GET_TOTAL_USER: state => state.totalUser,
		GET_TECH_SKIPPED: state => state.skippTechNum,
		GET_NON_TECH_SKIPPED: state => state.skippNonTechNum
	}
});

export default store;