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
          <p class="title">30:20</p>
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
export default {
	data() {
		return {
			activeTab: 0
		};
	},
	components: {
		TechnicalQuiz,
		NonTechnicalQuiz
	}
};
</script>
