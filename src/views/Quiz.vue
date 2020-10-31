<template>
  <div id="QuizMain">
    <!-- main navbar -->
    <b-navbar>
      <template slot="brand">
        <b-navbar-item
          tag="router-link"
          :to="{ path: '/' }"
          class="is-size-5 has-text-weight-bold"
        >
          DreamCode
        </b-navbar-item>
      </template>
    </b-navbar>

    <!-- status level -->
    <nav class="level is-mobile">
      <div class="level-item has-text-centered">
        <div>
          <p class="heading">Time</p>
          <p class="title">30:{{ Minutes }}</p>
        </div>
      </div>
      <div class="level-item has-text-centered">
        <div>
          <p class="heading">Technical</p>
          <p class="title">10</p>
        </div>
      </div>
      <div class="level-item has-text-centered">
        <div>
          <p class="heading">Non-Technical</p>
          <p class="title">15</p>
        </div>
      </div>
      <div class="level-item has-text-centered">
        <div>
          <p class="heading">Total</p>
          <p class="title">25</p>
        </div>
      </div>
      <div class="level-item has-text-centered">
        <div>
          <p class="heading">Skipped</p>
          <p class="title">{{ skipCount }}</p>
        </div>
      </div>
    </nav>

    <!-- tabs/sections -->
    <section>
      <b-tabs
        v-model="activeTab"
        expanded
      >
        <b-tab-item label="Technical">
          <TechnicalQuiz />
        </b-tab-item>

        <b-tab-item label="Non-technical">
          <NonTechnicalQuiz />
        </b-tab-item>
      </b-tabs>
    </section>

    <!-- footer -->
    <footer class="footer">
      <div class="content has-text-centered">
        <p>
          Built with 🧠 by <a href="https://www.nisb.in">Team NISB</a>
          
        </p>
      </div>
    </footer>

  </div>
</template>

<script>
import TechnicalQuiz from "../components/TechnicalQuizComp";
import NonTechnicalQuiz from "../components/NonTechnicalQuizComp";
import {mapGetters} from "vuex";
// import moment from "moment";
export default {
	data() {
		return {
			activeTab: 0,
			Minutes: 0,
			Seconds: 0,
			Hours: 0,
			Days: 0
		};
	},
	watch:{
		startTime(newVal){
			if(newVal.seconds){
				this.setTime();
				
			}
		}
	},
	mounted(){
	},
	methods:{
		setTime(){
			// console.log(moment().format("s") , moment.unix(this.startTime.seconds).format("s"));
			// console.log(moment().format("m") , moment.unix(this.startTime.seconds).format("m"));
			// console.log(moment().format("h") , moment.unix(this.startTime.seconds).format("h"));
			// console.log(moment().from(moment.unix(this.startTime.seconds)));
			// console.log(`${this.Minutes}:${this.Seconds}`);
		}
	},
	computed: {
		...mapGetters({
			startTime: "GET_START_TIME"
		}),
		skipCount() {
			return this.$store.state.user.skippedQues.length;
		},
	},
	components: {
		TechnicalQuiz,
		NonTechnicalQuiz
	}
};
</script>
