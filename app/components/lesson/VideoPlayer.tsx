export default function VideoPlayer() {
  return (
    <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 shadow-xl">

      <div className="flex aspect-video flex-col items-center justify-center text-white">

        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-blue-600 text-3xl shadow-lg">
          ▶
        </div>

        <h2 className="text-2xl font-semibold">
          React Hooks Explained
        </h2>

        <p className="mt-2 text-slate-300">
          Lesson 12 • 24 Minutes
        </p>

      </div>

    </div>
  );
}
// export default function VideoPlayer() {
//   return (
//     <div className="overflow-hidden rounded-2xl bg-black shadow-lg">

//       <div className="flex aspect-video items-center justify-center">

//         <p className="text-2xl text-white">

//           ▶ Lesson Video

//         </p>

//       </div>

//     </div>
//   );
// }