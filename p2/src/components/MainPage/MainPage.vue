<template>
  <Layout>
    <template #header>Welcome, {{playerData.name}}.</template>
    <template #subtext>You look like someone who could use a pretty alpaca...</template>
    <TakeTestAlert :has-player-passed="playerData.passedTest" @open-modal="openModal"/>
    <LoversProof />
    <LoverReel :has-player-passed="playerData.passedTest" @open-modal="openModal" />
    <Articles />

    <Modal :modal-show.sync="modal.show" :modal-data="modal" @agree-action="$emit('next')" />

  </Layout>
</template>

<script>
import Layout from '../UI/Layout/Layout'
import LoversProof from './LoversProof/LoversProof'
import TakeTestAlert from './TakeTestAlert/TakeTestAlert'
import LoverReel from './LoverReel/LoverReel'
import Articles from './Articles/Articles'
import { homeModal } from '../../helpers/main/library'
import Modal from '../UI/Modal/Modal'

export default {
  components: {Modal, Articles, LoverReel, TakeTestAlert, LoversProof, Layout},
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
      console.log('open')
      this.modal.show = true
    }
  }
}
</script>
