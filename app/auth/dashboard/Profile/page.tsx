"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabase";
import { useUser } from "@/app/context/UseContext";
import { toast } from "react-hot-toast";

import {
  User,
  Mail,
  Phone,
  Calendar,
  FileText,
  Pencil,
  Save,
} from "lucide-react";

type Profile = {
  full_name: string;
  email: string;
  phone: string;
  date_of_birth: string;
  gender: string;
  bio: string;
};

export default function ProfilePage() {
  const { user, loading } = useUser();

  const [editingPhone, setEditingPhone] = useState(false);

  const [profile, setProfile] = useState<Profile>({
    full_name: "",
    email: "",
    phone: "",
    date_of_birth: "",
    gender: "",
    bio: "",
  });

  const [originalPhone, setOriginalPhone] = useState("");

  useEffect(() => {
    if (!user) return;

    async function fetchProfile() {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user?.id)
        .single();

      if (error) {
        toast.error(error.message);
        return;
      }

      setProfile({
        full_name: data.full_name ?? "",
        email: data.email ?? "",
        phone: data.phone ?? "",
        date_of_birth: data.date_of_birth ?? "",
        gender: data.gender ?? "",
        bio: data.bio ?? "",
      });

      setOriginalPhone(data.phone ?? "");
    }

    fetchProfile();
  }, [user]);

  async function savePhoneNumber() {
    if (!user) return;

    const { error } = await supabase
      .from("profiles")
      .update({
        phone: profile.phone,
      })
      .eq("id", user.id);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Phone number updated successfully");

    setOriginalPhone(profile.phone);
    setEditingPhone(false);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <p className="text-gray-500 text-lg">
          Loading profile...
        </p>
      </div>
    );
  }

  const initials = profile.full_name
    ? profile.full_name
        .split(" ")
        .map((name) => name[0])
        .join("")
        .substring(0, 2)
        .toUpperCase()
    : "U";

  return (
    <div className="mx-auto max-w-6xl space-y-8 p-6">

      {/* Page Header */}

      <div>

        <h1 className="text-3xl font-bold text-gray-900">
          My Profile
        </h1>

        <p className="mt-2 text-gray-500">
          View your personal information and keep your contact
          details up to date.
        </p>

      </div>

      {/* Profile Card */}

      <div className="overflow-hidden rounded-3xl bg-white shadow-lg border">

        {/* Blue Header */}

        <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-700" />

        {/* Avatar Section */}

        <div className="-mt-14 flex flex-col items-center pb-8">

          <div className="flex h-28 w-28 items-center justify-center rounded-full border-4 border-white bg-blue-600 text-3xl font-bold text-white shadow-lg">
            {initials}
          </div>

          <h2 className="mt-4 text-2xl font-bold text-gray-800">
            {profile.full_name}
          </h2>

          <p className="text-gray-500">
            Student
          </p>

        </div>

        {/* Information Section */}

        < div className="grid gap-6 px-8 pb-10 md:grid-cols-2">
                  {/* Full Name */}

          <div className="rounded-2xl border border-gray-200 p-5">
            <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-600">
              <User size={18} />
              Full Name
            </div>

            <p className="text-lg  text-gray-600">
              {profile.full_name}
            </p>
          </div>

          {/* Email */}

          <div className="rounded-2xl border border-gray-200 p-5">
            <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-600">
              <Mail size={18} />
              Email Address
            </div>

            <p className="break-all text-lg  text-gray-600">
              {profile.email}
            </p>
          </div>

          {/* Phone */}

          <div className="rounded-2xl border border-gray-200 p-5">
            <div className="mb-3 flex items-center justify-between">

              <div className="flex items-center gap-2 text-sm font-semibold text-gray-600">
                <Phone size={18} />
                Phone Number
              </div>

              {!editingPhone && (
                <button
                  onClick={() => setEditingPhone(true)}
                  className="rounded-lg p-2 transition hover:bg-gray-100"
                >
                  <Pencil
                    size={18}
                    className="text-blue-600"
                  />
                </button>
              )}
            </div>

            {editingPhone ? (
              <input
                type="tel"
                value={profile.phone}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    phone: e.target.value,
                  })
                }
                className="w-full rounded-xl border  p-3 outline-none focus:border-blue-600"
              />
            ) : (
              <p className="text-lg  text-gray-600">
                {profile.phone || "Not provided"}
              </p>
            )}
          </div>

          {/* Date of Birth */}

          <div className="rounded-2xl border border-gray-200 p-5">
            <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-600">
              <Calendar size={18} />
              Date of Birth
            </div>

            <p className="text-lg text-gray-600">
              {profile.date_of_birth || "Not provided"}
            </p>
          </div>

          {/* Gender */}

          <div className="rounded-2xl border border-gray-200 p-5">
            <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-600">
              <User size={18} />
              Gender
            </div>

            <p className="text-lg text-gray-600">
              {profile.gender || "Not provided"}
            </p>
          </div>

          {/* Bio */}

          <div className="rounded-2xl border border-gray-200 p-5 md:col-span-2">
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-600">
              <FileText size={18} />
              About Me
            </div>

            <p className=" text-gray-800">
              {profile.bio || "No bio available."}
            </p>
          </div>

          {/* Save Button */}

          {editingPhone && (
            <div className="md:col-span-2 flex justify-end gap-4 mt-2">

              <button
                onClick={() => {
                  setProfile({
                    ...profile,
                    phone: originalPhone,
                  });
                  setEditingPhone(false);
                }}
                className="rounded-xl border border-gray-300 px-6 py-3 font-medium text-gray-700 transition hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                onClick={savePhoneNumber}
                className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
              >
                <Save size={18} />
                Save Phone Number
              </button>

            </div>
          )}

        </div>

      </div>

    </div>
  );
}
















        

