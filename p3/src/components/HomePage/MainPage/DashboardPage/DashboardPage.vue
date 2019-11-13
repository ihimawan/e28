<template>
  <div v-if="playerData">
    <TakeTestAlert :has-player-passed="playerData.passedTest" @open-modal="openModal"/>
    <LoversProof />
    <LoverReel :has-player-passed="playerData.passedTest" @open-modal="openModal" />
    <ShowArticles />
    <ShowModal :modal-show.sync="modal.show" :modal-data="modal" @agree-action="goToGamePage" />
  </div>
</template>

<script>
import ShowModal from '../../../UI/ShowModal/ShowModal'
import ShowArticles from './ShowArticles/ShowArticles'
import LoverReel from './LoverReel/LoverReel'
import TakeTestAlert from '../NagivationBar/TakeTestAlert/TakeTestAlert'
import LoversProof from './LoversProof/LoversProof'
import { homeModal } from '../../../../helpers/main/library'
import router from '../../../../router'
import {getJSONFromLocalStorage, playerDataKey} from '../../../../helpers/commons/constants'

export default {
  name: 'DashboardPage',
  components: {ShowModal, ShowArticles, LoverReel, TakeTestAlert, LoversProof},
  data: function () {
    return {
      modal: {
        show: false,
        ...homeModal
      },
      playerData: null
    }
  },
  methods: {
    openModal: function () {
      this.modal.show = true
    },
    goToGamePage: function () {
      router.push({name: 'GamePage'})
    }
  },
  mounted () {
    this.playerData = getJSONFromLocalStorage(playerDataKey)
  }
}
</script>
