import { useParams } from "react-router-dom";
import { Profile } from "../components/Profile";

// TODO: replace with real fetchEmployeeById(id) from utils/employeeQueries.js
const mockUser = {
  name: "Jane Smith",
  role: "admin",
  department: "HR",
  avatar: null,
  status: "Present",
  email: "jane@company.co",
  phone: "+91 90000 00001",
  location: "Bengaluru, IN",
  address: "45 Residency Rd, Bengaluru",
  loginId: "DF-2042",
  joined: "Jan 2021",
  skills: ["Recruiting", "Payroll"],
  certifications: [{ name: "SHRM-CP", org: "SHRM", year: "2023" }],
  about: "HR admin managing hiring and payroll.",
  salary: { base: 70000, hra: 28000, bonus: 6000, deductions: 3500 },
};

export default function EmployeeProfile() {
  const { id } = useParams();
  return <Profile user={mockUser} role="admin" viewOnly={true} />;
}