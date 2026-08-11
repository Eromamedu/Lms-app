"use client";
import { BookOpen, CheckCircle, FileText, Award } from "lucide-react";
import WeeklyProgress from "@/app/components/Dashboard/WeeklyProgress";
import LearningStreak from "@/app/components/Dashboard/LearningStreak";
import Announcements from "@/app/components/Dashboard/AnnouncementCard";
import ContinueLearning from "@/app/components/Dashboard/continueLearning";
import UpcomingClasses from "@/app/components/Dashboard/UpcomingClasses";
import RecentActivity from "@/app/components/Dashboard/RecentActivity";
import Deadlines from "@/app/components/Dashboard/Deadlines";
import QuickActions from "@/app/components/Dashboard/QuickActions";
import StatCard from "@/app/components/Dashboard/StatCard";
import {useEffect,useState} from "react";
import {supabase} from "@/app/lib/supabase";


export default function DashboardPage() {
    
const [userName,setUserName]=useState("");
const [coursesStarted, setCoursesStarted] = useState(0);
const [certificatesEarned, setCertificatesEarned] = useState(0);

const [lessonsCompleted, setLessonsCompleted] = useState(0);

const [assignmentsPending, setAssignmentsPending] = useState(0);
const [assignmentsCompleted, setAssignmentsCompleted] =
  useState(0);


useEffect(()=>{


const getUser=async()=>{


const {
data:{user}
}=await supabase.auth.getUser();



if(user){


const {data}=await supabase
.from("profiles")
.select("full_name")
.eq("id",user.id)
.single();



setUserName(data?.full_name);
const { count: courseCount } = await supabase
  .from("student_courses")
  .select("*", {
    count: "exact",
    head: true,
  })
  .eq("student_id", user.id)
  .gt("progress", 0);

setCoursesStarted(courseCount ?? 0);

//  const { count: courseCount } = await supabase
//     .from("student_courses")
//     .select("*", {
//       count: "exact",
//       head: true,
//     })
//     .eq("student_id", user.id);
//     // .gt("progress", 0);


//   setCoursesStarted(courseCount ?? 0);

  //-----------------------------------
  // Lessons Completed
  //-----------------------------------

  const { count: lessonCount } = await supabase
    .from("lesson_progress")
    .select("*", {
      count: "exact",
      head: true,
    })
    .eq("student_id", user.id)
    .eq("completed", true);

  setLessonsCompleted(lessonCount ?? 0);

//-----------------------------------
// Assignments Unlocked
//-----------------------------------

const { data: completedLessons } =
  await supabase
    .from("lesson_progress")
    .select("lesson_id")
    .eq("student_id", user.id)
    .eq("completed", true);

if (completedLessons?.length) {
  const lessonIds = completedLessons.map(
    (lesson) => lesson.lesson_id
  );

  //-----------------------------------
  // Assignments unlocked
  //-----------------------------------

  const { count: assignmentCount } =
    await supabase
      .from("assignments")
      .select("*", {
        count: "exact",
        head: true,
      })
      .in("lesson_id", lessonIds);

  // setAssignmentsPending(
  //   assignmentCount ?? 0
  // );

  //-----------------------------------
  // Assignments submitted
  //-----------------------------------

  const { count: submittedCount } =
    await supabase
      .from("assignment_submissions")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("student_id", user.id);

  setAssignmentsCompleted(
    submittedCount ?? 0
  );
  const remainingAssignments =
  (assignmentCount ?? 0) - (submittedCount ?? 0);

setAssignmentsPending(
  Math.max(remainingAssignments, 0)
);
}

// 2 assignments per completed lesson

// setAssignmentsPending((lessonCount ?? 0) * 2);
//-----------------------------------
// Certificates Earned
//-----------------------------------

const { count: certificateCount } = await supabase
  .from("certificates")
  .select("*", {
    count: "exact",
    head: true,
  })
  .eq("student_id", user.id);

setCertificatesEarned(certificateCount ?? 0);

}


};


getUser();



},[]);

  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-gray-700">
          Good Morning 👋 {userName}
        </h1>

        <p className="mt-2 text-slate-500">
          Welcome back! Here&apos;s your learning progress.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Courses started"
          // value="12"
          value={coursesStarted.toString()}
          icon={<BookOpen />}
          color="bg-blue-600"
         href ="/auth/dashboard/my-courses"

        />

        <StatCard
          title="Lessons"
          // value="185"
          value={lessonsCompleted.toString()}
          icon={<CheckCircle />}
          color="bg-green-600"
          href="/auth/dashboard/my-lessons"
        />

        <StatCard
          title="Assignments"
          // value="3"
            value={assignmentsPending.toString()}
          icon={<FileText />}
          color="bg-amber-500"
          href="/auth/dashboard/assignments"

        />

        <StatCard
          title="Certificates"
           value={certificatesEarned.toString()}
             href="/auth/dashboard/certificates"
          // value="5"
          icon={<Award />}
          color="bg-purple-600"
        />
      </div>

      {/* Main Dashboard */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">

        {/* Weekly Progress */}
        <div className="xl:col-span-8">
          <WeeklyProgress />
        </div>

        {/* Learning Streak */}
        <div className="xl:col-span-4">
          <LearningStreak />
        </div>

        {/* Continue Learning */}
        <div className="xl:col-span-7">
          <ContinueLearning />
        </div>

        {/* Announcements */}
        <div className="xl:col-span-5">
          <Announcements />
        </div>

        {/* Upcoming Classes */}
        <div className="xl:col-span-6">
          <UpcomingClasses />
        </div>

        {/* Deadlines */}
        <div className="xl:col-span-6">
          <Deadlines />
        </div>

        {/* Recent Activity */}
        <div className="xl:col-span-8">
          <RecentActivity />
        </div>

        {/* Quick Actions */}
        <div className="xl:col-span-4">
          <QuickActions />
        </div>

      </div>
    </div>
  );
}




