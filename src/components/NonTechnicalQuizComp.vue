<template>
  <div id="TechnicalQuizMain">
    <h1 class="is-size-2">
      {{ question.Question }}
    </h1>
    <div class="contsinrt">

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
import Gibb from "./gibb";
import MCQ from "./mcq";
import firebaseApp from "../firebaseConfig";
import { mapGetters } from "vuex";
export default {
	data: function () {
		return {
			question: {},
			answer: "",
			mcqSelectedOption: null
		};
	},
	components: {
		Buttons,
		MCQ,
		Gibb
	},
	computed: {
		...mapGetters({
			quesNumber: "GET_NONTECH",
			skipped: "GET_SKIPPED_NUMBERS_TECH"
		})
	},
	beforeMount() {
		this.getQues();
	},
	methods: {
		submit() {
			if (this.questions[this.quesNumber].type === "mcq") {
				// code to submit mcq answer
				this.mcqSelectedOption = null;
			} else if (this.questions[this.quesNumber].type == "gibb") {
				// code to submit gibberish
				this.gibb = "";
			}
			// code to handle submissionof code type question's answer
			firebaseApp.db.collection("users").doc(this.$store.state.user.id).update({
				nontechQnum: this.quesNumber
			});
			this.$store.dispatch("TECH_INCREMENT_ACTION", this.question);
			this.$store.commit("NON_TECH_ATTEMPT");
			this.getQues();
		},
		prev() {
			this.$store.commit("TECH_DECREMENT");
			this.getQues();
		},
		next() {
			var temp = Object.assign({}, this.question);
			temp.domain = "tech";
			this.$store.commit("ADD_SKIPPED_QUES", temp);
			this.$store.commit("TECH_INCREMENT");
			this.getQues();
			firebaseApp.db.collection("user").doc(this.$store.state.user.id).update({
				skipped: this.skipped
			});
		},
		select(option) {
			this.mcqSelectedOption = this.mcqSelectedOption === option ? null : option;
		},
		getQues() {
			firebaseApp.db.collection("ques").doc("ques_non_tech" + this.quesNumber).get().then(data => {
				var temp = Object.assign({}, data.data());
				temp.id = data.id;
				this.question = temp;
			});
		}
	},
};
</script>

<style>
</style>