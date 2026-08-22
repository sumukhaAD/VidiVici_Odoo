import { Profile } from "../components/Profile";

// TODO: replace with the real logged-in user from Supabase once auth is wired
const mockUser = {
  name: "Jordan Avery",
  role: "employee",
  department: "Engineering",
  avatar: null,
  status: "Present",
  email: "jordan@company.co",
  phone: "+91 90000 00000",
  location: "Bengaluru, IN",
  address: "123 MG Road, Bengaluru",
  loginId: "DF-2041",
  joined: "Mar 2022",
  skills: ["React", "Node.js", "SQL"],
  certifications: [{ name: "AWS Certified Developer", org: "Amazon", year: "2024" }],
  about: "Software engineer focused on backend systems.",
  salary: { base: 60000, hra: 24000, bonus: 5000, deductions: 3000 },
};

export default function MyProfile() {
  return <Profile user={mockUser} role="employee" viewOnly={false} />;
}