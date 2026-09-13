"use client";

import { useEffect, useMemo, useState } from "react";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Plus,
  Clock,
  MapPin,
  Video,
  Pencil,
  Trash2,
  X,
  Sparkles,
  GraduationCap,
  Link as LinkIcon,
  UserRound,
} from "lucide-react";
import toast from "react-hot-toast";

import { supabase } from "@/app/lib/supabase";

interface ScheduledClass {
  id: string;
  title: string;
  course_id: string | null;
  instructor: string | null;
  description: string | null;
  class_date: string;
  start_time: string;
  end_time: string;
  meeting_link: string | null;
  location: string | null;
  created_by: string;
  created_at: string;
}

interface Course {
  id: string;
  title: string;
}

interface ClassForm {
  course_id: string;
  instructor: string;
  description: string;
  class_date: string;
  start_time: string;
  end_time: string;
  meeting_link: string;
  location: string;
}

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const WEEKDAYS = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
];

function formatDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function getInitialForm(date: string): ClassForm {
  return {
    course_id: "",
    instructor: "",
    description: "",
    class_date: date,
    start_time: "09:00",
    end_time: "10:00",
    meeting_link: "",
    location: "",
  };
}

export default function CalendarPage() {
  const today = new Date();

  const [currentMonth, setCurrentMonth] = useState(today.getMonth());

  const [currentYear, setCurrentYear] = useState(
    today.getFullYear()
  );

  const [selectedDate, setSelectedDate] = useState(
    formatDate(today)
  );

  const [classes, setClasses] = useState<ScheduledClass[]>([]);

  const [courses, setCourses] = useState<Course[]>([]);

  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);

  const [editingClass, setEditingClass] =
    useState<ScheduledClass | null>(null);

  const [selectedClass, setSelectedClass] =
    useState<ScheduledClass | null>(null);

  const [form, setForm] = useState<ClassForm>(
    getInitialForm(formatDate(today))
  );

  /*
  ============================================================
  LOAD CLASSES
  ============================================================
  */

  async function loadClasses() {
    console.log("📥 LOADING CLASSES FROM SUPABASE...");

    setLoading(true);

    const { data, error } = await supabase
      .from("scheduled_classes")
      .select("*")
      .order("class_date", {
        ascending: true,
      })
      .order("start_time", {
        ascending: true,
      });

    if (error) {
      console.error("❌ LOAD CLASSES ERROR:", error);

      toast.error(error.message);

      setLoading(false);

      return;
    }

    console.log("✅ CLASSES LOADED:", data);

    setClasses(data ?? []);

    setLoading(false);
  }

  /*
  ============================================================
  LOAD COURSES
  ============================================================
  */

  async function loadCourses() {
    console.log("📚 LOADING COURSES...");

    const { data, error } = await supabase
      .from("courses")
      .select("id, title")
      .order("title");

    if (error) {
      console.error("❌ LOAD COURSES ERROR:", error);

      return;
    }

    console.log("✅ COURSES LOADED:", data);

    setCourses(data ?? []);
  }

  /*
  ============================================================
  INITIAL LOAD
  ============================================================
  */

  useEffect(() => {
    loadClasses();
    loadCourses();
  }, []);

  /*
  ============================================================
  FORM INPUT HANDLER
  ============================================================
  */

  function handleInputChange(
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) {
    const { name, value } = event.target;

    console.log(`✏️ INPUT CHANGED: ${name} =`, value);

    setForm((previousForm) => ({
      ...previousForm,
      [name]: value,
    }));
  }

  /*
  ============================================================
  CALENDAR DAYS
  ============================================================
  */

  function getDaysInMonth(
    year: number,
    month: number
  ) {
    const firstDay = new Date(
      year,
      month,
      1
    ).getDay();

    const daysInMonth = new Date(
      year,
      month + 1,
      0
    ).getDate();

    const days: (number | null)[] = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    for (
      let day = 1;
      day <= daysInMonth;
      day++
    ) {
      days.push(day);
    }

    return days;
  }

  const calendarDays = useMemo(
    () =>
      getDaysInMonth(
        currentYear,
        currentMonth
      ),
    [currentYear, currentMonth]
  );

  /*
  ============================================================
  MONTH NAVIGATION
  ============================================================
  */

  function goToPreviousMonth() {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(
        (previous) => previous - 1
      );
    } else {
      setCurrentMonth(
        (previous) => previous - 1
      );
    }
  }

  function goToNextMonth() {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(
        (previous) => previous + 1
      );
    } else {
      setCurrentMonth(
        (previous) => previous + 1
      );
    }
  }

  function goToToday() {
    const now = new Date();

    setCurrentMonth(now.getMonth());

    setCurrentYear(now.getFullYear());

    setSelectedDate(formatDate(now));
  }

  /*
  ============================================================
  CREATE MODAL
  ============================================================
  */

  function openCreateModal(date?: string) {
    const dateToUse = date ?? selectedDate;

    console.log(
      "➕ OPENING CREATE MODAL FOR:",
      dateToUse
    );

    setEditingClass(null);

    setForm(getInitialForm(dateToUse));

    setShowModal(true);
  }

  /*
  ============================================================
  EDIT MODAL
  ============================================================
  */

  function openEditModal(
    scheduledClass: ScheduledClass
  ) {
    console.log(
      "✏️ OPENING EDIT MODAL:",
      scheduledClass
    );

    setEditingClass(scheduledClass);

    setForm({
      course_id:
        scheduledClass.course_id ?? "",

      instructor:
        scheduledClass.instructor ?? "",

      description:
        scheduledClass.description ?? "",

      class_date:
        scheduledClass.class_date,

      start_time:
        scheduledClass.start_time.slice(
          0,
          5
        ),

      end_time:
        scheduledClass.end_time.slice(
          0,
          5
        ),

      meeting_link:
        scheduledClass.meeting_link ?? "",

      location:
        scheduledClass.location ?? "",
    });

    setSelectedClass(null);

    setShowModal(true);
  }

  /*
  ============================================================
  DATE CLICK
  ============================================================
  */

  function handleDateClick(date: string) {
    setSelectedDate(date);
  }

  /*
  ============================================================
  SAVE CLASS
  ============================================================
  */

  async function saveClass(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    console.log("=================================");
    console.log("🔥 SAVE CLASS STARTED");
    console.log("=================================");

    console.log("📝 FORM DATA:", form);

    if (!form.course_id) {
      console.error("❌ NO COURSE SELECTED");

      toast.error("Please select a course.");

      return;
    }

    if (form.end_time <= form.start_time) {
      console.error("❌ INVALID TIME");

      toast.error(
        "End time must be after start time."
      );

      return;
    }

    console.log("✅ FORM VALIDATION PASSED");

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    console.log("👤 CURRENT USER:", user);

    if (userError) {
      console.error(
        "❌ AUTH ERROR:",
        userError
      );
    }

    if (userError || !user) {
      toast.error("Please log in first.");

      return;
    }

    const selectedCourse = courses.find(
      (course) =>
        course.id === form.course_id
    );

    if (!selectedCourse) {
      console.error(
        "❌ SELECTED COURSE NOT FOUND:",
        form.course_id
      );

      toast.error(
        "Selected course could not be found."
      );

      return;
    }

    console.log(
      "📚 SELECTED COURSE:",
      selectedCourse
    );

    const classData = {
      title: selectedCourse.title,

      course_id:
        form.course_id,

      instructor:
        form.instructor.trim() || null,

      description:
        form.description.trim() || null,

      class_date:
        form.class_date,

      start_time:
        form.start_time,

      end_time:
        form.end_time,

      meeting_link:
        form.meeting_link.trim() || null,

      location:
        form.location.trim() || null,

      created_by:
        user.id,
    };

    console.log(
      "📦 CLASS DATA BEING SENT TO SUPABASE:",
      classData
    );

    /*
    ============================================================
    UPDATE EXISTING CLASS
    ============================================================
    */

    if (editingClass) {
      console.log(
        "✏️ UPDATING EXISTING CLASS:",
        editingClass.id
      );

      const {
        data,
        error,
      } = await supabase
        .from("scheduled_classes")
        .update(classData)
        .eq(
          "id",
          editingClass.id
        )
        .select()
        .single();

      if (error) {
        console.error(
          "❌ UPDATE ERROR:",
          error
        );

        toast.error(
          error.message
        );

        return;
      }

      console.log(
        "✅ CLASS UPDATED:",
        data
      );

      toast.success(
        "Class updated successfully!"
      );
    }

    /*
    ============================================================
    CREATE NEW CLASS
    ============================================================
    */

    else {
      console.log(
        "➕ INSERTING NEW CLASS..."
      );

      const {
        data,
        error,
      } = await supabase
        .from("scheduled_classes")
        .insert(classData)
        .select()
        .single();

      if (error) {
        console.error(
          "❌ INSERT ERROR:",
          error
        );

        toast.error(
          error.message
        );

        return;
      }

      console.log(
        "✅ CLASS CREATED IN SUPABASE:",
        data
      );

      toast.success(
        "Class scheduled successfully!"
      );
    }

    setShowModal(false);

    setEditingClass(null);

    await loadClasses();

    console.log(
      "🎉 SAVE CLASS COMPLETED"
    );

    console.log(
      "================================="
    );
  }

  /*
  ============================================================
  DELETE CLASS
  ============================================================
  */

  async function deleteClass(
    id: string
  ) {
    const confirmed =
      window.confirm(
        "Are you sure you want to delete this class?"
      );

    if (!confirmed) {
      return;
    }

    const { error } =
      await supabase
        .from("scheduled_classes")
        .delete()
        .eq("id", id);

    if (error) {
      console.error(
        "❌ DELETE ERROR:",
        error
      );

      toast.error(
        error.message
      );

      return;
    }

    toast.success(
      "Class deleted."
    );

    setSelectedClass(null);

    await loadClasses();
  }

  /*
  ============================================================
  HELPER FUNCTIONS
  ============================================================
  */

  function getCourseName(
    courseId: string | null
  ) {
    if (!courseId) {
      return null;
    }

    return (
      courses.find(
        (course) =>
          course.id === courseId
      )?.title ?? null
    );
  }

  function formatTime(
    time: string
  ) {
    const [
      hourString,
      minute,
    ] = time.split(":");

    let hour =
      Number(hourString);

    const suffix =
      hour >= 12
        ? "PM"
        : "AM";

    hour =
      hour % 12 || 12;

    return `${hour}:${minute} ${suffix}`;
  }

  /*
  ============================================================
  FILTERED CLASSES
  ============================================================
  */

  const selectedDateClasses =
    classes.filter(
      (item) =>
        item.class_date ===
        selectedDate
    );

  const todayClasses =
    classes.filter(
      (item) =>
        item.class_date ===
        formatDate(today)
    );

  const upcomingClasses =
    classes
      .filter(
        (item) =>
          item.class_date >=
          formatDate(today)
      )
      .slice(0, 5);

  /*
  ============================================================
  PAGE
  ============================================================
  */

  return (
    <main
      className="
        lms-background
        relative min-h-screen
        overflow-hidden
        pb-10
      "
    >

      {/* ====================================================== */}
      {/* BACKGROUND GLOWS */}
      {/* ====================================================== */}

      <div
        className="
          pointer-events-none absolute
          -left-32 top-20
          h-80 w-80
          rounded-full
          bg-blue-500/10
          blur-3xl
        "
      />

      <div
        className="
          pointer-events-none absolute
          -right-32 top-10
          h-96 w-96
          rounded-full
          bg-purple-500/10
          blur-3xl
        "
      />

      <div
        className="
          pointer-events-none absolute
          bottom-0 left-1/2
          h-80 w-80
          -translate-x-1/2
          rounded-full
          bg-cyan-500/10
          blur-3xl
        "
      />

      {/* ====================================================== */}
      {/* CONTENT */}
      {/* ====================================================== */}

      <div className="relative z-10 space-y-8">

        {/* ==================================================== */}
        {/* HEADER */}
        {/* ==================================================== */}

        <div
          className="
            group relative overflow-hidden
            rounded-3xl
            border border-white/10
            bg-gradient-to-br
            from-slate-950
            via-slate-900
            to-blue-950/40
            p-6 sm:p-8
            shadow-2xl
            backdrop-blur-xl
            animate-fade-up
          "
        >

          {/* Header glow */}

          <div
            className="
              pointer-events-none absolute
              -right-20 -top-20
              h-64 w-64
              rounded-full
              bg-cyan-500/10
              blur-3xl
              transition-all duration-700
              group-hover:scale-125
            "
          />

          {/* Shine */}

          <span
            className="
              pointer-events-none absolute inset-0
              -translate-x-full
              bg-gradient-to-r
              from-transparent
              via-white/5
              to-transparent
              transition-transform duration-1000
              group-hover:translate-x-full
            "
          />

          <div
            className="
              relative z-10
              flex flex-col gap-5
              md:flex-row
              md:items-center
              md:justify-between
            "
          >

            <div className="flex items-center gap-4">

              {/* Icon */}

              <div
                className="
                  flex h-16 w-16 shrink-0
                  items-center justify-center
                  rounded-2xl
                  border border-cyan-400/20
                  bg-gradient-to-br
                  from-blue-500/20
                  via-cyan-500/10
                  to-purple-500/20
                  text-cyan-300
                  shadow-[0_0_30px_rgba(34,211,238,0.12)]
                  transition-all duration-500
                  group-hover:scale-110
                  group-hover:rotate-3
                "
              >
                <CalendarDays size={32} />
              </div>

              <div>

                <div className="mb-2 flex items-center gap-2">

                  <Sparkles
                    size={14}
                    className="text-cyan-300"
                  />

                  <span
                    className="
                      text-xs font-bold
                      uppercase tracking-[0.25em]
                      text-cyan-300
                    "
                  >
                    Learning Schedule
                  </span>

                </div>

                <h1
                  className="
                    text-3xl font-extrabold
                    tracking-tight
                    text-white
                    sm:text-4xl
                  "
                >
                  Calendar
                </h1>

                <p className="mt-2 text-sm text-slate-400 sm:text-base">
                  Schedule and manage your classes.
                </p>

              </div>

            </div>

            {/* Schedule button */}

            <button
              type="button"
              onClick={() =>
                openCreateModal()
              }
              className="
                group/button relative
                flex items-center
                justify-center gap-2
                overflow-hidden
                rounded-2xl
                border border-cyan-400/20
                bg-gradient-to-r
                from-blue-600
                via-cyan-500
                to-purple-600
                px-5 py-3.5
                font-semibold
                text-white
                shadow-[0_0_25px_rgba(59,130,246,0.18)]
                transition-all duration-300
                hover:scale-[1.02]
                hover:shadow-[0_0_35px_rgba(34,211,238,0.25)]
                active:scale-[0.98]
              "
            >

              <span
                className="
                  pointer-events-none absolute inset-0
                  -translate-x-full
                  bg-gradient-to-r
                  from-transparent
                  via-white/20
                  to-transparent
                  transition-transform duration-700
                  group-hover/button:translate-x-full
                "
              />

              <Plus
                size={20}
                className="
                  relative z-10
                  transition-transform duration-300
                  group-hover/button:rotate-90
                "
              />

              <span className="relative z-10">
                Schedule Class
              </span>

            </button>

          </div>

        </div>

        {/* ==================================================== */}
        {/* SUMMARY CARDS */}
        {/* ==================================================== */}

        <div className="grid gap-4 sm:grid-cols-3">

          {/* Today */}

          <div
            className="
              group relative overflow-hidden
              rounded-2xl
              border border-white/10
              bg-slate-950/80
              p-5
              shadow-[0_15px_50px_rgba(0,0,0,0.25)]
              backdrop-blur-xl
              transition-all duration-500
              hover:-translate-y-1
              hover:border-cyan-400/20
              hover:shadow-[0_20px_60px_rgba(34,211,238,0.1)]
              animate-fade-up
            "
          >

            <div
              className="
                pointer-events-none absolute
                -right-8 -top-8
                h-24 w-24
                rounded-full
                bg-cyan-400/10
                blur-2xl
              "
            />

            <div className="relative z-10 flex items-center justify-between">

              <div>

                <p className="text-sm text-slate-500">
                  Today&apos;s Classes
                </p>

                <p className="mt-2 text-3xl font-bold text-white">
                  {todayClasses.length}
                </p>

              </div>

              <div
                className="
                  flex h-11 w-11
                  items-center justify-center
                  rounded-xl
                  border border-cyan-400/20
                  bg-cyan-400/10
                  text-cyan-300
                  transition-transform duration-300
                  group-hover:scale-110
                "
              >
                <CalendarDays size={21} />
              </div>

            </div>

          </div>

          {/* Upcoming */}

          <div
            className="
              group relative overflow-hidden
              rounded-2xl
              border border-white/10
              bg-slate-950/80
              p-5
              shadow-[0_15px_50px_rgba(0,0,0,0.25)]
              backdrop-blur-xl
              transition-all duration-500
              hover:-translate-y-1
              hover:border-blue-400/20
              hover:shadow-[0_20px_60px_rgba(59,130,246,0.1)]
              animate-fade-up
            "
            style={{ animationDelay: "100ms" }}
          >

            <div
              className="
                pointer-events-none absolute
                -right-8 -top-8
                h-24 w-24
                rounded-full
                bg-blue-400/10
                blur-2xl
              "
            />

            <div className="relative z-10 flex items-center justify-between">

              <div>

                <p className="text-sm text-slate-500">
                  Upcoming Classes
                </p>

                <p className="mt-2 text-3xl font-bold text-white">
                  {
                    classes.filter(
                      (item) =>
                        item.class_date >=
                        formatDate(today)
                    ).length
                  }
                </p>

              </div>

              <div
                className="
                  flex h-11 w-11
                  items-center justify-center
                  rounded-xl
                  border border-blue-400/20
                  bg-blue-400/10
                  text-blue-300
                  transition-transform duration-300
                  group-hover:scale-110
                "
              >
                <Clock size={21} />
              </div>

            </div>

          </div>

          {/* Total */}

          <div
            className="
              group relative overflow-hidden
              rounded-2xl
              border border-white/10
              bg-slate-950/80
              p-5
              shadow-[0_15px_50px_rgba(0,0,0,0.25)]
              backdrop-blur-xl
              transition-all duration-500
              hover:-translate-y-1
              hover:border-purple-400/20
              hover:shadow-[0_20px_60px_rgba(168,85,247,0.1)]
              animate-fade-up
            "
            style={{ animationDelay: "200ms" }}
          >

            <div
              className="
                pointer-events-none absolute
                -right-8 -top-8
                h-24 w-24
                rounded-full
                bg-purple-400/10
                blur-2xl
              "
            />

            <div className="relative z-10 flex items-center justify-between">

              <div>

                <p className="text-sm text-slate-500">
                  Total Scheduled
                </p>

                <p className="mt-2 text-3xl font-bold text-white">
                  {classes.length}
                </p>

              </div>

              <div
                className="
                  flex h-11 w-11
                  items-center justify-center
                  rounded-xl
                  border border-purple-400/20
                  bg-purple-400/10
                  text-purple-300
                  transition-transform duration-300
                  group-hover:scale-110
                "
              >
                <GraduationCap size={21} />
              </div>

            </div>

          </div>

        </div>

        {/* ==================================================== */}
        {/* MAIN CONTENT */}
        {/* ==================================================== */}

        <div className="grid gap-6 xl:grid-cols-[1fr_360px]">

          {/* ================================================== */}
          {/* CALENDAR */}
          {/* ================================================== */}

          <div
            className="
              relative overflow-hidden
              rounded-3xl
              border border-white/10
              bg-slate-950/85
              p-4 sm:p-6
              shadow-2xl
              backdrop-blur-xl
              animate-fade-up
            "
            style={{ animationDelay: "300ms" }}
          >

            {/* Calendar glow */}

            <div
              className="
                pointer-events-none absolute
                -right-24 -top-24
                h-72 w-72
                rounded-full
                bg-blue-500/5
                blur-3xl
              "
            />

            <div className="relative z-10">

              {/* ================================================== */}
              {/* CALENDAR HEADER */}
              {/* ================================================== */}

              <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div>

                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
                    Schedule
                  </p>

                  <h2 className="mt-1 text-xl font-bold text-white">
                    {MONTHS[currentMonth]}{" "}
                    {currentYear}
                  </h2>

                </div>

                <div className="flex items-center gap-2">

                  <button
                    type="button"
                    onClick={goToToday}
                    className="
                      rounded-xl
                      border border-white/10
                      bg-slate-900/80
                      px-3 py-2
                      text-sm font-semibold
                      text-slate-300
                      transition-all duration-300
                      hover:border-cyan-400/30
                      hover:bg-cyan-400/5
                      hover:text-cyan-300
                    "
                  >
                    Today
                  </button>

                  <button
                    type="button"
                    onClick={
                      goToPreviousMonth
                    }
                    className="
                      flex h-10 w-10
                      items-center justify-center
                      rounded-xl
                      border border-white/10
                      bg-slate-900/80
                      text-slate-400
                      transition-all duration-300
                      hover:border-cyan-400/30
                      hover:bg-cyan-400/5
                      hover:text-cyan-300
                      hover:-translate-x-0.5
                    "
                  >
                    <ChevronLeft size={18} />
                  </button>

                  <button
                    type="button"
                    onClick={
                      goToNextMonth
                    }
                    className="
                      flex h-10 w-10
                      items-center justify-center
                      rounded-xl
                      border border-white/10
                      bg-slate-900/80
                      text-slate-400
                      transition-all duration-300
                      hover:border-cyan-400/30
                      hover:bg-cyan-400/5
                      hover:text-cyan-300
                      hover:translate-x-0.5
                    "
                  >
                    <ChevronRight size={18} />
                  </button>

                </div>

              </div>

              {/* ================================================== */}
              {/* WEEKDAYS */}
              {/* ================================================== */}

              <div className="grid grid-cols-7 overflow-hidden rounded-t-2xl border border-white/10 bg-slate-900/70">

                {WEEKDAYS.map(
                  (day) => (
                    <div
                      key={day}
                      className="
                        border-r border-white/5
                        px-1 py-3
                        text-center
                        text-[10px]
                        font-bold
                        uppercase
                        tracking-wider
                        text-slate-500
                        last:border-r-0
                        sm:text-xs
                      "
                    >
                      {day}
                    </div>
                  )
                )}

              </div>

              {/* ================================================== */}
              {/* DAYS */}
              {/* ================================================== */}

              <div className="grid grid-cols-7 overflow-hidden rounded-b-2xl border-x border-b border-white/10">

                {calendarDays.map(
                  (day, index) => {

                    if (!day) {
                      return (
                        <div
                          key={`empty-${index}`}
                          className="
                            min-h-24
                            border-b border-r
                            border-white/5
                            bg-slate-950/40
                            sm:min-h-28
                          "
                        />
                      );
                    }

                    const date =
                      new Date(
                        currentYear,
                        currentMonth,
                        day
                      );

                    const dateString =
                      formatDate(date);

                    const dayClasses =
                      classes.filter(
                        (item) =>
                          item.class_date ===
                          dateString
                      );

                    const isToday =
                      dateString ===
                      formatDate(today);

                    const isSelected =
                      dateString ===
                      selectedDate;

                    return (
                      <button
                        type="button"
                        key={dateString}
                        onClick={() =>
                          handleDateClick(
                            dateString
                          )
                        }
                        className={`
                          group/day
                          relative
                          min-h-24
                          border-b border-r
                          border-white/5
                          p-1.5
                          text-left
                          transition-all duration-300
                          sm:min-h-28
                          sm:p-2

                          ${
                            isSelected
                              ? "bg-cyan-400/5 shadow-[inset_0_0_25px_rgba(34,211,238,0.05)]"
                              : "bg-slate-950/30 hover:bg-slate-900/70"
                          }

                          hover:border-cyan-400/10
                        `}
                      >

                        {/* Selected indicator */}

                        {isSelected && (
                          <span
                            className="
                              absolute
                              left-0 top-0
                              h-full w-[2px]
                              bg-gradient-to-b
                              from-blue-500
                              via-cyan-400
                              to-purple-500
                            "
                          />
                        )}

                        {/* Date number */}

                        <div
                          className={`
                            mb-2 flex
                            h-7 w-7
                            items-center justify-center
                            rounded-full
                            text-xs font-bold
                            transition-all duration-300
                            sm:h-8 sm:w-8
                            sm:text-sm

                            ${
                              isToday
                                ? "bg-gradient-to-br from-blue-600 via-cyan-500 to-purple-600 text-white shadow-[0_0_18px_rgba(34,211,238,0.25)]"
                                : isSelected
                                ? "bg-cyan-400/10 text-cyan-300 ring-1 ring-cyan-400/20"
                                : "text-slate-400 group-hover/day:bg-white/5 group-hover/day:text-white"
                            }
                          `}
                        >
                          {day}
                        </div>

                        {/* Classes */}

                        <div className="space-y-1">

                          {dayClasses
                            .slice(0, 2)
                            .map(
                              (
                                classItem
                              ) => (
                                <div
                                  key={
                                    classItem.id
                                  }
                                  onClick={(
                                    event
                                  ) => {
                                    event.stopPropagation();

                                    setSelectedClass(
                                      classItem
                                    );
                                  }}
                                  className="
                                    group/class
                                    cursor-pointer
                                    truncate
                                    rounded-lg
                                    border
                                    border-blue-400/10
                                    bg-gradient-to-r
                                    from-blue-500/10
                                    via-cyan-500/5
                                    to-purple-500/10
                                    px-1.5 py-1
                                    text-[9px]
                                    font-semibold
                                    text-cyan-300
                                    transition-all duration-300
                                    hover:scale-[1.02]
                                    hover:border-cyan-400/30
                                    hover:bg-cyan-400/10
                                    hover:shadow-[0_0_15px_rgba(34,211,238,0.1)]
                                    sm:px-2
                                    sm:text-[10px]
                                  "
                                >
                                  {classItem.title}
                                </div>
                              )
                            )}

                          {dayClasses.length >
                            2 && (
                            <p
                              className="
                                px-1
                                text-[9px]
                                font-semibold
                                text-slate-500
                                sm:text-[10px]
                              "
                            >
                              +
                              {dayClasses.length -
                                2}{" "}
                              more
                            </p>
                          )}

                        </div>

                        {/* Add button */}

                        <span
                          onClick={(
                            event
                          ) => {
                            event.stopPropagation();

                            openCreateModal(
                              dateString
                            );
                          }}
                          className="
                            absolute
                            bottom-2 right-2
                            hidden
                            h-6 w-6
                            items-center justify-center
                            rounded-full
                            border border-cyan-400/20
                            bg-cyan-400/10
                            text-cyan-300
                            shadow-[0_0_15px_rgba(34,211,238,0.1)]
                            transition-all duration-300
                            hover:scale-110
                            hover:bg-cyan-400/20
                            group-hover/day:flex
                          "
                        >
                          <Plus size={13} />
                        </span>

                      </button>
                    );
                  }
                )}

              </div>

            </div>

          </div>

          {/* ================================================== */}
          {/* RIGHT SIDE */}
          {/* ================================================== */}

          <div className="space-y-6">

            {/* ================================================= */}
            {/* SELECTED DATE */}
            {/* ================================================= */}

            <div
              className="
                group relative overflow-hidden
                rounded-3xl
                border border-white/10
                bg-slate-950/85
                p-6
                shadow-2xl
                backdrop-blur-xl
                animate-fade-up
              "
              style={{ animationDelay: "400ms" }}
            >

              <div
                className="
                  pointer-events-none absolute
                  -right-16 -top-16
                  h-40 w-40
                  rounded-full
                  bg-cyan-500/10
                  blur-3xl
                "
              />

              <div className="relative z-10">

                <div className="mb-5 flex items-start justify-between gap-3">

                  <div>

                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
                      Selected Date
                    </p>

                    <h2 className="mt-2 text-lg font-bold leading-7 text-white">
                      {new Date(
                        `${selectedDate}T00:00:00`
                      ).toLocaleDateString(
                        "en-US",
                        {
                          weekday: "long",
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        }
                      )}
                    </h2>

                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      openCreateModal(
                        selectedDate
                      )
                    }
                    className="
                      flex h-10 w-10
                      shrink-0
                      items-center justify-center
                      rounded-xl
                      bg-gradient-to-br
                      from-blue-600
                      to-cyan-500
                      text-white
                      shadow-[0_0_20px_rgba(34,211,238,0.15)]
                      transition-all duration-300
                      hover:scale-110
                      hover:rotate-90
                    "
                  >
                    <Plus size={19} />
                  </button>

                </div>

                {selectedDateClasses.length ===
                0 ? (
                  <div
                    className="
                      rounded-2xl
                      border border-dashed
                      border-white/10
                      bg-slate-900/50
                      p-6
                      text-center
                    "
                  >

                    <CalendarDays
                      className="
                        mx-auto mb-3
                        text-slate-600
                      "
                      size={32}
                    />

                    <p className="text-sm text-slate-400">
                      No classes scheduled
                      for this date.
                    </p>

                    <button
                      type="button"
                      onClick={() =>
                        openCreateModal(
                          selectedDate
                        )
                      }
                      className="
                        mt-4
                        text-sm font-semibold
                        text-cyan-400
                        transition-colors
                        hover:text-cyan-300
                      "
                    >
                      Schedule a class →
                    </button>

                  </div>
                ) : (
                  <div className="space-y-3">

                    {selectedDateClasses.map(
                      (item, index) => (
                        <button
                          type="button"
                          key={item.id}
                          onClick={() =>
                            setSelectedClass(
                              item
                            )
                          }
                          className="
                            group/class
                            w-full
                            rounded-2xl
                            border border-white/10
                            bg-slate-900/60
                            p-4
                            text-left
                            transition-all duration-300
                            hover:-translate-y-1
                            hover:border-cyan-400/20
                            hover:bg-cyan-400/5
                            hover:shadow-[0_0_25px_rgba(34,211,238,0.08)]
                            animate-fade-up
                          "
                          style={{
                            animationDelay: `${
                              index * 80
                            }ms`,
                          }}
                        >

                          <div className="flex items-start justify-between gap-3">

                            <h3
                              className="
                                font-semibold
                                text-white
                                transition-colors
                                group-hover/class:text-cyan-200
                              "
                            >
                              {item.title}
                            </h3>

                            <ChevronRight
                              size={17}
                              className="
                                shrink-0
                                text-slate-600
                                transition-all duration-300
                                group-hover/class:translate-x-1
                                group-hover/class:text-cyan-400
                              "
                            />

                          </div>

                          <div
                            className="
                              mt-2
                              flex items-center gap-2
                              text-sm text-slate-500
                            "
                          >
                            <Clock
                              size={15}
                              className="text-cyan-400"
                            />

                            {formatTime(
                              item.start_time
                            )}

                            {" - "}

                            {formatTime(
                              item.end_time
                            )}
                          </div>

                        </button>
                      )
                    )}

                  </div>
                )}

              </div>

            </div>

            {/* ================================================= */}
            {/* UPCOMING CLASSES */}
            {/* ================================================= */}

            <div
              className="
                relative overflow-hidden
                rounded-3xl
                border border-white/10
                bg-slate-950/85
                p-6
                shadow-2xl
                backdrop-blur-xl
                animate-fade-up
              "
              style={{ animationDelay: "500ms" }}
            >

              <div
                className="
                  pointer-events-none absolute
                  -left-16 -bottom-16
                  h-40 w-40
                  rounded-full
                  bg-purple-500/10
                  blur-3xl
                "
              />

              <div className="relative z-10">

                <div className="mb-5 flex items-center gap-3">

                  <div
                    className="
                      flex h-10 w-10
                      items-center justify-center
                      rounded-xl
                      border border-purple-400/20
                      bg-purple-400/10
                      text-purple-300
                    "
                  >
                    <Clock size={19} />
                  </div>

                  <div>

                    <h2 className="text-lg font-bold text-white">
                      Upcoming Classes
                    </h2>

                    <p className="text-xs text-slate-500">
                      Your next scheduled sessions
                    </p>

                  </div>

                </div>

                {loading ? (
                  <div className="flex items-center gap-2 text-sm text-slate-500">

                    <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-400" />

                    Loading...

                  </div>
                ) : upcomingClasses.length ===
                  0 ? (
                  <p className="text-sm text-slate-500">
                    No upcoming classes.
                  </p>
                ) : (
                  <div className="space-y-4">

                    {upcomingClasses.map(
                      (item, index) => (
                        <button
                          type="button"
                          key={item.id}
                          onClick={() =>
                            setSelectedClass(
                              item
                            )
                          }
                          className="
                            group/upcoming
                            w-full
                            border-b
                            border-white/5
                            pb-4
                            text-left
                            last:border-0
                            last:pb-0
                            transition-all duration-300
                            hover:translate-x-1
                            animate-fade-up
                          "
                          style={{
                            animationDelay: `${
                              index * 80
                            }ms`,
                          }}
                        >

                          <div className="flex items-center justify-between">

                            <p className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                              {new Date(
                                `${item.class_date}T00:00:00`
                              ).toLocaleDateString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                }
                              )}
                            </p>

                            <ChevronRight
                              size={15}
                              className="
                                text-slate-700
                                transition-all duration-300
                                group-hover/upcoming:translate-x-1
                                group-hover/upcoming:text-cyan-400
                              "
                            />

                          </div>

                          <h3
                            className="
                              mt-1
                              font-semibold
                              text-slate-200
                              transition-colors
                              group-hover/upcoming:text-white
                            "
                          >
                            {item.title}
                          </h3>

                          <p className="mt-1 text-sm text-slate-500">
                            {formatTime(
                              item.start_time
                            )}
                          </p>

                        </button>
                      )
                    )}

                  </div>
                )}

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* ======================================================== */}
      {/* CLASS DETAILS MODAL */}
      {/* ======================================================== */}

      {selectedClass && (
        <div
          className="
            fixed inset-0 z-50
            flex items-center justify-center
            overflow-y-auto
            bg-black/70
            p-4
            backdrop-blur-md
          "
          onClick={() =>
            setSelectedClass(null)
          }
        >

          <div
            className="
              group relative
              w-full max-w-lg
              overflow-hidden
              rounded-3xl
              border border-white/10
              bg-slate-950
              shadow-[0_30px_100px_rgba(0,0,0,0.6)]
              animate-fade-up
            "
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            {/* Modal glow */}

            <div
              className="
                pointer-events-none absolute
                -right-20 -top-20
                h-64 w-64
                rounded-full
                bg-cyan-500/10
                blur-3xl
              "
            />

            <div
              className="
                pointer-events-none absolute
                -left-20 -bottom-20
                h-56 w-56
                rounded-full
                bg-purple-500/10
                blur-3xl
              "
            />

            {/* Header */}

            <div
              className="
                relative z-10
                border-b border-white/10
                p-6
              "
            >

              <div className="flex items-start justify-between gap-4">

                <div>

                  <div className="mb-2 flex items-center gap-2">

                    <Sparkles
                      size={14}
                      className="text-cyan-400"
                    />

                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-400">
                      Scheduled Class
                    </p>

                  </div>

                  <h2 className="text-2xl font-bold text-white">
                    {selectedClass.title}
                  </h2>

                </div>

                <button
                  type="button"
                  onClick={() =>
                    setSelectedClass(
                      null
                    )
                  }
                  className="
                    flex h-9 w-9
                    items-center justify-center
                    rounded-xl
                    border border-white/10
                    bg-white/5
                    text-slate-400
                    transition-all duration-300
                    hover:rotate-90
                    hover:border-red-400/20
                    hover:bg-red-400/10
                    hover:text-red-300
                  "
                >
                  <X size={19} />
                </button>

              </div>

            </div>

            {/* Details */}

            <div className="relative z-10 space-y-3 p-6">

              {/* Date */}

              <div
                className="
                  flex gap-3
                  rounded-2xl
                  border border-white/5
                  bg-slate-900/60
                  p-4
                  transition-all duration-300
                  hover:border-cyan-400/10
                  hover:bg-cyan-400/5
                "
              >

                <div
                  className="
                    flex h-10 w-10
                    shrink-0
                    items-center justify-center
                    rounded-xl
                    bg-cyan-400/10
                    text-cyan-300
                  "
                >
                  <CalendarDays size={19} />
                </div>

                <div>

                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Date
                  </p>

                  <p className="mt-1 text-sm font-medium text-white">
                    {new Date(
                      `${selectedClass.class_date}T00:00:00`
                    ).toLocaleDateString(
                      "en-US",
                      {
                        weekday: "long",
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      }
                    )}
                  </p>

                </div>

              </div>

              {/* Time */}

              <div
                className="
                  flex gap-3
                  rounded-2xl
                  border border-white/5
                  bg-slate-900/60
                  p-4
                  transition-all duration-300
                  hover:border-blue-400/10
                  hover:bg-blue-400/5
                "
              >

                <div
                  className="
                    flex h-10 w-10
                    shrink-0
                    items-center justify-center
                    rounded-xl
                    bg-blue-400/10
                    text-blue-300
                  "
                >
                  <Clock size={19} />
                </div>

                <div>

                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Time
                  </p>

                  <p className="mt-1 text-sm font-medium text-white">

                    {formatTime(
                      selectedClass.start_time
                    )}

                    {" - "}

                    {formatTime(
                      selectedClass.end_time
                    )}

                  </p>

                </div>

              </div>

              {/* Instructor */}

              {selectedClass.instructor && (
                <div
                  className="
                    flex gap-3
                    rounded-2xl
                    border border-white/5
                    bg-slate-900/60
                    p-4
                  "
                >

                  <div
                    className="
                      flex h-10 w-10
                      shrink-0
                      items-center justify-center
                      rounded-xl
                      bg-purple-400/10
                      text-purple-300
                    "
                  >
                    <UserRound size={19} />
                  </div>

                  <div>

                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Instructor
                    </p>

                    <p className="mt-1 text-sm font-medium text-white">
                      {selectedClass.instructor}
                    </p>

                  </div>

                </div>
              )}

              {/* Course */}

              {getCourseName(
                selectedClass.course_id
              ) && (
                <div
                  className="
                    flex gap-3
                    rounded-2xl
                    border border-white/5
                    bg-slate-900/60
                    p-4
                  "
                >

                  <div
                    className="
                      flex h-10 w-10
                      shrink-0
                      items-center justify-center
                      rounded-xl
                      bg-blue-400/10
                      text-blue-300
                    "
                  >
                    <GraduationCap size={19} />
                  </div>

                  <div>

                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Course
                    </p>

                    <p className="mt-1 text-sm font-medium text-white">
                      {getCourseName(
                        selectedClass.course_id
                      )}
                    </p>

                  </div>

                </div>
              )}

              {/* Location */}

              {selectedClass.location && (
                <div
                  className="
                    flex gap-3
                    rounded-2xl
                    border border-white/5
                    bg-slate-900/60
                    p-4
                  "
                >

                  <div
                    className="
                      flex h-10 w-10
                      shrink-0
                      items-center justify-center
                      rounded-xl
                      bg-orange-400/10
                      text-orange-300
                    "
                  >
                    <MapPin size={19} />
                  </div>

                  <div>

                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Location
                    </p>

                    <p className="mt-1 text-sm font-medium text-white">
                      {selectedClass.location}
                    </p>

                  </div>

                </div>
              )}

              {/* Meeting */}

              {selectedClass.meeting_link && (
                <div
                  className="
                    flex gap-3
                    rounded-2xl
                    border border-cyan-400/10
                    bg-cyan-400/5
                    p-4
                  "
                >

                  <div
                    className="
                      flex h-10 w-10
                      shrink-0
                      items-center justify-center
                      rounded-xl
                      bg-cyan-400/10
                      text-cyan-300
                    "
                  >
                    <Video size={19} />
                  </div>

                  <div>

                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Online Class
                    </p>

                    <a
                      href={
                        selectedClass.meeting_link
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        mt-1
                        inline-flex
                        items-center gap-2
                        text-sm font-semibold
                        text-cyan-400
                        transition-colors
                        hover:text-cyan-300
                      "
                    >
                      <LinkIcon size={14} />
                      Join class
                    </a>

                  </div>

                </div>
              )}

              {/* Description */}

              {selectedClass.description && (
                <div
                  className="
                    rounded-2xl
                    border border-white/5
                    bg-slate-900/60
                    p-4
                  "
                >

                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Description
                  </p>

                  <p className="text-sm leading-6 text-slate-400">
                    {selectedClass.description}
                  </p>

                </div>
              )}

            </div>

            {/* Actions */}

            <div
              className="
                relative z-10
                flex gap-3
                border-t border-white/10
                p-6
              "
            >

              <button
                type="button"
                onClick={() =>
                  openEditModal(
                    selectedClass
                  )
                }
                className="
                  group/edit
                  flex flex-1
                  items-center
                  justify-center
                  gap-2
                  rounded-2xl
                  border border-white/10
                  bg-white/5
                  px-4 py-3
                  font-semibold
                  text-slate-300
                  transition-all duration-300
                  hover:border-cyan-400/20
                  hover:bg-cyan-400/5
                  hover:text-cyan-300
                "
              >
                <Pencil
                  size={18}
                  className="transition-transform group-hover/edit:-rotate-6"
                />
                Edit
              </button>

              <button
                type="button"
                onClick={() =>
                  deleteClass(
                    selectedClass.id
                  )
                }
                className="
                  group/delete
                  flex flex-1
                  items-center
                  justify-center
                  gap-2
                  rounded-2xl
                  border border-red-400/20
                  bg-red-500/10
                  px-4 py-3
                  font-semibold
                  text-red-300
                  transition-all duration-300
                  hover:border-red-400/40
                  hover:bg-red-500/15
                  hover:shadow-[0_0_25px_rgba(239,68,68,0.12)]
                "
              >
                <Trash2
                  size={18}
                  className="transition-transform group-hover/delete:scale-110"
                />
                Delete
              </button>

            </div>

          </div>

        </div>
      )}

      {/* ======================================================== */}
      {/* CREATE / EDIT MODAL */}
      {/* ======================================================== */}

      {showModal && (
        <div
          className="
            fixed inset-0 z-50
            overflow-y-auto
            bg-black/75
            p-4
            backdrop-blur-md
          "
          onClick={() =>
            setShowModal(false)
          }
        >

          <div
            className="
              mx-auto my-6
              w-full max-w-2xl
              overflow-hidden
              rounded-3xl
              border border-white/10
              bg-slate-950
              shadow-[0_30px_100px_rgba(0,0,0,0.6)]
              animate-fade-up
            "
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            {/* Modal glow */}

            <div
              className="
                pointer-events-none absolute
                -right-20 -top-20
                h-64 w-64
                rounded-full
                bg-blue-500/10
                blur-3xl
              "
            />

            {/* Header */}

            <div
              className="
                relative
                flex items-center
                justify-between
                border-b border-white/10
                bg-gradient-to-r
                from-blue-500/5
                via-cyan-500/5
                to-purple-500/5
                p-6
              "
            >

              <div>

                <div className="mb-2 flex items-center gap-2">

                  <Sparkles
                    size={14}
                    className="text-cyan-400"
                  />

                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-400">
                    Class Management
                  </span>

                </div>

                <h2 className="text-2xl font-bold text-white">
                  {editingClass
                    ? "Edit Class"
                    : "Schedule Class"}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Add the details for this class.
                </p>

              </div>

              <button
                type="button"
                onClick={() =>
                  setShowModal(false)
                }
                className="
                  flex h-10 w-10
                  items-center justify-center
                  rounded-xl
                  border border-white/10
                  bg-white/5
                  text-slate-400
                  transition-all duration-300
                  hover:rotate-90
                  hover:border-red-400/20
                  hover:bg-red-400/10
                  hover:text-red-300
                "
              >
                <X size={20} />
              </button>

            </div>

            {/* Form */}

            <form
              onSubmit={saveClass}
              className="
                relative
                space-y-5
                p-6
              "
            >

              {/* Course */}

              <div>

                <label
                  htmlFor="course"
                  className="
                    mb-2 block
                    text-sm font-semibold
                    text-slate-300
                  "
                >
                  Course
                </label>

                <select
                  id="course"
                  name="course_id"
                  value={form.course_id}
                  onChange={
                    handleInputChange
                  }
                  className="
                    w-full
                    rounded-xl
                    border border-white/10
                    bg-slate-900
                    px-4 py-3
                    text-sm
                    text-white
                    outline-none
                    transition-all duration-300
                    focus:border-cyan-400/40
                    focus:bg-slate-900
                    focus:ring-2
                    focus:ring-cyan-400/10
                  "
                >

                  <option
                    value=""
                    className="bg-slate-900"
                  >
                    Select course
                  </option>

                  {courses.map(
                    (course) => (
                      <option
                        key={
                          course.id
                        }
                        value={
                          course.id
                        }
                        className="bg-slate-900"
                      >
                        {course.title}
                      </option>
                    )
                  )}

                </select>

              </div>

              {/* Instructor */}

              <div>

                <label
                  htmlFor="instructor"
                  className="
                    mb-2 block
                    text-sm font-semibold
                    text-slate-300
                  "
                >
                  Instructor
                </label>

                <input
                  id="instructor"
                  name="instructor"
                  type="text"
                  value={
                    form.instructor
                  }
                  onChange={
                    handleInputChange
                  }
                  placeholder="Instructor name"
                  className="
                    w-full
                    rounded-xl
                    border border-white/10
                    bg-slate-900
                    px-4 py-3
                    text-sm
                    text-white
                    placeholder:text-slate-600
                    outline-none
                    transition-all duration-300
                    focus:border-cyan-400/40
                    focus:ring-2
                    focus:ring-cyan-400/10
                  "
                />

              </div>

              {/* Date */}

              <div>

                <label
                  htmlFor="class-date"
                  className="
                    mb-2 block
                    text-sm font-semibold
                    text-slate-300
                  "
                >
                  Date
                </label>

                <input
                  id="class-date"
                  name="class_date"
                  type="date"
                  value={
                    form.class_date
                  }
                  onChange={
                    handleInputChange
                  }
                  className="
                    w-full
                    rounded-xl
                    border border-white/10
                    bg-slate-900
                    px-4 py-3
                    text-sm
                    text-white
                    outline-none
                    transition-all duration-300
                    focus:border-cyan-400/40
                    focus:ring-2
                    focus:ring-cyan-400/10
                  "
                  required
                />

              </div>

              {/* Time */}

              <div className="grid gap-4 sm:grid-cols-2">

                <div>

                  <label
                    htmlFor="start-time"
                    className="
                      mb-2 block
                      text-sm font-semibold
                      text-slate-300
                    "
                  >
                    Start Time
                  </label>

                  <input
                    id="start-time"
                    name="start_time"
                    type="time"
                    value={
                      form.start_time
                    }
                    onChange={
                      handleInputChange
                    }
                    className="
                      w-full
                      rounded-xl
                      border border-white/10
                      bg-slate-900
                      px-4 py-3
                      text-sm
                      text-white
                      outline-none
                      transition-all duration-300
                      focus:border-cyan-400/40
                      focus:ring-2
                      focus:ring-cyan-400/10
                    "
                    required
                  />

                </div>

                <div>

                  <label
                    htmlFor="end-time"
                    className="
                      mb-2 block
                      text-sm font-semibold
                      text-slate-300
                    "
                  >
                    End Time
                  </label>

                  <input
                    id="end-time"
                    name="end_time"
                    type="time"
                    value={
                      form.end_time
                    }
                    onChange={
                      handleInputChange
                    }
                    className="
                      w-full
                      rounded-xl
                      border border-white/10
                      bg-slate-900
                      px-4 py-3
                      text-sm
                      text-white
                      outline-none
                      transition-all duration-300
                      focus:border-cyan-400/40
                      focus:ring-2
                      focus:ring-cyan-400/10
                    "
                    required
                  />

                </div>

              </div>

              {/* Location */}

              <div>

                <label
                  htmlFor="location"
                  className="
                    mb-2 block
                    text-sm font-semibold
                    text-slate-300
                  "
                >
                  Location
                </label>

                <input
                  id="location"
                  name="location"
                  type="text"
                  value={
                    form.location
                  }
                  onChange={
                    handleInputChange
                  }
                  placeholder="e.g. Room 204"
                  className="
                    w-full
                    rounded-xl
                    border border-white/10
                    bg-slate-900
                    px-4 py-3
                    text-sm
                    text-white
                    placeholder:text-slate-600
                    outline-none
                    transition-all duration-300
                    focus:border-cyan-400/40
                    focus:ring-2
                    focus:ring-cyan-400/10
                  "
                />

              </div>

              {/* Meeting Link */}

              <div>

                <label
                  htmlFor="meeting-link"
                  className="
                    mb-2 block
                    text-sm font-semibold
                    text-slate-300
                  "
                >
                  Meeting Link
                </label>

                <input
                  id="meeting-link"
                  name="meeting_link"
                  type="url"
                  value={
                    form.meeting_link
                  }
                  onChange={
                    handleInputChange
                  }
                  placeholder="https://meet.google.com/..."
                  className="
                    w-full
                    rounded-xl
                    border border-white/10
                    bg-slate-900
                    px-4 py-3
                    text-sm
                    text-white
                    placeholder:text-slate-600
                    outline-none
                    transition-all duration-300
                    focus:border-cyan-400/40
                    focus:ring-2
                    focus:ring-cyan-400/10
                  "
                />

              </div>

              {/* Description */}

              <div>

                <label
                  htmlFor="description"
                  className="
                    mb-2 block
                    text-sm font-semibold
                    text-slate-300
                  "
                >
                  Description
                </label>

                <textarea
                  id="description"
                  name="description"
                  value={
                    form.description
                  }
                  onChange={
                    handleInputChange
                  }
                  rows={4}
                  placeholder="Describe what this class will cover..."
                  className="
                    w-full
                    resize-none
                    rounded-xl
                    border border-white/10
                    bg-slate-900
                    px-4 py-3
                    text-sm
                    leading-6
                    text-white
                    placeholder:text-slate-600
                    outline-none
                    transition-all duration-300
                    focus:border-cyan-400/40
                    focus:ring-2
                    focus:ring-cyan-400/10
                  "
                />

              </div>

              {/* Buttons */}

              <div className="flex gap-3 pt-2">

                <button
                  type="button"
                  onClick={() =>
                    setShowModal(false)
                  }
                  className="
                    flex-1
                    rounded-xl
                    border border-white/10
                    bg-white/5
                    px-4 py-3
                    font-semibold
                    text-slate-300
                    transition-all duration-300
                    hover:border-white/20
                    hover:bg-white/10
                    hover:text-white
                  "
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="
                    group/save relative
                    flex-1
                    overflow-hidden
                    rounded-xl
                    border border-cyan-400/20
                    bg-gradient-to-r
                    from-blue-600
                    via-cyan-500
                    to-purple-600
                    px-4 py-3
                    font-semibold
                    text-white
                    shadow-[0_0_25px_rgba(59,130,246,0.15)]
                    transition-all duration-300
                    hover:scale-[1.01]
                    hover:shadow-[0_0_35px_rgba(34,211,238,0.2)]
                    active:scale-[0.98]
                  "
                >

                  <span
                    className="
                      pointer-events-none absolute inset-0
                      -translate-x-full
                      bg-gradient-to-r
                      from-transparent
                      via-white/20
                      to-transparent
                      transition-transform duration-700
                      group-hover/save:translate-x-full
                    "
                  />

                  <span className="relative z-10">
                    {editingClass
                      ? "Update Class"
                      : "Schedule Class"}
                  </span>

                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </main>
  );
}

// "use client";

// import { useEffect, useMemo, useState } from "react";
// import {
//   CalendarDays,
//   ChevronLeft,
//   ChevronRight,
//   Plus,
//   Clock,
//   MapPin,
//   Video,
//   Pencil,
//   Trash2,
//   X,
// } from "lucide-react";
// import toast from "react-hot-toast";

// import { supabase } from "@/app/lib/supabase";

// interface ScheduledClass {
//   id: string;
//   title: string;
//   course_id: string | null;
//   instructor: string | null;
//   description: string | null;
//   class_date: string;
//   start_time: string;
//   end_time: string;
//   meeting_link: string | null;
//   location: string | null;
//   created_by: string;
//   created_at: string;
// }

// interface Course {
//   id: string;
//   title: string;
// }

// interface ClassForm {
//   // title: string;
//   course_id: string;
//   instructor: string;
//   description: string;
//   class_date: string;
//   start_time: string;
//   end_time: string;
//   meeting_link: string;
//   location: string;
// }

// const MONTHS = [
//   "January",
//   "February",
//   "March",
//   "April",
//   "May",
//   "June",
//   "July",
//   "August",
//   "September",
//   "October",
//   "November",
//   "December",
// ];

// const WEEKDAYS = [
//   "Sun",
//   "Mon",
//   "Tue",
//   "Wed",
//   "Thu",
//   "Fri",
//   "Sat",
// ];

// function formatDate(date: Date) {
//   const year = date.getFullYear();

//   const month = String(date.getMonth() + 1).padStart(2, "0");

//   const day = String(date.getDate()).padStart(2, "0");

//   return `${year}-${month}-${day}`;
// }

// function getInitialForm(date: string): ClassForm {
//   return {
//     // title: "",
//     course_id: "",
//     instructor: "",
//     description: "",
//     class_date: date,
//     start_time: "09:00",
//     end_time: "10:00",
//     meeting_link: "",
//     location: "",
//   };
// }

// export default function CalendarPage() {
//   const today = new Date();

//   const [currentMonth, setCurrentMonth] = useState(today.getMonth());

//   const [currentYear, setCurrentYear] = useState(
//     today.getFullYear()
//   );

//   const [selectedDate, setSelectedDate] = useState(
//     formatDate(today)
//   );

//   const [classes, setClasses] = useState<ScheduledClass[]>([]);

//   const [courses, setCourses] = useState<Course[]>([]);

//   const [loading, setLoading] = useState(true);

//   const [showModal, setShowModal] = useState(false);

//   const [editingClass, setEditingClass] =
//     useState<ScheduledClass | null>(null);

//   const [selectedClass, setSelectedClass] =
//     useState<ScheduledClass | null>(null);

//   const [form, setForm] = useState<ClassForm>(
//     getInitialForm(formatDate(today))
//   );

//   /*
//   ============================================================
//   LOAD CLASSES
//   ============================================================
//   */

//   async function loadClasses() {
//     console.log("📥 LOADING CLASSES FROM SUPABASE...");

//     setLoading(true);

//     const { data, error } = await supabase
//       .from("scheduled_classes")
//       .select("*")
//       .order("class_date", {
//         ascending: true,
//       })
//       .order("start_time", {
//         ascending: true,
//       });

//     if (error) {
//       console.error("❌ LOAD CLASSES ERROR:", error);

//       toast.error(error.message);

//       setLoading(false);

//       return;
//     }

//     console.log("✅ CLASSES LOADED:", data);

//     setClasses(data ?? []);

//     setLoading(false);
//   }

//   /*
//   ============================================================
//   LOAD COURSES
//   ============================================================
//   */

//   async function loadCourses() {
//     console.log("📚 LOADING COURSES...");

//     const { data, error } = await supabase
//       .from("courses")
//       .select("id, title")
//       .order("title");

//     if (error) {
//       console.error("❌ LOAD COURSES ERROR:", error);

//       return;
//     }

//     console.log("✅ COURSES LOADED:", data);

//     setCourses(data ?? []);
//   }

//   /*
//   ============================================================
//   INITIAL LOAD
//   ============================================================
//   */

//   useEffect(() => {
//     loadClasses();
//     loadCourses();
//   }, []);

//   /*
//   ============================================================
//   FORM INPUT HANDLER
//   ============================================================
//   */

//   function handleInputChange(
//     event:
//       | React.ChangeEvent<HTMLInputElement>
//       | React.ChangeEvent<HTMLTextAreaElement>
//       | React.ChangeEvent<HTMLSelectElement>
//   ) {
//     const { name, value } = event.target;

//     console.log(
//       `✏️ INPUT CHANGED: ${name} =`,
//       value
//     );

//     setForm((previousForm) => ({
//       ...previousForm,
//       [name]: value,
//     }));
//   }

//   /*
//   ============================================================
//   CALENDAR DAYS
//   ============================================================
//   */

//   function getDaysInMonth(
//     year: number,
//     month: number
//   ) {
//     const firstDay = new Date(
//       year,
//       month,
//       1
//     ).getDay();

//     const daysInMonth = new Date(
//       year,
//       month + 1,
//       0
//     ).getDate();

//     const days: (number | null)[] = [];

//     for (let i = 0; i < firstDay; i++) {
//       days.push(null);
//     }

//     for (
//       let day = 1;
//       day <= daysInMonth;
//       day++
//     ) {
//       days.push(day);
//     }

//     return days;
//   }

//   const calendarDays = useMemo(
//     () =>
//       getDaysInMonth(
//         currentYear,
//         currentMonth
//       ),
//     [currentYear, currentMonth]
//   );

//   /*
//   ============================================================
//   MONTH NAVIGATION
//   ============================================================
//   */

//   function goToPreviousMonth() {
//     if (currentMonth === 0) {
//       setCurrentMonth(11);
//       setCurrentYear(
//         (previous) => previous - 1
//       );
//     } else {
//       setCurrentMonth(
//         (previous) => previous - 1
//       );
//     }
//   }

//   function goToNextMonth() {
//     if (currentMonth === 11) {
//       setCurrentMonth(0);
//       setCurrentYear(
//         (previous) => previous + 1
//       );
//     } else {
//       setCurrentMonth(
//         (previous) => previous + 1
//       );
//     }
//   }

//   function goToToday() {
//     const now = new Date();

//     setCurrentMonth(now.getMonth());

//     setCurrentYear(now.getFullYear());

//     setSelectedDate(formatDate(now));
//   }

//   /*
//   ============================================================
//   CREATE MODAL
//   ============================================================
//   */

//   function openCreateModal(date?: string) {
//     const dateToUse = date ?? selectedDate;

//     console.log(
//       "➕ OPENING CREATE MODAL FOR:",
//       dateToUse
//     );

//     setEditingClass(null);

//     setForm(getInitialForm(dateToUse));

//     setShowModal(true);
//   }

//   /*
//   ============================================================
//   EDIT MODAL
//   ============================================================
//   */

//   function openEditModal(
//     scheduledClass: ScheduledClass
//   ) {
//     console.log(
//       "✏️ OPENING EDIT MODAL:",
//       scheduledClass
//     );

//     setEditingClass(scheduledClass);

//     setForm({
//       // title: scheduledClass.title,
//       course_id:
//         scheduledClass.course_id ?? "",
//       instructor:
//         scheduledClass.instructor ?? "",
//       description:
//         scheduledClass.description ?? "",
//       class_date:
//         scheduledClass.class_date,
//       start_time:
//         scheduledClass.start_time.slice(
//           0,
//           5
//         ),
//       end_time:
//         scheduledClass.end_time.slice(
//           0,
//           5
//         ),
//       meeting_link:
//         scheduledClass.meeting_link ?? "",
//       location:
//         scheduledClass.location ?? "",
//     });

//     setSelectedClass(null);

//     setShowModal(true);
//   }

//   /*
//   ============================================================
//   DATE CLICK
//   ============================================================
//   */

//   function handleDateClick(date: string) {
//     setSelectedDate(date);
//   }

//   async function saveClass(
//   event: React.FormEvent<HTMLFormElement>
// ) {
//   event.preventDefault();

//   console.log("=================================");
//   console.log("🔥 SAVE CLASS STARTED");
//   console.log("=================================");

//   // STEP 1: Check the form
//   console.log("📝 FORM DATA:", form);

//   // STEP 2: Make sure a course was selected
//   if (!form.course_id) {
//     console.error("❌ NO COURSE SELECTED");
//     toast.error("Please select a course.");
//     return;
//   }

//   // STEP 3: Make sure the time is valid
//   if (form.end_time <= form.start_time) {
//     console.error("❌ INVALID TIME");

//     toast.error(
//       "End time must be after start time."
//     );

//     return;
//   }

//   console.log("✅ FORM VALIDATION PASSED");

//   // STEP 4: Get the logged-in user
//   const {
//     data: { user },
//     error: userError,
//   } = await supabase.auth.getUser();

//   console.log("👤 CURRENT USER:", user);

//   if (userError) {
//     console.error(
//       "❌ AUTH ERROR:",
//       userError
//     );
//   }

//   if (userError || !user) {
//     toast.error("Please log in first.");
//     return;
//   }

//   // STEP 5: Find the selected course
//   const selectedCourse = courses.find(
//     (course) =>
//       course.id === form.course_id
//   );

//   if (!selectedCourse) {
//     console.error(
//       "❌ SELECTED COURSE NOT FOUND:",
//       form.course_id
//     );

//     toast.error(
//       "Selected course could not be found."
//     );

//     return;
//   }

//   console.log(
//     "📚 SELECTED COURSE:",
//     selectedCourse
//   );

//   /*
//     We automatically use the course title
//     as the scheduled class title.

//     Example:
//     Course = React Masterclass

//     Database title = React Masterclass
//   */

//   const classData = {
//     title: selectedCourse.title,

//     course_id:
//       form.course_id,

//     instructor:
//       form.instructor.trim() || null,

//     description:
//       form.description.trim() || null,

//     class_date:
//       form.class_date,

//     start_time:
//       form.start_time,

//     end_time:
//       form.end_time,

//     meeting_link:
//       form.meeting_link.trim() || null,

//     location:
//       form.location.trim() || null,

//     created_by:
//       user.id,
//   };

//   console.log(
//     "📦 CLASS DATA BEING SENT TO SUPABASE:",
//     classData
//   );

//   // STEP 6: UPDATE EXISTING CLASS
//   if (editingClass) {
//     console.log(
//       "✏️ UPDATING EXISTING CLASS:",
//       editingClass.id
//     );

//     const {
//       data,
//       error,
//     } = await supabase
//       .from("scheduled_classes")
//       .update(classData)
//       .eq(
//         "id",
//         editingClass.id
//       )
//       .select()
//       .single();

//     if (error) {
//       console.error(
//         "❌ UPDATE ERROR:",
//         error
//       );

//       toast.error(
//         error.message
//       );

//       return;
//     }

//     console.log(
//       "✅ CLASS UPDATED:",
//       data
//     );

//     toast.success(
//       "Class updated successfully!"
//     );
//   }

//   // STEP 7: CREATE NEW CLASS
//   else {
//     console.log(
//       "➕ INSERTING NEW CLASS..."
//     );

//     const {
//       data,
//       error,
//     } = await supabase
//       .from("scheduled_classes")
//       .insert(classData)
//       .select()
//       .single();

//     if (error) {
//       console.error(
//         "❌ INSERT ERROR:",
//         error
//       );

//       toast.error(
//         error.message
//       );

//       return;
//     }

//     console.log(
//       "✅ CLASS CREATED IN SUPABASE:",
//       data
//     );

//     toast.success(
//       "Class scheduled successfully!"
//     );
//   }

//   // STEP 8: Close modal
//   setShowModal(false);

//   setEditingClass(null);

//   // STEP 9: Reload classes
//   console.log(
//     "🔄 RELOADING CALENDAR..."
//   );

//   await loadClasses();

//   console.log(
//     "🎉 SAVE CLASS COMPLETED"
//   );

//   console.log(
//     "================================="
//   );
// }

//   /*
//   ============================================================
//   DELETE CLASS
//   ============================================================
//   */

//   async function deleteClass(
//     id: string
//   ) {
//     const confirmed =
//       window.confirm(
//         "Are you sure you want to delete this class?"
//       );

//     if (!confirmed) {
//       return;
//     }

//     const { error } =
//       await supabase
//         .from("scheduled_classes")
//         .delete()
//         .eq("id", id);

//     if (error) {
//       console.error(
//         "❌ DELETE ERROR:",
//         error
//       );

//       toast.error(
//         error.message
//       );

//       return;
//     }

//     toast.success(
//       "Class deleted."
//     );

//     setSelectedClass(null);

//     await loadClasses();
//   }

//   /*
//   ============================================================
//   HELPER FUNCTIONS
//   ============================================================
//   */

//   function getCourseName(
//     courseId: string | null
//   ) {
//     if (!courseId) {
//       return null;
//     }

//     return (
//       courses.find(
//         (course) =>
//           course.id === courseId
//       )?.title ?? null
//     );
//   }

//   function formatTime(
//     time: string
//   ) {
//     const [
//       hourString,
//       minute,
//     ] = time.split(":");

//     let hour =
//       Number(hourString);

//     const suffix =
//       hour >= 12
//         ? "PM"
//         : "AM";

//     hour =
//       hour % 12 || 12;

//     return `${hour}:${minute} ${suffix}`;
//   }

//   /*
//   ============================================================
//   FILTERED CLASSES
//   ============================================================
//   */

//   const selectedDateClasses =
//     classes.filter(
//       (item) =>
//         item.class_date ===
//         selectedDate
//     );

//   const todayClasses =
//     classes.filter(
//       (item) =>
//         item.class_date ===
//         formatDate(today)
//     );

//   const upcomingClasses =
//     classes
//       .filter(
//         (item) =>
//           item.class_date >=
//           formatDate(today)
//       )
//       .slice(0, 5);

//   /*
//   ============================================================
//   RETURN UI
//   ============================================================
//   */

//   return (
//     <div className="space-y-8 pb-10 text-gray-500">

//       {/* HEADER */}

//       <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

//         <div>
//           <div className="flex items-center gap-3">
//             <CalendarDays
//               className="text-blue-600"
//               size={32}
//             />

//             <h1 className="text-3xl font-bold text-gray-800">
//               Calendar
//             </h1>
//           </div>

//           <p className="mt-2 text-gray-500">
//             Schedule and manage your classes.
//           </p>
//         </div>

//         <button
//           type="button"
//           onClick={() =>
//             openCreateModal()
//           }
//           className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-700"
//         >
//           <Plus size={20} />

//           Schedule Class
//         </button>
//       </div>

//       {/* SUMMARY CARDS */}

//       <div className="grid gap-4 sm:grid-cols-3">

//         <div className="rounded-2xl border bg-white p-5 shadow-sm">
//           <p className="text-sm text-gray-500">
//             Today&apos;s Classes
//           </p>

//           <p className="mt-2 text-3xl font-bold text-gray-800">
//             {todayClasses.length}
//           </p>
//         </div>

//         <div className="rounded-2xl border bg-white p-5 shadow-sm">
//           <p className="text-sm text-gray-500">
//             Upcoming Classes
//           </p>

//           <p className="mt-2 text-3xl font-bold text-gray-800">
//             {
//               classes.filter(
//                 (item) =>
//                   item.class_date >=
//                   formatDate(today)
//               ).length
//             }
//           </p>
//         </div>

//         <div className="rounded-2xl border bg-white p-5 shadow-sm">
//           <p className="text-sm text-gray-500">
//             Total Scheduled
//           </p>

//           <p className="mt-2 text-3xl font-bold text-gray-800">
//             {classes.length}
//           </p>
//         </div>
//       </div>

//       {/* MAIN CONTENT */}

//       <div className="grid gap-6 xl:grid-cols-[1fr_360px]">

//         {/* CALENDAR */}

//         <div className="rounded-2xl border bg-white p-5 shadow-sm md:p-6">

//           {/* CALENDAR HEADER */}

//           <div className="mb-6 flex items-center justify-between">

//             <h2 className="text-xl font-bold text-gray-800">
//               {MONTHS[currentMonth]}{" "}
//               {currentYear}
//             </h2>

//             <div className="flex items-center gap-2">

//               <button
//                 type="button"
//                 onClick={goToToday}
//                 className="rounded-lg border px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50"
//               >
//                 Today
//               </button>

//               <button
//                 type="button"
//                 onClick={
//                   goToPreviousMonth
//                 }
//                 className="rounded-lg border p-2 hover:bg-gray-50"
//               >
//                 <ChevronLeft size={18} />
//               </button>

//               <button
//                 type="button"
//                 onClick={
//                   goToNextMonth
//                 }
//                 className="rounded-lg border p-2 hover:bg-gray-50"
//               >
//                 <ChevronRight size={18} />
//               </button>

//             </div>
//           </div>

//           {/* WEEKDAYS */}

//           <div className="grid grid-cols-7 border-b pb-3">

//             {WEEKDAYS.map(
//               (day) => (
//                 <div
//                   key={day}
//                   className="text-center text-sm font-semibold text-gray-500"
//                 >
//                   {day}
//                 </div>
//               )
//             )}

//           </div>

//           {/* DAYS */}

//           <div className="grid grid-cols-7">

//             {calendarDays.map(
//               (day, index) => {

//                 if (!day) {
//                   return (
//                     <div
//                       key={`empty-${index}`}
//                       className="min-h-28 border-b border-r"
//                     />
//                   );
//                 }

//                 const date =
//                   new Date(
//                     currentYear,
//                     currentMonth,
//                     day
//                   );

//                 const dateString =
//                   formatDate(date);

//                 const dayClasses =
//                   classes.filter(
//                     (item) =>
//                       item.class_date ===
//                       dateString
//                   );

//                 const isToday =
//                   dateString ===
//                   formatDate(today);

//                 const isSelected =
//                   dateString ===
//                   selectedDate;

//                 return (
//                   <button
//                     type="button"
//                     key={dateString}
//                     onClick={() =>
//                       handleDateClick(
//                         dateString
//                       )
//                     }
//                     className={`group relative min-h-28 border-b border-r p-2 text-left transition ${
//                       isSelected
//                         ? "bg-blue-50"
//                         : "hover:bg-gray-50"
//                     }`}
//                   >

//                     <div
//                       className={`mb-2 flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold ${
//                         isToday
//                           ? "bg-blue-600 text-white"
//                           : "text-gray-700"
//                       }`}
//                     >
//                       {day}
//                     </div>

//                     <div className="space-y-1">

//                       {dayClasses
//                         .slice(0, 2)
//                         .map(
//                           (classItem) => (
//                             <div
//                               key={
//                                 classItem.id
//                               }
//                               onClick={(
//                                 event
//                               ) => {
//                                 event.stopPropagation();

//                                 setSelectedClass(
//                                   classItem
//                                 );
//                               }}
//                               className="truncate rounded-md bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700 hover:bg-blue-200"
//                             >
//                               {
//                                 classItem.title
//                               }
//                             </div>
//                           )
//                         )}

//                       {dayClasses.length >
//                         2 && (
//                         <p className="px-2 text-xs font-medium text-gray-500">
//                           +
//                           {dayClasses.length -
//                             2}{" "}
//                           more
//                         </p>
//                       )}

//                     </div>

//                     <span
//                       onClick={(
//                         event
//                       ) => {
//                         event.stopPropagation();

//                         openCreateModal(
//                           dateString
//                         );
//                       }}
//                       className="absolute bottom-2 right-2 hidden rounded-full bg-blue-600 p-1 text-white group-hover:block"
//                     >
//                       <Plus size={13} />
//                     </span>

//                   </button>
//                 );
//               }
//             )}

//           </div>
//         </div>

//         {/* RIGHT SIDE */}

//         <div className="space-y-6">

//           {/* SELECTED DATE */}

//           <div className="rounded-2xl border bg-white p-6 shadow-sm">

//             <div className="mb-5 flex items-center justify-between">

//               <div>

//                 <p className="text-sm text-gray-500">
//                   Selected Date
//                 </p>

//                 <h2 className="mt-1 text-xl font-bold text-gray-800">
//                   {new Date(
//                     `${selectedDate}T00:00:00`
//                   ).toLocaleDateString(
//                     "en-US",
//                     {
//                       weekday: "long",
//                       month: "long",
//                       day: "numeric",
//                       year: "numeric",
//                     }
//                   )}
//                 </h2>

//               </div>

//               <button
//                 type="button"
//                 onClick={() =>
//                   openCreateModal(
//                     selectedDate
//                   )
//                 }
//                 className="rounded-lg bg-blue-600 p-2 text-white hover:bg-blue-700"
//               >
//                 <Plus size={20} />
//               </button>

//             </div>

//             {selectedDateClasses.length ===
//             0 ? (
//               <div className="rounded-xl bg-gray-50 p-6 text-center">

//                 <CalendarDays
//                   className="mx-auto mb-3 text-gray-400"
//                   size={32}
//                 />

//                 <p className="text-sm text-gray-500">
//                   No classes scheduled
//                   for this date.
//                 </p>

//                 <button
//                   type="button"
//                   onClick={() =>
//                     openCreateModal(
//                       selectedDate
//                     )
//                   }
//                   className="mt-4 text-sm font-semibold text-blue-600 hover:underline"
//                 >
//                   Schedule a class
//                 </button>

//               </div>
//             ) : (
//               <div className="space-y-3">

//                 {selectedDateClasses.map(
//                   (item) => (
//                     <button
//                       type="button"
//                       key={item.id}
//                       onClick={() =>
//                         setSelectedClass(
//                           item
//                         )
//                       }
//                       className="w-full rounded-xl border p-4 text-left transition hover:border-blue-300 hover:bg-blue-50"
//                     >

//                       <h3 className="font-semibold text-gray-800">
//                         {item.title}
//                       </h3>

//                       <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">

//                         <Clock size={15} />

//                         {formatTime(
//                           item.start_time
//                         )}

//                         {" - "}

//                         {formatTime(
//                           item.end_time
//                         )}

//                       </div>

//                     </button>
//                   )
//                 )}

//               </div>
//             )}

//           </div>

//           {/* UPCOMING CLASSES */}

//           <div className="rounded-2xl border bg-white p-6 shadow-sm">

//             <h2 className="mb-5 text-xl font-bold text-gray-800">
//               Upcoming Classes
//             </h2>

//             {loading ? (
//               <p className="text-sm text-gray-500">
//                 Loading...
//               </p>
//             ) : upcomingClasses.length ===
//               0 ? (
//               <p className="text-sm text-gray-500">
//                 No upcoming classes.
//               </p>
//             ) : (
//               <div className="space-y-4">

//                 {upcomingClasses.map(
//                   (item) => (
//                     <button
//                       type="button"
//                       key={item.id}
//                       onClick={() =>
//                         setSelectedClass(
//                           item
//                         )
//                       }
//                       className="w-full border-b pb-4 text-left last:border-0 last:pb-0"
//                     >

//                       <p className="text-sm font-semibold text-blue-600">
//                         {new Date(
//                           `${item.class_date}T00:00:00`
//                         ).toLocaleDateString(
//                           "en-US",
//                           {
//                             month: "short",
//                             day: "numeric",
//                           }
//                         )}
//                       </p>

//                       <h3 className="mt-1 font-semibold text-gray-800">
//                         {item.title}
//                       </h3>

//                       <p className="mt-1 text-sm text-gray-500">
//                         {formatTime(
//                           item.start_time
//                         )}
//                       </p>

//                     </button>
//                   )
//                 )}

//               </div>
//             )}

//           </div>

//         </div>
//       </div>

//       {/* CLASS DETAILS MODAL */}

//       {selectedClass && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

//           <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">

//             <div className="flex items-start justify-between">

//               <div>

//                 <p className="text-sm font-semibold text-blue-600">
//                   Scheduled Class
//                 </p>

//                 <h2 className="mt-1 text-2xl font-bold text-gray-800">
//                   {selectedClass.title}
//                 </h2>

//               </div>

//               <button
//                 type="button"
//                 onClick={() =>
//                   setSelectedClass(
//                     null
//                   )
//                 }
//                 className="rounded-lg p-2 hover:bg-gray-100"
//               >
//                 <X size={20} />
//               </button>

//             </div>

//             <div className="mt-6 space-y-4">

//               {/* DATE */}

//               <div className="flex gap-3">

//                 <CalendarDays
//                   className="mt-0.5 text-blue-600"
//                   size={20}
//                 />

//                 <div>

//                   <p className="font-medium text-gray-800">
//                     Date
//                   </p>

//                   <p className="text-sm text-gray-500">
//                     {new Date(
//                       `${selectedClass.class_date}T00:00:00`
//                     ).toLocaleDateString(
//                       "en-US",
//                       {
//                         weekday: "long",
//                         month: "long",
//                         day: "numeric",
//                         year: "numeric",
//                       }
//                     )}
//                   </p>

//                 </div>

//               </div>

//               {/* TIME */}

//               <div className="flex gap-3">

//                 <Clock
//                   className="mt-0.5 text-blue-600"
//                   size={20}
//                 />

//                 <div>

//                   <p className="font-medium text-gray-800">
//                     Time
//                   </p>

//                   <p className="text-sm text-gray-500">

//                     {formatTime(
//                       selectedClass.start_time
//                     )}

//                     {" - "}

//                     {formatTime(
//                       selectedClass.end_time
//                     )}

//                   </p>

//                 </div>

//               </div>

//               {/* INSTRUCTOR */}

//               {selectedClass.instructor && (
//                 <div className="flex gap-3">

//                   <div className="text-blue-600">
//                     👨‍🏫
//                   </div>

//                   <div>

//                     <p className="font-medium text-gray-800">
//                       Instructor
//                     </p>

//                     <p className="text-sm text-gray-500">
//                       {
//                         selectedClass.instructor
//                       }
//                     </p>

//                   </div>

//                 </div>
//               )}

//               {/* COURSE */}

//               {getCourseName(
//                 selectedClass.course_id
//               ) && (
//                 <div className="flex gap-3">

//                   <div className="text-blue-600">
//                     📚
//                   </div>

//                   <div>

//                     <p className="font-medium text-gray-800">
//                       Course
//                     </p>

//                     <p className="text-sm text-gray-500">
//                       {getCourseName(
//                         selectedClass.course_id
//                       )}
//                     </p>

//                   </div>

//                 </div>
//               )}

//               {/* LOCATION */}

//               {selectedClass.location && (
//                 <div className="flex gap-3">

//                   <MapPin
//                     className="text-blue-600"
//                     size={20}
//                   />

//                   <div>

//                     <p className="font-medium text-gray-800">
//                       Location
//                     </p>

//                     <p className="text-sm text-gray-500">
//                       {
//                         selectedClass.location
//                       }
//                     </p>

//                   </div>

//                 </div>
//               )}

//               {/* MEETING LINK */}

//               {selectedClass.meeting_link && (
//                 <div className="flex gap-3">

//                   <Video
//                     className="text-blue-600"
//                     size={20}
//                   />

//                   <div>

//                     <p className="font-medium text-gray-800">
//                       Online Class
//                     </p>

//                     <a
//                       href={
//                         selectedClass.meeting_link
//                       }
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="text-sm font-medium text-blue-600 hover:underline"
//                     >
//                       Join class
//                     </a>

//                   </div>

//                 </div>
//               )}

//               {/* DESCRIPTION */}

//               {selectedClass.description && (
//                 <div className="rounded-xl bg-gray-50 p-4">

//                   <p className="mb-1 font-medium text-gray-800">
//                     Description
//                   </p>

//                   <p className="text-sm leading-6 text-gray-600">
//                     {
//                       selectedClass.description
//                     }
//                   </p>

//                 </div>
//               )}

//             </div>

//             {/* ACTION BUTTONS */}

//             <div className="mt-7 flex gap-3">

//               <button
//                 type="button"
//                 onClick={() =>
//                   openEditModal(
//                     selectedClass
//                   )
//                 }
//                 className="flex flex-1 items-center justify-center gap-2 rounded-xl border px-4 py-3 font-semibold text-gray-700 hover:bg-gray-50"
//               >
//                 <Pencil size={18} />

//                 Edit
//               </button>

//               <button
//                 type="button"
//                 onClick={() =>
//                   deleteClass(
//                     selectedClass.id
//                   )
//                 }
//                 className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-3 font-semibold text-white hover:bg-red-700"
//               >
//                 <Trash2 size={18} />

//                 Delete
//               </button>

//             </div>

//           </div>
//         </div>
//       )}

//       {/* CREATE / EDIT MODAL */}

//       {showModal && (
//         // <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/40 p-4">

//         //   <div className="my-8 w-full max-w-2xl rounded-2xl bg-white shadow-xl">
//           <div className="fixed inset-0 z-50 overflow-y-auto bg-black/40 p-4">

//     <div className="mx-auto my-6 w-full max-w-2xl rounded-2xl bg-white shadow-xl">

//             {/* MODAL HEADER */}

//             <div className="flex items-center justify-between border-b p-6">

//               <div>

//                 <h2 className="text-2xl font-bold text-gray-800">
//                   {editingClass
//                     ? "Edit Class"
//                     : "Schedule Class"}
//                 </h2>

//                 <p className="mt-1 text-sm text-gray-500">
//                   Add the details for this class.
//                 </p>

//               </div>

//               <button
//                 type="button"
//                 onClick={() =>
//                   setShowModal(false)
//                 }
//                 className="rounded-lg p-2 hover:bg-gray-100"
//               >
//                 <X size={20} />
//               </button>

//             </div>

//             {/* FORM */}

//             <form
//               onSubmit={saveClass}
//               className="space-y-5 p-6"
//             >

//               {/* COURSE */}

//               <div>

//                 <label
//                   htmlFor="course"
//                   className="mb-2 block text-sm font-semibold text-gray-700"
//                 >
//                   Course
//                 </label>

//                 <select
//                   id="course"
//                   name="course_id"
//                   value={form.course_id}
//                   onChange={
//                     handleInputChange
//                   }
//                   className="w-full rounded-xl border bg-white px-4 py-3 outline-none focus:border-blue-500"
//                 >

//                   <option value="">
//                     Select course
//                   </option>

//                   {courses.map(
//                     (course) => (
//                       <option
//                         key={
//                           course.id
//                         }
//                         value={
//                           course.id
//                         }
//                       >
//                         {course.title}
//                       </option>
//                     )
//                   )}

//                 </select>

//               </div>

//               {/* INSTRUCTOR */}

//               <div>

//                 <label
//                   htmlFor="instructor"
//                   className="mb-2 block text-sm font-semibold text-gray-700"
//                 >
//                   Instructor
//                 </label>

//                 <input
//                   id="instructor"
//                   name="instructor"
//                   type="text"
//                   value={
//                     form.instructor
//                   }
//                   onChange={
//                     handleInputChange
//                   }
//                   placeholder="Instructor name"
//                   className="w-full rounded-xl border px-4 py-3 outline-none focus:border-blue-500"
//                 />

//               </div>

//               {/* DATE */}

//               <div>

//                 <label
//                   htmlFor="class-date"
//                   className="mb-2 block text-sm font-semibold text-gray-700"
//                 >
//                   Date
//                 </label>

//                 <input
//                   id="class-date"
//                   name="class_date"
//                   type="date"
//                   value={
//                     form.class_date
//                   }
//                   onChange={
//                     handleInputChange
//                   }
//                   className="w-full rounded-xl border px-4 py-3 outline-none focus:border-blue-500"
//                   required
//                 />

//               </div>

//               {/* TIME */}

//               <div className="grid gap-4 sm:grid-cols-2">

//                 <div>

//                   <label
//                     htmlFor="start-time"
//                     className="mb-2 block text-sm font-semibold text-gray-700"
//                   >
//                     Start Time
//                   </label>

//                   <input
//                     id="start-time"
//                     name="start_time"
//                     type="time"
//                     value={
//                       form.start_time
//                     }
//                     onChange={
//                       handleInputChange
//                     }
//                     className="w-full rounded-xl border px-4 py-3 outline-none focus:border-blue-500"
//                     required
//                   />

//                 </div>

//                 <div>

//                   <label
//                     htmlFor="end-time"
//                     className="mb-2 block text-sm font-semibold text-gray-700"
//                   >
//                     End Time
//                   </label>

//                   <input
//                     id="end-time"
//                     name="end_time"
//                     type="time"
//                     value={
//                       form.end_time
//                     }
//                     onChange={
//                       handleInputChange
//                     }
//                     className="w-full rounded-xl border px-4 py-3 outline-none focus:border-blue-500"
//                     required
//                   />

//                 </div>

//               </div>

//               {/* LOCATION */}

//               <div>

//                 <label
//                   htmlFor="location"
//                   className="mb-2 block text-sm font-semibold text-gray-700"
//                 >
//                   Location
//                 </label>

//                 <input
//                   id="location"
//                   name="location"
//                   type="text"
//                   value={
//                     form.location
//                   }
//                   onChange={
//                     handleInputChange
//                   }
//                   placeholder="e.g. Room 204"
//                   className="w-full rounded-xl border px-4 py-3 outline-none focus:border-blue-500"
//                 />

//               </div>

//               {/* MEETING LINK */}

//               <div>

//                 <label
//                   htmlFor="meeting-link"
//                   className="mb-2 block text-sm font-semibold text-gray-700"
//                 >
//                   Meeting Link
//                 </label>

//                 <input
//                   id="meeting-link"
//                   name="meeting_link"
//                   type="url"
//                   value={
//                     form.meeting_link
//                   }
//                   onChange={
//                     handleInputChange
//                   }
//                   placeholder="https://meet.google.com/..."
//                   className="w-full rounded-xl border px-4 py-3 outline-none focus:border-blue-500"
//                 />

//               </div>

//               {/* DESCRIPTION */}

//               <div>

//                 <label
//                   htmlFor="description"
//                   className="mb-2 block text-sm font-semibold text-gray-700"
//                 >
//                   Description
//                 </label>

//                 <textarea
//                   id="description"
//                   name="description"
//                   value={
//                     form.description
//                   }
//                   onChange={
//                     handleInputChange
//                   }
//                   rows={4}
//                   placeholder="Describe what this class will cover..."
//                   className="w-full resize-none rounded-xl border px-4 py-3 outline-none focus:border-blue-500"
//                 />

//               </div>

//               {/* BUTTONS */}

//               <div className="flex gap-3 pt-2">

//                 <button
//                   type="button"
//                   onClick={() =>
//                     setShowModal(false)
//                   }
//                   className="flex-1 rounded-xl border px-4 py-3 font-semibold text-gray-700 hover:bg-gray-50"
//                 >
//                   Cancel
//                 </button>

//                 <button
//                   type="submit"
//                   className="flex-1 rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white hover:bg-blue-700"
//                 >
//                   {editingClass
//                     ? "Update Class"
//                     : "Schedule Class"}
//                 </button>

//               </div>

//             </form>

//           </div>
//         </div>
//       )}

//     </div>
//   );
// }