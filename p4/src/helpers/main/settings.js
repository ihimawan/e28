export const getHomeProfiles = profileCollection => {
  const needHowMany = 3;
  const randomIndexes = [];
  for (let i = 0; i < needHowMany; i++) {
    let nextRandomIndex = null;
    while (
      nextRandomIndex === null ||
      randomIndexes.includes(nextRandomIndex)
    ) {
      nextRandomIndex = Math.floor(Math.random() * profileCollection.length);
    }
    randomIndexes.push(nextRandomIndex);
  }
  return randomIndexes.map(index => profileCollection[index]);
};
