/* Format a number as Indian Rupees, e.g. 120000 -> "₹1,20,000" */
export function formatINR(n) {
  return `₹${n.toLocaleString("en-IN")}`;
}

export const currentEmployee = {
  id: "e-001",
  loginId: "DF-2041",
  name: "Zafina",
  role: "Product Designer",
  department: "Design",
  email: "za.fina@dayflow.co",
  phone: "+91 98200 41930",
  address: "12A Carter Road, Bandra West, Mumbai 400050",
  location: "Mumbai, MH",
  joined: "Mar 14, 2022",
  status: "Active",
  avatar: "/z1-2.jpeg",
  salary: { base: 120000, hra: 48000, bonus: 20000, deductions: 15000 },
  todayStatus: "Present",
  about:
    "Product designer shaping Dayflow's core experience. Leads the design system, partners closely with engineering, and keeps every workflow accessible and calm under real-world load.",
  skills: ["Product design", "Design systems", "Figma", "Prototyping", "User research", "Accessibility"],
  certifications: [
    { name: "NN/g UX Certification", org: "Nielsen Norman Group", year: "2024" },
    { name: "Google UX Design", org: "Coursera", year: "2022" },
  ],
};

export const employees = [
  currentEmployee,
  {
    id: "e-002",
    loginId: "DF-2044",
    name: "Kazuya Mishima",
    role: "Backend Engineer",
    department: "Engineering",
    email: "kazuya.m@dayflow.co",
    phone: "+91 98860 22108",
    address: "48 Indiranagar 100ft Road, Bengaluru 560038",
    location: "Bengaluru, KA",
    joined: "Jan 09, 2021",
    status: "Active",
    avatar: "/km1.jpeg",
    salary: { base: 160000, hra: 64000, bonus: 30000, deductions: 22000 },
    todayStatus: "Present",
    about:
      "Backend engineer who owns Dayflow's payroll and attendance services. Obsessive about correctness, idempotent jobs, and keeping p99 latency boringly flat as the tenant count grows.",
    skills: ["Go", "PostgreSQL", "Distributed systems", "Kafka", "API design", "Observability"],
    certifications: [
      { name: "AWS Solutions Architect – Professional", org: "Amazon Web Services", year: "2023" },
      { name: "CKA: Certified Kubernetes Administrator", org: "CNCF", year: "2022" },
    ],
  },
  {
    id: "e-003",
    loginId: "DF-2051",
    name: "Nina Williams",
    role: "HR Generalist",
    department: "People",
    email: "nina.w@dayflow.co",
    phone: "+91 99100 55742",
    address: "22 Hauz Khas Village, New Delhi 110016",
    location: "New Delhi, DL",
    joined: "Aug 22, 2023",
    status: "On leave",
    avatar: "/nw1.jpeg",
    salary: { base: 90000, hra: 36000, bonus: 12000, deductions: 9000 },
    todayStatus: "Leave",
    about:
      "HR generalist who runs onboarding, leave policy, and employee relations for Dayflow. Turns messy people processes into clear, humane workflows and is the first friendly face every new hire meets.",
    skills: ["Onboarding", "HR policy", "Employee relations", "Payroll compliance", "HRIS", "Conflict resolution"],
    certifications: [
      { name: "SHRM-CP", org: "SHRM", year: "2023" },
      { name: "Certified Payroll Professional", org: "NIPM", year: "2021" },
    ],
  },
  {
    id: "e-004",
    loginId: "DF-2058",
    name: "Hwoarang",
    role: "Sales Lead",
    department: "Revenue",
    email: "hwoarang@dayflow.co",
    phone: "+91 98730 60418",
    address: "301 Cyber City, DLF Phase 3, Gurugram 122002",
    location: "Gurugram, HR",
    joined: "May 30, 2020",
    status: "Active",
    avatar: "/z1-1.jpeg",
    salary: { base: 110000, hra: 44000, bonus: 40000, deductions: 14000 },
    todayStatus: "Half-day",
    about:
      "Sales lead driving Dayflow's mid-market growth. Builds pipeline from scratch, coaches a scrappy team, and closes with a consultative style that keeps churn low long after the deal is signed.",
    skills: ["B2B sales", "Pipeline strategy", "Negotiation", "CRM (Salesforce)", "Forecasting", "Team coaching"],
    certifications: [
      { name: "Challenger Sales Certification", org: "Challenger Inc.", year: "2023" },
      { name: "Salesforce Certified Administrator", org: "Salesforce", year: "2021" },
    ],
  },
  {
    id: "e-005",
    loginId: "DF-2063",
    name: "Ling Xiaoyu",
    role: "Data Analyst",
    department: "Engineering",
    email: "ling.x@dayflow.co",
    phone: "+91 90080 33517",
    address: "7 Jubilee Hills Road No. 10, Hyderabad 500033",
    location: "Hyderabad, TS",
    joined: "Oct 03, 2023",
    status: "Active",
    avatar: "/lx1.jpeg",
    salary: { base: 95000, hra: 38000, bonus: 15000, deductions: 10000 },
    todayStatus: "Absent",
    about:
      "Data analyst turning Dayflow's attendance and payroll data into decisions. Lives in SQL and dashboards, and has a knack for spotting the one metric that actually moves the business.",
    skills: ["SQL", "Python", "dbt", "Tableau", "Statistics", "Experimentation"],
    certifications: [
      { name: "Google Data Analytics", org: "Coursera", year: "2023" },
      { name: "Tableau Desktop Specialist", org: "Tableau", year: "2022" },
    ],
  },
  {
    id: "e-006",
    loginId: "DF-2069",
    name: "Jin Kazama",
    role: "Frontend Engineer",
    department: "Engineering",
    email: "jin.k@dayflow.co",
    phone: "+91 98920 74655",
    address: "56 Koregaon Park Lane 5, Pune 411001",
    location: "Pune, MH",
    joined: "Feb 18, 2022",
    status: "Active",
    avatar: "/jk1.jpeg",
    salary: { base: 140000, hra: 56000, bonus: 25000, deductions: 18000 },
    todayStatus: "Present",
    about:
      "Frontend engineer who builds Dayflow's interface with a designer's eye. Cares deeply about smooth interactions, accessible components, and shipping fast without leaving tech debt behind.",
    skills: ["React", "TypeScript", "Tailwind CSS", "Accessibility", "Web performance", "Testing"],
    certifications: [
      { name: "Meta Front-End Developer", org: "Coursera", year: "2023" },
      { name: "JavaScript Algorithms & Data Structures", org: "freeCodeCamp", year: "2021" },
    ],
  },
];

