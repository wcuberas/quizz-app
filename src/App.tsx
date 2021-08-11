import React, { useState } from 'react';
import QuestionCard from './components/QuestionCard';
import { fetchQuizQuestions } from './API';
import { QuestionState, Difficulty } from './API';
import './App.css'

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}


const TOTAL_QUESTIONS = 10;

function App() {

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

    const newQuestions = await fetchQuizQuestions(TOTAL_QUESTIONS, diff);
    
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
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

  return (
    <div className="App">
      <h1>Books Quiz App</h1>
      { gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
        <div>
          <h4>Choose difficulty</h4>
          <button value={Difficulty.EASY} onClick={chooseDifficulty}>EASY</button>
          <button value={Difficulty.MEDIUM} onClick={chooseDifficulty}>MEDIUM</button>
          <button value={Difficulty.HARD} onClick={chooseDifficulty}>HARD</button>
          <button onClick={startTrivia}  >
            Go !!!
          </button>
        </div>
      ) : null }
      {!gameOver ? <p>Score: {score} </p> : null }
      {loading ? <p>Loading...</p> : null}
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
        <button onClick={nextQuestion}>
          Next Question
        </button>
      ) : null  }
    </div>
  );
}

export default App;
