export default function RecentActivity() {
  const activities = [
    "Completed JavaScript Quiz",
    "Submitted React Assignment",
    "Enrolled in Next.js Course",
    "Downloaded Certificate",
  ];

  return (
    <div className="rounded-2xl bg-white p-8 shadow-sm">

      <h2 className="text-xl font-bold text-gray-600">
        Recent Activity
      </h2>

      <div className="mt-6 space-y-4">

        {activities.map((activity) => (
          <div
            key={activity}
            className="rounded-xl bg-slate-50 p-4 text-gray-600"
          >
            {activity}
          </div>
        ))}

      </div>

    </div>
  );
}