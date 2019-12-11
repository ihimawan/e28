<template>
<DefaultLayout>
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
              class="btn btn-primary" data-test="final-register-button">Hot. Let's go find you the love of your life.</button>
    </div>
  </div>

  <ShowModal :modal-show.sync="modal.show" :modal-data="modal" @agree-action="continuePage" />

</DefaultLayout>
</template>

<script>
import DefaultLayout from '../../../UI/DefaultLayout/DefaultLayout'
import PictureSelection from './PictureSelection/PictureSelection'
import EnterName from './EnterName/EnterName'
import EnterGender from './EnterGender/EnterGender'
import ShowModal from '../../../UI/ShowModal/ShowModal'
import { playerModal } from '../../../../helpers/intro/library'

export default {
  name: 'IntroPage',
  components: {ShowModal, EnterGender, EnterName, PictureSelection, DefaultLayout},
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
