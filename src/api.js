const urlApiQuestions = "http://localhost:8000/api/questions";

async function getQuestions(){
  let res = await fetch(urlApiQuestions);
  res = await res.json();
  return res.questions
}

export default {
  getQuestions
}