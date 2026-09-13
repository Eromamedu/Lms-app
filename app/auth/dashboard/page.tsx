"use client";

import {
  BookOpen,
  CheckCircle,
  FileText,
  Award,
  Sparkles,
  TrendingUp,
  ArrowRight,
  GraduationCap,
  Zap,
  Target,
  Rocket,
  Star,
} from "lucide-react";

import { useEffect, useState } from "react";

import { supabase } from "@/app/lib/supabase";

import WeeklyProgress from "@/app/components/Dashboard/WeeklyProgress";
import LearningStreak from "@/app/components/Dashboard/LearningStreak";
import Announcements from "@/app/components/Dashboard/AnnouncementCard";
import ContinueLearning from "@/app/components/Dashboard/continueLearning";
import UpcomingClasses from "@/app/components/Dashboard/UpcomingClasses";
import RecentActivity from "@/app/components/Dashboard/RecentActivity";
import Deadlines from "@/app/components/Dashboard/Deadlines";
import QuickActions from "@/app/components/Dashboard/QuickActions";
import StatCard from "@/app/components/Dashboard/StatCard";

export default function DashboardPage() {
  const [userName, setUserName] = useState("");

  const [coursesStarted, setCoursesStarted] = useState(0);

  const [certificatesEarned, setCertificatesEarned] =
    useState(0);

  const [lessonsCompleted, setLessonsCompleted] =
    useState(0);

  const [assignmentsPending, setAssignmentsPending] =
    useState(0);

  const [assignmentsCompleted, setAssignmentsCompleted] =
    useState(0);

  /*
  ==================================================
  LOAD DASHBOARD DATA
  ==================================================
  */

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      /*
      ==============================================
      PROFILE
      ==============================================
      */

      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name")
        .eq("id", user.id)
        .single();

      setUserName(profile?.full_name ?? "");

      /*
      ==============================================
      COURSES STARTED
      ==============================================
      */

      const { count: courseCount } =
        await supabase
          .from("student_courses")
          .select("*", {
            count: "exact",
            head: true,
          })
          .eq("student_id", user.id)
          .gt("progress", 0);

      setCoursesStarted(courseCount ?? 0);

      /*
      ==============================================
      LESSONS COMPLETED
      ==============================================
      */

      const { count: lessonCount } =
        await supabase
          .from("lesson_progress")
          .select("*", {
            count: "exact",
            head: true,
          })
          .eq("student_id", user.id)
          .eq("completed", true);

      setLessonsCompleted(lessonCount ?? 0);

      /*
      ==============================================
      COMPLETED LESSONS
      ==============================================
      */

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

        /*
        ============================================
        ASSIGNMENTS UNLOCKED
        ============================================
        */

        const { count: assignmentCount } =
          await supabase
            .from("assignments")
            .select("*", {
              count: "exact",
              head: true,
            })
            .in("lesson_id", lessonIds);

        /*
        ============================================
        ASSIGNMENTS SUBMITTED
        ============================================
        */

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
          (assignmentCount ?? 0) -
          (submittedCount ?? 0);

        setAssignmentsPending(
          Math.max(
            remainingAssignments,
            0
          )
        );
      }

      /*
      ==============================================
      CERTIFICATES
      ==============================================
      */

      const { count: certificateCount } =
        await supabase
          .from("certificates")
          .select("*", {
            count: "exact",
            head: true,
          })
          .eq("student_id", user.id);

      setCertificatesEarned(
        certificateCount ?? 0
      );
    };

    getUser();
  }, []);

  /*
  ==================================================
  DASHBOARD UI
  ==================================================
  */

  return (
    // <main className="lms-background relative min-h-screen overflow-hidden bg-[#020617]">
    <main className="lms-background relative min-h-screen overflow-hidden">

      {/* =================================================
          AMBIENT BACKGROUND GLOWS
      ================================================= */}

      {/* <div
        className="lms-glow-blue pointer-events-none absolute -left-40 -top-32"
        aria-hidden="true"
      />

      <div
        className="lms-glow-purple pointer-events-none absolute right-[-120px] top-[28%]"
        aria-hidden="true"
      />

      <div
        className="lms-glow-cyan pointer-events-none absolute bottom-[-100px] left-[35%]"
        aria-hidden="true"
      /> */}


      {/* =================================================
    LIVE AMBIENT ORBS
================================================= */}

{/* =================================================
    PREMIUM BLACK BACKGROUND DECORATIONS
================================================= */}

<div
  className="lms-orbit lms-orbit-1"
  aria-hidden="true"
/>

<div
  className="lms-orbit lms-orbit-2"
  aria-hidden="true"
/>

<div
  className="lms-orbit lms-orbit-3"
  aria-hidden="true"
/>

{/* Moving scanning line */}

<div
  className="lms-scan"
  aria-hidden="true"
/>

{/* Floating particles */}

<div
  className="lms-particle lms-particle-blue left-[12%] top-[25%]"
  aria-hidden="true"
/>

<div
  className="lms-particle lms-particle-cyan left-[27%] top-[55%]"
  aria-hidden="true"
/>

<div
  className="lms-particle lms-particle-purple left-[72%] top-[32%]"
  aria-hidden="true"
/>

<div
  className="lms-particle lms-particle-blue left-[82%] top-[70%]"
  aria-hidden="true"
/>

<div
  className="lms-particle lms-particle-cyan left-[45%] top-[80%]"
  aria-hidden="true"
/>

<div
  className="lms-particle lms-particle-purple left-[92%] top-[18%]"
  aria-hidden="true"
/>

<div
  className="lms-glow-blue dashboard-orb pointer-events-none absolute -left-40 -top-32"
  aria-hidden="true"
/>

<div
  className="lms-glow-purple dashboard-orb-slow pointer-events-none absolute right-[-120px] top-[28%]"
  aria-hidden="true"
/>

<div
  className="lms-glow-cyan dashboard-orb pointer-events-none absolute bottom-[-100px] left-[35%]"
  aria-hidden="true"
/>

<div
  className="dashboard-breathing pointer-events-none absolute left-[45%] top-[12%] h-40 w-40 rounded-full bg-blue-500/5 blur-3xl"
  aria-hidden="true"
/>

{/* =================================================
    FLOATING PARTICLES
================================================= */}

<div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">

  <span
    className="dashboard-particle absolute left-[12%] top-[40%] h-1 w-1 rounded-full bg-cyan-300"
    style={{ animationDelay: "0s" }}
  />

  <span
    className="dashboard-particle absolute left-[30%] top-[70%] h-1.5 w-1.5 rounded-full bg-blue-400"
    style={{ animationDelay: "2s" }}
  />

  <span
    className="dashboard-particle absolute left-[55%] top-[35%] h-1 w-1 rounded-full bg-purple-400"
    style={{ animationDelay: "4s" }}
  />

  <span
    className="dashboard-particle absolute right-[20%] top-[60%] h-1.5 w-1.5 rounded-full bg-pink-400"
    style={{ animationDelay: "1s" }}
  />

  <span
    className="dashboard-particle absolute right-[8%] top-[30%] h-1 w-1 rounded-full bg-cyan-300"
    style={{ animationDelay: "5s" }}
  />

</div>

      {/* =================================================
          SMALL DECORATIVE PARTICLES
      ================================================= */}

      <div
        className="pointer-events-none absolute left-[8%] top-[22%] h-2 w-2 animate-pulse rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/50"
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute right-[15%] top-[18%] h-1.5 w-1.5 animate-pulse rounded-full bg-purple-400 shadow-lg shadow-purple-400/50"
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute right-[30%] top-[65%] h-2 w-2 animate-pulse rounded-full bg-blue-400 shadow-lg shadow-blue-400/50"
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute left-[20%] bottom-[18%] h-1.5 w-1.5 animate-pulse rounded-full bg-pink-400 shadow-lg shadow-pink-400/50"
        aria-hidden="true"
      />

      {/* =================================================
          MAIN CONTENT
      ================================================= */}

      <div className="relative space-y-10 px-1 pb-16">

        {/* =================================================
            WELCOME HERO
        ================================================= */}

        <section className="animate-fade-up">

          <div className="lms-glass relative overflow-hidden rounded-[30px] border border-white/10 p-7 shadow-2xl sm:p-9">

            {/* HERO GLOW */}

            {/* <div
              className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl"
              aria-hidden="true"
            /> */}
            <div
  className="dashboard-hero-glow pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl"
/>
<div
  className="dashboard-hero-glow pointer-events-none absolute -bottom-32 left-[40%] h-64 w-64 rounded-full bg-purple-500/10 blur-3xl"
  style={{ animationDelay: "3s" }}
/>

            {/* <div
              className="pointer-events-none absolute -bottom-32 left-[40%] h-64 w-64 rounded-full bg-purple-500/10 blur-3xl"
              aria-hidden="true"
            /> */}

            {/* Decorative rings */}

            {/* <div
              className="pointer-events-none absolute right-10 top-10 hidden h-40 w-40 rounded-full border border-blue-400/10 sm:block"
              aria-hidden="true"
            /> */}
            <div
  className="dashboard-rotate pointer-events-none absolute right-10 top-10 hidden h-40 w-40 rounded-full border border-blue-400/10 sm:block"
/>
<div
  className="dashboard-rotate-slow pointer-events-none absolute right-16 top-16 hidden h-28 w-28 rounded-full border border-purple-400/10 sm:block"
/>

            {/* <div
              className="pointer-events-none absolute right-16 top-16 hidden h-28 w-28 rounded-full border border-purple-400/10 sm:block"
              aria-hidden="true"
            /> */}

            <div className="relative">

              {/* LABEL */}

              <div className="mb-6 flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 shadow-lg shadow-blue-500/25">

                  <Sparkles
                    size={21}
                    className="text-white"
                  />

                </div>

                <div>

                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-cyan-400">
                    Learning Dashboard
                  </p>

                  <p className="mt-0.5 text-xs text-slate-500">
                    Your personal learning command center
                  </p>

                </div>

              </div>

              {/* TITLE */}

              <h1 className="text-3xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">

                Good Morning{" "}

                <span className="inline-block animate-float">
                  👋
                </span>

                <br />
                <span className="dashboard-text-shimmer">
  {userName || "Learner"}
</span>

                {/* <span className="lms-gradient-text">
                  {userName || "Learner"}
                </span> */}

              </h1>

              {/* DESCRIPTION */}

              <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">

                Welcome back. Every lesson you complete,
                every challenge you solve, and every skill
                you master brings you closer to your goals.

              </p>

              {/* STATUS PILLS */}

              <div className="mt-7 flex flex-wrap gap-3">

                <div className="flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-xs font-bold text-emerald-400">

                  {/* <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" /> */}
                  <span className="dashboard-live h-2 w-2 rounded-full bg-emerald-400" />

                  Learning active

                </div>

                <div className="flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-400/10 px-4 py-2 text-xs font-bold text-blue-400">

                  <Rocket size={14} className="dashboard-rocket" />

                  Keep progressing

                </div>

                <div className="flex items-center gap-2 rounded-full border border-purple-400/20 bg-purple-400/10 px-4 py-2 text-xs font-bold text-purple-400">

                  <Target size={14} />

                  Stay consistent

                </div>

              </div>

            </div>

          </div>

        </section>

        {/* =================================================
            OVERVIEW TITLE
        ================================================= */}

        <section className="animate-fade-up dashboard-delay-1">

          <div className="mb-5 flex items-end justify-between">

            <div>

              <div className="flex items-center gap-2">

                <Zap
                  size={18}
                  className="text-cyan-400"
                />

                <h2 className="text-xl font-black text-white">
                  Your Overview
                </h2>

              </div>

              <p className="mt-1 text-sm text-slate-500">
                Your learning activity at a glance.
              </p>

            </div>

            <div className="hidden items-center gap-2 text-xs font-medium text-slate-500 sm:flex">

              <TrendingUp
                size={15}
                className="text-emerald-400"
              />

              Keep growing

            </div>

          </div>

          {/* =================================================
              STAT CARDS
          ================================================= */}

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

            {/* COURSES */}

            {/* <div className="lms-card animate-fade-up dashboard-delay-1 group overflow-hidden"> */}
            <div className="lms-card dashboard-interactive dashboard-shimmer-border animate-fade-up dashboard-delay-1 group overflow-hidden">

              <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-blue-500/10 blur-2xl transition-all duration-500 group-hover:bg-blue-500/20" />

              <StatCard
                title="Courses started"
                value={coursesStarted.toString()}
                icon={<BookOpen />}
                color="bg-gradient-to-br from-blue-500 to-cyan-500"
                href="/auth/dashboard/my-courses"
              />

            </div>

            {/* LESSONS */}

            {/* <div className="lms-card animate-fade-up dashboard-delay-2 group overflow-hidden"> */}
            <div className="lms-card dashboard-interactive dashboard-shimmer-border animate-fade-up dashboard-delay-2 group overflow-hidden">

              <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-emerald-500/10 blur-2xl transition-all duration-500 group-hover:bg-emerald-500/20" />

              <StatCard
                title="Lessons"
                value={lessonsCompleted.toString()}
                icon={<CheckCircle />}
                color="bg-gradient-to-br from-emerald-500 to-green-400"
                href="/auth/dashboard/my-lessons"
              />

            </div>

            {/* ASSIGNMENTS */}

            <div className="lms-card animate-fade-up dashboard-delay-3 group overflow-hidden">

              <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-amber-500/10 blur-2xl transition-all duration-500 group-hover:bg-amber-500/20" />

              <StatCard
                title="Assignments"
                value={assignmentsPending.toString()}
                icon={<FileText />}
                color="bg-gradient-to-br from-amber-500 to-orange-500"
                href="/auth/dashboard/assignments"
              />

            </div>

            {/* CERTIFICATES */}

            {/* <div className="lms-card animate-fade-up dashboard-delay-4 group overflow-hidden"> */}
            <div className="lms-card dashboard-interactive dashboard-shimmer-border animate-fade-up dashboard-delay-4 group overflow-hidden">

              <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-violet-500/10 blur-2xl transition-all duration-500 group-hover:bg-violet-500/20" />

              <StatCard
                title="Certificates"
                value={certificatesEarned.toString()}
                icon={<Award />}
                color="bg-gradient-to-br from-violet-500 to-fuchsia-500"
                href="/auth/dashboard/certificates"
              />

            </div>

          </div>

        </section>

        {/* =================================================
            MAIN DASHBOARD GRID
        ================================================= */}

        <section className="grid grid-cols-1 gap-7 xl:grid-cols-12">

          {/* WEEKLY PROGRESS */}

          {/* <div className="lms-card animate-fade-up dashboard-delay-2 overflow-hidden xl:col-span-8"> */}
          <div className="lms-card dashboard-interactive animate-fade-up dashboard-delay-2 overflow-hidden xl:col-span-8">

            <WeeklyProgress />

          </div>

          {/* LEARNING STREAK */}

          {/* <div className="lms-card animate-fade-up dashboard-delay-3 overflow-hidden xl:col-span-4"> */}
          <div className="lms-card dashboard-interactive animate-fade-up dashboard-delay-3 overflow-hidden xl:col-span-7">

            <LearningStreak />

          </div>

          {/* CONTINUE LEARNING */}

          {/* <div className="lms-card animate-fade-up dashboard-delay-3 overflow-hidden xl:col-span-7"> */}
          <div className="lms-card dashboard-interactive animate-fade-up dashboard-delay-3 overflow-hidden xl:col-span-7">

            <ContinueLearning />

          </div>

          {/* ANNOUNCEMENTS */}

          {/* <div className="lms-card animate-fade-up dashboard-delay-4 overflow-hidden xl:col-span-5"> */}
          <div className="lms-card dashboard-interactive animate-fade-up dashboard-delay-4 overflow-hidden xl:col-span-5">

            <Announcements />

          </div>

          {/* UPCOMING CLASSES */}

          {/* <div className="lms-card animate-fade-up dashboard-delay-4 overflow-hidden xl:col-span-6"> */}
          <div className="lms-card dashboard-interactive animate-fade-up dashboard-delay-4 overflow-hidden xl:col-span-6">

            <UpcomingClasses />

          </div>

          {/* DEADLINES */}

          {/* <div className="lms-card animate-fade-up dashboard-delay-5 overflow-hidden xl:col-span-6"> */}
          <div className="lms-card dashboard-interactive animate-fade-up dashboard-delay-5 overflow-hidden xl:col-span-6">

            <Deadlines />

          </div>

          {/* RECENT ACTIVITY */}

          {/* <div className="lms-card animate-fade-up dashboard-delay-5 overflow-hidden xl:col-span-8"> */}
<div className="lms-card dashboard-interactive animate-fade-up dashboard-delay-5 overflow-hidden xl:col-span-8">
            <RecentActivity />

          </div>

          {/* QUICK ACTIONS */}

          {/* <div className="lms-card animate-fade-up dashboard-delay-6 overflow-hidden xl:col-span-4"> */}
          <div className="lms-card dashboard-interactive animate-fade-up dashboard-delay-6 overflow-hidden xl:col-span-4">

            <QuickActions />

          </div>

        </section>

        {/* =================================================
            ACHIEVEMENT / MOTIVATION BANNER
        ================================================= */}

        <section className="animate-fade-up dashboard-delay-7">

          {/* <div className="relative overflow-hidden rounded-[30px] border border-blue-400/20 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 p-7 shadow-2xl shadow-blue-950/40 sm:p-9"> */}
          <div className="dashboard-banner-glow relative overflow-hidden rounded-[30px] border border-blue-400/20 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 p-7 shadow-2xl shadow-blue-950/40 sm:p-9">

            {/* BACKGROUND GLOWS */}

            <div
              className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-cyan-300/20 blur-3xl"
              aria-hidden="true"
            />

            <div
              className="pointer-events-none absolute -bottom-24 left-1/3 h-64 w-64 rounded-full bg-purple-300/20 blur-3xl"
              aria-hidden="true"
            />

            {/* STARS */}

            <Star
              size={18}
              // className="absolute right-[25%] top-8 animate-pulse text-yellow-300"
                className="dashboard-twinkle absolute right-[25%] top-8 text-yellow-300"
              fill="currentColor"
            />

            <Star
              size={12}
              // className="absolute right-[12%] top-[45%] animate-pulse text-cyan-200"
                className="dashboard-twinkle absolute right-[12%] top-[45%] text-cyan-200"
              fill="currentColor"
            />

            <Star
              size={14}
              // className="absolute bottom-8 left-[50%] animate-pulse text-purple-200"
                className="dashboard-twinkle absolute bottom-8 left-[50%] text-purple-200"
              fill="currentColor"
            />

            <div className="relative flex flex-col gap-7 md:flex-row md:items-center md:justify-between">

              <div>

                <div className="mb-3 flex items-center gap-2">

                  <GraduationCap
                    size={18}
                    className="text-blue-100"
                  />

                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-blue-100">
                    Keep the momentum
                  </p>

                </div>

                <h2 className="text-2xl font-black text-white sm:text-3xl">

                  Your next achievement
                  is waiting. 🚀

                </h2>

                <p className="mt-3 max-w-xl text-sm leading-6 text-blue-100">

                  Every course you complete and every
                  lesson you finish is another step
                  toward becoming the developer you
                  want to be.

                </p>

                <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-white">

                  <span>
                    Keep learning
                  </span>

                  <ArrowRight
                    size={17}
                    className="animate-float"
                  />

                </div>

              </div>

              {/* TROPHY */}

              {/* <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-[24px] border border-white/10 bg-white/10 shadow-xl backdrop-blur-md"> */}
              <div className="dashboard-trophy flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-[24px] border border-white/10 bg-white/10 shadow-xl backdrop-blur-md">

                <Award
                  size={38}
                  className="text-white"
                />

              </div>

            </div>

          </div>

        </section>

      </div>

    </main>
  );
}



