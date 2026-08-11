export default function Deadlines() {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">

      <h2 className="text-xl font-bold text-gray-600">
        Upcoming Deadlines
      </h2>

      <div className="mt-6 space-y-4">

        <div className="rounded-xl bg-red-50 p-4">

          <h3 className="font-semibold text-gray-500">

            React Dashboard Assignment

          </h3>

          <p className="text-sm text-red-600">

            Due Tomorrow

          </p>

        </div>

        <div className="rounded-xl bg-yellow-50 p-4">

          <h3 className="font-semibold text-gray-500 ">

            JavaScript Quiz

          </h3>

          <p className="text-sm text-yellow-700">

            Friday

          </p>

        </div>

      </div>

    </div>
  );
}