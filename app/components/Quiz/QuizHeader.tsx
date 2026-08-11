interface Props {
  title: string;
  description: string | null;
}

export default function QuizHeader({
  title,
  description,
}: Props) {
  return (
    <div className="rounded-2xl bg-white p-8 shadow">

      <h1 className="text-4xl font-bold text-gray-700">
        {title}
      </h1>

      <p className="mt-3 text-gray-500">
        {description}
      </p>

    </div>
  );
}