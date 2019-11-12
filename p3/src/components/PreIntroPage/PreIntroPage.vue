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
    <a class="btn btn-primary btn-lg get-started-btn" href="#" role="button" @click="$emit('next')">
      Sounds intriguing... how can I join in the fun?</a>
    <div>
    </div>
  </DefaultLayout>
</template>

<script>
import DefaultLayout from '../UI/DefaultLayout/DefaultLayout'
import * as pageInfo from '../../helpers/preintro/library'

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
</style>