// "use client";
// import { BookOpen, CheckCircle, FileText, Award } from "lucide-react";
// import WeeklyProgress from "@/app/components/Dashboard/WeeklyProgress";
// import LearningStreak from "@/app/components/Dashboard/LearningStreak";
// import Announcements from "@/app/components/Dashboard/AnnouncementCard";
// import ContinueLearning from "@/app/components/Dashboard/continueLearning";
// import UpcomingClasses from "@/app/components/Dashboard/UpcomingClasses";
// import RecentActivity from "@/app/components/Dashboard/RecentActivity";
// import Deadlines from "@/app/components/Dashboard/Deadlines";
// import QuickActions from "@/app/components/Dashboard/QuickActions";
// import StatCard from "@/app/components/Dashboard/StatCard";
// import {useEffect,useState} from "react";
// import {supabase} from "@/app/lib/supabase";


// export default function DashboardPage() {
    
// const [userName,setUserName]=useState("");
// const [coursesStarted, setCoursesStarted] = useState(0);
// const [certificatesEarned, setCertificatesEarned] = useState(0);

// const [lessonsCompleted, setLessonsCompleted] = useState(0);

// const [assignmentsPending, setAssignmentsPending] = useState(0);
// const [assignmentsCompleted, setAssignmentsCompleted] =
//   useState(0);


