"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { useSearch } from "@/app/context/searchContext";

export default function SearchResults() {
  const {
    results,
    loading,
    search,
    setResults,
  } = useSearch();

  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setResults([]);
      }
    }

    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [setResults]);

  if (!search) return null;

  return (
    <div
      ref={wrapperRef}
      className="absolute top-14 left-0 w-full rounded-xl border bg-white shadow-xl z-50 text-gray-500"
    >
      {loading && (
        <p className="p-4 text-sm">
          Searching...
        </p>
      )}

      {!loading && results.length === 0 && (
        <p className="p-4 text-gray-500">
          No results found
        </p>
      )}

      {!loading &&
        results.map((item) => (
          <Link
            key={item.id}
            href={item.url}
            className="flex justify-between border-b px-4 py-3 hover:bg-gray-100"
          >
            <span>{item.title}</span>

            <span className="text-xs capitalize text-gray-500">
              {item.type}
            </span>
          </Link>
        ))}
    </div>
  );
}

// "use client";
// import { useState, useRef, useEffect } from "react";
// import Link from "next/link";
// import { useSearch } from "@/app/context/searchContext";
// export default function SearchResults() {
//   const {
//     results,
//     loading,
//     search,
//     setResults
//   } = useSearch();
// const wrapperRef = useRef<HTMLDivElement>(null);
// useEffect(() => {
//   function handleClick(event: MouseEvent) {
//     if (
//       wrapperRef.current &&
//       !wrapperRef.current.contains(event.target as Node)
//     ) {
//       setResults([]);
//     }
//   }
//   if (!search) return null; 




//   document.addEventListener("mousedown", handleClick);

//   return () =>
//     document.removeEventListener(
//       "mousedown",
//       handleClick
//     );
// }, [setResults]);
//   return (
//     <div 
//       ref={wrapperRef}
//     className="absolute top-14 left-0 w-full rounded-xl border bg-white shadow-xl z-50">

//       {loading && (
//         <p className="p-4 text-sm">
//           Searching...
//         </p>
//       )}

//       {!loading && results.length === 0 && (
//         <p className="p-4 text-gray-500">
//           No results found
//         </p>
//       )}

//       {!loading &&
//         results.map((item) => (
//           <Link
//             key={item.id}
//             href={item.url}
//             className="flex justify-between border-b px-4 py-3 hover:bg-gray-100"
//           >
//             <span>{item.title}</span>

//             <span className="text-xs capitalize text-gray-500">
//               {item.type}
//             </span>
//           </Link>
//         ))}
//     </div>
//   );
// }