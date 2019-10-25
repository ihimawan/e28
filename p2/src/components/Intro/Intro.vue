<template>
<Layout>
  <template #header>Nice having you here!!</template>
  <template #subtext>Which one of these Alpacas is the most <i>you</i>?</template>

  <PictureSelection @select-picture="selectProfilePicture" :selected-picture-idx=selectedPictureIdx />
  <EnterName v-if="selectedPictureIdx !== null" @set-name="setName" />
  <EnterGender v-if="name !== null" :selected-gender.sync="selectedGender" />

  <div class="row justify-content-center">
    <div class="col-md-4 mb-3">
      <button v-if="selectedGender" @click="activateModalHandler" type="button"
              class="btn btn-primary">Hot. Let's go find you the love of your life.</button>
    </div>
  </div>

</Layout>
</template>

<script>
import Layout from '../UI/Layout/Layout'
import PictureSelection from './PictureSelection/PictureSelection'
import EnterName from './EnterName/EnterName'
import EnterGender from './EnterGender/EnterGender'

export default {
  name: 'Intro',
  components: {EnterGender, EnterName, PictureSelection, Layout},
  data: function () {
    return {
      name: null,
      selectedGender: null,
      selectedPictureIdx: null
    }
  },
  methods: {
    selectProfilePicture: function (index) {
      this.selectedPictureIdx = index
    },
    setName: function (name) {
      this.name = name
    },
    activateModalHandler: function () {
      alert('nice')
    }
  }
}
</script>