// useEffect(()=>{


// const getUser=async()=>{


// const {
// data:{user}
// }=await supabase.auth.getUser();



// if(user){


// const {data}=await supabase
// .from("profiles")
// .select("full_name")
// .eq("id",user.id)
// .single();



// setUserName(data?.full_name);
// const { count: courseCount } = await supabase
//   .from("student_courses")
//   .select("*", {
//     count: "exact",
//     head: true,
//   })
//   .eq("student_id", user.id)
//   .gt("progress", 0);

// setCoursesStarted(courseCount ?? 0);

// //  const { count: courseCount } = await supabase
// //     .from("student_courses")
// //     .select("*", {
// //       count: "exact",
// //       head: true,
// //     })
// //     .eq("student_id", user.id);
// //     // .gt("progress", 0);


// //   setCoursesStarted(courseCount ?? 0);

//   //-----------------------------------
//   // Lessons Completed
//   //-----------------------------------

//   const { count: lessonCount } = await supabase
//     .from("lesson_progress")
//     .select("*", {
//       count: "exact",
//       head: true,
//     })
//     .eq("student_id", user.id)
//     .eq("completed", true);

//   setLessonsCompleted(lessonCount ?? 0);

// //-----------------------------------
// // Assignments Unlocked
// //-----------------------------------

