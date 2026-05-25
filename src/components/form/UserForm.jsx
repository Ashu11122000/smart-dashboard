import { useState } from "react";
import { toast } from "react-toastify";
import Button from "../common/Button";

export default function UserForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const [savedProfile, setSavedProfile] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  function handleInputChange(event) {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!formData.name.trim()) {
      toast.error("Name is required");
      return;
    }

    if (!formData.email.trim()) {
      toast.error("Email is required");
      return;
    }

    setIsSaving(true);

    setTimeout(() => {
      setSavedProfile(formData);
      setIsSaving(false);

      toast.success("Profile saved successfully!");

      setFormData({
        name: "",
        email: "",
      });
    }, 1200);
  }

  const initials =
    savedProfile?.name
      ?.split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "U";

  return (
    <div className="relative overflow-hidden rounded-3xl border border-blue-400/10 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 p-6 md:p-8 shadow-2xl backdrop-blur-2xl">

      {/* Ambient Glows */}
      <div className="absolute -top-16 -left-16 h-52 w-52 rounded-full bg-blue-500/15 blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-16 -right-16 h-52 w-52 rounded-full bg-violet-500/15 blur-3xl animate-pulse"></div>
      <div className="absolute top-1/2 left-1/2 h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/5 blur-3xl"></div>

      <div className="relative z-10 space-y-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between gap-5">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-blue-100/50">
              User Workspace
            </p>

            <h2 className="text-3xl font-black bg-gradient-to-r from-white via-blue-200 to-amber-300 bg-clip-text text-transparent">
              Premium Profile Manager
            </h2>

            <p className="mt-2 text-sm text-blue-100/60">
              Manage your dashboard identity with style
            </p>
          </div>

          <div className="rounded-2xl border border-blue-400/10 bg-white/5 px-5 py-4 backdrop-blur-xl shadow-lg">
            <p className="text-xs uppercase tracking-wider text-blue-100/50">
              Status
            </p>

            <div className="mt-2 flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-emerald-400 animate-pulse"></div>
              <span className="text-white font-medium">
                Active Session
              </span>
            </div>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5 rounded-3xl border border-blue-400/10 bg-white/5 p-6 backdrop-blur-xl shadow-xl"
        >
          <div>
            <label className="mb-2 block text-sm font-medium text-blue-100/70">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter your full name"
              className="
                w-full
                rounded-2xl
                border
                border-blue-400/10
                bg-white/5
                px-4
                py-3
                text-white
                placeholder:text-blue-100/40
                outline-none
                transition-all
                duration-300
                focus:border-amber-400/40
                focus:ring-2
                focus:ring-amber-400/20
              "
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-blue-100/70">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email address"
              className="
                w-full
                rounded-2xl
                border
                border-blue-400/10
                bg-white/5
                px-4
                py-3
                text-white
                placeholder:text-blue-100/40
                outline-none
                transition-all
                duration-300
                focus:border-amber-400/40
                focus:ring-2
                focus:ring-amber-400/20
              "
            />
          </div>

          <Button
            type="submit"
            loading={isSaving}
            className="w-full rounded-2xl bg-gradient-to-r from-blue-600 via-violet-600 to-amber-500 py-4 font-bold"
          >
            Save Profile
          </Button>
        </form>

        {/* Saved Profile */}
        {savedProfile && (
          <div className="rounded-3xl border border-blue-400/10 bg-white/5 p-6 backdrop-blur-xl shadow-xl">
            <div className="flex flex-col sm:flex-row items-center gap-5">
              
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-violet-600 text-2xl font-black text-white shadow-xl">
                {initials}
              </div>

              <div className="flex-1 text-center sm:text-left">
                <p className="text-xs uppercase tracking-[0.3em] text-blue-100/50">
                  Saved Profile
                </p>

                <h3 className="mt-2 text-2xl font-bold text-white">
                  {savedProfile.name}
                </h3>

                <p className="mt-1 text-blue-100/60">
                  {savedProfile.email}
                </p>
              </div>

              <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-3">
                <p className="text-sm font-semibold text-emerald-300">
                  Saved Successfully
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}