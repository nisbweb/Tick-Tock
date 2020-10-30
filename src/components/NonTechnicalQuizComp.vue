<template>
  <div id="TechnicalQuizMain">
      <h1 class="is-size-2">
        {{ questions[quesNumber].Question }}
      </h1>
      <Buttons />
  </div>
</template>

<script>
import Buttons from "./BottomButtons";
import questions from "../nonTechQuestions.json";
export default {
	data: function() {
		return {
			questions
		};
	},
	components:{
		Buttons
	},
	computed: {
		quesNumber() {
			return this.$store.state.nonTechCurrent;
		}
	}
};
</script>

<style>

</style>