// const { data: completedLessons } =
//   await supabase
//     .from("lesson_progress")
//     .select("lesson_id")
//     .eq("student_id", user.id)
//     .eq("completed", true);

// if (completedLessons?.length) {
//   const lessonIds = completedLessons.map(
//     (lesson) => lesson.lesson_id
//   );

//   //-----------------------------------
//   // Assignments unlocked
//   //-----------------------------------

//   const { count: assignmentCount } =
//     await supabase
//       .from("assignments")
//       .select("*", {
//         count: "exact",
//         head: true,
//       })
//       .in("lesson_id", lessonIds);

//   // setAssignmentsPending(
//   //   assignmentCount ?? 0
//   // );

//   //-----------------------------------
//   // Assignments submitted
//   //-----------------------------------

//   const { count: submittedCount } =
//     await supabase
//       .from("assignment_submissions")
//       .select("*", {
//         count: "exact",
//         head: true,
//       })
//       .eq("student_id", user.id);

//   setAssignmentsCompleted(
//     submittedCount ?? 0
//   );
//   const remainingAssignments =
//   (assignmentCount ?? 0) - (submittedCount ?? 0);

// setAssignmentsPending(
//   Math.max(remainingAssignments, 0)
// );
// }

// // 2 assignments per completed lesson

// // setAssignmentsPending((lessonCount ?? 0) * 2);
// //-----------------------------------
// // Certificates Earned
// //-----------------------------------

