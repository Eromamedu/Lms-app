//  import AnswerReview from "@/app/components/Quiz/AnswerReview";
 interface Props {
  score: number;
  total: number;
  percentage: number;
  grade: string;
}

export default function ResultCard({
  score,
  total,
  percentage,
  grade,
}: Props) {

  return (

    <div className="rounded-2xl bg-white p-10 text-center shadow text-gray-600">

      <h1 className="text-4xl font-bold text-green-600">
        Quiz Completed 🎉
      </h1>

      <div className="mt-10 space-y-6">

        <div>

          <h2 className="text-xl font-semibold">
            Score
          </h2>

          <p className="text-5xl font-bold text-blue-700">
            {score}/{total}
          </p>

        </div>

        <div>

          <h2 className="text-xl font-semibold">
            Percentage
          </h2>

          <p className="text-5xl font-bold text-green-700">
            {percentage}%
          </p>

        </div>

        <div>

          <h2 className="text-xl font-semibold">
            Grade
          </h2>

          <p className="text-6xl font-bold text-purple-700">
            {grade}
          </p>

        </div>

      </div>

    </div>

  );
}