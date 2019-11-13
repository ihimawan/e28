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

export const playerDataKey = 'playerData'

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
    lookingFor: null,
    initiated: 0,
    received: 0,
    ghosted: 0
  }
}
