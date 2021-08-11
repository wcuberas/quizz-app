import React, { useState } from 'react';
import QuestionCard from './components/QuestionCard';
import { fetchQuizQuestions } from './API';
import { QuestionState, Difficulty } from './API';

type AnswerObject = {
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
  

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);

    const newQuestions = await fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.EASY);
    
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };


  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {

  };

  
  const nextQuestion = () => {

  };

  return (
    <div className="App">
      <h1>Book Quizz App</h1>
      <button onClick={startTrivia}  >
        Start
      </button>
      <p>Score:</p>
      <p>LOading...</p>
      {/* <QuestionCard  
        questionNum = {number + 1}
        totalQuestions = {TOTAL_QUESTIONS}
        question = {questions[number].question}
        answers = {questions[number].answer}
        userAnswer = {userAnswers ? userAnswers[number] : undefined}
        callback = {checkAnswer}
      /> */}
      <button onClick={nextQuestion}>
        Next Question
      </button>
    </div>
  );
}

export default App;
