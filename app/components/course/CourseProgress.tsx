interface Props {
  value: number;
}

export default function CourseProgress({
  value,
}: Props) {
  return (
    <div>

      <div className="mb-2 flex justify-between">

        <span className="text-sm text-slate-500">

          Progress

        </span>

        <span className="text-sm font-semibold">

          {value}%

        </span>

      </div>

      <div className="h-2 rounded-full bg-slate-200">

        <div
          className="h-2 rounded-full bg-blue-600 transition-all duration-500"
          style={{
            width: `${value}%`,
          }}
        />

      </div>

    </div>
  );
}