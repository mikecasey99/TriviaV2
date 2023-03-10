import React from 'react'

export default function Question(props){
    const output = [];
    const ourAnswers = [];
    function check(){
        if(props.data[1].showAnswer){
            let temp = -1;
            for(let i = 1; i < 5; i++){
                if(props.data[i].actualAnswer){
                    output.push('answer-button')
                }
                else{
                    output.push('wrong-answer-button')
                }
            }

        }
        else{
            for(let i = 1; i < 5; i++){
                if(props.data[i].userAnswer){
                    output.push('button-on')
                }
                else{
                    output.push('button-off')
                }
            }
        }
    }
    check();

    function userAnswer(){
        if(props.data[1].showAnswer){
            let temp = -1;
            for(let i = 1; i < 5; i++){
                if(props.data[i].userAnswer){
                    ourAnswers.push('user-box')
                }
                else{
                    ourAnswers.push('')
                }
            }
        }
    }
    userAnswer();

    return (
        <div className='individual-question'>
            <h2>{props.data[0]}</h2>
            <div className="answer-buttons">
                <button id={`${output[0]}`} className={`${ourAnswers[0]}`}
                onClick={() => props.handleClick(props.data[0], props.data[1].id)}>
                    {props.data[1].answer}
                </button>
                <button id={`${output[1]}`} className={`${ourAnswers[1]}`}  
                onClick={() => props.handleClick(props.data[0], props.data[2].id)}>
                    {props.data[2].answer}
                </button>
                <button id={`${output[2]}`} className={`${ourAnswers[2]}`}  
                onClick={() => props.handleClick(props.data[0], props.data[3].id)}>
                    {props.data[3].answer}
                </button>
                <button id={`${output[3]}`} className={`${ourAnswers[3]}`}  
                onClick={() => props.handleClick(props.data[0], props.data[4].id)}>
                    {props.data[4].answer}
                </button>
            </div>
        </div>
    )
}