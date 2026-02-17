import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user } = useAuth();

  return (
    <div className="space-y-10 max-w-5xl">

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
            Profile Settings
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your personal information
          </p>
        </div>

        <div className="text-sm text-gray-500">
          Account Status:
          <span className="ml-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
            Active
          </span>
        </div>
      </div>

      {/* PROFILE CARD */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md border border-gray-200 dark:border-gray-800">

        {/* TOP SECTION */}
        <div className="flex items-center gap-6 p-8 border-b border-gray-200 dark:border-gray-800">

          <div className="w-20 h-20 rounded-2xl bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-2xl font-semibold text-gray-700 dark:text-gray-200">
            {user?.name?.[0]?.toUpperCase() || "U"}
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
              {user?.name || "User Name"}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {user?.email || "user@example.com"}
            </p>
          </div>

        </div>

        {/* FORM SECTION */}
        <div className="p-8 space-y-8">

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">

            <div>
              <label className="block text-xs font-medium text-gray-500 mb-2 uppercase tracking-wide">
                Full Name
              </label>
              <input
                type="text"
                defaultValue={user?.name || ""}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700
                bg-gray-50 dark:bg-gray-800 text-sm
                focus:outline-none focus:ring-2 focus:ring-gray-800 dark:focus:ring-white transition"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-500 mb-2 uppercase tracking-wide">
                Email Address
              </label>
              <input
                type="email"
                defaultValue={user?.email || ""}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700
                bg-gray-50 dark:bg-gray-800 text-sm
                focus:outline-none focus:ring-2 focus:ring-gray-800 dark:focus:ring-white transition"
              />
            </div>

          </div>

          {/* ACTIONS */}
          <div className="flex justify-end gap-4 pt-6 border-t border-gray-200 dark:border-gray-800">

            <button className="px-6 py-3 rounded-xl border border-gray-300 dark:border-gray-700 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition">
              Cancel
            </button>

            <button className="px-8 py-3 rounded-xl bg-gray-900 text-white text-sm font-medium hover:opacity-90 transition">
              Save Changes
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}
