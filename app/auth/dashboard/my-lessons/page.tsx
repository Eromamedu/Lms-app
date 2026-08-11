"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabase";

interface Lesson {
  id: string;
  title: string;
  completed_at: string | null;
}
interface LessonRelation {
  id: string;
  title: string;
}

export default function MyLessonsPage() {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
//     const loadLessons = async () => {
//       const {
//         data: { user },
//       } = await supabase.auth.getUser();

//       if (!user) return;

//       const { data, error } = await supabase
//         .from("lesson_progress")
//         .select(`
//           completed_at,
//           lessons (
//             id,
//             title
//           )
//         `)
//         .eq("student_id", user.id)
//         .eq("completed", true)
//         .order("completed_at", {
//           ascending: false,
//         });

//       if (error || !data) return;

//     //   const formatted: Lesson[] = [];

//     //   for (const row of data) {
//     //     // const lesson = row.lessons;
//     //     const lesson = row.lessons as LessonRelation | null;

//     //     // Skip rows without a related lesson
//     //     if (!lesson) continue;

//     //     formatted.push({
//     //       id: lesson.id,
//     //       title: lesson.title,
//     //       completed_at: row.completed_at,
//     //     });
//     //   }
//     const formatted: Lesson[] = [];

// for (const row of data) {
//   const lesson = row.lessons?.[0];

//   if (!lesson) continue;

//   formatted.push({
//     id: lesson.id,
//     title: lesson.title,
//     completed_at: row.completed_at,
//   });
// }

//       setLessons(formatted);
//     };

const loadLessons = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

//   if (!user) return;
if (!user) {
  setLoading(false);
  return;
}

  const { data: progressRows, error } = await supabase
    .from("lesson_progress")
    .select("lesson_id, completed_at")
    .eq("student_id", user.id)
    .eq("completed", true)
    .order("completed_at", { ascending: false });

  if (error || !progressRows) {
    console.error(error);
     setLoading(false);
    return;
  }

  const lessonIds = progressRows.map((row) => row.lesson_id);

  const { data: lessonRows } = await supabase
    .from("lessons")
    .select("id, title")
    .in("id", lessonIds);

  if (!lessonRows) return;

  const formatted = progressRows.map((progress) => {
    const lesson = lessonRows.find(
      (l) => l.id === progress.lesson_id
    );

    return {
      id: lesson?.id ?? progress.lesson_id,
      title: lesson?.title ?? "Unknown Lesson",
      completed_at: progress.completed_at,
    };
  });

  setLessons(formatted);
  setLoading(false);
};

    void loadLessons();
  }, []);

  return (
    <div className="space-y-6 text-gray-500">
      <h1 className="text-3xl font-bold text-gray-600">
        Completed Lessons
      </h1>
      {loading && (
  <div className="py-10 text-center text-gray-500">
    Loading lessons...
  </div>
)}
{!loading && lessons.length === 0 && (
  <div className="py-10 text-center text-gray-500">
    You haven&apos;t completed any lessons yet.
  </div>
)}

      {!loading &&
        lessons.map((lesson) => (
          <div
            key={lesson.id}
            className="rounded-xl border p-5"
          >
            <h2 className="font-semibold">
              {lesson.title}
            </h2>

            <p className="text-gray-500">
              Completed:{" "}
              {lesson.completed_at
                ? new Date(
                    lesson.completed_at
                  ).toLocaleString()
                : "Not recorded"}
            </p>
          </div>
        ))
      }
    </div>
  );
}





// "use client";

// import { useEffect, useState } from "react";
// import { supabase } from "@/app/lib/supabase";

// interface Lesson {
//   id: string;
//   title: string;
//   completed_at: string;
// }

// export default function MyLessonsPage() {
//   const [lessons, setLessons] = useState<Lesson[]>([]);

//   useEffect(() => {
//     async function loadLessons() {
//       const {
//         data: { user },
//       } = await supabase.auth.getUser();

//       if (!user) return;

//       const { data, error } = await supabase
//         .from("lesson_progress")
//         .select(`
//           completed_at,
//           lessons (
//             id,
//             title
//           )
//         `)
//         .eq("student_id", user.id)
//         .eq("completed", true)
//         .order("completed_at", {
//           ascending: false,
//         });

//       if (error) {
//         console.error(error);
//         return;
//       }

//       if (!data) return;

//       const formatted: Lesson[] = [];

//       data.forEach((item: any) => {
//         if (!item.lessons) return;

//         formatted.push({
//           id: item.lessons.id,
//           title: item.lessons.title,
//           completed_at: item.completed_at,
//         });
//       });

//       setLessons(formatted);
//     }

//     loadLessons();
//   }, []);

//   return (
//     <div className="space-y-6">
//       <h1 className="text-3xl font-bold">
//         Completed Lessons
//       </h1>

//       {lessons.length === 0 ? (
//         <p className="text-gray-500">
//           No completed lessons yet.
//         </p>
//       ) : (
//         lessons.map((lesson) => (
//           <div
//             key={lesson.id}
//             className="rounded-xl border p-5"
//           >
//             <h2 className="font-semibold">
//               {lesson.title}
//             </h2>

//             <p className="text-gray-500">
//               Completed:{" "}
//               {new Date(
//                 lesson.completed_at
//               ).toLocaleString()}
//             </p>
//           </div>
//         ))
//       )}
//     </div>
//   );
// }













// "use client";

// import { useCallback, useEffect, useState } from "react";
// import { supabase } from "@/app/lib/supabase";

// interface Lesson {
//   id: string;
//   title: string;
//   completed_at: string;
// }
// interface LessonProgressRow {
//   completed_at: string;
//   lessons: {
//     id: string;
//     title: string;
//   };
// }

// export default function MyLessonsPage() {
//   const [lessons, setLessons] = useState<Lesson[]>([]);
// //   useEffect(() => {
// //     loadLessons();
// //   }, [loadLessons]);

// //   async function loadLessons() {
// const loadLessons = useCallback(async () => {
//     const {
//       data: { user },
//     } = await supabase.auth.getUser();

//     if (!user) return;

//     const { data } = await supabase
//       .from("lesson_progress")
//       .select(`
//         completed_at,
//         lessons (
//           id,
//           title
//         )
//       `)
//       .eq("student_id", user.id)
//       .eq("completed", true)
//       .order("completed_at", {
//         ascending: false,
//       });

//     if (!data) return;

//     // const formatted = data.map((item: any) => ({
//     const formatted = (data as LessonProgressRow[]).map((item) => ({
//       id: item.lessons.id,
//       title: item.lessons.title,
//       completed_at: item.completed_at,
//     }));

//     setLessons(formatted);
//   }
// , [])
// useEffect(() => {
//   loadLessons();
// }, [loadLessons]);


//   return (
//     <div className="space-y-6">
//       <h1 className="text-3xl font-bold">
//         Completed Lessons
//       </h1>

//       {lessons.map((lesson) => (

//         <div
//           key={lesson.id}
//           className="rounded-xl border p-5"
//         >
//           <h2 className="font-semibold">
//             {lesson.title}
//           </h2>

//           <p className="text-gray-500">
//             Completed:{" "}
//             {new Date(
//               lesson.completed_at
//             ).toLocaleString()}
//           </p>
//         </div>

//       ))}

//     </div>
//   );
// }