export const recentActivity = [
  { text: "Checked in for the day", meta: "Attendance", time: "Today · 9:02 AM", tone: "Present" },
  { text: "Sick leave request submitted", meta: "Leave · 2 days", time: "Yesterday · 4:18 PM", tone: "Pending" },
  { text: "Paid leave approved by Nina Williams", meta: "Leave · Jun 12–13", time: "Jun 09 · 11:40 AM", tone: "Approved" },
  { text: "June salary slip published", meta: "Payroll", time: "Jun 01 · 8:00 AM", tone: "Approved" },
  { text: "Profile phone number updated", meta: "Profile", time: "May 28 · 3:26 PM", tone: "Leave" },
];

export const myLeaves = [
  { id: "l-01", employee: "Zafina", type: "Sick", from: "Aug 21, 2026", to: "Aug 22, 2026", days: 2, remarks: "Down with a cold, working async where possible.", status: "Pending" },
  { id: "l-02", employee: "Zafina", type: "Paid", from: "Jun 12, 2026", to: "Jun 13, 2026", days: 2, remarks: "Family event out of town.", status: "Approved" },
  { id: "l-03", employee: "Zafina", type: "Unpaid", from: "Apr 02, 2026", to: "Apr 02, 2026", days: 1, remarks: "Personal errand.", status: "Rejected" },
  { id: "l-04", employee: "Zafina", type: "Paid", from: "Feb 19, 2026", to: "Feb 23, 2026", days: 5, remarks: "Annual break.", status: "Approved" },
];

export const approvalQueue = [
  { id: "q-01", employee: "Kazuya Mishima", type: "Paid", from: "Aug 25, 2026", to: "Aug 29, 2026", days: 5, remarks: "Pre-planned vacation.", status: "Pending" },
  { id: "q-02", employee: "Ling Xiaoyu", type: "Sick", from: "Aug 22, 2026", to: "Aug 22, 2026", days: 1, remarks: "Migraine.", status: "Pending" },
  { id: "q-03", employee: "Hwoarang", type: "Unpaid", from: "Sep 01, 2026", to: "Sep 03, 2026", days: 3, remarks: "Relocation logistics.", status: "Pending" },
  { id: "q-04", employee: "Jin Kazama", type: "Paid", from: "Aug 30, 2026", to: "Sep 01, 2026", days: 3, remarks: "Long weekend.", status: "Pending" },
];

export const weekAttendance = [
  { date: "18", label: "Mon", day: "Aug 18", in: "9:01 AM", out: "6:04 PM", hours: "9h 03m", status: "Present" },
  { date: "19", label: "Tue", day: "Aug 19", in: "8:57 AM", out: "6:12 PM", hours: "9h 15m", status: "Present" },
  { date: "20", label: "Wed", day: "Aug 20", in: "9:14 AM", out: "1:30 PM", hours: "4h 16m", status: "Half-day" },
  { date: "21", label: "Thu", day: "Aug 21", in: "—", out: "—", hours: "—", status: "Leave" },
  { date: "22", label: "Fri", day: "Aug 22", in: "9:02 AM", out: "—", hours: "In progress", status: "Present" },
  { date: "23", label: "Sat", day: "Aug 23", in: "—", out: "—", hours: "—", status: "Absent" },
  { date: "24", label: "Sun", day: "Aug 24", in: "—", out: "—", hours: "—", status: "Absent" },
];

export const attendanceTrend = [
  { month: "Mar", present: 21, leave: 1 },
  { month: "Apr", present: 20, leave: 2 },
  { month: "May", present: 22, leave: 1 },
  { month: "Jun", present: 19, leave: 3 },
  { month: "Jul", present: 23, leave: 0 },
  { month: "Aug", present: 16, leave: 2 },
];