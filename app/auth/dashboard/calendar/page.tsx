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

export default function CalendarPage() {
  const today = new Date();

  const [currentMonth, setCurrentMonth] = useState(
    today.getMonth()
  );

  const [currentYear, setCurrentYear] = useState(
    today.getFullYear()
  );

  const [selectedDate, setSelectedDate] = useState(
    formatDate(today)
  );

  const [classes, setClasses] = useState<
    ScheduledClass[]
  >([]);

  const [courses, setCourses] = useState<Course[]>([]);

  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] =
    useState(false);

  const [editingClass, setEditingClass] =
    useState<ScheduledClass | null>(null);

  const [selectedClass, setSelectedClass] =
    useState<ScheduledClass | null>(null);

  const [form, setForm] = useState({
    title: "",
    course_id: "",
    instructor: "",
    description: "",
    class_date: formatDate(today),
    start_time: "09:00",
    end_time: "10:00",
    meeting_link: "",
    location: "",
  });

  useEffect(() => {
    loadClasses();
    loadCourses();
  }, []);

//   async function loadClasses() {
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
//       console.error(error);
//       toast.error("Failed to load classes.");
//     }

//     setClasses(data ?? []);
//     setLoading(false);
//   }
async function loadClasses() {
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
    console.error("LOAD CLASSES ERROR:", error);
    toast.error(error.message);
    setLoading(false);
    return;
  }

  console.log("SCHEDULED CLASSES:", data);

  setClasses(data ?? []);
  setLoading(false);
}



  async function loadCourses() {
    const { data, error } = await supabase
      .from("courses")
      .select("id, title")
      .order("title");

    if (error) {
      console.error(error);
      return;
    }

    setCourses(data ?? []);
  }

  function formatDate(date: Date) {
    const year = date.getFullYear();

    const month = String(
      date.getMonth() + 1
    ).padStart(2, "0");

    const day = String(
      date.getDate()
    ).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

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

    const days = [];

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

  function goToPreviousMonth() {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(
        (prev) => prev - 1
      );
    } else {
      setCurrentMonth(
        (prev) => prev - 1
      );
    }
  }

  function goToNextMonth() {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(
        (prev) => prev + 1
      );
    } else {
      setCurrentMonth(
        (prev) => prev + 1
      );
    }
  }

  function goToToday() {
    const now = new Date();

    setCurrentMonth(
      now.getMonth()
    );

    setCurrentYear(
      now.getFullYear()
    );

    setSelectedDate(
      formatDate(now)
    );
  }

  function openCreateModal(date?: string) {
    setEditingClass(null);

    setForm({
      title: "",
      course_id: "",
      instructor: "",
      description: "",
      class_date:
        date ?? selectedDate,
      start_time: "09:00",
      end_time: "10:00",
      meeting_link: "",
      location: "",
    });

    setShowModal(true);
  }

  function openEditModal(
    scheduledClass: ScheduledClass
  ) {
    setEditingClass(
      scheduledClass
    );

    setForm({
      title: scheduledClass.title,
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

  function handleDateClick(
    date: string
  ) {
    setSelectedDate(date);
  }

  async function saveClass(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault();

  console.log("🔥 SAVE CLASS FUNCTION STARTED");

  if (!form.title.trim()) {
    console.log("❌ TITLE IS EMPTY");
    toast.error("Please enter a class title.");
    return;
  }

  if (form.end_time <= form.start_time) {
    console.log("❌ INVALID TIME");
    toast.error("End time must be after start time.");
    return;
  }

  console.log("✅ FORM VALIDATION PASSED");

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  console.log("AUTH USER:", user);
  console.log("AUTH ERROR:", userError);

  if (userError || !user) {
    toast.error("Please log in first.");
    console.error("❌ USER ERROR:", userError);
    return;
  }

  const classData = {
    title: form.title.trim(),
    course_id: form.course_id || null,
    instructor: form.instructor.trim() || null,
    description: form.description.trim() || null,
    class_date: form.class_date,
    start_time: form.start_time,
    end_time: form.end_time,
    meeting_link: form.meeting_link.trim() || null,
    location: form.location.trim() || null,
    created_by: user.id,
  };

  console.log("📦 CLASS DATA BEING SENT:", classData);

  if (editingClass) {
    console.log("✏️ UPDATING EXISTING CLASS");

    const { data, error } = await supabase
      .from("scheduled_classes")
      .update(classData)
      .eq("id", editingClass.id)
      .select()
      .single();

    if (error) {
      console.error("❌ UPDATE CLASS ERROR:", error);
      toast.error(error.message);
      return;
    }

    console.log("✅ UPDATED CLASS:", data);

    toast.success("Class updated successfully!");
  } else {
    console.log("➕ INSERTING NEW CLASS");

    const { data, error } = await supabase
      .from("scheduled_classes")
      .insert(classData)
      .select()
      .single();

    if (error) {
      console.error("❌ INSERT CLASS ERROR:", error);
      toast.error(error.message);
      return;
    }

    console.log("✅ CREATED CLASS:", data);

    toast.success("Class scheduled successfully!");
  }

  console.log("🎉 CLASS SAVE COMPLETED");

  setShowModal(false);
  setEditingClass(null);

  await loadClasses();
}
//   async function saveClass(event: React.FormEvent) {
//   event.preventDefault();

//   if (!form.title.trim()) {
//     toast.error("Please enter a class title.");
//     return;
//   }

//   if (form.end_time <= form.start_time) {
//     toast.error("End time must be after start time.");
//     return;
//   }

//   const {
//     data: { user },
//     error: userError,
//   } = await supabase.auth.getUser();

//   if (userError || !user) {
//     toast.error("Please log in first.");
//     console.error("USER ERROR:", userError);
//     return;
//   }

//   const classData = {
//     title: form.title.trim(),
//     course_id: form.course_id || null,
//     instructor: form.instructor.trim() || null,
//     description: form.description.trim() || null,
//     class_date: form.class_date,
//     start_time: form.start_time,
//     end_time: form.end_time,
//     meeting_link: form.meeting_link.trim() || null,
//     location: form.location.trim() || null,
//     created_by: user.id,
//   };

//   console.log("SAVING CLASS:", classData);

//   if (editingClass) {
//     const { data, error } = await supabase
//       .from("scheduled_classes")
//       .update(classData)
//       .eq("id", editingClass.id)
//       .select()
//       .single();

//     if (error) {
//       console.error("UPDATE CLASS ERROR:", error);
//       toast.error(error.message);
//       return;
//     }

//     console.log("UPDATED CLASS:", data);

//     toast.success("Class updated successfully!");
//   } else {
//     const { data, error } = await supabase
//       .from("scheduled_classes")
//       .insert(classData)
//       .select()
//       .single();

//     if (error) {
//       console.error("INSERT CLASS ERROR:", error);
//       toast.error(error.message);
//       return;
//     }

//     console.log("CREATED CLASS:", data);

//     toast.success("Class scheduled successfully!");
//   }

//   setShowModal(false);
//   setEditingClass(null);

//   await loadClasses();
// }

//   async function saveClass(
//     event: React.FormEvent
//   ) {
//     event.preventDefault();

//     if (!form.title.trim()) {
//       toast.error(
//         "Please enter a class title."
//       );
//       return;
//     }

//     if (
//       form.end_time <=
//       form.start_time
//     ) {
//       toast.error(
//         "End time must be after start time."
//       );
//       return;
//     }

//     const {
//       data: { user },
//     } = await supabase.auth.getUser();

//     if (!user) {
//       toast.error(
//         "Please log in first."
//       );
//       return;
//     }

//     const classData = {
//       title: form.title,
//       course_id:
//         form.course_id || null,
//       instructor:
//         form.instructor || null,
//       description:
//         form.description || null,
//       class_date:
//         form.class_date,
//       start_time:
//         form.start_time,
//       end_time:
//         form.end_time,
//       meeting_link:
//         form.meeting_link || null,
//       location:
//         form.location || null,
//       created_by: user.id,
//     };

//     if (editingClass) {
//       const { error } =
//         await supabase
//           .from("scheduled_classes")
//           .update(classData)
//           .eq(
//             "id",
//             editingClass.id
//           );

//       if (error) {
//         console.error(error);
//         toast.error(
//           "Failed to update class."
//         );
//         return;
//       }

//       toast.success(
//         "Class updated successfully!"
//       );
//     } else {
//       const { error } =
//         await supabase
//           .from("scheduled_classes")
//           .insert(classData);

//       if (error) {
//         console.error(error);
//         toast.error(
//           "Failed to schedule class."
//         );
//         return;
//       }

//       toast.success(
//         "Class scheduled successfully!"
//       );
//     }

//     setShowModal(false);
//     setEditingClass(null);

//     await loadClasses();
//   }

  async function deleteClass(
    id: string
  ) {
    const confirmed =
      window.confirm(
        "Are you sure you want to delete this class?"
      );

    if (!confirmed) return;

    const { error } =
      await supabase
        .from("scheduled_classes")
        .delete()
        .eq("id", id);

    if (error) {
      console.error(error);
      toast.error(
        "Failed to delete class."
      );
      return;
    }

    toast.success(
      "Class deleted."
    );

    setSelectedClass(null);

    await loadClasses();
  }

  const selectedDateClasses =
    classes.filter(
      (item) =>
        item.class_date ===
        selectedDate
    );

  const upcomingClasses =
    classes
      .filter(
        (item) =>
          item.class_date >=
          formatDate(today)
      )
      .slice(0, 5);

  const todayClasses =
    classes.filter(
      (item) =>
        item.class_date ===
        formatDate(today)
    );

  function getCourseName(
    courseId: string | null
  ) {
    if (!courseId) return null;

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
      hour >= 12 ? "PM" : "AM";

    hour =
      hour % 12 || 12;

    return `${hour}:${minute} ${suffix}`;
  }

  return (
    <div className="space-y-8 pb-10 text-gray-500">

      {/* Header */}

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <div>
          <div className="flex items-center gap-3">

            <CalendarDays
              className="text-blue-600"
              size={32}
            />

            <h1 className="text-3xl font-bold text-gray-800">
              Calendar
            </h1>

          </div>

          <p className="mt-2 text-gray-500">
            Schedule and manage your
            classes.
          </p>
        </div>

        <button
          onClick={() =>
            openCreateModal()
          }
          className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-700"
        >
          <Plus size={20} />
          Schedule Class
        </button>

      </div>

      {/* Summary Cards */}

      <div className="grid gap-4 sm:grid-cols-3">

        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Today&apos;s Classes
          </p>

          <p className="mt-2 text-3xl font-bold text-gray-800">
            {todayClasses.length}
          </p>
        </div>

        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Upcoming Classes
          </p>

          <p className="mt-2 text-3xl font-bold text-gray-800">
            {classes.filter(
              (item) =>
                item.class_date >=
                formatDate(today)
            ).length}
          </p>
        </div>

        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Total Scheduled
          </p>

          <p className="mt-2 text-3xl font-bold text-gray-800">
            {classes.length}
          </p>
        </div>

      </div>

      {/* Main Layout */}

      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">

        {/* Calendar */}

        <div className="rounded-2xl border bg-white p-5 shadow-sm md:p-6">

          {/* Calendar Header */}

          <div className="mb-6 flex items-center justify-between">

            <div>

              <h2 className="text-xl font-bold text-gray-800">
                {MONTHS[currentMonth]}{" "}
                {currentYear}
              </h2>

            </div>

            <div className="flex items-center gap-2">

              <button
                onClick={goToToday}
                className="rounded-lg border px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50"
              >
                Today
              </button>

              <button
                onClick={
                  goToPreviousMonth
                }
                className="rounded-lg border p-2 hover:bg-gray-50"
              >
                <ChevronLeft
                  size={18}
                />
              </button>

              <button
                onClick={
                  goToNextMonth
                }
                className="rounded-lg border p-2 hover:bg-gray-50"
              >
                <ChevronRight
                  size={18}
                />
              </button>

            </div>

          </div>

          {/* Weekdays */}

          <div className="grid grid-cols-7 border-b pb-3">

            {WEEKDAYS.map(
              (day) => (
                <div
                  key={day}
                  className="text-center text-sm font-semibold text-gray-500"
                >
                  {day}
                </div>
              )
            )}

          </div>

          {/* Days */}

          <div className="grid grid-cols-7">

            {calendarDays.map(
              (day, index) => {

                if (!day) {
                  return (
                    <div
                      key={`empty-${index}`}
                      className="min-h-28 border-b border-r"
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
                  formatDate(
                    today
                  );

                const isSelected =
                  dateString ===
                  selectedDate;

                return (
                  <button
                    key={dateString}
                    onClick={() =>
                      handleDateClick(
                        dateString
                      )
                    }
                    className={`group relative min-h-28 border-b border-r p-2 text-left transition ${
                      isSelected
                        ? "bg-blue-50"
                        : "hover:bg-gray-50"
                    }`}
                  >

                    <div
                      className={`mb-2 flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold ${
                        isToday
                          ? "bg-blue-600 text-white"
                          : "text-gray-700"
                      }`}
                    >
                      {day}
                    </div>

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
                              className="truncate rounded-md bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700 hover:bg-blue-200"
                            >
                              {
                                classItem.title
                              }
                            </div>
                          )
                        )}

                      {dayClasses.length >
                        2 && (
                        <p className="px-2 text-xs font-medium text-gray-500">
                          +
                          {dayClasses.length -
                            2}{" "}
                          more
                        </p>
                      )}

                    </div>

                    <span
                      onClick={(event) => {
                        event.stopPropagation();
                        openCreateModal(
                          dateString
                        );
                      }}
                      className="absolute bottom-2 right-2 hidden rounded-full bg-blue-600 p-1 text-white group-hover:block"
                    >
                      <Plus size={13} />
                    </span>

                  </button>
                );
              }
            )}

          </div>

        </div>

        {/* Right Side */}

        <div className="space-y-6">

          {/* Selected Date */}

          <div className="rounded-2xl border bg-white p-6 shadow-sm">

            <div className="mb-5 flex items-center justify-between">

              <div>

                <p className="text-sm text-gray-500">
                  Selected Date
                </p>

                <h2 className="mt-1 text-xl font-bold text-gray-800">
                  {new Date(
                    `${selectedDate}T00:00:00`
                  ).toLocaleDateString(
                    "en-US",
                    {
                      weekday:
                        "long",
                      month:
                        "long",
                      day: "numeric",
                      year: "numeric",
                    }
                  )}
                </h2>

              </div>

              <button
                onClick={() =>
                  openCreateModal(
                    selectedDate
                  )
                }
                className="rounded-lg bg-blue-600 p-2 text-white hover:bg-blue-700"
              >
                <Plus size={20} />
              </button>

            </div>

            {selectedDateClasses.length ===
            0 ? (
              <div className="rounded-xl bg-gray-50 p-6 text-center">

                <CalendarDays
                  className="mx-auto mb-3 text-gray-400"
                  size={32}
                />

                <p className="text-sm text-gray-500">
                  No classes scheduled
                  for this date.
                </p>

                <button
                  onClick={() =>
                    openCreateModal(
                      selectedDate
                    )
                  }
                  className="mt-4 text-sm font-semibold text-blue-600 hover:underline"
                >
                  Schedule a class
                </button>

              </div>
            ) : (
              <div className="space-y-3">

                {selectedDateClasses.map(
                  (item) => (
                    <button
                      key={item.id}
                      onClick={() =>
                        setSelectedClass(
                          item
                        )
                      }
                      className="w-full rounded-xl border p-4 text-left transition hover:border-blue-300 hover:bg-blue-50"
                    >

                      <h3 className="font-semibold text-gray-800">
                        {item.title}
                      </h3>

                      <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                        <Clock
                          size={15}
                        />

                        {formatTime(
                          item.start_time
                        )}{" "}
                        -
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

          {/* Upcoming Classes */}

          <div className="rounded-2xl border bg-white p-6 shadow-sm">

            <h2 className="mb-5 text-xl font-bold text-gray-800">
              Upcoming Classes
            </h2>

            {loading ? (
              <p className="text-sm text-gray-500">
                Loading...
              </p>
            ) : upcomingClasses.length ===
              0 ? (
              <p className="text-sm text-gray-500">
                No upcoming classes.
              </p>
            ) : (
              <div className="space-y-4">

                {upcomingClasses.map(
                  (item) => (
                    <button
                      key={item.id}
                      onClick={() =>
                        setSelectedClass(
                          item
                        )
                      }
                      className="w-full border-b pb-4 text-left last:border-0 last:pb-0"
                    >

                      <p className="text-sm font-semibold text-blue-600">
                        {new Date(
                          `${item.class_date}T00:00:00`
                        ).toLocaleDateString(
                          "en-US",
                          {
                            month:
                              "short",
                            day: "numeric",
                          }
                        )}
                      </p>

                      <h3 className="mt-1 font-semibold text-gray-800">
                        {item.title}
                      </h3>

                      <p className="mt-1 text-sm text-gray-500">
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

      {/* Class Details Modal */}

      {selectedClass && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">

            <div className="flex items-start justify-between">

              <div>

                <p className="text-sm font-semibold text-blue-600">
                  Scheduled Class
                </p>

                <h2 className="mt-1 text-2xl font-bold text-gray-800">
                  {selectedClass.title}
                </h2>

              </div>

              <button
                onClick={() =>
                  setSelectedClass(
                    null
                  )
                }
                className="rounded-lg p-2 hover:bg-gray-100"
              >
                <X size={20} />
              </button>

            </div>

            <div className="mt-6 space-y-4">

              <div className="flex gap-3">

                <CalendarDays
                  className="mt-0.5 text-blue-600"
                  size={20}
                />

                <div>
                  <p className="font-medium text-gray-800">
                    Date
                  </p>

                  <p className="text-sm text-gray-500">
                    {new Date(
                      `${selectedClass.class_date}T00:00:00`
                    ).toLocaleDateString(
                      "en-US",
                      {
                        weekday:
                          "long",
                        month:
                          "long",
                        day: "numeric",
                        year: "numeric",
                      }
                    )}
                  </p>
                </div>

              </div>

              <div className="flex gap-3">

                <Clock
                  className="mt-0.5 text-blue-600"
                  size={20}
                />

                <div>
                  <p className="font-medium text-gray-800">
                    Time
                  </p>

                  <p className="text-sm text-gray-500">
                    {formatTime(
                      selectedClass.start_time
                    )}{" "}
                    -
                    {formatTime(
                      selectedClass.end_time
                    )}
                  </p>
                </div>

              </div>

              {selectedClass.instructor && (
                <div className="flex gap-3">

                  <div className="text-blue-600">
                    👨‍🏫
                  </div>

                  <div>
                    <p className="font-medium text-gray-800">
                      Instructor
                    </p>

                    <p className="text-sm text-gray-500">
                      {
                        selectedClass.instructor
                      }
                    </p>
                  </div>

                </div>
              )}

              {getCourseName(
                selectedClass.course_id
              ) && (
                <div className="flex gap-3">

                  <BookOpenIcon />

                  <div>
                    <p className="font-medium text-gray-800">
                      Course
                    </p>

                    <p className="text-sm text-gray-500">
                      {getCourseName(
                        selectedClass.course_id
                      )}
                    </p>
                  </div>

                </div>
              )}

              {selectedClass.location && (
                <div className="flex gap-3">

                  <MapPin
                    className="text-blue-600"
                    size={20}
                  />

                  <div>
                    <p className="font-medium text-gray-800">
                      Location
                    </p>

                    <p className="text-sm text-gray-500">
                      {
                        selectedClass.location
                      }
                    </p>
                  </div>

                </div>
              )}

              {selectedClass.meeting_link && (
                <div className="flex gap-3">

                  <Video
                    className="text-blue-600"
                    size={20}
                  />

                  <div>
                    <p className="font-medium text-gray-800">
                      Online Class
                    </p>

                    <a
                      href={
                        selectedClass.meeting_link
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-blue-600 hover:underline"
                    >
                      Join class
                    </a>
                  </div>

                </div>
              )}

              {selectedClass.description && (
                <div className="rounded-xl bg-gray-50 p-4">

                  <p className="mb-1 font-medium text-gray-800">
                    Description
                  </p>

                  <p className="text-sm leading-6 text-gray-600">
                    {
                      selectedClass.description
                    }
                  </p>

                </div>
              )}

            </div>

            <div className="mt-7 flex gap-3">

              <button
                onClick={() =>
                  openEditModal(
                    selectedClass
                  )
                }
                className="flex flex-1 items-center justify-center gap-2 rounded-xl border px-4 py-3 font-semibold text-gray-700 hover:bg-gray-50"
              >
                <Pencil size={18} />
                Edit
              </button>

              <button
                onClick={() =>
                  deleteClass(
                    selectedClass.id
                  )
                }
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-3 font-semibold text-white hover:bg-red-700"
              >
                <Trash2 size={18} />
                Delete
              </button>

            </div>

          </div>

        </div>
      )}

      {/* Schedule/Edit Modal */}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/40 p-4">

          <div className="my-8 w-full max-w-2xl rounded-2xl bg-white shadow-xl">

            <div className="flex items-center justify-between border-b p-6">

              <div>

                <h2 className="text-2xl font-bold text-gray-800">
                  {editingClass
                    ? "Edit Class"
                    : "Schedule Class"}
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Add the details for
                  this class.
                </p>

              </div>

              <button
                onClick={() =>
                  setShowModal(false)
                }
                className="rounded-lg p-2 hover:bg-gray-100"
              >
                <X size={20} />
              </button>

            </div>

            <form
              onSubmit={saveClass}
                noValidate

              className="space-y-5 p-6"
            >

              {/* Title */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Class Title
                </label>

                <input
                  type="text"
                  value={form.title}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      title: e.target.value,
                    })
                  }
                  placeholder="e.g. React Fundamentals"
                  className="w-full rounded-xl border px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  required
                />

              </div>

              {/* Course */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Course
                </label>

                <select
                  value={form.course_id}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      course_id:
                        e.target.value,
                    })
                  }
                  className="w-full rounded-xl border bg-white px-4 py-3 outline-none focus:border-blue-500"
                >

                  <option value="">
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
                      >
                        {
                          course.title
                        }
                      </option>
                    )
                  )}

                </select>

              </div>

              {/* Instructor */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Instructor
                </label>

                <input
                  type="text"
                  value={
                    form.instructor
                  }
                  onChange={(e) =>
                    setForm({
                      ...form,
                      instructor:
                        e.target.value,
                    })
                  }
                  placeholder="Instructor name"
                  className="w-full rounded-xl border px-4 py-3 outline-none focus:border-blue-500"
                />

              </div>

              {/* Date */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Date
                </label>

                <input
                  type="date"
                  value={
                    form.class_date
                  }
                  onChange={(e) =>
                    setForm({
                      ...form,
                      class_date:
                        e.target.value,
                    })
                  }
                  className="w-full rounded-xl border px-4 py-3 outline-none focus:border-blue-500"
                  required
                />

              </div>

              {/* Time */}

              <div className="grid gap-4 sm:grid-cols-2">

                <div>

                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Start Time
                  </label>

                  <input
                    type="time"
                    value={
                      form.start_time
                    }
                    onChange={(e) =>
                      setForm({
                        ...form,
                        start_time:
                          e.target.value,
                      })
                    }
                    className="w-full rounded-xl border px-4 py-3 outline-none focus:border-blue-500"
                    required
                  />

                </div>

                <div>

                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    End Time
                  </label>

                  <input
                    type="time"
                    value={
                      form.end_time
                    }
                    onChange={(e) =>
                      setForm({
                        ...form,
                        end_time:
                          e.target.value,
                      })
                    }
                    className="w-full rounded-xl border px-4 py-3 outline-none focus:border-blue-500"
                    required
                  />

                </div>

              </div>

              {/* Location */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Location
                </label>

                <input
                  type="text"
                  value={
                    form.location
                  }
                  onChange={(e) =>
                    setForm({
                      ...form,
                      location:
                        e.target.value,
                    })
                  }
                  placeholder="e.g. Room 204"
                  className="w-full rounded-xl border px-4 py-3 outline-none focus:border-blue-500"
                />

              </div>

              {/* Meeting Link */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Meeting Link
                </label>

                <input
                  type="text"
                  value={
                    form.meeting_link
                  }
                  onChange={(e) =>
                    setForm({
                      ...form,
                      meeting_link:
                        e.target.value,
                    })

                  }
                  placeholder="https://meet.google.com/..."
                  className="w-full rounded-xl border px-4 py-3 outline-none focus:border-blue-500"
                />

              </div>

              {/* Description */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Description
                </label>

                <textarea
                  value={
                    form.description
                  }
                  onChange={(e) =>
                    setForm({
                      ...form,
                      description:
                        e.target.value,
                    })
                  }
                  rows={4}
                  placeholder="Describe what this class will cover..."
                  className="w-full resize-none rounded-xl border px-4 py-3 outline-none focus:border-blue-500"
                />

              </div>

              {/* Buttons */}

              <div className="flex gap-3 pt-2">

                <button
                  type="button"
                  onClick={() =>
                    setShowModal(false)
                  }
                  className="flex-1 rounded-xl border px-4 py-3 font-semibold text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex-1 rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white hover:bg-blue-700"
                >
                  {editingClass
                    ? "Update Class"
                    : "Schedule Class"}
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  );
}

function BookOpenIcon() {
  return (
    <div className="flex h-5 w-5 items-center justify-center text-blue-600">
      📚
    </div>
  );
}