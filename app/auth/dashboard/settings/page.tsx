"use client";

import { useEffect, useState } from "react";
import {
  Settings,
  User,
  Bell,
  Palette,
  BookOpen,
  Shield,
  LogOut,
  Trash2,
  Save,
  Lock,
  Mail,
  Moon,
  Sun,
  Eye,
  EyeOff,
  Loader2,
  Sparkles,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";
import toast from "react-hot-toast";

import { supabase } from "@/app/lib/supabase";

interface UserSettings {
  id?: string;
  user_id: string;

  email_notifications: boolean;
  class_reminders: boolean;
  assignment_notifications: boolean;
  course_announcements: boolean;

  dark_mode: boolean;

  language: string;
  timezone: string;

  learning_reminders: boolean;
}

/*
==================================================
LANGUAGE
==================================================
*/

function applyLanguage(language: string) {
  if (typeof window === "undefined") return;

  const languageMap: Record<string, string> = {
    English: "en",
    French: "fr",
    Spanish: "es",
  };

  const locale = languageMap[language] ?? "en";

  /*
  Change the HTML language attribute
  */

  document.documentElement.lang = locale;

  /*
  Remember language immediately
  */

  localStorage.setItem(
    "lms-language",
    language
  );

  /*
  Tell the rest of the application
  that the language changed.
  */

  window.dispatchEvent(
    new CustomEvent("lms-language-change", {
      detail: {
        language,
        locale,
      },
    })
  );
}

/*
==================================================
TIMEZONE
==================================================
*/

function applyTimezone(timezone: string) {
  if (typeof window === "undefined") return;

  /*
  Remember timezone immediately
  */

  localStorage.setItem(
    "lms-timezone",
    timezone
  );

  /*
  Tell the rest of the application
  that timezone changed.
  */

  window.dispatchEvent(
    new CustomEvent("lms-timezone-change", {
      detail: {
        timezone,
      },
    })
  );
}

/*
==================================================
SETTINGS PAGE
==================================================
*/

export default function SettingsPage() {
  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [userId, setUserId] =
    useState<string | null>(null);

  const [fullName, setFullName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [settings, setSettings] =
    useState<UserSettings | null>(null);

  /*
  ==================================================
  PASSWORD
  ==================================================
  */

  const [showPasswordModal, setShowPasswordModal] =
    useState(false);

  const [newPassword, setNewPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [changingPassword, setChangingPassword] =
    useState(false);

  /*
  ==================================================
  DELETE ACCOUNT
  ==================================================
  */

  const [deletingAccount, setDeletingAccount] =
    useState(false);

  /*
  ==================================================
  LOAD SETTINGS
  ==================================================
  */

  useEffect(() => {
    loadSettings();
  }, []);

  async function loadSettings() {
    try {
      setLoading(true);

      /*
      ==============================================
      GET LOGGED-IN USER
      ==============================================
      */

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        toast.error("Please log in first.");
        return;
      }

      setUserId(user.id);

      setEmail(user.email ?? "");

      /*
      ==============================================
      LOAD PROFILE
      ==============================================
      */

      const {
        data: profile,
        error: profileError,
      } = await supabase
        .from("profiles")
        .select(
          "full_name, email, phone"
        )
        .eq("id", user.id)
        .maybeSingle();

      if (profileError) {
        console.error(
          "PROFILE LOAD ERROR:",
          profileError
        );
      }

      if (profile) {
        setFullName(
          profile.full_name ?? ""
        );

        setEmail(
          profile.email ??
            user.email ??
            ""
        );

        setPhone(
          profile.phone ?? ""
        );
      }

      /*
      ==============================================
      LOAD USER SETTINGS
      ==============================================
      */

      const {
        data: userSettings,
        error: settingsError,
      } = await supabase
        .from("user_settings")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      if (settingsError) {
        console.error(
          "SETTINGS LOAD ERROR:",
          settingsError
        );

        toast.error(
          "Failed to load your settings."
        );

        return;
      }

      /*
      ==============================================
      CREATE DEFAULT SETTINGS
      ==============================================
      */

      if (!userSettings) {
        const defaultSettings: UserSettings = {
          user_id: user.id,

          email_notifications: true,

          class_reminders: true,

          assignment_notifications: true,

          course_announcements: true,

          dark_mode: false,

          language: "English",

          timezone: "Africa/Lagos",

          learning_reminders: true,
        };

        const {
          data: createdSettings,
          error: createError,
        } = await supabase
          .from("user_settings")
          .insert(defaultSettings)
          .select()
          .single();

        if (createError) {
          console.error(
            "CREATE SETTINGS ERROR:",
            createError
          );

          toast.error(
            "Failed to create your settings."
          );

          return;
        }

        setSettings(createdSettings);

        /*
        Apply preferences immediately
        */

        applyDarkMode(
          createdSettings.dark_mode
        );

        applyLanguage(
          createdSettings.language
        );

        applyTimezone(
          createdSettings.timezone
        );
      } else {
        setSettings(userSettings);

        /*
        Apply saved preferences
        */

        applyDarkMode(
          userSettings.dark_mode
        );

        applyLanguage(
          userSettings.language
        );

        applyTimezone(
          userSettings.timezone
        );
      }
    } catch (error) {
      console.error(
        "SETTINGS PAGE ERROR:",
        error
      );

      toast.error(
        "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  }

  /*
  ==================================================
  UPDATE SETTING
  ==================================================
  */

  function updateSetting(
    field: keyof UserSettings,
    value: boolean | string
  ) {
    /*
    Update React state
    */

    setSettings((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        [field]: value,
      };
    });

    /*
    ==============================================
    DARK MODE
    ==============================================
    */

    if (
      field === "dark_mode" &&
      typeof value === "boolean"
    ) {
      applyDarkMode(value);
    }

    /*
    ==============================================
    LANGUAGE
    ==============================================
    */

    if (
      field === "language" &&
      typeof value === "string"
    ) {
      applyLanguage(value);

      toast.success(
        `Language changed to ${value}`
      );
    }

    /*
    ==============================================
    TIMEZONE
    ==============================================
    */

    if (
      field === "timezone" &&
      typeof value === "string"
    ) {
      applyTimezone(value);

      toast.success(
        "Timezone updated"
      );
    }
  }

  /*
  ==================================================
  DARK MODE
  ==================================================
  */

  function applyDarkMode(
    enabled: boolean
  ) {
    if (
      typeof document === "undefined"
    ) {
      return;
    }

    if (enabled) {
      document.documentElement.classList.add(
        "dark"
      );

      localStorage.setItem(
        "lms-dark-mode",
        "true"
      );
    } else {
      document.documentElement.classList.remove(
        "dark"
      );

      localStorage.setItem(
        "lms-dark-mode",
        "false"
      );
    }
  }

  /*
  ==================================================
  SAVE ALL SETTINGS
  ==================================================
  */

  async function saveSettings() {
    if (!userId || !settings) {
      toast.error(
        "Unable to save settings."
      );

      return;
    }

    try {
      setSaving(true);

      /*
      ==============================================
      UPDATE PROFILE
      ==============================================
      */

      const {
        error: profileError,
      } = await supabase
        .from("profiles")
        .update({
          full_name:
            fullName.trim(),

          phone:
            phone.trim() || null,
        })
        .eq("id", userId);

      if (profileError) {
        console.error(
          "PROFILE UPDATE ERROR:",
          profileError
        );

        toast.error(
          "Failed to update profile."
        );

        return;
      }

      /*
      ==============================================
      SAVE SETTINGS
      ==============================================
      */

      const settingsToSave = {
        user_id: userId,

        email_notifications:
          settings.email_notifications,

        class_reminders:
          settings.class_reminders,

        assignment_notifications:
          settings.assignment_notifications,

        course_announcements:
          settings.course_announcements,

        dark_mode:
          settings.dark_mode,

        language:
          settings.language,

        timezone:
          settings.timezone,

        learning_reminders:
          settings.learning_reminders,

        updated_at:
          new Date().toISOString(),
      };

      const {
        data: savedSettings,
        error: settingsError,
      } = await supabase
        .from("user_settings")
        .upsert(
          settingsToSave,
          {
            onConflict: "user_id",
          }
        )
        .select()
        .single();

      if (settingsError) {
        console.error(
          "SETTINGS UPDATE ERROR:",
          settingsError
        );

        toast.error(
          "Failed to save settings."
        );

        return;
      }

      /*
      ==============================================
      UPDATE STATE
      ==============================================
      */

      setSettings(savedSettings);

      /*
      ==============================================
      APPLY ALL SETTINGS
      ==============================================
      */

      applyDarkMode(
        savedSettings.dark_mode
      );

      applyLanguage(
        savedSettings.language
      );

      applyTimezone(
        savedSettings.timezone
      );

      toast.success(
        "Settings saved successfully!"
      );
    } catch (error) {
      console.error(
        "SAVE SETTINGS ERROR:",
        error
      );

      toast.error(
        "Something went wrong."
      );
    } finally {
      setSaving(false);
    }
  }

  /*
  ==================================================
  CHANGE PASSWORD
  ==================================================
  */

  async function changePassword() {
    if (!newPassword) {
      toast.error(
        "Please enter a new password."
      );

      return;
    }

    if (newPassword.length < 6) {
      toast.error(
        "Password must be at least 6 characters."
      );

      return;
    }

    if (
      newPassword !== confirmPassword
    ) {
      toast.error(
        "Passwords do not match."
      );

      return;
    }

    try {
      setChangingPassword(true);

      const { error } =
        await supabase.auth.updateUser({
          password: newPassword,
        });

      if (error) {
        console.error(
          "PASSWORD ERROR:",
          error
        );

        toast.error(
          error.message
        );

        return;
      }

      toast.success(
        "Password changed successfully!"
      );

      setNewPassword("");
      setConfirmPassword("");

      setShowPasswordModal(false);
    } catch (error) {
      console.error(
        "PASSWORD CHANGE ERROR:",
        error
      );

      toast.error(
        "Failed to change password."
      );
    } finally {
      setChangingPassword(false);
    }
  }

  /*
  ==================================================
  SIGN OUT
  ==================================================
  */

  async function signOut() {
    const confirmed =
      window.confirm(
        "Are you sure you want to sign out?"
      );

    if (!confirmed) return;

    const { error } =
      await supabase.auth.signOut();

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success(
      "Signed out successfully."
    );

    window.location.href =
      "/auth/login";
  }

  /*
  ==================================================
  DELETE ACCOUNT
  ==================================================
  */

  async function deleteAccount() {
    const confirmed =
      window.confirm(
        "WARNING: This will permanently delete your account and account data. This cannot be undone. Are you absolutely sure?"
      );

    if (!confirmed) return;

    const secondConfirmation =
      window.confirm(
        "Please confirm again that you want to permanently delete your LMS account."
      );

    if (!secondConfirmation) return;

    try {
      setDeletingAccount(true);

      const {
        data: {
          session,
        },
      } =
        await supabase.auth.getSession();

      if (!session?.access_token) {
        toast.error(
          "Your session has expired. Please log in again."
        );

        return;
      }

      const response =
        await fetch(
          "/api/account/delete",
          {
            method: "DELETE",

            headers: {
              Authorization:
                `Bearer ${session.access_token}`,
            },
          }
        );

      const result =
        await response.json();

      if (!response.ok) {
        console.error(
          "DELETE ACCOUNT ERROR:",
          result
        );

        toast.error(
          result.error ??
            "Failed to delete account."
        );

        return;
      }

      toast.success(
        "Your account has been deleted."
      );

      window.location.href =
        "/auth/login";
    } catch (error) {
      console.error(
        "ACCOUNT DELETE ERROR:",
        error
      );

      toast.error(
        "Something went wrong while deleting your account."
      );
    } finally {
      setDeletingAccount(false);
    }
  }

  /*
  ==================================================
  LOADING
  ==================================================
  */

  if (loading) {
    return (
      <div className="lms-background relative flex min-h-[70vh] items-center justify-center overflow-hidden">
        <div className="pointer-events-none absolute -left-24 top-20 h-72 w-72 rounded-full bg-blue-600/10 blur-3xl" />

        <div className="pointer-events-none absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-purple-600/10 blur-3xl" />

        <div className="relative z-10 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-400/20 bg-gradient-to-br from-blue-600/20 via-cyan-500/10 to-purple-600/20 shadow-[0_0_40px_rgba(34,211,238,0.15)]">
            <Settings
              size={28}
              className="animate-spin text-cyan-300"
            />
          </div>

          <p className="mt-5 text-sm font-medium text-slate-400">
            Loading your settings...
          </p>

          <div className="mx-auto mt-3 h-1 w-32 overflow-hidden rounded-full bg-slate-800">
            <div className="h-full w-1/2 animate-pulse rounded-full bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500" />
          </div>
        </div>
      </div>
    );
  }

  /*
  ==================================================
  MAIN UI
  ==================================================
  */

  return (
    <div className="lms-background relative min-h-full overflow-hidden pb-12">
      {/* AMBIENT BACKGROUND */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 top-20 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl" />

        <div className="absolute right-[-10rem] top-1/3 h-[30rem] w-[30rem] rounded-full bg-purple-600/10 blur-3xl" />

        <div className="absolute bottom-[-10rem] left-1/3 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />

        <div className="absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />

        <div className="absolute left-[12%] top-[18%] h-1 w-1 animate-pulse rounded-full bg-cyan-300/60" />

        <div className="absolute right-[20%] top-[32%] h-1.5 w-1.5 animate-pulse rounded-full bg-blue-400/50 [animation-delay:700ms]" />

        <div className="absolute bottom-[20%] left-[70%] h-1 w-1 animate-pulse rounded-full bg-purple-400/60 [animation-delay:1200ms]" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl space-y-8">
        {/* ==================================================
            HEADER
            ================================================== */}

        <div className="animate-fade-up">
          <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-slate-950/80 p-6 shadow-2xl backdrop-blur-xl md:p-8">
            <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-cyan-500/10 blur-3xl transition-all duration-700 group-hover:scale-125 group-hover:bg-cyan-500/15" />

            <div className="pointer-events-none absolute bottom-0 left-1/4 h-px w-1/2 bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />

            <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center">
              <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl border border-cyan-400/20 bg-gradient-to-br from-blue-600 via-cyan-500 to-purple-600 text-white shadow-[0_0_35px_rgba(34,211,238,0.2)] transition-transform duration-500 group-hover:scale-105 group-hover:rotate-2">
                <Settings
                  size={30}
                  className="transition-transform duration-700 group-hover:rotate-90"
                />
              </div>

              <div>
                <div className="mb-1 flex items-center gap-2">
                  <Sparkles
                    size={15}
                    className="text-cyan-300"
                  />

                  <span className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-300/80">
                    Control Center
                  </span>
                </div>

                <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
                  Settings
                </h1>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400 md:text-base">
                  Manage your account, preferences,
                  notifications, and security.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ==================================================
            ACCOUNT
            ================================================== */}

        <SettingsSection
          icon={<User size={22} />}
          title="Account"
          description="Manage your personal information."
          index={0}
        >
          <div className="grid gap-5 p-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-300">
                Full Name
              </label>

              <input
                type="text"
                value={fullName}
                onChange={(e) =>
                  setFullName(
                    e.target.value
                  )
                }
                placeholder="Your full name"
                className="w-full rounded-xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 transition-all duration-300 focus:border-cyan-400/50 focus:bg-slate-900 focus:ring-2 focus:ring-cyan-400/10"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-300">
                Email Address
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400/60"
                />

                <input
                  type="email"
                  value={email}
                  disabled
                  className="w-full cursor-not-allowed rounded-xl border border-white/10 bg-slate-900/50 py-3 pl-11 pr-4 text-sm text-slate-500 outline-none"
                />
              </div>

              <p className="mt-2 text-xs text-slate-600">
                Your email is managed through your
                authentication account.
              </p>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-300">
                Phone Number
              </label>

              <input
                type="tel"
                value={phone}
                onChange={(e) =>
                  setPhone(
                    e.target.value
                  )
                }
                placeholder="Your phone number"
                className="w-full rounded-xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 transition-all duration-300 focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/10"
              />
            </div>
          </div>
        </SettingsSection>

        {/* ==================================================
            NOTIFICATIONS
            ================================================== */}

        <SettingsSection
          icon={<Bell size={22} />}
          title="Notifications"
          description="Choose which notifications you want to receive."
          index={1}
        >
          <div className="divide-y divide-white/5">
            <SettingToggle
              title="Email Notifications"
              description="Receive important updates by email."
              enabled={
                settings?.email_notifications ??
                true
              }
              onChange={(value) =>
                updateSetting(
                  "email_notifications",
                  value
                )
              }
            />

            <SettingToggle
              title="Class Reminders"
              description="Receive reminders before scheduled classes."
              enabled={
                settings?.class_reminders ??
                true
              }
              onChange={(value) =>
                updateSetting(
                  "class_reminders",
                  value
                )
              }
            />

            <SettingToggle
              title="Assignment Notifications"
              description="Get notified about assignments and deadlines."
              enabled={
                settings?.assignment_notifications ??
                true
              }
              onChange={(value) =>
                updateSetting(
                  "assignment_notifications",
                  value
                )
              }
            />

            <SettingToggle
              title="Course Announcements"
              description="Receive announcements from your courses."
              enabled={
                settings?.course_announcements ??
                true
              }
              onChange={(value) =>
                updateSetting(
                  "course_announcements",
                  value
                )
              }
            />
          </div>
        </SettingsSection>

        {/* ==================================================
            APPEARANCE
            ================================================== */}

        <SettingsSection
          icon={<Palette size={22} />}
          title="Appearance"
          description="Customize how your LMS looks."
          index={2}
        >
          <div className="p-6">
            <div className="group flex items-center justify-between gap-4 rounded-2xl border border-white/5 bg-slate-900/40 p-4 transition-all duration-300 hover:border-cyan-400/20 hover:bg-slate-900/70">
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-blue-500/15 to-purple-500/15">
                  {settings?.dark_mode ? (
                    <Moon
                      size={21}
                      className="text-cyan-300"
                    />
                  ) : (
                    <Sun
                      size={21}
                      className="text-amber-300"
                    />
                  )}
                </div>

                <div>
                  <p className="font-semibold text-white">
                    Dark Mode
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    Use a darker appearance throughout
                    the application.
                  </p>
                </div>
              </div>

              <Toggle
                enabled={
                  settings?.dark_mode ??
                  false
                }
                onChange={(value) =>
                  updateSetting(
                    "dark_mode",
                    value
                  )
                }
              />
            </div>
          </div>
        </SettingsSection>

        {/* ==================================================
            LEARNING PREFERENCES
            ================================================== */}

        <SettingsSection
          icon={<BookOpen size={22} />}
          title="Learning Preferences"
          description="Customize your learning experience."
          index={3}
        >
          <div className="space-y-6 p-6">
            {/* LANGUAGE */}

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-300">
                Language
              </label>

              <select
                value={
                  settings?.language ??
                  "English"
                }
                onChange={(e) =>
                  updateSetting(
                    "language",
                    e.target.value
                  )
                }
                className="w-full max-w-md rounded-xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-white outline-none transition-all duration-300 focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/10 [color-scheme:dark]"
              >
                <option
                  value="English"
                  className="bg-slate-900 text-white"
                >
                  English
                </option>

                <option
                  value="French"
                  className="bg-slate-900 text-white"
                >
                  French
                </option>

                <option
                  value="Spanish"
                  className="bg-slate-900 text-white"
                >
                  Spanish
                </option>
              </select>

              <p className="mt-2 text-xs text-slate-600">
                Your selected language is applied
                immediately and saved to your account
                when you click Save Changes.
              </p>
            </div>

            {/* TIMEZONE */}

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-300">
                Timezone
              </label>

              <select
                value={
                  settings?.timezone ??
                  "Africa/Lagos"
                }
                onChange={(e) =>
                  updateSetting(
                    "timezone",
                    e.target.value
                  )
                }
                className="w-full max-w-md rounded-xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-white outline-none transition-all duration-300 focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/10 [color-scheme:dark]"
              >
                <option
                  value="Africa/Lagos"
                  className="bg-slate-900 text-white"
                >
                  West Africa Time (Lagos)
                </option>

                <option
                  value="Europe/London"
                  className="bg-slate-900 text-white"
                >
                  Greenwich Mean Time (London)
                </option>

                <option
                  value="America/New_York"
                  className="bg-slate-900 text-white"
                >
                  Eastern Time (New York)
                </option>

                <option
                  value="America/Los_Angeles"
                  className="bg-slate-900 text-white"
                >
                  Pacific Time (Los Angeles)
                </option>
              </select>

              <p className="mt-2 text-xs text-slate-600">
                Calendar and time displays can use
                this timezone throughout the LMS.
              </p>
            </div>

            {/* LEARNING REMINDERS */}

            <SettingToggle
              title="Learning Reminders"
              description="Receive reminders to continue your courses."
              enabled={
                settings?.learning_reminders ??
                true
              }
              onChange={(value) =>
                updateSetting(
                  "learning_reminders",
                  value
                )
              }
            />
          </div>
        </SettingsSection>

        {/* ==================================================
            SECURITY
            ================================================== */}

        <SettingsSection
          icon={<Shield size={22} />}
          title="Security"
          description="Manage your account security."
          index={4}
        >
          <div className="space-y-3 p-6">
            {/* CHANGE PASSWORD */}

            <button
              type="button"
              onClick={() =>
                setShowPasswordModal(true)
              }
              className="group flex w-full items-center gap-4 rounded-2xl border border-white/5 bg-slate-900/40 p-4 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-400/20 hover:bg-slate-900/80 hover:shadow-[0_0_25px_rgba(34,211,238,0.08)]"
            >
              <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border border-blue-400/10 bg-blue-500/10">
                <Lock
                  size={20}
                  className="text-blue-300"
                />
              </div>

              <div className="flex-1">
                <p className="font-semibold text-white">
                  Change Password
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  Update your account password.
                </p>
              </div>

              <ChevronRight
                size={19}
                className="text-slate-600 transition-all duration-300 group-hover:translate-x-1 group-hover:text-cyan-300"
              />
            </button>

            {/* SIGN OUT */}

            <button
              type="button"
              onClick={signOut}
              className="group flex w-full items-center gap-4 rounded-2xl border border-white/5 bg-slate-900/40 p-4 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-white/10 hover:bg-slate-900/80"
            >
              <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border border-white/10 bg-slate-800/60">
                <LogOut
                  size={20}
                  className="text-slate-300"
                />
              </div>

              <div className="flex-1">
                <p className="font-semibold text-white">
                  Sign Out
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  Sign out of your LMS account.
                </p>
              </div>

              <ChevronRight
                size={19}
                className="text-slate-600 transition-all duration-300 group-hover:translate-x-1 group-hover:text-slate-300"
              />
            </button>
          </div>
        </SettingsSection>

        {/* ==================================================
            SAVE BUTTON
            ================================================== */}

        <div className="flex justify-end animate-fade-up">
          <button
            type="button"
            onClick={saveSettings}
            disabled={saving}
            className="group relative flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 px-6 py-3.5 font-semibold text-white shadow-[0_0_30px_rgba(59,130,246,0.2)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(34,211,238,0.3)] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

            <span className="relative flex items-center gap-2">
              {saving ? (
                <Loader2
                  size={18}
                  className="animate-spin"
                />
              ) : (
                <Save size={18} />
              )}

              {saving
                ? "Saving..."
                : "Save Changes"}
            </span>
          </button>
        </div>

        {/* ==================================================
            DANGER ZONE
            ================================================== */}

        <section className="group relative overflow-hidden rounded-3xl border border-red-500/20 bg-red-950/20 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:border-red-500/30 hover:shadow-[0_0_35px_rgba(239,68,68,0.08)]">
          <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-red-500/10 blur-3xl transition-transform duration-700 group-hover:scale-125" />

          <div className="relative border-b border-red-500/10 p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-red-400/20 bg-red-500/10">
                <Trash2
                  size={22}
                  className="text-red-400"
                />
              </div>

              <div>
                <h2 className="text-lg font-bold text-red-300">
                  Danger Zone
                </h2>

                <p className="mt-1 text-sm text-red-400/70">
                  These actions can affect your account
                  permanently.
                </p>
              </div>
            </div>
          </div>

          <div className="relative p-6">
            <button
              type="button"
              onClick={deleteAccount}
              disabled={deletingAccount}
              className="group/delete relative overflow-hidden rounded-xl border border-red-500/30 bg-red-500/10 px-5 py-3 font-semibold text-red-300 transition-all duration-300 hover:-translate-y-0.5 hover:border-red-400/50 hover:bg-red-500/20 hover:shadow-[0_0_25px_rgba(239,68,68,0.15)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <span className="relative flex items-center gap-2">
                {deletingAccount ? (
                  <Loader2
                    size={17}
                    className="animate-spin"
                  />
                ) : (
                  <Trash2 size={17} />
                )}

                {deletingAccount
                  ? "Deleting Account..."
                  : "Delete Account"}
              </span>
            </button>

            <p className="mt-3 text-xs text-red-400/60">
              Account deletion is permanent and
              cannot be undone.
            </p>
          </div>
        </section>
      </div>

      {/* ==================================================
          PASSWORD MODAL
          ================================================== */}

      {showPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md">
          <div className="pointer-events-none absolute -left-20 top-1/4 h-64 w-64 rounded-full bg-blue-600/10 blur-3xl" />

          <div className="pointer-events-none absolute -right-20 bottom-1/4 h-64 w-64 rounded-full bg-purple-600/10 blur-3xl" />

          <div className="animate-fade-up relative w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-slate-950/95 p-6 shadow-[0_0_60px_rgba(59,130,246,0.18)] backdrop-blur-2xl md:p-7">
            <div className="pointer-events-none absolute right-0 top-0 h-32 w-32 rounded-full bg-cyan-500/10 blur-3xl" />

            <div className="relative mb-6">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-400/20 bg-gradient-to-br from-blue-600/20 via-cyan-500/10 to-purple-600/20">
                <Lock
                  size={23}
                  className="text-cyan-300"
                />
              </div>

              <h2 className="text-xl font-bold text-white">
                Change Password
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Enter your new password below.
              </p>
            </div>

            {/* NEW PASSWORD */}

            <div className="relative mb-4">
              <label className="mb-2 block text-sm font-semibold text-slate-300">
                New Password
              </label>

              <div className="relative">
                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  value={newPassword}
                  onChange={(e) =>
                    setNewPassword(
                      e.target.value
                    )
                  }
                  placeholder="Enter new password"
                  className="w-full rounded-xl border border-white/10 bg-slate-900/80 px-4 py-3 pr-12 text-sm text-white outline-none placeholder:text-slate-600 transition-all duration-300 focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/10"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-slate-500 transition hover:bg-white/5 hover:text-cyan-300"
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            {/* CONFIRM PASSWORD */}

            <div className="relative mb-6">
              <label className="mb-2 block text-sm font-semibold text-slate-300">
                Confirm Password
              </label>

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(
                    e.target.value
                  )
                }
                placeholder="Confirm new password"
                className="w-full rounded-xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 transition-all duration-300 focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/10"
              />
            </div>

            {/* BUTTONS */}

            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => {
                  setShowPasswordModal(false);

                  setNewPassword("");

                  setConfirmPassword("");
                }}
                className="rounded-xl border border-white/10 bg-slate-900/70 px-5 py-3 font-semibold text-slate-300 transition-all duration-300 hover:border-white/20 hover:bg-slate-800 hover:text-white"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={changePassword}
                disabled={changingPassword}
                className="group relative flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 px-5 py-3 font-semibold text-white shadow-[0_0_25px_rgba(59,130,246,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_35px_rgba(34,211,238,0.25)] disabled:cursor-not-allowed disabled:opacity-60"
              >
                <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

                <span className="relative flex items-center gap-2">
                  {changingPassword && (
                    <Loader2
                      size={17}
                      className="animate-spin"
                    />
                  )}

                  {changingPassword
                    ? "Updating..."
                    : "Update Password"}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/*
==================================================
SETTINGS SECTION
==================================================
*/

function SettingsSection({
  icon,
  title,
  description,
  children,
  index,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  children: React.ReactNode;
  index: number;
}) {
  return (
    <section
      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-slate-950/80 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:border-white/15 hover:shadow-[0_0_35px_rgba(59,130,246,0.06)] animate-fade-up"
      style={{
        animationDelay: `${index * 100}ms`,
      }}
    >
      <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-blue-500/5 blur-3xl transition-all duration-700 group-hover:scale-125 group-hover:bg-cyan-500/10" />

      <div className="relative border-b border-white/5 p-6">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border border-blue-400/10 bg-gradient-to-br from-blue-500/15 via-cyan-500/10 to-purple-500/15 text-cyan-300 transition-all duration-500 group-hover:scale-105 group-hover:border-cyan-400/20">
            {icon}
          </div>

          <div>
            <h2 className="text-lg font-bold text-white">
              {title}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {description}
            </p>
          </div>
        </div>
      </div>

      {children}
    </section>
  );
}

/*
==================================================
SETTING TOGGLE
==================================================
*/

function SettingToggle({
  title,
  description,
  enabled,
  onChange,
}: {
  title: string;
  description: string;
  enabled: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <div className="group flex items-center justify-between gap-4 p-6 transition-all duration-300 hover:bg-white/[0.015]">
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <p className="font-semibold text-white">
            {title}
          </p>

          {enabled && (
            <CheckCircle2
              size={14}
              className="text-cyan-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            />
          )}
        </div>

        <p className="mt-1 text-sm leading-6 text-slate-500">
          {description}
        </p>
      </div>

      <Toggle
        enabled={enabled}
        onChange={onChange}
      />
    </div>
  );
}

/*
==================================================
TOGGLE
==================================================
*/

function Toggle({
  enabled,
  onChange,
}: {
  enabled: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() =>
        onChange(!enabled)
      }
      className={`relative h-7 w-12 flex-shrink-0 rounded-full border transition-all duration-300 ${
        enabled
          ? "border-cyan-400/30 bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 shadow-[0_0_18px_rgba(34,211,238,0.25)]"
          : "border-white/10 bg-slate-800"
      }`}
      aria-pressed={enabled}
      aria-label="Toggle setting"
    >
      <span
        className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow-lg transition-all duration-300 ${
          enabled
            ? "left-6 shadow-cyan-400/30"
            : "left-1 shadow-black/30"
        }`}
      />
    </button>
  );
}


// "use client";

// import { useEffect, useState } from "react";
// import {
//   Settings,
//   User,
//   Bell,
//   Palette,
//   BookOpen,
//   Shield,
//   LogOut,
//   Trash2,
//   Save,
//   Lock,
//   Mail,
//   Moon,
//   Sun,
//   Eye,
//   EyeOff,
//   Loader2,
//   Sparkles,
//   ChevronRight,
//   CheckCircle2,
// } from "lucide-react";
// import toast from "react-hot-toast";

// import { supabase } from "@/app/lib/supabase";

// interface UserSettings {
//   id?: string;
//   user_id: string;

//   email_notifications: boolean;
//   class_reminders: boolean;
//   assignment_notifications: boolean;
//   course_announcements: boolean;

//   dark_mode: boolean;

//   language: string;
//   timezone: string;

//   learning_reminders: boolean;
// }

// export default function SettingsPage() {
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);

//   const [userId, setUserId] = useState<string | null>(null);

//   const [fullName, setFullName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");

//   const [settings, setSettings] =
//     useState<UserSettings | null>(null);

//   /* PASSWORD */

//   const [showPasswordModal, setShowPasswordModal] =
//     useState(false);

//   const [newPassword, setNewPassword] =
//     useState("");

//   const [confirmPassword, setConfirmPassword] =
//     useState("");

//   const [showPassword, setShowPassword] =
//     useState(false);

//   const [changingPassword, setChangingPassword] =
//     useState(false);

//   /* DELETE ACCOUNT */

//   const [deletingAccount, setDeletingAccount] =
//     useState(false);

//   useEffect(() => {
//     loadSettings();
//   }, []);

//   /*
//   ==================================================
//   LOAD SETTINGS
//   ==================================================
//   */

//   async function loadSettings() {
//     try {
//       setLoading(true);

//       const {
//         data: { user },
//         error: userError,
//       } = await supabase.auth.getUser();

//       if (userError || !user) {
//         toast.error("Please log in first.");
//         return;
//       }

//       setUserId(user.id);
//       setEmail(user.email ?? "");

//       /*
//       ==============================================
//       LOAD PROFILE
//       ==============================================
//       */

//       const {
//         data: profile,
//         error: profileError,
//       } = await supabase
//         .from("profiles")
//         .select("full_name, email, phone")
//         .eq("id", user.id)
//         .maybeSingle();

//       if (profileError) {
//         console.error(
//           "PROFILE LOAD ERROR:",
//           profileError
//         );
//       }

//       if (profile) {
//         setFullName(profile.full_name ?? "");

//         setEmail(
//           profile.email ??
//             user.email ??
//             ""
//         );

//         setPhone(profile.phone ?? "");
//       }

//       /*
//       ==============================================
//       LOAD USER SETTINGS
//       ==============================================
//       */

//       const {
//         data: userSettings,
//         error: settingsError,
//       } = await supabase
//         .from("user_settings")
//         .select("*")
//         .eq("user_id", user.id)
//         .maybeSingle();

//       if (settingsError) {
//         console.error(
//           "SETTINGS LOAD ERROR:",
//           settingsError
//         );

//         toast.error(
//           "Failed to load your settings."
//         );

//         return;
//       }

//       /*
//       ==============================================
//       CREATE DEFAULT SETTINGS
//       ==============================================
//       */

//       if (!userSettings) {
//         const defaultSettings: UserSettings = {
//           user_id: user.id,

//           email_notifications: true,
//           class_reminders: true,
//           assignment_notifications: true,
//           course_announcements: true,

//           dark_mode: false,

//           language: "English",
//           timezone: "Africa/Lagos",

//           learning_reminders: true,
//         };

//         const {
//           data: createdSettings,
//           error: createError,
//         } = await supabase
//           .from("user_settings")
//           .insert(defaultSettings)
//           .select()
//           .single();

//         if (createError) {
//           console.error(
//             "CREATE SETTINGS ERROR:",
//             createError
//           );

//           toast.error(
//             "Failed to create your settings."
//           );

//           return;
//         }

//         setSettings(createdSettings);

//         applyDarkMode(
//           createdSettings.dark_mode
//         );
//       } else {
//         setSettings(userSettings);

//         applyDarkMode(
//           userSettings.dark_mode
//         );
//       }
//     } catch (error) {
//       console.error(
//         "SETTINGS PAGE ERROR:",
//         error
//       );

//       toast.error(
//         "Something went wrong."
//       );
//     } finally {
//       setLoading(false);
//     }
//   }

//   /*
//   ==================================================
//   UPDATE SETTING IN STATE
//   ==================================================
//   */

//   function updateSetting(
//     field: keyof UserSettings,
//     value: boolean | string
//   ) {
//     setSettings((prev) => {
//       if (!prev) return prev;

//       return {
//         ...prev,
//         [field]: value,
//       };
//     });

//     if (
//       field === "dark_mode" &&
//       typeof value === "boolean"
//     ) {
//       applyDarkMode(value);
//     }
//   }

//   /*
//   ==================================================
//   DARK MODE
//   ==================================================
//   */

//   function applyDarkMode(enabled: boolean) {
//     if (typeof document === "undefined") {
//       return;
//     }

//     if (enabled) {
//       document.documentElement.classList.add(
//         "dark"
//       );

//       localStorage.setItem(
//         "lms-dark-mode",
//         "true"
//       );
//     } else {
//       document.documentElement.classList.remove(
//         "dark"
//       );

//       localStorage.setItem(
//         "lms-dark-mode",
//         "false"
//       );
//     }
//   }

//   /*
//   ==================================================
//   SAVE ALL SETTINGS
//   ==================================================
//   */

//   async function saveSettings() {
//     if (!userId || !settings) {
//       toast.error(
//         "Unable to save settings."
//       );

//       return;
//     }

//     try {
//       setSaving(true);

//       /*
//       ==============================================
//       UPDATE PROFILE
//       ==============================================
//       */

//       const {
//         error: profileError,
//       } = await supabase
//         .from("profiles")
//         .update({
//           full_name:
//             fullName.trim(),
//           phone:
//             phone.trim() || null,
//         })
//         .eq("id", userId);

//       if (profileError) {
//         console.error(
//           "PROFILE UPDATE ERROR:",
//           profileError
//         );

//         toast.error(
//           "Failed to update profile."
//         );

//         return;
//       }

//       /*
//       ==============================================
//       UPSERT SETTINGS
//       ==============================================
//       */

//       const settingsToSave = {
//         user_id: userId,

//         email_notifications:
//           settings.email_notifications,

//         class_reminders:
//           settings.class_reminders,

//         assignment_notifications:
//           settings.assignment_notifications,

//         course_announcements:
//           settings.course_announcements,

//         dark_mode:
//           settings.dark_mode,

//         language:
//           settings.language,

//         timezone:
//           settings.timezone,

//         learning_reminders:
//           settings.learning_reminders,

//         updated_at:
//           new Date().toISOString(),
//       };

//       const {
//         data: savedSettings,
//         error: settingsError,
//       } = await supabase
//         .from("user_settings")
//         .upsert(
//           settingsToSave,
//           {
//             onConflict: "user_id",
//           }
//         )
//         .select()
//         .single();

//       if (settingsError) {
//         console.error(
//           "SETTINGS UPDATE ERROR:",
//           settingsError
//         );

//         toast.error(
//           "Failed to save settings."
//         );

//         return;
//       }

//       setSettings(savedSettings);

//       applyDarkMode(
//         savedSettings.dark_mode
//       );

//       toast.success(
//         "Settings saved successfully!"
//       );
//     } catch (error) {
//       console.error(
//         "SAVE SETTINGS ERROR:",
//         error
//       );

//       toast.error(
//         "Something went wrong."
//       );
//     } finally {
//       setSaving(false);
//     }
//   }

//   /*
//   ==================================================
//   CHANGE PASSWORD
//   ==================================================
//   */

//   async function changePassword() {
//     if (!newPassword) {
//       toast.error(
//         "Please enter a new password."
//       );

//       return;
//     }

//     if (newPassword.length < 6) {
//       toast.error(
//         "Password must be at least 6 characters."
//       );

//       return;
//     }

//     if (
//       newPassword !== confirmPassword
//     ) {
//       toast.error(
//         "Passwords do not match."
//       );

//       return;
//     }

//     try {
//       setChangingPassword(true);

//       const { error } =
//         await supabase.auth.updateUser({
//           password: newPassword,
//         });

//       if (error) {
//         console.error(
//           "PASSWORD ERROR:",
//           error
//         );

//         toast.error(
//           error.message
//         );

//         return;
//       }

//       toast.success(
//         "Password changed successfully!"
//       );

//       setNewPassword("");
//       setConfirmPassword("");

//       setShowPasswordModal(false);
//     } catch (error) {
//       console.error(
//         "PASSWORD CHANGE ERROR:",
//         error
//       );

//       toast.error(
//         "Failed to change password."
//       );
//     } finally {
//       setChangingPassword(false);
//     }
//   }

//   /*
//   ==================================================
//   SIGN OUT
//   ==================================================
//   */

//   async function signOut() {
//     const confirmed =
//       window.confirm(
//         "Are you sure you want to sign out?"
//       );

//     if (!confirmed) return;

//     const { error } =
//       await supabase.auth.signOut();

//     if (error) {
//       toast.error(error.message);
//       return;
//     }

//     toast.success(
//       "Signed out successfully."
//     );

//     window.location.href =
//       "/auth/login";
//   }

//   /*
//   ==================================================
//   DELETE ACCOUNT
//   ==================================================
//   */

//   async function deleteAccount() {
//     const confirmed =
//       window.confirm(
//         "WARNING: This will permanently delete your account and account data. This cannot be undone. Are you absolutely sure?"
//       );

//     if (!confirmed) return;

//     const secondConfirmation =
//       window.confirm(
//         "Please confirm again that you want to permanently delete your LMS account."
//       );

//     if (!secondConfirmation) return;

//     try {
//       setDeletingAccount(true);

//       const {
//         data: {
//           session,
//         },
//       } =
//         await supabase.auth.getSession();

//       if (!session?.access_token) {
//         toast.error(
//           "Your session has expired. Please log in again."
//         );

//         return;
//       }

//       const response =
//         await fetch(
//           "/api/account/delete",
//           {
//             method: "DELETE",

//             headers: {
//               Authorization:
//                 `Bearer ${session.access_token}`,
//             },
//           }
//         );

//       const result =
//         await response.json();

//       if (!response.ok) {
//         console.error(
//           "DELETE ACCOUNT ERROR:",
//           result
//         );

//         toast.error(
//           result.error ??
//             "Failed to delete account."
//         );

//         return;
//       }

//       toast.success(
//         "Your account has been deleted."
//       );

//       window.location.href =
//         "/auth/login";
//     } catch (error) {
//       console.error(
//         "ACCOUNT DELETE ERROR:",
//         error
//       );

//       toast.error(
//         "Something went wrong while deleting your account."
//       );
//     } finally {
//       setDeletingAccount(false);
//     }
//   }

//   /*
//   ==================================================
//   LOADING
//   ==================================================
//   */

//   if (loading) {
//     return (
//       <div className="lms-background relative flex min-h-[70vh] items-center justify-center overflow-hidden">
//         <div className="pointer-events-none absolute -left-24 top-20 h-72 w-72 rounded-full bg-blue-600/10 blur-3xl" />

//         <div className="pointer-events-none absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-purple-600/10 blur-3xl" />

//         <div className="relative z-10 text-center">
//           <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-400/20 bg-gradient-to-br from-blue-600/20 via-cyan-500/10 to-purple-600/20 shadow-[0_0_40px_rgba(34,211,238,0.15)]">
//             <Settings
//               size={28}
//               className="animate-spin text-cyan-300"
//             />
//           </div>

//           <p className="mt-5 text-sm font-medium text-slate-400">
//             Loading your settings...
//           </p>

//           <div className="mx-auto mt-3 h-1 w-32 overflow-hidden rounded-full bg-slate-800">
//             <div className="h-full w-1/2 animate-pulse rounded-full bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500" />
//           </div>
//         </div>
//       </div>
//     );
//   }

//   /*
//   ==================================================
//   MAIN UI
//   ==================================================
//   */

//   return (
//     <div className="lms-background relative min-h-full overflow-hidden pb-12">
//       {/* AMBIENT BACKGROUND */}

//       <div className="pointer-events-none absolute inset-0 overflow-hidden">
//         <div className="absolute -left-32 top-20 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl" />

//         <div className="absolute right-[-10rem] top-1/3 h-[30rem] w-[30rem] rounded-full bg-purple-600/10 blur-3xl" />

//         <div className="absolute bottom-[-10rem] left-1/3 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />

//         <div className="absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />

//         <div className="absolute left-[12%] top-[18%] h-1 w-1 animate-pulse rounded-full bg-cyan-300/60" />

//         <div className="absolute right-[20%] top-[32%] h-1.5 w-1.5 animate-pulse rounded-full bg-blue-400/50 [animation-delay:700ms]" />

//         <div className="absolute bottom-[20%] left-[70%] h-1 w-1 animate-pulse rounded-full bg-purple-400/60 [animation-delay:1200ms]" />
//       </div>

//       <div className="relative z-10 mx-auto max-w-5xl space-y-8">
//         {/* ==================================================
//             HEADER
//             ================================================== */}

//         <div className="animate-fade-up">
//           <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-slate-950/80 p-6 shadow-2xl backdrop-blur-xl md:p-8">
//             <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-cyan-500/10 blur-3xl transition-all duration-700 group-hover:scale-125 group-hover:bg-cyan-500/15" />

//             <div className="pointer-events-none absolute bottom-0 left-1/4 h-px w-1/2 bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />

//             <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center">
//               <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl border border-cyan-400/20 bg-gradient-to-br from-blue-600 via-cyan-500 to-purple-600 text-white shadow-[0_0_35px_rgba(34,211,238,0.2)] transition-transform duration-500 group-hover:scale-105 group-hover:rotate-2">
//                 <Settings
//                   size={30}
//                   className="transition-transform duration-700 group-hover:rotate-90"
//                 />
//               </div>

//               <div>
//                 <div className="mb-1 flex items-center gap-2">
//                   <Sparkles
//                     size={15}
//                     className="text-cyan-300"
//                   />

//                   <span className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-300/80">
//                     Control Center
//                   </span>
//                 </div>

//                 <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
//                   Settings
//                 </h1>

//                 <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400 md:text-base">
//                   Manage your account, preferences,
//                   notifications, and security.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* ==================================================
//             ACCOUNT
//             ================================================== */}

//         <SettingsSection
//           icon={<User size={22} />}
//           title="Account"
//           description="Manage your personal information."
//           index={0}
//         >
//           <div className="grid gap-5 p-6 md:grid-cols-2">
//             {/* FULL NAME */}

//             <div className="group">
//               <label className="mb-2 block text-sm font-semibold text-slate-300">
//                 Full Name
//               </label>

//               <input
//                 type="text"
//                 value={fullName}
//                 onChange={(e) =>
//                   setFullName(e.target.value)
//                 }
//                 placeholder="Your full name"
//                 className="w-full rounded-xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 transition-all duration-300 focus:border-cyan-400/50 focus:bg-slate-900 focus:ring-2 focus:ring-cyan-400/10"
//               />
//             </div>

//             {/* EMAIL */}

//             <div>
//               <label className="mb-2 block text-sm font-semibold text-slate-300">
//                 Email Address
//               </label>

//               <div className="relative">
//                 <Mail
//                   size={18}
//                   className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400/60"
//                 />

//                 <input
//                   type="email"
//                   value={email}
//                   disabled
//                   className="w-full cursor-not-allowed rounded-xl border border-white/10 bg-slate-900/50 py-3 pl-11 pr-4 text-sm text-slate-500 outline-none"
//                 />
//               </div>

//               <p className="mt-2 text-xs text-slate-600">
//                 Your email is managed through your
//                 authentication account.
//               </p>
//             </div>

//             {/* PHONE */}

//             <div>
//               <label className="mb-2 block text-sm font-semibold text-slate-300">
//                 Phone Number
//               </label>

//               <input
//                 type="tel"
//                 value={phone}
//                 onChange={(e) =>
//                   setPhone(e.target.value)
//                 }
//                 placeholder="Your phone number"
//                 className="w-full rounded-xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 transition-all duration-300 focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/10"
//               />
//             </div>
//           </div>
//         </SettingsSection>

//         {/* ==================================================
//             NOTIFICATIONS
//             ================================================== */}

//         <SettingsSection
//           icon={<Bell size={22} />}
//           title="Notifications"
//           description="Choose which notifications you want to receive."
//           index={1}
//         >
//           <div className="divide-y divide-white/5">
//             <SettingToggle
//               title="Email Notifications"
//               description="Receive important updates by email."
//               enabled={
//                 settings?.email_notifications ??
//                 true
//               }
//               onChange={(value) =>
//                 updateSetting(
//                   "email_notifications",
//                   value
//                 )
//               }
//             />

//             <SettingToggle
//               title="Class Reminders"
//               description="Receive reminders before scheduled classes."
//               enabled={
//                 settings?.class_reminders ??
//                 true
//               }
//               onChange={(value) =>
//                 updateSetting(
//                   "class_reminders",
//                   value
//                 )
//               }
//             />

//             <SettingToggle
//               title="Assignment Notifications"
//               description="Get notified about assignments and deadlines."
//               enabled={
//                 settings?.assignment_notifications ??
//                 true
//               }
//               onChange={(value) =>
//                 updateSetting(
//                   "assignment_notifications",
//                   value
//                 )
//               }
//             />

//             <SettingToggle
//               title="Course Announcements"
//               description="Receive announcements from your courses."
//               enabled={
//                 settings?.course_announcements ??
//                 true
//               }
//               onChange={(value) =>
//                 updateSetting(
//                   "course_announcements",
//                   value
//                 )
//               }
//             />
//           </div>
//         </SettingsSection>

//         {/* ==================================================
//             APPEARANCE
//             ================================================== */}

//         <SettingsSection
//           icon={<Palette size={22} />}
//           title="Appearance"
//           description="Customize how your LMS looks."
//           index={2}
//         >
//           <div className="p-6">
//             <div className="group flex items-center justify-between gap-4 rounded-2xl border border-white/5 bg-slate-900/40 p-4 transition-all duration-300 hover:border-cyan-400/20 hover:bg-slate-900/70">
//               <div className="flex items-center gap-4">
//                 <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-blue-500/15 to-purple-500/15">
//                   {settings?.dark_mode ? (
//                     <Moon
//                       size={21}
//                       className="text-cyan-300"
//                     />
//                   ) : (
//                     <Sun
//                       size={21}
//                       className="text-amber-300"
//                     />
//                   )}
//                 </div>

//                 <div>
//                   <p className="font-semibold text-white">
//                     Dark Mode
//                   </p>

//                   <p className="mt-1 text-sm text-slate-500">
//                     Use a darker appearance throughout
//                     the application.
//                   </p>
//                 </div>
//               </div>

//               <Toggle
//                 enabled={
//                   settings?.dark_mode ??
//                   false
//                 }
//                 onChange={(value) =>
//                   updateSetting(
//                     "dark_mode",
//                     value
//                   )
//                 }
//               />
//             </div>
//           </div>
//         </SettingsSection>

//         {/* ==================================================
//             LEARNING PREFERENCES
//             ================================================== */}

//         <SettingsSection
//           icon={<BookOpen size={22} />}
//           title="Learning Preferences"
//           description="Customize your learning experience."
//           index={3}
//         >
//           <div className="space-y-6 p-6">
//             {/* LANGUAGE */}

//             <div>
//               <label className="mb-2 block text-sm font-semibold text-slate-300">
//                 Language
//               </label>

//               <select
//                 value={
//                   settings?.language ??
//                   "English"
//                 }
//                 onChange={(e) =>
//                   updateSetting(
//                     "language",
//                     e.target.value
//                   )
//                 }
//                 className="w-full max-w-md rounded-xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-white outline-none transition-all duration-300 focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/10 [color-scheme:dark]"
//               >
//                 <option
//                   value="English"
//                   className="bg-slate-900 text-white"
//                 >
//                   English
//                 </option>

//                 <option
//                   value="French"
//                   className="bg-slate-900 text-white"
//                 >
//                   French
//                 </option>

//                 <option
//                   value="Spanish"
//                   className="bg-slate-900 text-white"
//                 >
//                   Spanish
//                 </option>
//               </select>
//             </div>

//             {/* TIMEZONE */}

//             <div>
//               <label className="mb-2 block text-sm font-semibold text-slate-300">
//                 Timezone
//               </label>

//               <select
//                 value={
//                   settings?.timezone ??
//                   "Africa/Lagos"
//                 }
//                 onChange={(e) =>
//                   updateSetting(
//                     "timezone",
//                     e.target.value
//                   )
//                 }
//                 className="w-full max-w-md rounded-xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-white outline-none transition-all duration-300 focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/10 [color-scheme:dark]"
//               >
//                 <option
//                   value="Africa/Lagos"
//                   className="bg-slate-900 text-white"
//                 >
//                   West Africa Time (Lagos)
//                 </option>

//                 <option
//                   value="Europe/London"
//                   className="bg-slate-900 text-white"
//                 >
//                   Greenwich Mean Time (London)
//                 </option>

//                 <option
//                   value="America/New_York"
//                   className="bg-slate-900 text-white"
//                 >
//                   Eastern Time (New York)
//                 </option>

//                 <option
//                   value="America/Los_Angeles"
//                   className="bg-slate-900 text-white"
//                 >
//                   Pacific Time (Los Angeles)
//                 </option>
//               </select>
//             </div>

//             <SettingToggle
//               title="Learning Reminders"
//               description="Receive reminders to continue your courses."
//               enabled={
//                 settings?.learning_reminders ??
//                 true
//               }
//               onChange={(value) =>
//                 updateSetting(
//                   "learning_reminders",
//                   value
//                 )
//               }
//             />
//           </div>
//         </SettingsSection>

//         {/* ==================================================
//             SECURITY
//             ================================================== */}

//         <SettingsSection
//           icon={<Shield size={22} />}
//           title="Security"
//           description="Manage your account security."
//           index={4}
//         >
//           <div className="space-y-3 p-6">
//             {/* CHANGE PASSWORD */}

//             <button
//               type="button"
//               onClick={() =>
//                 setShowPasswordModal(true)
//               }
//               className="group flex w-full items-center gap-4 rounded-2xl border border-white/5 bg-slate-900/40 p-4 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-400/20 hover:bg-slate-900/80 hover:shadow-[0_0_25px_rgba(34,211,238,0.08)]"
//             >
//               <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border border-blue-400/10 bg-blue-500/10">
//                 <Lock
//                   size={20}
//                   className="text-blue-300"
//                 />
//               </div>

//               <div className="flex-1">
//                 <p className="font-semibold text-white">
//                   Change Password
//                 </p>

//                 <p className="mt-1 text-sm text-slate-500">
//                   Update your account password.
//                 </p>
//               </div>

//               <ChevronRight
//                 size={19}
//                 className="text-slate-600 transition-all duration-300 group-hover:translate-x-1 group-hover:text-cyan-300"
//               />
//             </button>

//             {/* SIGN OUT */}

//             <button
//               type="button"
//               onClick={signOut}
//               className="group flex w-full items-center gap-4 rounded-2xl border border-white/5 bg-slate-900/40 p-4 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-white/10 hover:bg-slate-900/80"
//             >
//               <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border border-white/10 bg-slate-800/60">
//                 <LogOut
//                   size={20}
//                   className="text-slate-300"
//                 />
//               </div>

//               <div className="flex-1">
//                 <p className="font-semibold text-white">
//                   Sign Out
//                 </p>

//                 <p className="mt-1 text-sm text-slate-500">
//                   Sign out of your LMS account.
//                 </p>
//               </div>

//               <ChevronRight
//                 size={19}
//                 className="text-slate-600 transition-all duration-300 group-hover:translate-x-1 group-hover:text-slate-300"
//               />
//             </button>
//           </div>
//         </SettingsSection>

//         {/* ==================================================
//             SAVE
//             ================================================== */}

//         <div className="flex justify-end animate-fade-up">
//           <button
//             type="button"
//             onClick={saveSettings}
//             disabled={saving}
//             className="group relative flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 px-6 py-3.5 font-semibold text-white shadow-[0_0_30px_rgba(59,130,246,0.2)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(34,211,238,0.3)] disabled:cursor-not-allowed disabled:opacity-60"
//           >
//             <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

//             <span className="relative flex items-center gap-2">
//               {saving ? (
//                 <Loader2
//                   size={18}
//                   className="animate-spin"
//                 />
//               ) : (
//                 <Save size={18} />
//               )}

//               {saving
//                 ? "Saving..."
//                 : "Save Changes"}
//             </span>
//           </button>
//         </div>

//         {/* ==================================================
//             DANGER ZONE
//             ================================================== */}

//         <section className="group relative overflow-hidden rounded-3xl border border-red-500/20 bg-red-950/20 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:border-red-500/30 hover:shadow-[0_0_35px_rgba(239,68,68,0.08)]">
//           <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-red-500/10 blur-3xl transition-transform duration-700 group-hover:scale-125" />

//           <div className="relative border-b border-red-500/10 p-6">
//             <div className="flex items-center gap-4">
//               <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-red-400/20 bg-red-500/10">
//                 <Trash2
//                   size={22}
//                   className="text-red-400"
//                 />
//               </div>

//               <div>
//                 <h2 className="text-lg font-bold text-red-300">
//                   Danger Zone
//                 </h2>

//                 <p className="mt-1 text-sm text-red-400/70">
//                   These actions can affect your account
//                   permanently.
//                 </p>
//               </div>
//             </div>
//           </div>

//           <div className="relative p-6">
//             <button
//               type="button"
//               onClick={deleteAccount}
//               disabled={deletingAccount}
//               className="group/delete relative overflow-hidden rounded-xl border border-red-500/30 bg-red-500/10 px-5 py-3 font-semibold text-red-300 transition-all duration-300 hover:-translate-y-0.5 hover:border-red-400/50 hover:bg-red-500/20 hover:shadow-[0_0_25px_rgba(239,68,68,0.15)] disabled:cursor-not-allowed disabled:opacity-60"
//             >
//               <span className="relative flex items-center gap-2">
//                 {deletingAccount && (
//                   <Loader2
//                     size={17}
//                     className="animate-spin"
//                   />
//                 )}

//                 {!deletingAccount && (
//                   <Trash2 size={17} />
//                 )}

//                 {deletingAccount
//                   ? "Deleting Account..."
//                   : "Delete Account"}
//               </span>
//             </button>

//             <p className="mt-3 text-xs text-red-400/60">
//               Account deletion is permanent and
//               cannot be undone.
//             </p>
//           </div>
//         </section>
//       </div>

//       {/* ==================================================
//           PASSWORD MODAL
//           ================================================== */}

//       {showPasswordModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md">
//           <div className="pointer-events-none absolute -left-20 top-1/4 h-64 w-64 rounded-full bg-blue-600/10 blur-3xl" />

//           <div className="pointer-events-none absolute -right-20 bottom-1/4 h-64 w-64 rounded-full bg-purple-600/10 blur-3xl" />

//           <div className="animate-fade-up relative w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-slate-950/95 p-6 shadow-[0_0_60px_rgba(59,130,246,0.18)] backdrop-blur-2xl md:p-7">
//             <div className="pointer-events-none absolute right-0 top-0 h-32 w-32 rounded-full bg-cyan-500/10 blur-3xl" />

//             {/* HEADER */}

//             <div className="relative mb-6">
//               <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-400/20 bg-gradient-to-br from-blue-600/20 via-cyan-500/10 to-purple-600/20">
//                 <Lock
//                   size={23}
//                   className="text-cyan-300"
//                 />
//               </div>

//               <h2 className="text-xl font-bold text-white">
//                 Change Password
//               </h2>

//               <p className="mt-1 text-sm text-slate-500">
//                 Enter your new password below.
//               </p>
//             </div>

//             {/* NEW PASSWORD */}

//             <div className="relative mb-4">
//               <label className="mb-2 block text-sm font-semibold text-slate-300">
//                 New Password
//               </label>

//               <div className="relative">
//                 <input
//                   type={
//                     showPassword
//                       ? "text"
//                       : "password"
//                   }
//                   value={newPassword}
//                   onChange={(e) =>
//                     setNewPassword(
//                       e.target.value
//                     )
//                   }
//                   placeholder="Enter new password"
//                   className="w-full rounded-xl border border-white/10 bg-slate-900/80 px-4 py-3 pr-12 text-sm text-white outline-none placeholder:text-slate-600 transition-all duration-300 focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/10"
//                 />

//                 <button
//                   type="button"
//                   onClick={() =>
//                     setShowPassword(
//                       !showPassword
//                     )
//                   }
//                   className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-slate-500 transition hover:bg-white/5 hover:text-cyan-300"
//                 >
//                   {showPassword ? (
//                     <EyeOff size={18} />
//                   ) : (
//                     <Eye size={18} />
//                   )}
//                 </button>
//               </div>
//             </div>

//             {/* CONFIRM PASSWORD */}

//             <div className="relative mb-6">
//               <label className="mb-2 block text-sm font-semibold text-slate-300">
//                 Confirm Password
//               </label>

//               <input
//                 type={
//                   showPassword
//                     ? "text"
//                     : "password"
//                 }
//                 value={confirmPassword}
//                 onChange={(e) =>
//                   setConfirmPassword(
//                     e.target.value
//                   )
//                 }
//                 placeholder="Confirm new password"
//                 className="w-full rounded-xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 transition-all duration-300 focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/10"
//               />
//             </div>

//             {/* BUTTONS */}

//             <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
//               <button
//                 type="button"
//                 onClick={() => {
//                   setShowPasswordModal(false);

//                   setNewPassword("");
//                   setConfirmPassword("");
//                 }}
//                 className="rounded-xl border border-white/10 bg-slate-900/70 px-5 py-3 font-semibold text-slate-300 transition-all duration-300 hover:border-white/20 hover:bg-slate-800 hover:text-white"
//               >
//                 Cancel
//               </button>

//               <button
//                 type="button"
//                 onClick={changePassword}
//                 disabled={changingPassword}
//                 className="group relative flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 px-5 py-3 font-semibold text-white shadow-[0_0_25px_rgba(59,130,246,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_35px_rgba(34,211,238,0.25)] disabled:cursor-not-allowed disabled:opacity-60"
//               >
//                 <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

//                 <span className="relative flex items-center gap-2">
//                   {changingPassword && (
//                     <Loader2
//                       size={17}
//                       className="animate-spin"
//                     />
//                   )}

//                   {changingPassword
//                     ? "Updating..."
//                     : "Update Password"}
//                 </span>
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// /*
// ==================================================
// SETTINGS SECTION
// ==================================================
// */

// function SettingsSection({
//   icon,
//   title,
//   description,
//   children,
//   index,
// }: {
//   icon: React.ReactNode;
//   title: string;
//   description: string;
//   children: React.ReactNode;
//   index: number;
// }) {
//   return (
//     <section
//       className="group relative overflow-hidden rounded-3xl border border-white/10 bg-slate-950/80 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:border-white/15 hover:shadow-[0_0_35px_rgba(59,130,246,0.06)] animate-fade-up"
//       style={{
//         animationDelay: `${index * 100}ms`,
//       }}
//     >
//       {/* AMBIENT GLOW */}

//       <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-blue-500/5 blur-3xl transition-all duration-700 group-hover:scale-125 group-hover:bg-cyan-500/10" />

//       {/* HEADER */}

//       <div className="relative border-b border-white/5 p-6">
//         <div className="flex items-center gap-4">
//           <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border border-blue-400/10 bg-gradient-to-br from-blue-500/15 via-cyan-500/10 to-purple-500/15 text-cyan-300 transition-all duration-500 group-hover:scale-105 group-hover:border-cyan-400/20">
//             {icon}
//           </div>

//           <div>
//             <h2 className="text-lg font-bold text-white">
//               {title}
//             </h2>

//             <p className="mt-1 text-sm text-slate-500">
//               {description}
//             </p>
//           </div>
//         </div>
//       </div>

//       {children}
//     </section>
//   );
// }

// /*
// ==================================================
// SETTING TOGGLE
// ==================================================
// */

// function SettingToggle({
//   title,
//   description,
//   enabled,
//   onChange,
// }: {
//   title: string;
//   description: string;
//   enabled: boolean;
//   onChange: (value: boolean) => void;
// }) {
//   return (
//     <div className="group flex items-center justify-between gap-4 p-6 transition-all duration-300 hover:bg-white/[0.015]">
//       <div className="min-w-0">
//         <div className="flex items-center gap-2">
//           <p className="font-semibold text-white">
//             {title}
//           </p>

//           {enabled && (
//             <CheckCircle2
//               size={14}
//               className="text-cyan-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
//             />
//           )}
//         </div>

//         <p className="mt-1 text-sm leading-6 text-slate-500">
//           {description}
//         </p>
//       </div>

//       <Toggle
//         enabled={enabled}
//         onChange={onChange}
//       />
//     </div>
//   );
// }

// /*
// ==================================================
// TOGGLE
// ==================================================
// */

// function Toggle({
//   enabled,
//   onChange,
// }: {
//   enabled: boolean;
//   onChange: (value: boolean) => void;
// }) {
//   return (
//     <button
//       type="button"
//       onClick={() =>
//         onChange(!enabled)
//       }
//       className={`relative h-7 w-12 flex-shrink-0 rounded-full border transition-all duration-300 ${
//         enabled
//           ? "border-cyan-400/30 bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 shadow-[0_0_18px_rgba(34,211,238,0.25)]"
//           : "border-white/10 bg-slate-800"
//       }`}
//       aria-pressed={enabled}
//       aria-label="Toggle setting"
//     >
//       <span
//         className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow-lg transition-all duration-300 ${
//           enabled
//             ? "left-6 shadow-cyan-400/30"
//             : "left-1 shadow-black/30"
//         }`}
//       />
//     </button>
//   );
// }


// "use client";

// import { useEffect, useState } from "react";
// import {
//   Settings,
//   User,
//   Bell,
//   Palette,
//   BookOpen,
//   Shield,
//   LogOut,
//   Trash2,
//   Save,
//   Lock,
//   Mail,
//   Moon,
//   Sun,
//   Eye,
//   EyeOff,
//   Loader2,
// } from "lucide-react";
// import toast from "react-hot-toast";

// import { supabase } from "@/app/lib/supabase";

// interface UserSettings {
//   id?: string;
//   user_id: string;

//   email_notifications: boolean;
//   class_reminders: boolean;
//   assignment_notifications: boolean;
//   course_announcements: boolean;

//   dark_mode: boolean;

//   language: string;
//   timezone: string;

//   learning_reminders: boolean;
// }

// export default function SettingsPage() {
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);

//   const [userId, setUserId] = useState<string | null>(null);

//   const [fullName, setFullName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");

//   const [settings, setSettings] =
//     useState<UserSettings | null>(null);

//   /* PASSWORD */

//   const [showPasswordModal, setShowPasswordModal] =
//     useState(false);

//   const [newPassword, setNewPassword] =
//     useState("");

//   const [confirmPassword, setConfirmPassword] =
//     useState("");

//   const [showPassword, setShowPassword] =
//     useState(false);

//   const [changingPassword, setChangingPassword] =
//     useState(false);

//   /* DELETE ACCOUNT */

//   const [deletingAccount, setDeletingAccount] =
//     useState(false);

//   useEffect(() => {
//     loadSettings();
//   }, []);

//   /*
//   ==================================================
//   LOAD SETTINGS
//   ==================================================
//   */

//   async function loadSettings() {
//     try {
//       setLoading(true);

//       const {
//         data: { user },
//         error: userError,
//       } = await supabase.auth.getUser();

//       if (userError || !user) {
//         toast.error("Please log in first.");
//         return;
//       }

//       setUserId(user.id);

//       setEmail(user.email ?? "");

//       /*
//       ==============================================
//       LOAD PROFILE
//       ==============================================
//       */

//       const {
//         data: profile,
//         error: profileError,
//       } = await supabase
//         .from("profiles")
//         .select("full_name, email, phone")
//         .eq("id", user.id)
//         .maybeSingle();

//       if (profileError) {
//         console.error(
//           "PROFILE LOAD ERROR:",
//           profileError
//         );
//       }

//       if (profile) {
//         setFullName(profile.full_name ?? "");

//         setEmail(
//           profile.email ??
//             user.email ??
//             ""
//         );

//         setPhone(profile.phone ?? "");
//       }

//       /*
//       ==============================================
//       LOAD USER SETTINGS
//       ==============================================
//       */

//       const {
//         data: userSettings,
//         error: settingsError,
//       } = await supabase
//         .from("user_settings")
//         .select("*")
//         .eq("user_id", user.id)
//         .maybeSingle();

//       if (settingsError) {
//         console.error(
//           "SETTINGS LOAD ERROR:",
//           settingsError
//         );

//         toast.error(
//           "Failed to load your settings."
//         );

//         return;
//       }

//       /*
//       ==============================================
//       CREATE DEFAULT SETTINGS
//       ==============================================
//       */

//       if (!userSettings) {
//         const defaultSettings: UserSettings = {
//           user_id: user.id,

//           email_notifications: true,
//           class_reminders: true,
//           assignment_notifications: true,
//           course_announcements: true,

//           dark_mode: false,

//           language: "English",
//           timezone: "Africa/Lagos",

//           learning_reminders: true,
//         };

//         const {
//           data: createdSettings,
//           error: createError,
//         } = await supabase
//           .from("user_settings")
//           .insert(defaultSettings)
//           .select()
//           .single();

//         if (createError) {
//           console.error(
//             "CREATE SETTINGS ERROR:",
//             createError
//           );

//           toast.error(
//             "Failed to create your settings."
//           );

//           return;
//         }

//         setSettings(createdSettings);

//         applyDarkMode(
//           createdSettings.dark_mode
//         );
//       } else {
//         setSettings(userSettings);

//         applyDarkMode(
//           userSettings.dark_mode
//         );
//       }
//     } catch (error) {
//       console.error(
//         "SETTINGS PAGE ERROR:",
//         error
//       );

//       toast.error(
//         "Something went wrong."
//       );
//     } finally {
//       setLoading(false);
//     }
//   }

//   /*
//   ==================================================
//   UPDATE SETTING IN STATE
//   ==================================================
//   */

//   function updateSetting(
//     field: keyof UserSettings,
//     value: boolean | string
//   ) {
//     setSettings((prev) => {
//       if (!prev) return prev;

//       return {
//         ...prev,
//         [field]: value,
//       };
//     });

//     /*
//     Apply dark mode immediately.
//     The user does not have to press Save
//     to preview the theme.
//     */

//     if (
//       field === "dark_mode" &&
//       typeof value === "boolean"
//     ) {
//       applyDarkMode(value);
//     }
//   }

//   /*
//   ==================================================
//   DARK MODE
//   ==================================================
//   */

//   function applyDarkMode(enabled: boolean) {
//     if (typeof document === "undefined") {
//       return;
//     }

//     if (enabled) {
//       document.documentElement.classList.add(
//         "dark"
//       );

//       localStorage.setItem(
//         "lms-dark-mode",
//         "true"
//       );
//     } else {
//       document.documentElement.classList.remove(
//         "dark"
//       );

//       localStorage.setItem(
//         "lms-dark-mode",
//         "false"
//       );
//     }
//   }

//   /*
//   ==================================================
//   SAVE ALL SETTINGS
//   ==================================================
//   */

//   async function saveSettings() {
//     if (!userId || !settings) {
//       toast.error(
//         "Unable to save settings."
//       );

//       return;
//     }

//     try {
//       setSaving(true);

//       /*
//       ==============================================
//       UPDATE PROFILE
//       ==============================================
//       */

//       const {
//         error: profileError,
//       } = await supabase
//         .from("profiles")
//         .update({
//           full_name:
//             fullName.trim(),
//           phone:
//             phone.trim() || null,
//         })
//         .eq("id", userId);

//       if (profileError) {
//         console.error(
//           "PROFILE UPDATE ERROR:",
//           profileError
//         );

//         toast.error(
//           "Failed to update profile."
//         );

//         return;
//       }

//       /*
//       ==============================================
//       UPSERT SETTINGS
//       ==============================================
//       */

//       const settingsToSave = {
//         user_id: userId,

//         email_notifications:
//           settings.email_notifications,

//         class_reminders:
//           settings.class_reminders,

//         assignment_notifications:
//           settings.assignment_notifications,

//         course_announcements:
//           settings.course_announcements,

//         dark_mode:
//           settings.dark_mode,

//         language:
//           settings.language,

//         timezone:
//           settings.timezone,

//         learning_reminders:
//           settings.learning_reminders,

//         updated_at:
//           new Date().toISOString(),
//       };

//       const {
//         data: savedSettings,
//         error: settingsError,
//       } = await supabase
//         .from("user_settings")
//         .upsert(
//           settingsToSave,
//           {
//             onConflict: "user_id",
//           }
//         )
//         .select()
//         .single();

//       if (settingsError) {
//         console.error(
//           "SETTINGS UPDATE ERROR:",
//           settingsError
//         );

//         toast.error(
//           "Failed to save settings."
//         );

//         return;
//       }

//       setSettings(savedSettings);

//       applyDarkMode(
//         savedSettings.dark_mode
//       );

//       toast.success(
//         "Settings saved successfully!"
//       );
//     } catch (error) {
//       console.error(
//         "SAVE SETTINGS ERROR:",
//         error
//       );

//       toast.error(
//         "Something went wrong."
//       );
//     } finally {
//       setSaving(false);
//     }
//   }

//   /*
//   ==================================================
//   CHANGE PASSWORD
//   ==================================================
//   */

//   async function changePassword() {
//     if (!newPassword) {
//       toast.error(
//         "Please enter a new password."
//       );

//       return;
//     }

//     if (newPassword.length < 6) {
//       toast.error(
//         "Password must be at least 6 characters."
//       );

//       return;
//     }

//     if (
//       newPassword !== confirmPassword
//     ) {
//       toast.error(
//         "Passwords do not match."
//       );

//       return;
//     }

//     try {
//       setChangingPassword(true);

//       const { error } =
//         await supabase.auth.updateUser({
//           password: newPassword,
//         });

//       if (error) {
//         console.error(
//           "PASSWORD ERROR:",
//           error
//         );

//         toast.error(
//           error.message
//         );

//         return;
//       }

//       toast.success(
//         "Password changed successfully!"
//       );

//       setNewPassword("");
//       setConfirmPassword("");

//       setShowPasswordModal(false);
//     } catch (error) {
//       console.error(
//         "PASSWORD CHANGE ERROR:",
//         error
//       );

//       toast.error(
//         "Failed to change password."
//       );
//     } finally {
//       setChangingPassword(false);
//     }
//   }

//   /*
//   ==================================================
//   SIGN OUT
//   ==================================================
//   */

//   async function signOut() {
//     const confirmed =
//       window.confirm(
//         "Are you sure you want to sign out?"
//       );

//     if (!confirmed) return;

//     const { error } =
//       await supabase.auth.signOut();

//     if (error) {
//       toast.error(error.message);
//       return;
//     }

//     toast.success(
//       "Signed out successfully."
//     );

//     window.location.href =
//       "/auth/login";
//   }

//   /*
//   ==================================================
//   DELETE ACCOUNT
//   ==================================================
//   */

//   async function deleteAccount() {
//     const confirmed =
//       window.confirm(
//         "WARNING: This will permanently delete your account and account data. This cannot be undone. Are you absolutely sure?"
//       );

//     if (!confirmed) return;

//     const secondConfirmation =
//       window.confirm(
//         "Please confirm again that you want to permanently delete your LMS account."
//       );

//     if (!secondConfirmation) return;

//     try {
//       setDeletingAccount(true);

//       const {
//         data: {
//           session,
//         },
//       } =
//         await supabase.auth.getSession();

//       if (!session?.access_token) {
//         toast.error(
//           "Your session has expired. Please log in again."
//         );

//         return;
//       }

//       const response =
//         await fetch(
//           "/api/account/delete",
//           {
//             method: "DELETE",

//             headers: {
//               Authorization:
//                 `Bearer ${session.access_token}`,
//             },
//           }
//         );

//       const result =
//         await response.json();

//       if (!response.ok) {
//         console.error(
//           "DELETE ACCOUNT ERROR:",
//           result
//         );

//         toast.error(
//           result.error ??
//             "Failed to delete account."
//         );

//         return;
//       }

//       toast.success(
//         "Your account has been deleted."
//       );

//       window.location.href =
//         "/auth/login";
//     } catch (error) {
//       console.error(
//         "ACCOUNT DELETE ERROR:",
//         error
//       );

//       toast.error(
//         "Something went wrong while deleting your account."
//       );
//     } finally {
//       setDeletingAccount(false);
//     }
//   }

//   /*
//   ==================================================
//   LOADING
//   ==================================================
//   */

//   if (loading) {
//     return (
//       <div className="flex min-h-[60vh] items-center justify-center dark:bg-gray-900 dark:text-white">
//         <div className="text-center">
//           <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />

//           <p className="mt-3 text-sm text-gray-500">
//             Loading settings...
//           </p>
//         </div>
//       </div>
//     );
//   }

//   /*
//   ==================================================
//   MAIN UI
//   ==================================================
//   */

//   return (
//     <>
//       <div className="mx-auto max-w-5xl space-y-8 pb-12 ">

//         {/* HEADER */}

//         <div>
//           <div className="flex items-center gap-3">
//             <Settings
//               size={32}
//               className="text-blue-600"
//             />

//             <h1 className="text-3xl font-bold text-gray-800">
//               Settings
//             </h1>
//           </div>

//           <p className="mt-2 text-gray-500 dark:text-gray-400">
//             Manage your account, preferences,
//             notifications, and security.
//           </p>
//         </div>

//         {/* ACCOUNT */}

//         <section className="rounded-2xl border bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900">

//           <div className="border-b p-6 dark:border-gray-700">
//             <div className="flex items-center gap-3">
//               <User
//                 size={22}
//                 className="text-blue-600"
//               />

//               <div>
//                 <h2 className="text-lg font-bold text-gray-800 dark:text-white">
//                   Account
//                 </h2>

//                 <p className="text-sm text-gray-500 dark:text-gray-400">
//                   Manage your personal information.
//                 </p>
//               </div>
//             </div>
//           </div>

//           <div className="grid gap-5 p-6 md:grid-cols-2">

//             {/* FULL NAME */}

//             <div>
//               <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
//                 Full Name
//               </label>

//               <input
//                 type="text"
//                 value={fullName}
//                 onChange={(e) =>
//                   setFullName(
//                     e.target.value
//                   )
//                 }
//                 placeholder="Your full name"
//                 className="w-full rounded-xl border px-4 py-3 text-gray-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
//               />
//             </div>

//             {/* EMAIL */}

//             <div>
//               <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
//                 Email Address
//               </label>

//               <div className="relative">
//                 <Mail
//                   size={18}
//                   className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
//                 />

//                 <input
//                   type="email"
//                   value={email}
//                   disabled
//                   className="w-full rounded-xl border bg-gray-50 py-3 pl-11 pr-4 text-gray-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400"
//                 />
//               </div>

//               <p className="mt-1 text-xs text-gray-400">
//                 Your email is managed through
//                 your authentication account.
//               </p>
//             </div>

//             {/* PHONE */}

//             <div>
//               <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
//                 Phone Number
//               </label>

//               <input
//                 type="tel"
//                 value={phone}
//                 onChange={(e) =>
//                   setPhone(
//                     e.target.value
//                   )
//                 }
//                 placeholder="Your phone number"
//                 className="w-full rounded-xl border px-4 py-3 text-gray-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
//               />
//             </div>

//           </div>
//         </section>

//         {/* NOTIFICATIONS */}

//         <section className="rounded-2xl border bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900">

//           <div className="border-b p-6 dark:border-gray-700">
//             <div className="flex items-center gap-3">

//               <Bell
//                 size={22}
//                 className="text-blue-600"
//               />

//               <div>
//                 <h2 className="text-lg font-bold text-gray-800 dark:text-white">
//                   Notifications
//                 </h2>

//                 <p className="text-sm text-gray-500 dark:text-gray-400">
//                   Choose which notifications you
//                   want to receive.
//                 </p>
//               </div>

//             </div>
//           </div>

//           <div className="divide-y dark:divide-gray-700">

//             <SettingToggle
//               title="Email Notifications"
//               description="Receive important updates by email."
//               enabled={
//                 settings?.email_notifications ??
//                 true
//               }
//               onChange={(value) =>
//                 updateSetting(
//                   "email_notifications",
//                   value
//                 )
//               }
//             />

//             <SettingToggle
//               title="Class Reminders"
//               description="Receive reminders before scheduled classes."
//               enabled={
//                 settings?.class_reminders ??
//                 true
//               }
//               onChange={(value) =>
//                 updateSetting(
//                   "class_reminders",
//                   value
//                 )
//               }
//             />

//             <SettingToggle
//               title="Assignment Notifications"
//               description="Get notified about assignments and deadlines."
//               enabled={
//                 settings?.assignment_notifications ??
//                 true
//               }
//               onChange={(value) =>
//                 updateSetting(
//                   "assignment_notifications",
//                   value
//                 )
//               }
//             />

//             <SettingToggle
//               title="Course Announcements"
//               description="Receive announcements from your courses."
//               enabled={
//                 settings?.course_announcements ??
//                 true
//               }
//               onChange={(value) =>
//                 updateSetting(
//                   "course_announcements",
//                   value
//                 )
//               }
//             />

//           </div>
//         </section>

//         {/* APPEARANCE */}

//         <section className="rounded-2xl border bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900">

//           <div className="border-b p-6 dark:border-gray-700">

//             <div className="flex items-center gap-3">

//               <Palette
//                 size={22}
//                 className="text-blue-600"
//               />

//               <div>
//                 <h2 className="text-lg font-bold text-gray-800 dark:text-white">
//                   Appearance
//                 </h2>

//                 <p className="text-sm text-gray-500 dark:text-gray-400">
//                   Customize how your LMS looks.
//                 </p>
//               </div>

//             </div>

//           </div>

//           <div className="p-6">

//             <div className="flex items-center justify-between gap-4">

//               <div className="flex items-center gap-4">

//                 {settings?.dark_mode ? (
//                   <Moon
//                     size={22}
//                     className="text-blue-600"
//                   />
//                 ) : (
//                   <Sun
//                     size={22}
//                     className="text-blue-600"
//                   />
//                 )}

//                 <div>
//                   <p className="font-semibold text-gray-800 dark:text-white">
//                     Dark Mode
//                   </p>

//                   <p className="text-sm text-gray-500 dark:text-gray-400">
//                     Use a darker appearance throughout
//                     the application.
//                   </p>
//                 </div>

//               </div>

//               <Toggle
//                 enabled={
//                   settings?.dark_mode ??
//                   false
//                 }
//                 onChange={(value) =>
//                   updateSetting(
//                     "dark_mode",
//                     value
//                   )
//                 }
//               />

//             </div>

//           </div>
//         </section>

//         {/* LEARNING PREFERENCES */}

//         <section className="rounded-2xl border bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900">

//           <div className="border-b p-6 dark:border-gray-700">

//             <div className="flex items-center gap-3">

//               <BookOpen
//                 size={22}
//                 className="text-blue-600"
//               />

//               <div>
//                 <h2 className="text-lg font-bold text-gray-800 dark:text-white">
//                   Learning Preferences
//                 </h2>

//                 <p className="text-sm text-gray-500 dark:text-gray-400">
//                   Customize your learning experience.
//                 </p>
//               </div>

//             </div>

//           </div>

//           <div className="space-y-6 p-6">

//             {/* LANGUAGE */}

//             <div>
//               <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
//                 Language
//               </label>

//               <select
//                 value={
//                   settings?.language ??
//                   "English"
//                 }
//                 onChange={(e) =>
//                   updateSetting(
//                     "language",
//                     e.target.value
//                   )
//                 }
//                 className="w-full rounded-xl border bg-white px-4 py-3 text-gray-700 outline-none focus:border-blue-500 md:max-w-md dark:border-gray-600 dark:bg-gray-800 dark:text-white"
//               >
//                 <option value="English">
//                   English
//                 </option>

//                 <option value="French">
//                   French
//                 </option>

//                 <option value="Spanish">
//                   Spanish
//                 </option>
//               </select>
//             </div>

//             {/* TIMEZONE */}

//             <div>
//               <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
//                 Timezone
//               </label>

//               <select
//                 value={
//                   settings?.timezone ??
//                   "Africa/Lagos"
//                 }
//                 onChange={(e) =>
//                   updateSetting(
//                     "timezone",
//                     e.target.value
//                   )
//                 }
//                 className="w-full rounded-xl border bg-white px-4 py-3 text-gray-700 outline-none focus:border-blue-500 md:max-w-md dark:border-gray-600 dark:bg-gray-800 dark:text-white"
//               >
//                 <option value="Africa/Lagos">
//                   West Africa Time (Lagos)
//                 </option>

//                 <option value="Europe/London">
//                   Greenwich Mean Time (London)
//                 </option>

//                 <option value="America/New_York">
//                   Eastern Time (New York)
//                 </option>

//                 <option value="America/Los_Angeles">
//                   Pacific Time (Los Angeles)
//                 </option>
//               </select>
//             </div>

//             <SettingToggle
//               title="Learning Reminders"
//               description="Receive reminders to continue your courses."
//               enabled={
//                 settings?.learning_reminders ??
//                 true
//               }
//               onChange={(value) =>
//                 updateSetting(
//                   "learning_reminders",
//                   value
//                 )
//               }
//             />

//           </div>
//         </section>

//         {/* SECURITY */}

//         <section className="rounded-2xl border bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900">

//           <div className="border-b p-6 dark:border-gray-700">

//             <div className="flex items-center gap-3">

//               <Shield
//                 size={22}
//                 className="text-blue-600"
//               />

//               <div>
//                 <h2 className="text-lg font-bold text-gray-800 dark:text-white">
//                   Security
//                 </h2>

//                 <p className="text-sm text-gray-500 dark:text-gray-400">
//                   Manage your account security.
//                 </p>
//               </div>

//             </div>

//           </div>

//           <div className="space-y-4 p-6">

//             <button
//               type="button"
//               onClick={() =>
//                 setShowPasswordModal(
//                   true
//                 )
//               }
//               className="flex w-full items-center gap-4 rounded-xl border p-4 text-left transition hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
//             >
//               <Lock
//                 size={20}
//                 className="text-blue-600"
//               />

//               <div>
//                 <p className="font-semibold text-gray-800 dark:text-white">
//                   Change Password
//                 </p>

//                 <p className="text-sm text-gray-500 dark:text-gray-400">
//                   Update your account password.
//                 </p>
//               </div>
//             </button>

//             <button
//               type="button"
//               onClick={signOut}
//               className="flex w-full items-center gap-4 rounded-xl border p-4 text-left transition hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
//             >
//               <LogOut
//                 size={20}
//                 className="text-gray-600"
//               />

//               <div>
//                 <p className="font-semibold text-gray-800 dark:text-white">
//                   Sign Out
//                 </p>

//                 <p className="text-sm text-gray-500 dark:text-gray-400">
//                   Sign out of your LMS account.
//                 </p>
//               </div>
//             </button>

//           </div>
//         </section>

//         {/* SAVE */}

//         <div className="flex justify-end">

//           <button
//             type="button"
//             onClick={saveSettings}
//             disabled={saving}
//             className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
//           >
//             {saving ? (
//               <Loader2
//                 size={18}
//                 className="animate-spin"
//               />
//             ) : (
//               <Save size={18} />
//             )}

//             {saving
//               ? "Saving..."
//               : "Save Changes"}
//           </button>

//         </div>

//         {/* DANGER ZONE */}

//         <section className="rounded-2xl border border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950">

//           <div className="border-b border-red-200 p-6 dark:border-red-900">

//             <div className="flex items-center gap-3">

//               <Trash2
//                 size={22}
//                 className="text-red-600"
//               />

//               <div>
//                 <h2 className="text-lg font-bold text-red-700">
//                   Danger Zone
//                 </h2>

//                 <p className="text-sm text-red-600">
//                   These actions can affect your account
//                   permanently.
//                 </p>
//               </div>

//             </div>

//           </div>

//           <div className="p-6">

//             <button
//               type="button"
//               onClick={deleteAccount}
//               disabled={deletingAccount}
//               className="rounded-xl border border-red-300 bg-white px-5 py-3 font-semibold text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
//             >
//               {deletingAccount
//                 ? "Deleting Account..."
//                 : "Delete Account"}
//             </button>

//             <p className="mt-3 text-xs text-red-600">
//               Account deletion is permanent and
//               cannot be undone.
//             </p>

//           </div>

//         </section>

//       </div>

//       {/* PASSWORD MODAL */}

//       {showPasswordModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

//           <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl dark:bg-gray-900">

//             <div className="mb-6">

//               <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-950">
//                 <Lock
//                   size={22}
//                   className="text-blue-600"
//                 />
//               </div>

//               <h2 className="text-xl font-bold text-gray-800 dark:text-white">
//                 Change Password
//               </h2>

//               <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
//                 Enter your new password below.
//               </p>

//             </div>

//             {/* NEW PASSWORD */}

//             <div className="mb-4">

//               <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
//                 New Password
//               </label>

//               <div className="relative">

//                 <input
//                   type={
//                     showPassword
//                       ? "text"
//                       : "password"
//                   }
//                   value={newPassword}
//                   onChange={(e) =>
//                     setNewPassword(
//                       e.target.value
//                     )
//                   }
//                   placeholder="Enter new password"
//                   className="w-full rounded-xl border px-4 py-3 pr-12 text-gray-700 outline-none focus:border-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
//                 />

//                 <button
//                   type="button"
//                   onClick={() =>
//                     setShowPassword(
//                       !showPassword
//                     )
//                   }
//                   className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
//                 >
//                   {showPassword ? (
//                     <EyeOff size={18} />
//                   ) : (
//                     <Eye size={18} />
//                   )}
//                 </button>

//               </div>

//             </div>

//             {/* CONFIRM PASSWORD */}

//             <div className="mb-6">

//               <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
//                 Confirm Password
//               </label>

//               <input
//                 type={
//                   showPassword
//                     ? "text"
//                     : "password"
//                 }
//                 value={confirmPassword}
//                 onChange={(e) =>
//                   setConfirmPassword(
//                     e.target.value
//                   )
//                 }
//                 placeholder="Confirm new password"
//                 className="w-full rounded-xl border px-4 py-3 text-gray-700 outline-none focus:border-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
//               />

//             </div>

//             {/* BUTTONS */}

//             <div className="flex justify-end gap-3">

//               <button
//                 type="button"
//                 onClick={() => {
//                   setShowPasswordModal(
//                     false
//                   );

//                   setNewPassword("");
//                   setConfirmPassword("");
//                 }}
//                 className="rounded-xl border px-5 py-3 font-semibold text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
//               >
//                 Cancel
//               </button>

//               <button
//                 type="button"
//                 onClick={changePassword}
//                 disabled={
//                   changingPassword
//                 }
//                 className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
//               >
//                 {changingPassword && (
//                   <Loader2
//                     size={17}
//                     className="animate-spin"
//                   />
//                 )}

//                 {changingPassword
//                   ? "Updating..."
//                   : "Update Password"}
//               </button>

//             </div>

//           </div>

//         </div>
//       )}
//     </>
//   );
// }

// /*
// ==================================================
// SETTING TOGGLE
// ==================================================
// */

// function SettingToggle({
//   title,
//   description,
//   enabled,
//   onChange,
// }: {
//   title: string;
//   description: string;
//   enabled: boolean;
//   onChange: (value: boolean) => void;
// }) {
//   return (
//     <div className="flex items-center justify-between gap-4 p-6">

//       <div>
//         <p className="font-semibold text-gray-800 dark:text-white">
//           {title}
//         </p>

//         <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
//           {description}
//         </p>
//       </div>

//       <Toggle
//         enabled={enabled}
//         onChange={onChange}
//       />

//     </div>
//   );
// }

// /*
// ==================================================
// TOGGLE
// ==================================================
// */

// function Toggle({
//   enabled,
//   onChange,
// }: {
//   enabled: boolean;
//   onChange: (value: boolean) => void;
// }) {
//   return (
//     <button
//       type="button"
//       onClick={() =>
//         onChange(!enabled)
//       }
//       className={`relative h-6 w-11 flex-shrink-0 rounded-full transition ${
//         enabled
//           ? "bg-blue-600"
//           : "bg-gray-300 dark:bg-gray-600"
//       }`}
//       aria-pressed={enabled}
//       aria-label="Toggle setting"
//     >
//       <span
//         className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition ${
//           enabled
//             ? "left-6"
//             : "left-1"
//         }`}
//       />
//     </button>
//   );
// }





