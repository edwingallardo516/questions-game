const urlApiQuestions = "http://localhost:8000/api/questions";
const urlApiPlayerHistory = "http://localhost:8000/api/player-history"

async function getQuestions(){
  let res = await fetch(urlApiQuestions);
  res = await res.json();
  return res.questions
}

async function getPlayerHistory(){
  let res = await fetch(urlApiPlayerHistory);
  res = await res.json();
  return res.history
}

async function postPlayerHistory(playerHistory){
  //console.log(playerHistory)
  const rawResponse = await fetch(urlApiPlayerHistory, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(playerHistory)
  });
  const content = await rawResponse.json();
  console.log(content);
}
export default {
  getQuestions,
  getPlayerHistory,
  postPlayerHistory
}