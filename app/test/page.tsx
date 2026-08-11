// import { supabase } from "@/app/lib/supabase/client";

// export default async function TestPage() {
//   const { data } = await supabase.auth.getSession();

//   return (
//     <div className="p-10">
//       <pre>{JSON.stringify(data, null, 2)}</pre>
//     </div>
//   );
// }
"use client";


import {useState} from "react";
import {supabase} from "@/app/lib/supabase";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";


export default function RegisterPage(){

const router = useRouter();


const [loading,setLoading]=useState(false);


const [form,setForm]=useState({
name:"",
email:"",
password:""
});


const handleRegister: React.FormEventHandler<HTMLFormElement> = async (e) => {
e.preventDefault();

setLoading(true);



const {data,error}=await supabase.auth.signUp({

email:form.email,

password:form.password,

});



if(error){

toast.error(error.message);

setLoading(false);

return;

}



const user=data.user;



if(user){

await supabase
.from("profiles")
.insert({

id:user.id,

full_name:form.name,

email:form.email,

});

}



toast.success("Account created successfully");


router.push("/auth/login");


setLoading(false);


};



return(

<div className="min-h-screen flex items-center justify-center bg-slate-100">


<form
onSubmit={handleRegister}
className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md space-y-5"
>


<h1 className="text-3xl font-bold text-gray-700">
Create Account
</h1>



<input
className="border p-4 rounded-xl w-full text-gray-600 outline-none focus:border-blue-500 "
placeholder="Full Name"
onChange={(e)=>setForm({...form,name:e.target.value})}
/>


<input
className="border p-4 rounded-xl w-full text-gray-600 outline-none focus:border-blue-500"
placeholder="Email"
type="email"
onChange={(e)=>setForm({...form,email:e.target.value})}
/>



<input
className="border p-4 rounded-xl w-full text-gray-600 outline-none focus:border-blue-500"
placeholder="Password"
type="password"
onChange={(e)=>setForm({...form,password:e.target.value})}
/>



<button
className="bg-blue-600 text-white p-4 rounded-xl w-full"
>

{
loading?
"Creating..."
:
"Create Account"
}

</button>



</form>


</div>


)

}