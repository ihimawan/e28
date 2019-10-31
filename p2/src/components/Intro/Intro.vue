<template>
<Layout>
  <template #header>Nice having you here!!</template>
  <template #subtext>Which one of these Alpacas is the most <i>you</i>?</template>

  <PictureSelection @select-picture="selectProfilePicture" :selected-picture-idx=selectedPictureIdx />
  <EnterName v-if="selectedPictureIdx !== null" @set-name="setName">
    <template #valid-feedback-text>Hot name. Now select your gender.</template>
  </EnterName>
  <EnterGender v-if="name !== null" :selected-gender.sync="selectedGender" />

  <div class="row justify-content-center">
    <div class="col-md-4 mb-3">
      <button v-if="selectedGender" @click="activateModalHandler" type="button"
              class="btn btn-primary">Hot. Let's go find you the love of your life.</button>
    </div>
  </div>

  <Modal :modal-show.sync="modal.show" :modal-data="modal" @agree-action="continuePage" />

</Layout>
</template>

<script>
import Layout from '../UI/Layout/Layout'
import PictureSelection from './PictureSelection/PictureSelection'
import EnterName from './EnterName/EnterName'
import EnterGender from './EnterGender/EnterGender'
import Modal from '../UI/Modal/Modal'
import { playerModal } from '../../helpers/intro/library'

export default {
  name: 'Intro',
  components: {Modal, EnterGender, EnterName, PictureSelection, Layout},
  data: function () {
    return {
      name: null,
      selectedGender: null,
      selectedPictureIdx: null,
      modal: {
        show: false,
        ...playerModal
      }
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
      this.modal.show = true
    },
    continuePage: function () {
      this.$emit('next', {
        name: this.name,
        selectedGender: this.selectedGender,
        selectedPictureIdx: this.selectedPictureIdx
      })
    }
  }
}
</script>
