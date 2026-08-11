interface Props {
  current: number;
  total: number;
}

export default function ProgressBar({
  current,
  total,
}: Props) {

  const progress = (current / total) * 100;

  return (

    <div>

      <div className="mb-2 flex justify-between">

        <span className="font-semibold">
          Question {current} of {total}
        </span>

        {/* <span>{Math.round(progress)}%</span> */}

      </div>

      <div className="h-3 overflow-hidden rounded-full bg-gray-200">

        <div
          className="h-full rounded-full bg-blue-600 transition-all duration-500"
          style={{
            width: `${progress}%`,
          }}
        />

      </div>

    </div>

  );
}