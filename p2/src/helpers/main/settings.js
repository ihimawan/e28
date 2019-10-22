export const getHomeProfiles = () => {
  const needHowMany = 3
  const randomIndexes = []
  for (let i = 0; i < needHowMany; i++) {
    let nextRandomIndex = null
    while (nextRandomIndex === null || randomIndexes.includes(nextRandomIndex)) {
      nextRandomIndex = Math.floor(Math.random() * gameChoices.length)
    }
    randomIndexes.push(nextRandomIndex)
  }
  return randomIndexes.map(index => gameChoices[index])
}
