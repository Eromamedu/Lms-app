"use client";

import { useState } from "react";
import { supabase } from "@/app/lib/supabase";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import {
  User,
  Mail,
  Phone,
  Calendar,
  Lock,
  Eye,
  EyeOff,
  FileText,
} from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    date_of_birth: "",
    gender: "",
    bio: "",
    password: "",
    confirmPassword: "",
  });

  const handleRegister: React.FormEventHandler<
    HTMLFormElement
  > = async (e) => {
    e.preventDefault();

    if (
      !form.name ||
      !form.email ||
      !form.phone ||
      !form.date_of_birth ||
      !form.gender ||
      !form.password ||
      !form.confirmPassword
    ) {
      toast.error("Please fill all required fields.");
      return;
    }

    if (form.password.length < 6) {
      toast.error(
        "Password must be at least 6 characters."
      );
      return;
    }

    if (
      form.password !== form.confirmPassword
    ) {
      toast.error("Passwords do not match.");
      return;
    }

    setLoading(true);

    const { data, error } =
      await supabase.auth.signUp({
        email: form.email,
        password: form.password,
      });

    if (error) {
      toast.error(error.message);
      setLoading(false);
      return;
    }

    const user = data.user;

    if (user) {
      const { error: profileError } =
        await supabase
          .from("profiles")
          .insert({
            id: user.id,
            full_name: form.name,
            email: form.email,
            phone: form.phone,
            date_of_birth:
              form.date_of_birth,
            gender: form.gender,
            bio: form.bio,
          });

      if (profileError) {
        toast.error(profileError.message);
        setLoading(false);
        return;
      }
    }

    toast.success(
      "Account created successfully!"
    );

    router.push("/auth/login");

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-slate-100 flex items-center justify-center px-6 py-10 text-gray-600">

      <div className="w-full max-w-4xl">

        <div className="bg-white rounded-3xl shadow-xl p-10 md:p-12">

          <div className="mb-8">

            <h1 className="text-3xl font-bold text-gray-800">
              Create Your Account
            </h1>

            <p className="text-gray-500 mt-2">
              Join our Learning Management
              System and start your learning
              journey.
            </p>

          </div>

          <form
            onSubmit={handleRegister}
            className="space-y-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}

<div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Full Name *
  </label>

  <div className="relative">
    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />

    <input
      type="text"
      placeholder="John Doe"
      required
      value={form.name}
      onChange={(e) =>
        setForm({
          ...form,
          name: e.target.value,
        })
      }
      className="w-full rounded-xl border border-gray-300 py-3 pl-12 pr-4 outline-none focus:border-blue-600"
    />
  </div>
</div>

{/* Email */}

<div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Email Address *
  </label>

  <div className="relative">
    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />

    <input
      type="email"
      required
      placeholder="john@email.com"
      value={form.email}
      onChange={(e) =>
        setForm({
          ...form,
          email: e.target.value,
        })
      }
      className="w-full rounded-xl border border-gray-300 py-3 pl-12 pr-4 outline-none focus:border-blue-600"
    />
  </div>
</div>

{/* Phone */}

<div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Phone Number *
  </label>

  <div className="relative">
    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />

    <input
      type="tel"
      required
      placeholder="08012345678"
      value={form.phone}
      onChange={(e) =>
        setForm({
          ...form,
          phone: e.target.value,
        })
      }
      className="w-full rounded-xl border border-gray-300 py-3 pl-12 pr-4 outline-none focus:border-blue-600"
    />
  </div>
</div>

{/* Date of Birth */}

<div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Date of Birth *
  </label>

  <div className="relative">
    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />

    <input
      type="date"
      required
      value={form.date_of_birth}
      onChange={(e) =>
        setForm({
          ...form,
          date_of_birth: e.target.value,
        })
      }
      className="w-full rounded-xl border border-gray-300 py-3 pl-12 pr-4 outline-none focus:border-blue-600"
    />
  </div>
</div>

{/* Gender */}

<div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Gender *
  </label>

  <select
    required
    value={form.gender}
    onChange={(e) =>
      setForm({
        ...form,
        gender: e.target.value,
      })
    }
    className="w-full rounded-xl border border-gray-300 py-3 px-4 outline-none focus:border-blue-600"
  >
    <option value="">Select Gender</option>
    <option value="Male">Male</option>
    <option value="Female">Female</option>
    <option value="Prefer not to say">
      Prefer not to say
    </option>
  </select>
</div>


{/* Password */}

<div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Password *
  </label>

  <div className="relative">
    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />

    <input
      type={showPassword ? "text" : "password"}
      required
      placeholder="Enter your password"
      value={form.password}
      onChange={(e) =>
        setForm({
          ...form,
          password: e.target.value,
        })
      }
      className="w-full rounded-xl border border-gray-300 py-3 pl-12 pr-12 outline-none focus:border-blue-600"
    />

    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
    >
      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
    </button>
  </div>
</div>

{/* Confirm Password */}

<div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Confirm Password *
  </label>

  <div className="relative">
    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />

    <input
      type={showConfirmPassword ? "text" : "password"}
      required
      placeholder="Confirm your password"
      value={form.confirmPassword}
      onChange={(e) =>
        setForm({
          ...form,
          confirmPassword: e.target.value,
        })
      }
      className="w-full rounded-xl border border-gray-300 py-3 pl-12 pr-12 outline-none focus:border-blue-600"
    />

    <button
      type="button"
      onClick={() =>
        setShowConfirmPassword(!showConfirmPassword)
      }
      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
    >
      {showConfirmPassword ? (
        <EyeOff size={20} />
      ) : (
        <Eye size={20} />
      )}
    </button>
  </div>
</div>
</div>
{/* Create Account Button */}
{/* Bio */}

<div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Short Bio
  </label>

  <div className="relative">
    <FileText className="absolute left-4 top-4 text-gray-400 w-5 h-5" />

    <textarea
      rows={4}
      placeholder="Tell us about yourself..."
      value={form.bio}
      onChange={(e) =>
        setForm({
          ...form,
          bio: e.target.value,
        })
      }
      className="w-full rounded-xl border border-gray-300 py-3 pl-12 pr-4 outline-none focus:border-blue-600 resize-none"
    />
  </div>
</div>
{/* <button
  type="submit"
  disabled={loading}
  className="w-full rounded-xl bg-blue-600 py-4 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
>
  {loading ? "Creating Account..." : "Create Account"}
</button> */}
<div className="pt-4">

<button
type="submit"
disabled={loading}
className="w-full rounded-xl bg-blue-600 py-4 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
>

{loading ? "Creating Account..." : "Create Account"}

</button>

</div>

{/* Login Link */}

<p className="text-center text-gray-500">
  Already have an account?

  <a
    href="/auth/login"
    className="ml-2 font-semibold text-blue-600 hover:underline"
  >
    Sign In
  </a>
</p>
          </form>
          </div>

</div>

</main>
)}