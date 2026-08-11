"use client";
import { supabase } from "@/app/lib/supabase";
import { useRouter } from "next/navigation";
import { Mail, Lock } from "lucide-react";
import { useState } from "react";
import { Eye } from "lucide-react";
import { EyeOff } from "lucide-react";
import toast from "react-hot-toast";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import Card from "@/app/components/ui/Card";
import Button from "@/app/components/ui/button";
import Input from "@/app/components/ui/Input";
import Logo from "@/app/components/ui/Logo";
import Heading from "@/app/components/ui/Heading";
import { LoginSchema, LoginType } from "@/app/lib/validation";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginType>({
    resolver: zodResolver(LoginSchema),
  });
  const router = useRouter();
  const onSubmit = async (data: LoginType) => {


const {error}=await supabase.auth.signInWithPassword({

email:data.email,

password:data.password

});



if(error){

toast.error(error.message);

return;

}



toast.success("Login Successful");


router.push("/auth/dashboard");


};
//   const onSubmit = async (data: LoginType) => {
//     console.log(data);

//     toast.success("Login Successful");
//   };
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-100 px-6">
      <div className="w-full max-w-md">
        <div className="mb-8">
          <Logo />
        </div>

        <Card>
          <Heading
            title="Welcome Back"
            subtitle="Sign in to continue learning."
          />

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Input
              label="Email"
              icon={Mail}
              type="email"
              {...register("email")}
              placeholder="Enter your email"
              className="w-full bg-transparent p-4 outline-none text-gray-600"
            />
            <p className="text-sm text-red-500">{errors.email?.message}</p>

            <div className="relative">
  <label className="block mb-2 text-sm font-medium text-gray-700">
    Password
  </label>

  <div className="relative border rounded-xl focus-within:border-blue-600">
    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />

    <input
      type={showPassword ? "text" : "password"}
      placeholder="Password"
      {...register("password")}
      className="w-full pl-12 pr-5 py-4 rounded-xl outline-none text-gray-600"
    />

    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
    >
      {showPassword && <Eye size={20} />}
    </button>
  </div>
</div>

            <p className="text-sm text-red-500">{errors.password?.message}</p>
            <Button disabled={isSubmitting}>
              {isSubmitting ? "Signing In..." : "Login"}
            </Button>
            <p className="text-center text-sm text-gray-500">

Don&apos;t have an account?

<a
href="/auth/register"
className="text-blue-600 font-semibold ml-2"
>

Create Account

</a>

</p>
          </form>
        </Card>
      </div>
    </main>
  );
}
