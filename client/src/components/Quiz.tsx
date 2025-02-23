import { useState } from 'react';
import type { Question } from '../models/Question.js';
import { getQuestions as defaultGetQuestions } from '../services/questionApi.js';

interface QuizProps {
  getQuestions?: () => Promise<Question[]>; // Allow getQuestions as a prop
}

const Quiz = ({ getQuestions = defaultGetQuestions }: QuizProps) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);


  const handleAnswerClick = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < questions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleStartQuiz = async () => {
    setQuizStarted(false);
    setQuizCompleted(false);
    setScore(0);
    setCurrentQuestionIndex(0);
    setQuestions([]);

    setTimeout(async () => { // ✅ Delay fetching to ensure reset happens first
      try {
        const newQuestions = await getQuestions(); // Fetch new questions
        setQuestions(newQuestions);
        setQuizStarted(true); // ✅ Start quiz only after fetching new questions
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    }, 100); // ✅ Small delay ensures React updates state before re-rendering
  };


  if (!quizStarted) {
    return (
      <div className="p-4 text-center">
        <button className="btn btn-primary d-inline-block mx-auto" onClick={handleStartQuiz}>
          Start Quiz
        </button>
      </div>
    );
  }

  if (quizCompleted) {
    return (
      <div className="card p-4 text-center">
        <h2>Quiz Completed</h2>
        <div className="alert alert-success">
          Your score: {score}/{questions.length}
        </div>
        <button className="btn btn-primary d-inline-block mx-auto" onClick={handleStartQuiz}>
          Take New Quiz
        </button>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="card p-4">
      <h2>{currentQuestion.question}</h2>
      <div className="mt-3">
        {currentQuestion.answers.map((answer, index) => (
          <div key={index} className="d-flex align-items-center mb-2">
            <button className="btn btn-primary" onClick={() => handleAnswerClick(answer.isCorrect)}>
              {index + 1}
            </button>
            <div className="alert alert-secondary mb-0 ms-2 flex-grow-1">{answer.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Quiz;
