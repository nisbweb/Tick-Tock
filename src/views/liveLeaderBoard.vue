<template>
  <div>
    <section class="hero is-light is-fullheight">
      <div class="hero-body">
        <div class="container">
          <h1 class="title is-size-1">
            Tick-Tock ⏳
          </h1>
          <h1 class="is-size-6">
			  Thank you participating, here are your stats
		  </h1><br><br>
		  <nav class="level is-mobile">
        <!-- <div class="level-item has-text-centered">
            <div>
            <p class="heading">Time</p>
            <p class="title">{{ Hours !== 0 ? `${Hours}:` : '' }}{{getTwoDigitNumber(Minutes)}}:{{ getTwoDigitNumber(Seconds) }}</p>
            </div>
        </div> -->
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
        </nav><br><br>
		<h1 class="is-size-6">
			  Move back to the meet to find out the winners
		  </h1>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.hero {
  background-image: url("../assets/back1.svg");
  background-repeat: no-repeat;
  background-position: top right;
  background-size: 70vh;
}
.hero-body {
  background-image: url("../assets/nack2.svg");
  background-repeat: no-repeat;
  background-position: bottom left;
  background-size: 60vh;
}

@media screen and (max-width: 960px) {
  .hero {
    background: transparent;
  }
}
</style>

<script>
import firebaseApp from '../firebaseConfig'
export default {
	data() {
		return {
			techCount: 0,
			nonTechCount: 0,
			time: ''
		}
	},
	beforeMount() {
		firebaseApp.db.doc('user/'+localStorage.getItem('uid')).get().then(data => {
			this.techCount = data.data().solvedTech.length,
			this.nonTechCount = data.data().solvedNonTech.length;
			let start = new Date().setUTCSeconds(data.data().startTime);
			let end = new Date().setUTCSeconds(data.data().endTime);
			this.time = end - time
		})
	}
}
</script>