// "use client";

// import { useEffect, useState } from "react";
// import { supabase } from "@/app/lib/supabase";
// import { useUser } from "@/app/context/UseContext";
// import { toast } from "react-hot-toast";
// import {
//   User,
//   Mail,
//   Phone,
//   Calendar,
//   FileText,
//   Pencil,
//   Save,
// } from "lucide-react";
// // import { User, Phone, Calendar, Mail } from "lucide-react";

// type Profile = {
//   full_name: string;
//   email: string;
//   phone: string;
//   date_of_birth: string;
//   gender: string;
//   bio: string;
// };

// export default function ProfilePage() {
//   const { user, loading } = useUser();
//   const [editingPhone, setEditingPhone] = useState(false);

//   const [profile, setProfile] = useState<Profile>({
//     full_name: "",
//     email: "",
//     phone: "",
//     date_of_birth: "",
//     gender: "",
//     bio: "",
//   });

//   const [originalProfile, setOriginalProfile] = useState(profile);

//   //   const [loading, setLoading] = useState(true);

//   //   useEffect(() => {
//   //       if (!user) {
//   //     setLoading(false);
//   //     return;

//   //     async function getProfile() {
//   //       const { data, error } = await supabase
//   //         .from("profiles")
//   //         .select("*")
//   //         .eq("id", user.id)
//   //         .single();

//   //       if (error) {
//   //         toast.error(error.message);
//   //         return;
//   //       }

//   //       const profileData = {
//   //         full_name: data.full_name ?? "",
//   //         email: data.email ?? "",
//   //         phone: data.phone ?? "",
//   //         date_of_birth: data.date_of_birth ?? "",
//   //         gender: data.gender ?? "",
//   //         bio: data.bio ?? "",
//   //       };

//   //       setProfile(profileData);
//   //       setOriginalProfile(profileData);
//   //       setLoading(false);
//   //     }

//   //     getProfile();
//   //   }, [user]);

//   useEffect(() => {
//     if (!user) {
//       // setLoading(false);
//       return;
//     }

