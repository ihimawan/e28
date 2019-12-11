<template>
  <DefaultLayout>
    <template #header>{{header}}</template>
    <template #subtext> {{subtext}}</template>
    <hr class="my-4">
    <div>
      <img :src=mainImg id="quote-img" class="rounded float-left" height="200px">
      <blockquote class="blockquote" v-for="quote in quotes" :key=quote.name>
        <p class="mb-0">{{quote.msg}}</p>
        <footer class="blockquote-footer">{{quote.name}}<cite title="Source Title">
          {{quote.source}}</cite></footer>
      </blockquote>
    </div>
    <div>
      <h1 class="display-4">
        (11/20/19) New Chat Feature</h1>
      For existing players, you might have been waiting for this update for ages. Don't worry, we are here for you. We are coding as fast as we can with our little Alpaca paws (hooves? idk).
      Once you have finished the Llama and Alpaca test (if you've never been to this website, which how could you?, you'll find more about it once you've created a profile), you will be able
      to chat with any of our users.
      <img src="../../../../assets/images/preview/1.jpg" height="590" width="487" class="preview-image"><strong></strong>
      Chat windows will be created for each user you interact with. So you can live your inner fantasy as a creepy stalker. Don't worry, we don't judge anyone here at Alpacan Mingle. Unless
      you are a Llama. Llama bad.
      <img src="../../../../assets/images/preview/2.jpg" width="600" class="preview-image"/>
    </div>
    <a class="btn btn-primary btn-lg get-started-btn" data-test="register-button" href="#" role="button" @click="$emit('next')">
      Sounds intriguing... how can I join in the fun?</a>
    <div>
    </div>
  </DefaultLayout>
</template>

<script>
import DefaultLayout from '../../../UI/DefaultLayout/DefaultLayout'
import * as pageInfo from '../../../../helpers/preintro/library'

export default {
  next () {
    this.$emit('nextPageHandler')
  },
  components: {DefaultLayout},
  name: 'PreIntroPage',
  data: function () {
    return {
      mainImg: pageInfo.mainImg,
      header: pageInfo.header,
      subtext: pageInfo.subtext,
      quotes: pageInfo.quotes
    }
  }
}
</script>

<style scoped>
  #quote-img{
    max-height:200px;
    margin-right: 20px;
  }
  .get-started-btn {
    margin: 20px 20px 20px 0;
  }
  .preview-image{
    display: block;
    margin-top: 10px;
    margin-bottom: 10px;
    margin-left: auto;
    margin-right: auto;
    border-radius: 10px;
    border: #ffd8dd 2px solid;
  }
</style>
