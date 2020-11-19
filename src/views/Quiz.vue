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
          Tick-Tock
        </b-navbar-item>
      </template>
    </b-navbar>
    <div v-if="started">
        <!-- status level -->
        <nav class="level is-mobile">
        <div class="level-item has-text-centered">
            <div>
            <p class="heading">Time</p>
            <p class="title">{{ Hours !== 0 ? `${Hours}:` : '' }}{{getTwoDigitNumber(Minutes)}}:{{ getTwoDigitNumber(Seconds) }}</p>
            </div>
        </div>
        <div class="level-item has-text-centered">
            <div>
            <p class="heading">Technical</p>
            <p class="title">{{techCount}}</p>
            </div>
        </div>
        <div class="level-item has-text-centered">
            <div>
            <p class="heading">Non-Technical</p>
            <p class="title">{{nonTechCount}}</p>
            </div>
        </div>
        <div class="level-item has-text-centered">
            <div>
            <p class="heading">Total</p>
            <p class="title">{{techCount + nonTechCount}}</p>
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
            <TechnicalQuiz :key="currentQuestionTech"/>
            </b-tab-item>

            <b-tab-item label="Non-technical">
            <NonTechnicalQuiz :key="currentQuestionNonTech" />
            </b-tab-item>
        </b-tabs>
        </section>
    </div>
    <div v-else>
        Event will start in a while, stay on this page
    </div>

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
import firebaseApp from "../firebaseConfig";
import moment from "moment";
export default {
	data() {
		return {
			activeTab: 0,
			Minutes: 0,
			Seconds: 0,
			Hours: 0,
			timer: {},
			startTime:0,
			techCount:0,
			nonTechCount:0,
			skipCount:0,
			currentQuestionTech:0,
			currentQuestionNonTech:0,
			user:null,
			started:false
		};
	},
	watch: {
		startTime(newVal) {
			if (newVal.seconds) {
				this.setTime();

			}
		}
	},
	mounted() {
		firebaseApp.db.collection("admin").doc("XcEoKorsJfpu2TrWbuoA").onSnapshot(value => {
			this.started = value.data().start;
			if(this.started){
				this.startTimer();
			}
		});
		firebaseApp.db.doc("user/"+localStorage.getItem("uid")).onSnapshot(snap => {
			this.user  = snap.data();
			// console.log(this.user)
			this.startTime = this.user.startTime;
			this.techCount = this.user.attemptTech.length;
			this.nonTechCount = this.user.attemptNonTech.length;
			this.currentQuestionTech = this.user.currentQuestionTech;
			this.currentQuestionNonTech = this.user.currentQuestionNonTech;
			this.skipCount = (this.user.maxQuestionTech + this.user.maxQuestionNonTech) - (this.user.solvedTech.length + this.user.solvedNonTech.length);
		});
	},
	methods: {
		startTimer(){
			firebaseApp.db.collection("user").doc(localStorage.getItem("uid")).update({
				startTime: new Date()
			});
		},
		// this function is used to get values like "01" from  value 1 (basically for beauty)
		getTwoDigitNumber(val) {
			return ("0" + val.toString()).slice(-2);
		},
		// calculate the elapsed time for the first time when the page loads. Momentjs was used for convinience (have a look at it its awesome)
		setTime() {
			this.Seconds = Math.abs(moment().format("s") - moment.unix(this.startTime.seconds).format("s"));
			this.Minutes = Math.abs(moment().format("m") - moment.unix(this.startTime.seconds).format("m"));
			const hours = Math.abs(moment().format("h") - moment.unix(this.startTime.seconds).format("h"));
			const days = Math.abs(moment().format("DDD") - moment.unix(this.startTime.seconds).format("DDD"));
			this.Hours = hours + days * 12;
			// setInterval calls an anonymous function every 1000 milisecond (every second). this is to increment time
			setTimeout(() => {
				this.setTime();
			}, 600000);

			clearInterval(this.timer);
			this.timer = setInterval(() => {
				// eslint-disable-next-line no-debugger
				this.Seconds += 1;
				if (this.Seconds === 60) {
					this.Seconds = 0;
					this.Minutes += 1;
					if (this.Minutes === 60) {
						this.Minutes = 0;
						this.Hours += 1;
					}
				}
			}, 1000);
		}
	},
	components: {
		TechnicalQuiz,
		NonTechnicalQuiz
	}
};
</script>