//     async function getProfile() {
//       const { data, error } = await supabase
//         .from("profiles")
//         .select("*")
//         .eq("id", user!.id)
//         .single();

//       if (error) {
//         toast.error(error.message);
//         //   setLoading(false);
//         //   return;
//       }

//       const profileData = {
//         full_name: data.full_name ?? "",
//         email: data.email ?? "",
//         phone: data.phone ?? "",
//         date_of_birth: data.date_of_birth ?? "",
//         gender: data.gender ?? "",
//         bio: data.bio ?? "",
//       };

//       setProfile(profileData);
//       setOriginalProfile(profileData);
//       // setLoading(false);
//     }

//     getProfile();
//   }, [user]);
//   const hasChanges =
//     JSON.stringify(profile) !== JSON.stringify(originalProfile);

//   async function saveProfile() {
//     if (!user) return;

//     const { error } = await supabase
//       .from("profiles")
//       .update(profile)
//       .eq("id", user.id);

//     if (error) {
//       toast.error(error.message);
//       return;
//     }

//     toast.success("Profile updated successfully");

//     setOriginalProfile(profile);
//   }

//   if (loading) {
//     return <div className="text-center py-20">Loading profile...</div>;
//   }

//   return (
//     <div className="mx-auto max-w-5xl space-y-8">
//       <div>
//         <h1 className="text-3xl font-bold text-gray-800">My Profile</h1>

//         <p className="mt-2 text-gray-500">Manage your personal information.</p>
//       </div>

//       <div className="rounded-2xl border bg-white p-8 shadow-sm">
//         <div className="grid gap-6 md:grid-cols-2">
//           <div>
//             <label className="mb-2 block text-sm font-medium">Full Name</label>

//             <input
//               value={profile.full_name}
//               onChange={(e) =>
//                 setProfile({
//                   ...profile,
//                   full_name: e.target.value,
//                 })
//               }
//               className="w-full rounded-lg border p-3"
//             />
//           </div>

//           <div>
//             <label className="mb-2 block text-sm font-medium">Email</label>

//             <input
//               value={profile.email}
//               disabled
//               className="w-full rounded-lg border bg-gray-100 p-3"
//             />
//           </div>

//           <div>
//             <label className="mb-2 block text-sm font-medium">
//               Phone Number
//             </label>

//             <input
//               value={profile.phone}
//               onChange={(e) =>
//                 setProfile({
//                   ...profile,
//                   phone: e.target.value,
//                 })
//               }
//               placeholder="08012345678"
//               className="w-full rounded-lg border p-3"
//             />
//           </div>

//           <div>
//             <label className="mb-2 block text-sm font-medium">
//               Date of Birth
//             </label>

//             <input
//               type="date"
//               value={profile.date_of_birth}
//               onChange={(e) =>
//                 setProfile({
//                   ...profile,
//                   date_of_birth: e.target.value,
//                 })
//               }
//               className="w-full rounded-lg border p-3"
//             />
//           </div>

//           <div>
//             <label className="mb-2 block text-sm font-medium">Gender</label>

//             <select
//               value={profile.gender}
//               onChange={(e) =>
//                 setProfile({
//                   ...profile,
//                   gender: e.target.value,
//                 })
//               }
//               className="w-full rounded-lg border p-3"
//             >
//               <option value="">Select Gender</option>
//               <option>Male</option>
//               <option>Female</option>
//             </select>
//           </div>

//           <div className="md:col-span-2">
//             <label className="mb-2 block text-sm font-medium">Bio</label>

//             <textarea
//               rows={5}
//               value={profile.bio}
//               onChange={(e) =>
//                 setProfile({
//                   ...profile,
//                   bio: e.target.value,
//                 })
//               }
//               className="w-full rounded-lg border p-3"
//               placeholder="Tell us something about yourself..."
//             />
//           </div>
//         </div>

//         {hasChanges && (
//           <div className="mt-8 flex justify-end">
//             <button
//               onClick={saveProfile}
//               className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
//             >
//               Save Changes
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
