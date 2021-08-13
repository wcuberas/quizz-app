import React, { useState, useRef } from 'react';
import QuestionCard from './components/QuestionCard';
import { fetchQuizQuestions } from './API';
import { QuestionState, Difficulty } from './API';
import './App.css'
import Swal from 'sweetalert2'
import db from './Firebase/Firebase';

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}


const TOTAL_QUESTIONS = 10;

function App() {

  const ref1 = useRef(undefined);

  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);
  const [diff, setDiff] = useState('');
  

  const chooseDifficulty = (e: React.MouseEvent<HTMLButtonElement>) => {
    const dif = (e.currentTarget.value);
    setDiff(dif);
  }


  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);
    if(diff.length === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Choose a difficulty!',
        confirmButtonColor: 'hsl(32, 98%, 47%)',
        background: 'hsla(31, 62%, 85%, 0.94)',
        
      })
      setGameOver(true)
      setLoading(false)
    } else {

    const newQuestions = await fetchQuizQuestions(TOTAL_QUESTIONS, diff);
  
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);

    }
  };


  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if(!gameOver) {
      const answer = e.currentTarget.value;
      const correct = questions[number].correct_answer === answer;
      if(correct) setScore(prev => prev + 1); 
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers((prev) => [...prev, answerObject]);
    }
  };


  const nextQuestion = () => {
    const nextQuestion = number + 1;
    if(nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(nextQuestion);
    }
  };

  const restart = () => {
    setGameOver(true);
    setUserAnswers([]);
    setDiff('');
  }

  const save = () => {
    const resultado = {
      name: ref1.current.value,
      score
    }
    if(resultado.name) {
       Swal.fire({
      title: 'Do you want to save the score?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: `Save`,
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        db.collection("usuarios").add(resultado);
        ref1.current.value = "";
        Swal.fire('Saved!', '', 'success')
        
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Must write a name',
        confirmButtonColor: 'hsl(32, 98%, 47%)',
        background: 'hsla(31, 62%, 85%, 0.94)',
      })
    }
    
  }

  const showStats = () => {
    const result = db.collection("usuarios").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().score}`)
      })
    })
  }

  return (
    <div className="App">
      <h1 className='titleApp' >Books Quiz App</h1>
      { gameOver ? (
        <div>
          <div className='container-choose' >
            <h4 className='choose' >Choose difficulty</h4>
            <div >
              <button className='btn' value={Difficulty.EASY} onClick={chooseDifficulty}>EASY</button>
              <button className='btn' value={Difficulty.MEDIUM} onClick={chooseDifficulty}>MEDIUM</button>
              <button className='btn' value={Difficulty.HARD} onClick={chooseDifficulty}>HARD</button>
            </div>
          </div>
          <div className='container-start' >
            <button className='btn start' onClick={startTrivia}  >
              PRESS START !!!
            </button>
          </div>
        </div>
      ) : null }
      {!gameOver ? <p className='choose score' >Score: {score} </p> : null }
      {loading ? <p className='choose score' >Loading...</p> : null}
      {!loading && !gameOver && (
        <QuestionCard  
          questionNum = {number + 1}
          totalQuestions = {TOTAL_QUESTIONS}
          question = {questions[number].question}
          answers = {questions[number].answers}
          userAnswer = {userAnswers ? userAnswers[number] : undefined}
          callback = {checkAnswer}
        />
      )}
      {!gameOver && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1 ? (
        <div className='next' >
          <button className='btn start' onClick={nextQuestion}>
            Next Question
          </button>
        </div>
      ) : null  }
      { userAnswers.length === TOTAL_QUESTIONS ? (
        <div  >
          <div className='container-input'>
            <input className='input' ref={ref1} type='text' required ></input>
          </div>
          <div className='container-buttons'>
            <button className='btn start' onClick={save} >
              SAVE 
            </button>
            <button className='btn start' onClick={restart}>
              PLAY AGAIN 
            </button>
            <button className='btn start' onClick={showStats} >
              SHOW STATS
            </button>
          </div>
        </div>  
      ) : null }
    </div>
  );
}

export default App;
