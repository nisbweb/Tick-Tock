<template>
  <div id="TechnicalQuizMain">
    <h1 class="is-size-2">
      {{ questions[quesNumber].Question }}
    </h1>
    <div class="contsinrt">

      <div v-if="questions[quesNumber].type === 'mcq'">
        <MCQ
          :selectedOption="mcqSelectedOption"
          @select="select($event)"
          :options="questions[quesNumber].options"
        />
      </div>
      <div
        class=""
        v-else-if="questions[quesNumber].type === 'gibb'"
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
import questions from "../nonTechQuestions.json";
import Gibb from "./gibb";
import MCQ from "./mcq";
import { mapGetters } from "vuex";
export default {
	data: function () {
		return {
			questions,
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
			quesNumber: "GET_NONTECH"
		})
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
			this.$store.dispatch("TECH_INCREMENT_ACTION", this.questions[this.quesNumber]);
		},
		prev() {
			this.$store.commit("TECH_DECREMENT");
		},
		next() {
			var temp = Object.assign({}, this.questions[this.quesNumber]);
			temp.domain = "tech";
			this.$store.commit("ADD_SKIPPED_QUES", temp);
			this.$store.commit("TECH_INCREMENT");
		},
		select(option) {
			this.mcqSelectedOption = this.mcqSelectedOption === option ? null : option;
		}
	}
};
</script>

<style>
</style>