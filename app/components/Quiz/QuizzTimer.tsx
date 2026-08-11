interface Props {
  seconds: number;
}

export default function Timer({
  seconds,
}: Props) {

  const minutes = Math.floor(seconds / 60);

  const secs = seconds % 60;

  return (

    <div
      className={`rounded-xl px-5 py-3 text-lg font-bold text-white ${
        seconds <= 60
          ? "bg-red-600"
          : "bg-blue-600"
      }`}
    >

      {minutes}:
      {secs.toString().padStart(2, "0")}

    </div>

  );
}