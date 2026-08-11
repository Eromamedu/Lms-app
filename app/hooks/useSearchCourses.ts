"use client";

import { useEffect } from "react";
import { useSearch, type SearchResult } from "@/app/context/searchContext";

const fakeData: SearchResult[] = [
  {
    id: "1",
    title: "React Fundamentals",
    type: "course",
    url: "/dashboard/courses/react",
  },

  {
    id: "2",
    title: "JavaScript Basics",
    type: "course",
    url: "/dashboard/courses/javascript",
  },

  {
    id: "3",
    title: "HTML Masterclass",
    type: "course",
    url: "/dashboard/courses/html",
  },

  {
    id: "4",
    title: "CSS Flexbox",
    type: "lesson",
    url: "/dashboard/lessons/css",
  },

  {
    id: "5",
    title: "React Assignment",
    type: "assignment",
    url: "/dashboard/assignments",
  },

  {
    id: "6",
    title: "Final Examination",
    type: "assignment",
    url: "/dashboard/exam",
  }
];

export default function useSearchCourses() {
  const {
    search,
    setResults,
    setLoading,
  } = useSearch();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!search.trim()) {
        setResults([]);
        return;
      }

      setLoading(true);

    //   const filtered = fakeData.filter((item) =>
    //     item.title
    //       .toLowerCase()
    //       .includes(search.toLowerCase())
    //   );
    const filtered = fakeData.filter((item) => {
    const query = search.toLowerCase();

    return (
        item.title.toLowerCase().includes(query) ||
        item.type.toLowerCase().includes(query)
    );
});
      setResults(filtered);

      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [search, setResults, setLoading]);
}