// all the buttons emit respective events which can be listened to on the main components
<template>
  <div
    id="BottomButtonsMain"
    class="my-2"
  >
    <div class="buttonWrapper">
      <div class="backButton">
        <b-button
          class="mx-2"
          type="is-danger is-light"
          @click="$emit('previous')"
        >Previous</b-button>
      </div>
      <div class="buttonWrapperNext">
        <b-button
          class="mx-2"
          type="is-success"
          @click="$emit('submit')"
        >Submit</b-button>
        <b-button
          class="mx-2"
          type="is-warning"
          @click="$emit('next')"
        >Next</b-button>
      </div>
    </div>

  </div>
</template>

<script>
export default {

};
</script>

<style scoped>
.buttonWrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
}
.buttonWrapperNext {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
}

/* in case buttons look weird on a mobile */
/* @media only screen and (max-width: 768px){
    .buttonWrapper{

    }
} */
</style>