import Button from "@/app/components/ui/button";

export default function ContinueLearning() {
  return (
    <div className="rounded-2xl bg-white p-8 shadow-sm">
      <p className="text-sm text-blue-600 font-semibold ">Continue Learning</p>

      <h2 className="mt-3 text-2xl font-bold text-gray-600">React Masterclass</h2>

      <p className="mt-2 text-slate-500">Progress: 68%</p>

      <div className="mt-5 h-3 rounded-full bg-slate-200">
        <div className="h-3 w-[68%] rounded-full bg-blue-600"></div>
      </div>

      <Button className="mt-8">Continue Course</Button>
    </div>
  );
}
