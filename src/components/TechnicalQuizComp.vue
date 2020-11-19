<template>
  <div id="TechnicalQuizMain">
    <h1 class="is-size-2">
      {{ question.Question }}
    </h1>
    <div
      v-if="!solved"
      class="container"
    >

      <div v-if="question.type === 'mcq'">
        <MCQ
          :selectedOption="mcqSelectedOption"
          @select="select($event)"
          :options="question.options"
        />
      </div>
      <div
        class=""
        v-else-if="question.type === 'gibb'"
      >
        <Gibb
          :answerVal="answer"
          @input="gibb = $event"
        />
      </div>
      <div v-else-if="question.type === 'code'">
        <codeEdit />
      </div>
      <div v-else-if="question.type === 'output'">
        <outputt
          @select="val"
          :ques="question"
        />
      </div>
    </div>
    <div
      v-else
      class="container"
    >
      <span class="is-size-1">
        Solved
      </span>
    </div>
    <Buttons
      @previous="prev"
      @next="next"
      @submit="submit"
    />
  </div>
</template>

<script>
import Buttons from "./BottomButtons";
import codeEdit from "./code.vue";
import Gibb from "./gibb";
import MCQ from "./mcq";
// import { mapGetters } from "vuex";
import firebaseApp from "../firebaseConfig";
import outputt from "./output.vue";
import Axios from "axios";
export default {
	data: function () {
		return {
			question: {},
			mcqSelectedOption: null,
			gibb: "",
			currentQuestion: 0,
			qsolved: [],
			solved: false
		};
	},
	components: {
		Buttons,
		MCQ,
		Gibb,
		codeEdit,
		outputt
	},
	beforeMount() {
		firebaseApp.db.doc("user/" + localStorage.getItem("uid")).onSnapshot(snap => {
			this.currentQuestion = snap.data().currentQuestionTech,
			this.qsolved = snap.data().attemptTech;
			this.getQues();
		});
	},
	methods: {
		submit() {
			Axios.post("http://91.211.155.6:5000/api/tech", {
				question: "ques_tech" + this.currentQuestion,
				answer: this.mcqSelectedOption
			}, {
				headers: {
					authorization: "1 " + localStorage.getItem("uid"),
					"content-type": "application/json",
					"Access-Control-Allow-Origin": "*"
				}
			// eslint-disable-next-line no-unused-vars
			}).then(response => {
				// console.log(response.data);
				let k = this.qsolved.filter(e => e !== "ques_tech" + this.currentQuestion).length;
				if (k == 0) this.qsolved.push(this.question.id);
				console.log(this.qsolved);
				firebaseApp.db.collection("user").doc(localStorage.getItem("uid")).update({
					attemptTech: this.qsolved,
					currentQuestionTech: this.currentQuestion + 1,
					maxQuestionTech: this.currentQuestion + 1,
				});
				this.currentQuestion++;
			}).catch(error => this.$buefy.toast.open({
				message: error.message,
				type: "is-danger"
			}));
		},
		val(opt) {
			// console.log(opt)
			this.mcqSelectedOption = opt;
		},
		prev() {
			if (this.currentQuestion != 0) {
				firebaseApp.db.collection("user").doc(localStorage.getItem("uid")).update({
					currentQuestionTech: this.currentQuestion - 1,
				});
			}
		},
		next() {
			firebaseApp.db.collection("user").doc(localStorage.getItem("uid")).update({
				currentQuestionTech: this.currentQuestion + 1,
				attemptTech: this.qsolved,
				maxQuestionTech: this.currentQuestion + 1,
			});
			this.currentQuestion++;
		},
		select(option) {
			this.mcqSelectedOption = this.mcqSelectedOption === option ? null : option;
		},
		getQues() {
			firebaseApp.db.collection("ques").doc("ques_tech" + this.currentQuestion).get().then(data => {
				// console.log(data.data());
				var temp = Object.assign({}, data.data());
				temp.id = data.id;
				this.question = temp;
				// console.log(this.qsolved)
				let ded = this.qsolved.filter(e => e != data.id);
				console.log(ded);
				console.log(ded.length);
				this.solved = false;
				if (ded.length == 0 && this.qsolved.length != 0) this.solved = true;
			});

		}
	}
};
</script>