// const { count: certificateCount } = await supabase
//   .from("certificates")
//   .select("*", {
//     count: "exact",
//     head: true,
//   })
//   .eq("student_id", user.id);

// setCertificatesEarned(certificateCount ?? 0);

// }


// };


// getUser();



// },[]);

//   return (
//     <div className="space-y-10  ">
//       {/* Header */}
//       <div>
//         <h1 className="text-4xl font-bold text-gray-700">
//           Good Morning 👋 {userName}
//         </h1>

//         <p className="mt-2 text-slate-500">
//           Welcome back! Here&apos;s your learning progress.
//         </p>
//       </div>

//       {/* Statistics */}
//       <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
//         <StatCard
//           title="Courses started"
//           // value="12"
//           value={coursesStarted.toString()}
//           icon={<BookOpen />}
//           color="bg-blue-600"
//          href ="/auth/dashboard/my-courses"

//         />

//         <StatCard
//           title="Lessons"
//           // value="185"
//           value={lessonsCompleted.toString()}
//           icon={<CheckCircle />}
//           color="bg-green-600"
//           href="/auth/dashboard/my-lessons"
//         />

//         <StatCard
//           title="Assignments"
//           // value="3"
//             value={assignmentsPending.toString()}
//           icon={<FileText />}
//           color="bg-amber-500"
//           href="/auth/dashboard/assignments"