// import { BookOpen, CheckCircle, FileText, Award } from "lucide-react";
// import WeeklyProgress from "@/app/components/Dashboard/WeeklyProgress";
// import QuickActions from "@/app/components/Dashboard/QuickActions";
// import Deadlines from "@/app/components/Dashboard/Deadlines";
// import StatCard from "@/app/components/Dashboard/StatCard";
// import ContinueLearning from "@/app/components/Dashboard/continueLearning";
// import UpcomingClasses from "@/app/components/Dashboard/UpcomingClasses";
// import RecentActivity from "@/app/components/Dashboard/RecentActivity";

// export default function DashboardPage() {
//   return (
//     <div>
//       <div className="mb-10">
//         <h1 className="text-4xl font-bold text-gray-600">Good Morning 👋 Believe</h1>

//         <p className="mt-2 text-slate-500 ">
//           Welcome back! Here&apos;s your learning progress.
//         </p>
//       </div>

//       <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
//         <StatCard
//           title="Courses"
//           value="12"
//           icon={<BookOpen />}
//           color="bg-blue-600"
//         />

//         <StatCard
//           title="Lessons"
//           value="185"
//           icon={<CheckCircle />}
//           color="bg-green-600"
//         />

//         <StatCard
//           title="Assignments"
//           value="3"
//           icon={<FileText />}
//           color="bg-amber-500"
//         />

//         <StatCard
//           title="Certificates"
//           value="5"
//           icon={<Award />}
//           color="bg-purple-600"
//         />
//       </div>

//       {/* <div className="mt-10 grid gap-8 xl:grid-cols-2">
//         <ContinueLearning />

//         <UpcomingClasses />
//       </div>

//       <div className="mt-10">
//         <RecentActivity />
//       </div> */}
//       <div className="mt-10 grid gap-8 xl:grid-cols-3">

//   <div className="xl:col-span-2">
//     <ContinueLearning />
//   </div>

//   <QuickActions />

// </div>

// <div className="mt-10 grid gap-8 xl:grid-cols-2">

//   <WeeklyProgress />

//   <Deadlines />

// </div>

// <div className="mt-10 grid gap-8 xl:grid-cols-2">

//   <UpcomingClasses />

//   <RecentActivity />

// </div>
//     </div>
//   );
// }







// export default function Dashboard(){

// return(

// <div>

// <h1 className="text-4xl font-bold text-gray-600">

// Good Morning 👋 Believe

// </h1>

// <p className="mt-2 text-slate-500">

// Welcome back. Ready to continue learning?

// </p>

// </div>
// )

// }
