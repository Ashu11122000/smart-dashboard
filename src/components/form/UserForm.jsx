import { useMemo, useState } from "react";
import { toast } from "react-toastify";
import Button from "../common/Button";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaBriefcase,
  FaMapMarkerAlt,
  FaEdit,
  FaTrash,
  FaCheckCircle,
  FaShieldAlt,
  FaCrown,
} from "react-icons/fa";

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function getProfileStrength(profile) {
  if (!profile) return 0;

  let score = 0;

  if (profile.name) score += 20;
  if (profile.email) score += 20;
  if (profile.phone) score += 20;
  if (profile.role) score += 20;
  if (profile.location) score += 20;

  return score;
}

export default function UserForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    location: "",
    bio: "",
  });

  const [savedProfile, setSavedProfile] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  function handleInputChange(event) {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function resetForm() {
    setFormData({
      name: "",
      email: "",
      phone: "",
      role: "",
      location: "",
      bio: "",
    });

    setIsEditing(false);
  }

  function handleDeleteProfile() {
    setSavedProfile(null);
    resetForm();
    toast.error("Profile deleted");
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

    if (!validateEmail(formData.email)) {
      toast.error("Enter a valid email");
      return;
    }

    setIsSaving(true);

    setTimeout(() => {
      setSavedProfile({
        ...formData,
        updatedAt: new Date().toLocaleString(),
      });

      setIsSaving(false);
      setIsEditing(false);

      toast.success(
        isEditing
          ? "Profile updated successfully!"
          : "Profile created successfully!"
      );

      resetForm();
    }, 1000);
  }

  function handleEditProfile() {
    if (!savedProfile) return;

    setFormData({
      name: savedProfile.name || "",
      email: savedProfile.email || "",
      phone: savedProfile.phone || "",
      role: savedProfile.role || "",
      location: savedProfile.location || "",
      bio: savedProfile.bio || "",
    });

    setIsEditing(true);
  }

  const initials = useMemo(() => {
    if (!savedProfile?.name) return "U";

    return savedProfile.name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  }, [savedProfile]);

  const profileStrength = getProfileStrength(savedProfile);

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-950 via-neutral-900 to-stone-950 p-6 md:p-8 shadow-2xl backdrop-blur-2xl">

      {/* Ambient Glow */}
      <div className="absolute -top-16 -left-16 h-56 w-56 rounded-full bg-amber-500/10 blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-16 -right-16 h-56 w-56 rounded-full bg-rose-500/10 blur-3xl animate-pulse"></div>
      <div className="absolute top-1/2 left-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/5 blur-3xl"></div>

      <div className="relative z-10 space-y-8">

        {/* Header */}
        <div className="flex flex-col xl:flex-row justify-between gap-5">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-zinc-500">
              Identity Workspace
            </p>

            <h2 className="mt-3 text-3xl md:text-5xl font-black bg-gradient-to-r from-white via-amber-200 to-rose-300 bg-clip-text text-transparent">
              Premium Profile Manager
            </h2>

            <p className="mt-3 text-zinc-300">
              Manage your dashboard identity with advanced premium controls.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 px-5 py-4">
              <p className="text-xs uppercase tracking-wider text-emerald-200">
                Session
              </p>

              <div className="mt-2 flex items-center gap-2">
                <FaShieldAlt className="text-emerald-300" />
                <span className="text-white font-medium">
                  Secure
                </span>
              </div>
            </div>

            <div className="rounded-2xl border border-amber-400/20 bg-amber-500/10 px-5 py-4">
              <p className="text-xs uppercase tracking-wider text-amber-200">
                Tier
              </p>

              <div className="mt-2 flex items-center gap-2">
                <FaCrown className="text-amber-300" />
                <span className="text-white font-medium">
                  Premium
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5 rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-2xl shadow-2xl"
        >
          <div className="grid md:grid-cols-2 gap-5">

            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Full Name
              </label>

              <div className="relative">
                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  className="w-full rounded-2xl border border-white/10 bg-white/10 pl-12 pr-4 py-4 text-white placeholder:text-zinc-500 outline-none focus:border-amber-400/30"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Email Address
              </label>

              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  className="w-full rounded-2xl border border-white/10 bg-white/10 pl-12 pr-4 py-4 text-white placeholder:text-zinc-500 outline-none focus:border-amber-400/30"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Phone
              </label>

              <div className="relative">
                <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />

                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter phone number"
                  className="w-full rounded-2xl border border-white/10 bg-white/10 pl-12 pr-4 py-4 text-white placeholder:text-zinc-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Role
              </label>

              <div className="relative">
                <FaBriefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />

                <input
                  type="text"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  placeholder="Frontend Developer"
                  className="w-full rounded-2xl border border-white/10 bg-white/10 pl-12 pr-4 py-4 text-white placeholder:text-zinc-500 outline-none"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-300">
              Location
            </label>

            <div className="relative">
              <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />

              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="Your city / country"
                className="w-full rounded-2xl border border-white/10 bg-white/10 pl-12 pr-4 py-4 text-white placeholder:text-zinc-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-300">
              Bio
            </label>

            <textarea
              rows="4"
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              placeholder="Tell something about yourself..."
              className="w-full resize-none rounded-2xl border border-white/10 bg-white/10 px-4 py-4 text-white placeholder:text-zinc-500 outline-none"
            />
          </div>

          <Button
            type="submit"
            loading={isSaving}
            className="w-full rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 py-4 font-bold shadow-xl"
          >
            {isEditing ? "Update Profile" : "Save Profile"}
          </Button>
        </form>

        {/* Saved Profile */}
        {savedProfile && (
          <div className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-2xl shadow-2xl">
            <div className="flex flex-col xl:flex-row gap-6 items-center">

              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-rose-500 text-3xl font-black text-white shadow-2xl">
                {initials}
              </div>

              <div className="flex-1 text-center xl:text-left">
                <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
                  Saved Profile
                </p>

                <h3 className="mt-3 text-3xl font-black text-white">
                  {savedProfile.name}
                </h3>

                <p className="mt-2 text-zinc-300">
                  {savedProfile.email}
                </p>

                <p className="mt-2 text-zinc-400">
                  {savedProfile.role} • {savedProfile.location}
                </p>

                <p className="mt-4 text-zinc-300 leading-relaxed">
                  {savedProfile.bio}
                </p>

                <p className="mt-4 text-xs text-zinc-500">
                  Last updated: {savedProfile.updatedAt}
                </p>
              </div>

              <div className="flex flex-col gap-3 w-full xl:w-auto">
                <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 px-5 py-4 text-center">
                  <p className="text-xs uppercase tracking-[0.2em] text-emerald-200">
                    Profile Strength
                  </p>

                  <p className="mt-2 text-2xl font-black text-white">
                    {profileStrength}%
                  </p>
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={handleEditProfile}
                    className="rounded-2xl bg-amber-500/20 border border-amber-400/20"
                  >
                    <FaEdit />
                  </Button>

                  <Button
                    onClick={handleDeleteProfile}
                    className="rounded-2xl bg-rose-500/20 border border-rose-400/20"
                  >
                    <FaTrash />
                  </Button>

                  <Button className="rounded-2xl bg-emerald-500/20 border border-emerald-400/20">
                    <FaCheckCircle />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}