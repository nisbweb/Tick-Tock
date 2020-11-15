<template>
  <div id="gibbMain">
    <b-field placeholder="Your answer">
        <div class="container my-6">
            <b-input v-model="answer" @input="$emit('input', answer)"></b-input>
        </div>
    </b-field>
  </div>
</template>

<script>
export default {
	props:{
		"answerVal":{
			type: String,
			default: ""
		}
	},
	data() {
		return {
			answer: ""
		};
	},
	watch:{
		answerVal(val){
			if(val === ""){
				this.answer = "";
			}
		}
	}

};
</script>

<style>
</style>