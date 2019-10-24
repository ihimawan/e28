<template>
<Layout>
  <template #header>Which one of these Alpacas is the most <i>you</i>?</template>

  <div class="row justify-content-center">
    <div class="col-md-4 mb-3" v-for='(pictureInfo, index) in playerPictures'>
      <img :src="pictureInfo.img" width="300" height="300" class="rounded mx-auto d-block img-thumbnail"
           :class="{'character-unselected' : selectedPictureIdx === null || selectedPictureIdx !== index}"
           @click="selectProfilePicture(index)">
    </div>
  </div>
  <div class="row justify-content-center" v-if="selectedPictureIdx !==null">
    <p class="text-muted">{{playerPictures[selectedPictureIdx].comment}}</p>
  </div>

</Layout>
</template>

<script>
import Layout from '../UI/Layout/Layout'
import * as pageInfo from '../../helpers/intro/library'

export default {
  name: 'Intro',
  components: {Layout},
  data: function () {
    return {
      playerPictures: pageInfo.playerPictures,
      selectedPictureIdx: null
    }
  },
  methods: {
    selectProfilePicture : function () {

    }
  }
}
</script>
