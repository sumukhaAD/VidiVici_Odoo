import { useState } from "react";
import {
  CalendarCheck,
  PlaneTakeoff,
  User,
  Wallet,
  Users,
  ChevronLeft,
} from "lucide-react";
import { SignIn, SignUp } from "./components/Auth";
import { Shell } from "./components/Shell";
import { EmployeeDashboard, Attendance, LeaveScreen } from "./components/EmployeeScreens";
import {
  AdminDashboard,
  AdminAttendance,
  AdminTimeOff,
} from "./components/AdminScreens";
import { Profile, Payroll } from "./components/CommonScreens";
import { Avatar } from "./components/ui";
import { currentEmployee } from "./components/data";

const employeeNav = [
  { key: "dashboard", label: "Employees", icon: <Users size={17} /> },
  { key: "attendance", label: "Attendance", icon: <CalendarCheck size={17} /> },
  { key: "leave", label: "Time Off", icon: <PlaneTakeoff size={17} /> },
  { key: "payroll", label: "Payroll", icon: <Wallet size={17} /> },
];

const adminNav = [
  { key: "dashboard", label: "Overview", icon: <Users size={17} /> },
  { key: "attendance", label: "Attendance", icon: <CalendarCheck size={17} /> },
  { key: "leave", label: "Time Off", icon: <PlaneTakeoff size={17} /> },
  { key: "payroll", label: "Payroll", icon: <Wallet size={17} /> },
  { key: "profile", label: "Profile", icon: <User size={17} /> },
];

export default function App() {
  const [authed, setAuthed] = useState(false);
  const [authView, setAuthView] = useState("signin");
  const [role, setRole] = useState("employee");
  const [active, setActive] = useState("dashboard");
  const [viewingEmployee, setViewingEmployee] = useState(null);

  if (!authed) {
    return authView === "signin" ? (
      <SignIn
        onSignIn={(r) => {
          setRole(r);
          setActive("dashboard");
          setAuthed(true);
        }}
        onGoSignUp={() => setAuthView("signup")}
      />
    ) : (
      <SignUp
        onSignUp={() => {
          setRole("admin");
          setActive("dashboard");
          setAuthed(true);
        }}
        onGoSignIn={() => setAuthView("signin")}
      />
    );
  }

  const nav = role === "admin" ? adminNav : employeeNav;
  const subject = viewingEmployee ?? currentEmployee;
  const profileViewOnly = role === "employee" && !!viewingEmployee;

  const navigate = (k) => {
    if (k !== "profile" && k !== "payroll") setViewingEmployee(null);
    setActive(k);
  };

  const openMyProfile = () => {
    setViewingEmployee(null);
    setActive("profile");
  };

  const logout = () => {
    setAuthed(false);
    setAuthView("signin");
    setViewingEmployee(null);
  };

  return (
    <Shell
      role={role}
      user={currentEmployee}
      nav={nav}
      active={active}
      onNavigate={navigate}
      onMyProfile={openMyProfile}
      onLogout={logout}
    >
      {viewingEmployee && (active === "profile" || active === "payroll") && (
        <button
          onClick={() => {
            setViewingEmployee(null);
            setActive("dashboard");
          }}
          className="mb-5 flex w-full items-center gap-3 rounded-xl border border-primary/20 bg-primary-soft px-4 py-3 text-left transition-colors hover:bg-primary-soft/70"
        >
          <ChevronLeft size={18} className="text-primary" />
          <Avatar name={viewingEmployee.name} src={viewingEmployee.avatar} size={30} />
          <span className="text-[13px] font-semibold text-primary">
            Viewing {viewingEmployee.name}'s record — back to {role === "admin" ? "overview" : "employees"}
          </span>
        </button>
      )}

      {active === "dashboard" &&
        (role === "admin" ? (
          <AdminDashboard
            onViewEmployee={(e) => {
              setViewingEmployee(e);
              setActive("profile");
            }}
          />
        ) : (
          <EmployeeDashboard
            onViewEmployee={(e) => {
              setViewingEmployee(e);
              setActive("profile");
            }}
          />
        ))}

      {active === "attendance" && (role === "admin" ? <AdminAttendance /> : <Attendance />)}
      {active === "leave" && (role === "admin" ? <AdminTimeOff /> : <LeaveScreen />)}
      {active === "profile" && <Profile user={subject} role={role} viewOnly={profileViewOnly} />}
      {active === "payroll" && <Payroll user={subject} role={role} />}
    </Shell>
  );
}