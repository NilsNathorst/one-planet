const generateVector3Between = (from, to) => {
  const randNum = Math.random() * (to - from) + from;
  return [randNum, randNum, randNum];
};
export default generateVector3Between;
