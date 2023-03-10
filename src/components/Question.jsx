import React from 'react'

export default function Question(props){
    
    return (
        <div className='individual-question'>
            <h2>{props.data[0]}</h2>
            <div className="answer-buttons">
                <button id={`${props.data[1].userAnswer ? 'button-on' : 'button-off'}`} 
                onClick={() => props.handleClick(props.data[0], props.data[1].id)}>
                    {props.data[1].answer}
                </button>
                <button id={`${props.data[2].userAnswer ? 'button-on' : 'button-off'}`}  
                onClick={() => props.handleClick(props.data[0], props.data[2].id)}>
                    {props.data[2].answer}
                </button>
                <button id={`${props.data[3].userAnswer ? 'button-on' : 'button-off'}`}  
                onClick={() => props.handleClick(props.data[0], props.data[3].id)}>
                    {props.data[3].answer}
                </button>
                <button id={`${props.data[4].userAnswer ? 'button-on' : 'button-off'}`}  
                onClick={() => props.handleClick(props.data[0], props.data[4].id)}>
                    {props.data[4].answer}
                </button>
            </div>
        </div>
    )
}