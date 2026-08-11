"use client";

import {
  CheckCircle,
  XCircle,
} from "lucide-react";

interface Question {
  id: string;
  question: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_answer: string;
  explanation: string | null;
}

interface Props {
  questions: Question[];

  answers: Record<string, string>;
}

export default function AnswerReview({
  questions,
  answers,
}: Props) {
  return (
    <div className="space-y-8">

      {questions.map((question, index) => {
        const correct =
          answers[question.id] ===
          question.correct_answer;

        return (
          <div
            key={question.id}
            className={`rounded-2xl border-2 p-6 shadow-sm text-gray-600

            ${
              correct
                ? "border-green-400 bg-green-50"
                : "border-red-400 bg-red-50"
            }`}
          >
            <div className="mb-4 flex items-center gap-3">

              {correct ? (
                <CheckCircle
                  className="text-green-600"
                  size={28}
                />
              ) : (
                <XCircle
                  className="text-red-600"
                  size={28}
                />
              )}

              <h2 className="text-xl font-bold">

                Question {index + 1}

              </h2>

            </div>

            <h3 className="mb-6 text-lg font-semibold">

              {question.question}

            </h3>

            <div className="space-y-3">

              {[
                {
                  key: "A",
                  text: question.option_a,
                },
                {
                  key: "B",
                  text: question.option_b,
                },
                {
                  key: "C",
                  text: question.option_c,
                },
                {
                  key: "D",
                  text: question.option_d,
                },
              ].map((option) => {
                const isCorrect =
                  option.key ===
                  question.correct_answer;

                const isChosen =
                  option.key ===
                  answers[question.id];

                return (
                  <div
                    key={option.key}
                    className={`rounded-xl border p-4

                    ${
                      isCorrect
                        ? "border-green-500 bg-green-100"
                        : isChosen
                        ? "border-red-500 bg-red-100"
                        : "bg-white"
                    }`}
                  >
                    <strong>
                      {option.key}.
                    </strong>{" "}
                    {option.text}
                  </div>
                );
              })}
            </div>

            <div className="mt-6">

              <p className="font-semibold">

                Your Answer:

                <span
                  className={`ml-2

                  ${
                    correct
                      ? "text-green-700"
                      : "text-red-700"
                  }`}
                >
                  {answers[question.id] ??
                    "No Answer"}
                </span>

              </p>

              <p className="mt-2 font-semibold text-green-700">

                Correct Answer:

                <span className="ml-2">
                  {question.correct_answer}
                </span>

              </p>

              {question.explanation && (
                <div className="mt-5 rounded-xl bg-white p-4">

                  <h4 className="mb-2 font-bold">

                    Explanation

                  </h4>

                  <p className="text-gray-600">

                    {question.explanation}

                  </p>

                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}