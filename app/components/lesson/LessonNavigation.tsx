import Button from "../ui/button";

export default function LessonNavigation() {
  return (
    <div className="flex justify-between">

      <Button variant="secondary">

        Previous Lesson

      </Button>

      <Button>

        Next Lesson

      </Button>

    </div>
  );
}