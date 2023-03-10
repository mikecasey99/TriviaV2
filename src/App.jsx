import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import yellow from './images/yellow.svg'
import blue from './images/blue.svg'
import Question from './components/Question'
import shuffleArray from 'shuffle-array'
import './index.css'

function App() {

  const [gameState, setGameState] = useState('pre');
  const [questions, setQuestions] = useState([]);
  const [newGame, setNewGame] = useState('Check Answers');
  const [apiRequest, setApiRequest] = useState(false);



  function buttonCall(question, id){
      if(newGame !== 'Play Again'){
        checkAnswerBtn();
        setNewGame('Play Again')
      }
      else{
        setApiRequest(last => !last)
        setNewGame('Check Answers')
      }
  }

  function checkAnswerBtn(){
    setQuestions((cur) => {
      return cur.map((item) => {
        return item.map((x, index) => {
          if(index === 0){
            return x;
          }
          return {
            id: x.id,
            userAnswer : x.userAnswer,
            actualAnswer : x.actualAnswer,
            showAnswer : true,
            answer : x.answer
          }
        })
      })
    })
  }


  function setBtnClick(question, id){
    setQuestions((prev) => {
      console.log(prev)
      let questionNumber = -1;
      let questionId = -1;
      // Find the Question number
      for(let i = 0; i < prev.length; i++){
        if(question === prev[i][0]){
          questionNumber = i;
          break;
        }
      }
      // Find the answer
      for(let i = 1; i < 6; i++){
        if(prev[questionNumber][i].id === id){
          questionId = i;
          break;
        }
      }
      return prev.map((item, index) => {
        if(questionNumber !== index){
          return item;
        }
        return item.map((individual, numIndex) => {
          if(numIndex === 0){
            return individual;
          }
          if(numIndex !== questionId){
            let tempNonChoice = {
              id : individual.id,
              userAnswer : false,
              actualAnswer : individual.actualAnswer,
              showAnswer : prev[questionNumber][questionId].showAnswer,
              answer : individual.answer
            }
            return tempNonChoice;
          }
          let tempAnswer = {
            id : prev[questionNumber][questionId].id,
            userAnswer : !(prev[questionNumber][questionId].userAnswer),
            actualAnswer : prev[questionNumber][questionId].actualAnswer,
            showAnswer : prev[questionNumber][questionId].showAnswer,
            answer : prev[questionNumber][questionId].answer
          }
          return tempAnswer;
        })
      })
    })
  }


  function wrongAnswers(answers){
    return {
      id : crypto.randomUUID(),
      userAnswer : false,
      actualAnswer : false,
      showAnswer : false,
      answer : answers
    }
  }

  function correctAnswer(answer){
    return {
      id : crypto.randomUUID(),
      userAnswer : false,
      actualAnswer : true,
      showAnswer : false,
      answer : answer
    }
  }

  function parseData(trivia){
    const output = [];
    trivia.results.forEach((item) => {
        let temp = shuffleArray([correctAnswer(item.correct_answer),
        wrongAnswers(item.incorrect_answers[0]),
        wrongAnswers(item.incorrect_answers[1]),
        wrongAnswers(item.incorrect_answers[2])])
        temp.unshift(item.question);
        output.push(temp)
    })
    setQuestions(output);
  }

  useEffect(() => {
    fetch('https://opentdb.com/api.php?amount=4&type=multiple')
      .then((results) => results.json())
      .then((data) => parseData(data))
  }, [apiRequest])


  const elements = questions.map((item) => {
    return <Question key={crypto.randomUUID()} data={item}
      handleClick={setBtnClick}/>
  })

  return (
    <div className="App">
        <img id='yellow-blob' class='blobs' src={yellow} alt="yellow-blob" />
        <img id='blue-blob' class='blobs' src={blue} alt="blue-blob" />
      {/* On load */}
        {gameState === 'pre' && <div className="intro">
            <h2>Quizzical</h2>
            <p>Test yourself in various topics!</p>
            <button onClick={() => setGameState('in')}>Start Quiz</button>
        </div>}
      {/* In game */}
      {gameState === 'in' && <div className="in-game">
          {elements}
          <button id="check" onClick={() => buttonCall()}>{newGame}</button>
        </div>}
    </div>
  )
}

export default App
