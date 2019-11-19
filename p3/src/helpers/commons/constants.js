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
    { ...createMessage([], 21, 21, 'Miss Boss Lady', 'Welcome to Alpacan Mingle! The best place to find an lover and for beautiful Alpacas to find the beautiful and wonderful... You!! Exited to have you here.') }
  ]
}

export const createMessage = (allMessages, userIdFrom, userId, usernameTo, message) => {
  const addMessageToConversation = (existingConversation, userIdFrom, message) => {
    const updatedConversation = {...existingConversation}
    updatedConversation.messages.push({
      userId: userIdFrom,
      text: message
    })
    updatedConversation.lastMessageTimestamp = Date.now()
    updatedConversation.read = userIdFrom === playerId
    return updatedConversation
  }

  const createNewConversation = (userIdFrom, userId, usernameTo, message) => {
    return {
      userId: userId,
      username: usernameTo,
      messages: [
        {
          userId: userIdFrom,
          text: message
        }
      ],
      lastMessageTimestamp: Date.now(),
      read: userIdFrom === playerId
    }
  }

  const updatedAllMessages = [...allMessages]
  const conversationWithUserIndex = updatedAllMessages.findIndex(convo => convo.userId === userId)
  if (~conversationWithUserIndex) { // have talked to this user before
    const updatedConversation = addMessageToConversation(conversationWithUserIndex, userIdFrom, message)
    updatedAllMessages[conversationWithUserIndex] = updatedConversation
  } else { // never talked to this person before
    const newConversation = createNewConversation(userIdFrom, userId, usernameTo, message)
    updatedAllMessages.push(newConversation)
  }

  return updatedAllMessages
}

export const playerId = 0
