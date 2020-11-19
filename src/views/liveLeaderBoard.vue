<template>
	<div>
		<span class="is-size-1">
			LeaderBoard
		</span>
		 <b-table
            :data="data"
            :bordered="false"
            :striped="true"
            :narrowed="false"
            :hoverable="true"
            :loading="isLoading"
            :focusable="true"
            :mobile-cards="false">
		</b-table>

	</div>
</template>


<script>
import firebaseApp from '../firebaseConfig'
export default {
	data() {
		return {
			data: [],
			isLoading: false
		}
	},
	beforeMount() {
		this.isLoading = true;
		firebaseApp.db.collection('user').orderBy('maxQuestionTech', 'desc').get().then(data => {
			this.data.push(data.data())
			this.isLoading = false
		});
	}
}
</script>