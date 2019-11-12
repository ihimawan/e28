<template>
  <div>
    <TakeTestAlert :has-player-passed="playerData.passedTest" @open-modal="openModal"/>
    <LoversProof />
    <LoverReel :has-player-passed="playerData.passedTest" @open-modal="openModal" />
    <ShowArticles />
    <ShowModal :modal-show.sync="modal.show" :modal-data="modal" @agree-action="$emit('go-to-game')" />
  </div>
</template>

<script>
import ShowModal from '../../UI/ShowModal/ShowModal'
import ShowArticles from './ShowArticles/ShowArticles'
import LoverReel from './LoverReel/LoverReel'
import TakeTestAlert from '../NagivationBar/TakeTestAlert/TakeTestAlert'
import LoversProof from './LoversProof/LoversProof'
import { homeModal } from '../../../helpers/main/library'

export default {
  name: 'DashboardPage',
  components: {ShowModal, ShowArticles, LoverReel, TakeTestAlert, LoversProof},
  props: {
    playerData: {
      type: Object,
      required: true
    }
  },
  data: function () {
    return {
      modal: {
        show: false,
        ...homeModal
      }
    }
  },
  methods: {
    openModal: function () {
      this.modal.show = true
    }
  }
}
</script>