//         />

//         <StatCard
//           title="Certificates"
//            value={certificatesEarned.toString()}
//              href="/auth/dashboard/certificates"
//           // value="5"
//           icon={<Award />}
//           color="bg-purple-600"
//         />
//       </div>

//       {/* Main Dashboard */}
//       <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">

//         {/* Weekly Progress */}
//         <div className="xl:col-span-8">
//           <WeeklyProgress />
//         </div>

//         {/* Learning Streak */}
//         <div className="xl:col-span-4">
//           <LearningStreak />
//         </div>

//         {/* Continue Learning */}
//         <div className="xl:col-span-7">
//           <ContinueLearning />
//         </div>

//         {/* Announcements */}
//         <div className="xl:col-span-5">
//           <Announcements />
//         </div>

//         {/* Upcoming Classes */}
//         <div className="xl:col-span-6">
//           <UpcomingClasses />
//         </div>

//         {/* Deadlines */}
//         <div className="xl:col-span-6">
//           <Deadlines />
//         </div>

//         {/* Recent Activity */}
//         <div className="xl:col-span-8">
//           <RecentActivity />
//         </div>

//         {/* Quick Actions */}
//         <div className="xl:col-span-4">
//           <QuickActions />
//         </div>

//       </div>
//     </div>
//   );
// }




