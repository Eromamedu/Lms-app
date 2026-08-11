import Button from "../ui/button";

export default function QuickActions() {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">

      <h2 className="text-xl font-bold text-gray-600">
        Quick Actions
      </h2>

      <div className="mt-6 space-y-3">

        <Button>
          Browse Courses
        </Button>

        <Button variant="secondary">
          View Assignments
        </Button>

      </div>

    </div>
  );
}