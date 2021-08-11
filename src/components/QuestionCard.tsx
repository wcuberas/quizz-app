import { type } from "os";
import React from "react";
import { AnswerObject } from '../App'

type Props = {
    question: string;
    answers: string[];
    callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
    userAnswer: AnswerObject | undefined;
    questionNum: number;
    totalQuestions: number;
};

const QuestionCard: React.FC<Props> = ({
    question,
    answers,
    callback,
    userAnswer,
    questionNum,
    totalQuestions,
}) => {
    return (
        <div>
            <p>
                Question: {questionNum} / {totalQuestions}
            </p>
            <p dangerouslySetInnerHTML={{ __html: question }} />
            <div>
                {answers.map((answer) => (
                    <div key = {answer} >
                        <button disabled={!!userAnswer} value={answer} onClick={callback}>
                            <span
                                dangerouslySetInnerHTML={{ __html: answer }}
                            ></span>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default QuestionCard;
