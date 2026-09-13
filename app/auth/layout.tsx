import { Toaster } from "react-hot-toast";
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-slate-100 bg-gray-900">
      {children}
   <Toaster
    position="top-right"
    reverseOrder={false}
/>
    </main>
  );
}