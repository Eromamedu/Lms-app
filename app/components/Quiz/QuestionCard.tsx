interface Question {
  id: string;
  question: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
}

interface Props {
  question: Question;
  answer: string | undefined;
  onSelect: (value: string) => void;
}

export default function QuestionCard({
  question,
  answer,
  onSelect,
}: Props) {

  const options = [
    { key: "A", text: question.option_a },
    { key: "B", text: question.option_b },
    { key: "C", text: question.option_c },
    { key: "D", text: question.option_d },
  ];

  return (

    <div className="rounded-2xl bg-white p-8 shadow">

      <h2 className="mb-8 text-2xl font-bold text-gray-700">
        {question.question}
      </h2>

      <div className="space-y-4">

        {options.map((option) => (

          <label
            key={option.key}
            className={`flex cursor-pointer items-center gap-4 rounded-xl border p-5 transition ${
              answer === option.key
                ? "border-blue-600 bg-blue-50"
                : "hover:bg-gray-50"
            }`}
          >

            <input
              type="radio"
              checked={answer === option.key}
              onChange={() => onSelect(option.key)}
            />

            {option.text}

          </label>

        ))}

      </div>

    </div>

  );
}