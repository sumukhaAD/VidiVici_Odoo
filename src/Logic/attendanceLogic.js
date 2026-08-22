function calculateWorkHours(checkInTime, checkOutTime) {
  const diffMs = new Date(checkOutTime) - new Date(checkInTime);
  return Math.max(0, diffMs / (1000 * 60 * 60));
}

function getExtraHours(workHours, standardHoursPerDay = 8) {
  return Math.max(0, workHours - standardHoursPerDay);
}

function calculatePayableDays(totalWorkingDays, unpaidLeaveDays, absentDays) {
  return totalWorkingDays - unpaidLeaveDays - absentDays;
}

export {
  calculateWorkHours,
  getExtraHours,
  calculatePayableDays,
};