<template>
  <div>

    <div class="row justify-content-center">
      <div class="col-md-4 mb-3" v-for='(pictureInfo, index) in playerPictures' :key="index">
        <img :src="pictureInfo.img" width="300" height="300" class="rounded mx-auto d-block img-thumbnail"
             :class="{'character-unselected' : selectedPictureIdx === null || selectedPictureIdx !== index}"
             :data-test="['picture-select', 'picture-select-'.concat(index)].join(' ')"
             @click="selectProfilePicture(index)">
      </div>
    </div>
    <div class="row justify-content-center" v-if="selectedPictureIdx !==null">
      <p class="text-muted">{{playerPictures[selectedPictureIdx].comment}}</p>
    </div>

  </div>
</template>

<script>

import * as info from '../../../../../helpers/intro/library'

export default {
  name: 'PictureSelection',
  props: {
    selectedPictureIdx: Number
  },
  data: function () {
    return {
      playerPictures: info.playerPictures
    }
  },
  methods: {
    selectProfilePicture: function (index) {
      this.$emit('select-picture', index)
    }
  }
}
</script>

<style scoped>
  .character-unselected {
    opacity: 0.5;
    filter: grayscale(100%);
  }

  .character-unselected:hover {
    filter: grayscale(0%);
  }
</style>
