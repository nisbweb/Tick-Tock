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
import { mapGetters } from "vuex";
import moment from "moment";
export default {
	data() {
		return {
			activeTab: 0,
			Minutes: 0,
			Seconds: 0,
			Hours: 0,
			timer: {}
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
	},
	methods: {
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
			this.timer = setInterval(() => {
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
	computed: {
		...mapGetters({
			startTime: "GET_START_TIME",
			techCount: "GET_TECH",
			nonTechCount: "GET_NONTECH",
			// skipCount returns length of skipQues and not the actual list itself
			skipCount: "GET_SKIPS"
		})
	},
	components: {
		TechnicalQuiz,
		NonTechnicalQuiz
	}
};
</script>
