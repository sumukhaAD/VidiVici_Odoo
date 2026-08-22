export function generateLoginId(companyCode, firstName, lastName, joinYear, serialNumber) {
  const initials = (firstName.slice(0, 2) + lastName.slice(0, 2)).toUpperCase();
  const serial = String(serialNumber).padStart(4, '0');
  return `${companyCode}${initials}${joinYear}${serial}`;
}