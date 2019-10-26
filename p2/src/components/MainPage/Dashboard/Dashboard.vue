<template>
  <div>
    <TakeTestAlert :has-player-passed="playerData.passedTest" @open-modal="openModal"/>
    <LoversProof />
    <LoverReel :has-player-passed="playerData.passedTest" @open-modal="openModal" />
    <Articles />
    <Modal :modal-show.sync="modal.show" :modal-data="modal" @agree-action="$emit('go-to-game')" />
  </div>
</template>

<script>
import Modal from '../../UI/Modal/Modal'
import Articles from './Articles/Articles'
import LoverReel from './LoverReel/LoverReel'
import TakeTestAlert from '../NagivationBar/TakeTestAlert/TakeTestAlert'
import LoversProof from './LoversProof/LoversProof'
import { homeModal } from '../../../helpers/main/library'

export default {
  name: 'Dashboard',
  components: {Modal, Articles, LoverReel, TakeTestAlert, LoversProof},
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
