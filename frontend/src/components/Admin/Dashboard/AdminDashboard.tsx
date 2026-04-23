import {
  LayoutDashboard,
  Users,
  BookOpen,
  Settings,
  LogOut,
  Bell,
  Search,
  GraduationCap,
} from "lucide-react";

interface AdminDashboardProps {
  userEmail?: string;
  onLogout: () => void;
}

const AdminDashboard = ({ userEmail, onLogout }: AdminDashboardProps) => {
  return (
    <div className="flex min-h-screen bg-[#f0f2f5]">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 flex items-center gap-3">
          <img
            src="/arklogo-removebg-preview.png"
            alt="Logo"
            className="h-10 w-auto"
          />
          <span className="font-black text-xs tracking-tighter leading-tight">
            ARK ADMIN
          </span>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          <SidebarItem
            icon={<LayoutDashboard size={20} />}
            label="Overview"
            active
          />
          <SidebarItem icon={<Users size={20} />} label="Students" />
          <SidebarItem icon={<BookOpen size={20} />} label="Courses" />
          <SidebarItem icon={<Settings size={20} />} label="Settings" />
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button
            onClick={onLogout}
            className="flex items-center gap-3 w-full p-3 text-red-600 font-bold text-sm hover:bg-red-50 rounded-xl transition-all"
          >
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8">
          <div className="relative w-96">
            <Search
              className="absolute left-3 top-2.5 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search data..."
              className="w-full bg-gray-100 border-none rounded-lg py-2 pl-10 text-sm outline-none focus:ring-2 focus:ring-red-500/20"
            />
          </div>
          <div className="flex items-center gap-4">
            <Bell className="text-gray-500 cursor-pointer" size={20} />
            <div className="h-8 w-8 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
              {userEmail?.[0].toUpperCase() || "A"}
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-8">
          <h1 className="text-2xl font-extrabold text-gray-800 mb-6">
            Welcome Back, Admin!
          </h1>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatCard
              icon={<Users className="text-blue-600" />}
              label="Total Students"
              value="1,284"
            />
            <StatCard
              icon={<GraduationCap className="text-green-600" />}
              label="Active Courses"
              value="42"
            />
            <StatCard
              icon={<Bell className="text-orange-600" />}
              label="New Requests"
              value="12"
            />
          </div>

          {/* Placeholder for Data Table */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 h-64 flex items-center justify-center border-dashed">
            <p className="text-gray-400 font-medium italic">
              Your management tables will appear here...
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

/* Helper Components */
const SidebarItem = ({
  icon,
  label,
  active = false,
}: {
  icon: any;
  label: string;
  active?: boolean;
}) => (
  <div
    className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${
      active
        ? "bg-red-600 text-white shadow-lg shadow-red-200"
        : "text-gray-500 hover:bg-gray-100"
    }`}
  >
    {icon}
    <span className="font-bold text-sm">{label}</span>
  </div>
);

const StatCard = ({
  icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value: string;
}) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
    <div className="p-3 bg-gray-50 rounded-xl">{icon}</div>
    <div>
      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
        {label}
      </p>
      <p className="text-2xl font-black text-gray-800">{value}</p>
    </div>
  </div>
);

export default AdminDashboard;
