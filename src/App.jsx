import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import yellow from './images/yellow.svg'
import blue from './images/blue.svg'
import Question from './components/Question'
import shuffleArray from 'shuffle-array'


function App() {

  const [gameState, setGameState] = useState('pre');
  const [questions, setQuestions] = useState([]);


  function setBtnClick(question, id){
    setQuestions((prev) => {
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
      for(let i = 1; i < 5; i++){
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
              answer : individual.answer
            }
            return tempNonChoice;
          }
          let tempAnswer = {
            id : prev[questionNumber][questionId].id,
            userAnswer : !(prev[questionNumber][questionId].userAnswer),
            actualAnswer : prev[questionNumber][questionId].actualAnswer,
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
      answer : answers
    }
  }

  function correctAnswer(answer){
    return {
      id : crypto.randomUUID(),
      userAnswer : false,
      actualAnswer : true,
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
  }, [])



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
          <button id="check">Check Answers</button>
        </div>}
    </div>
  )
}

export default App
