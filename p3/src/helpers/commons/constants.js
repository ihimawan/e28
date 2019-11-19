import {faHome, faUserEdit, faEnvelope} from '@fortawesome/free-solid-svg-icons'

export const introStages = ['pre-intro', 'intro']
export const pages = [
  {
    value: 'Home',
    icon: faHome,
    routeName: 'DashboardPage'
  },
  {
    value: 'My Profile',
    icon: faUserEdit,
    routeName: 'ProfilePage'
  },
  {
    value: 'Messages',
    icon: faEnvelope,
    routeName: 'MessagesPage'
  }]

export const llamasText = 'llamas'
export const alpacaText = 'alpacas'
const llamasId = 2
const alpacaId = 1

export const getChoiceId = (text) => {
  return text === llamasText ? llamasId : alpacaId
}

export const playerDataKey = 'playerData'
export const messageDataKey = 'messageData'

export const copyJSONValues = (destination, source) => {
  const dest = {...destination}
  Object.keys(source).forEach(key => {
    dest[key] = source[key]
  })
  return dest
}
export const getJSONFromLocalStorage = (key) => {
  const value = localStorage.getItem(key)
  return value ? JSON.parse(value) : null
}
export const setJSONToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value))
}

export const getDefaultPlayerData = () => {
  return {
    name: null,
    selectedGender: null,
    selectedPictureIdx: null,
    passedTest: false,
    about: null,
    lookingFor: null
  }
}

export const getDefaultMessageData = () => {
  return [
    {
      userId: 21, // talking to user with ID
      username: 'Miss Boss Lady',
      messages: [
        {
          userId: 21,
          text: 'Welcome to Alpacan Mingle! The best place to find an lover and for beautiful Alpacas to find the beautiful and wonderful... You!! Exited to have you here.'
        }
      ],
      read: false
    }
  ]
}