// // import { BookOpen, CheckCircle, FileText, Award } from "lucide-react";
// // import WeeklyProgress from "@/app/components/Dashboard/WeeklyProgress";
// // import QuickActions from "@/app/components/Dashboard/QuickActions";
// // import Deadlines from "@/app/components/Dashboard/Deadlines";
// // import StatCard from "@/app/components/Dashboard/StatCard";
// // import ContinueLearning from "@/app/components/Dashboard/continueLearning";
// // import UpcomingClasses from "@/app/components/Dashboard/UpcomingClasses";
// // import RecentActivity from "@/app/components/Dashboard/RecentActivity";

// // export default function DashboardPage() {
// //   return (
// //     <div>
// //       <div className="mb-10">
// //         <h1 className="text-4xl font-bold text-gray-600">Good Morning 👋 Believe</h1>

// //         <p className="mt-2 text-slate-500 ">
// //           Welcome back! Here&apos;s your learning progress.
// //         </p>
// //       </div>

// //       <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
// //         <StatCard
// //           title="Courses"
// //           value="12"
// //           icon={<BookOpen />}
// //           color="bg-blue-600"
// //         />

// //         <StatCard
// //           title="Lessons"
// //           value="185"
// //           icon={<CheckCircle />}
// //           color="bg-green-600"
// //         />

// //         <StatCard
// //           title="Assignments"
// //           value="3"
// //           icon={<FileText />}
// //           color="bg-amber-500"
// //         />

// //         <StatCard
// //           title="Certificates"
// //           value="5"
// //           icon={<Award />}
// //           color="bg-purple-600"
// //         />
// //       </div>

// //       {/* <div className="mt-10 grid gap-8 xl:grid-cols-2">
// //         <ContinueLearning />

// //         <UpcomingClasses />
// //       </div>

// //       <div className="mt-10">
// //         <RecentActivity />
// //       </div> */}
// //       <div className="mt-10 grid gap-8 xl:grid-cols-3">

// //   <div className="xl:col-span-2">
// //     <ContinueLearning />
// //   </div>

// //   <QuickActions />

// // </div>

// // <div className="mt-10 grid gap-8 xl:grid-cols-2">

// //   <WeeklyProgress />

// //   <Deadlines />

// // </div>

// // <div className="mt-10 grid gap-8 xl:grid-cols-2">

// //   <UpcomingClasses />

// //   <RecentActivity />

// // </div>
// //     </div>
// //   );
// // }







// // export default function Dashboard(){

// // return(

// // <div>

// // <h1 className="text-4xl font-bold text-gray-600">

// // Good Morning 👋 Believe

// // </h1>

// // <p className="mt-2 text-slate-500">

// // Welcome back. Ready to continue learning?

// // </p>

// // </div>
// // )

// // }
