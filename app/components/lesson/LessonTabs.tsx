"use client";

import { useState } from "react";

const tabs = [
  "Overview",
  "Resources",
  "Notes",
  "Discussion",
];

export default function LessonTabs() {
  const [active, setActive] = useState("Overview");

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">

      <div className="flex gap-3 border-b">

        {tabs.map((tab) => (

          <button
            key={tab}
            onClick={() => setActive(tab)}
            className={`border-b-2 px-5 py-3 transition ${
              active === tab
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-slate-500"
            }`}
          >
            {tab}
          </button>

        ))}

      </div>

      <div className="mt-6">

        <p className="leading-8 text-slate-600">

          This lesson teaches modern React Hooks
          including useState, useEffect,
          useMemo and useCallback.

        </p>

      </div>

    </div>
  );
}