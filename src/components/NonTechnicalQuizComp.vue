<template>
  <div id="NonTechnicalQuizMain">
    <h1 class="is-size-2">
      {{ question.Question }}
    </h1>
    <div v-if="!solved" class="container">

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
        <outputt @select="val" :ques="question"/>
      </div>
    </div>
    <div v-else style="height: 50vh; width: 100%; display: flex; justify-content: center; align-items: center" class="notification is-success container">
      <div style="width: 200px; height: 100px" class="is-size-1">
        Solved
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
import codeEdit from "./code.vue";
import Gibb from "./gibb";
import MCQ from "./mcq";
import { mapGetters } from "vuex";
import firebaseApp from "../firebaseConfig";
import outputt from "./output.vue";
import Axios from 'axios'
export default {
	data: function () {
		return {
			question: {},
			mcqSelectedOption: null,
            gibb: "",
            currentQuestion:0,
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
        firebaseApp.db.doc("user/"+localStorage.getItem('uid')).onSnapshot(snap => {
            this.currentQuestion = snap.data().currentQuestionNonTech,
            this.qsolved = snap.data().attemptNonTech
            this.getQues();
        })
	},
	methods: {
		submit() {
			 Axios.post("http://91.211.155.6:5000/api/nontech", {
          question: "ques_non_tech" + this.currentQuestion,
          answer: this.mcqSelectedOption
      }, {
          headers: {
              authorization: "1 " + localStorage.getItem("uid"),
              "content-type": "application/json",
              "Access-Control-Allow-Origin": "*"
          }
      }).then(response => {
          // console.log(response.data);
				this.qsolved.push(this.question.id)
				let uniqueChars = [...new Set(this.qsolved)];
          firebaseApp.db.collection("user").doc(localStorage.getItem("uid")).update({
                attemptNonTech: uniqueChars,
                currentQuestionNonTech: this.currentQuestion+1,
                maxQuestionNonTech: this.currentQuestion+1,
			});
      this.currentQuestion++;
      }).catch(error => this.$buefy.toast.open({
          message: error.message,
          type: "is-danger"
      }));
		},
    val(opt) { 
      // console.log(opt)
      this.mcqSelectedOption = opt
    },
		prev() {
            if(this.currentQuestion != 0) {
              firebaseApp.db.collection("user").doc(localStorage.getItem("uid")).update({
                currentQuestionNonTech: this.currentQuestion-1,
			});
            }
		},
		next() {
			if(this.currentQuestion < 30) {
        firebaseApp.db.collection("user").doc(localStorage.getItem("uid")).update({
                currentQuestionNonTech: this.currentQuestion+1,
                attemptNonTech: this.qsolved,
                maxQuestionNonTech: this.currentQuestion+1,
			});
      this.currentQuestion++;
      } else {
        this.$buefy.toast.open({
          message: 'This is the last question of non technical genre',
          type: 'is-success'
        })
      }
		},
		select(option) {
			this.mcqSelectedOption = this.mcqSelectedOption === option ? null : option;
		},
		getQues() {
			firebaseApp.db.collection("ques").doc("ques_non_tech" + this.currentQuestion).get().then(data => {
				// console.log(data.data());
				var temp = Object.assign({}, data.data());
				temp.id = data.id;
				this.question = temp;
        // console.log(this.qsolved)
				this.solved = false;
				if (this.qsolved.includes(data.id)) this.solved = true;
			})

		}
	}
};
</script>
