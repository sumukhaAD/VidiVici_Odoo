import { supabase } from './supabaseClient.js';
// ⚠️ Update this path to wherever Harshith saved his logic file
import { calculateWorkHours, getExtraHours } from './salaryLogic.js'; 

// 1. Check In: Creates a new row for the day
export async function checkIn(employeeId) {
  const checkInTime = new Date().toISOString();

  const { data, error } = await supabase
    .from('attendance')
    .insert([{
      employee_id: employeeId,
      check_in_time: checkInTime,
      status: 'present'
    }])
    .select();

  if (error) throw error;
  return data[0];
}

// 2. Check Out: Updates the day's row and calculates hours
export async function checkOut(attendanceId, checkInTime) {
  const checkOutTime = new Date().toISOString();
  
  // Call Harshith's pure functions
  const workHours = calculateWorkHours(checkInTime, checkOutTime);
  const extraHours = getExtraHours(workHours); // Defaults to 8 standard hours

  const { data, error } = await supabase
    .from('attendance')
    .update({
      check_out_time: checkOutTime,
      work_hours: workHours,
      extra_hours: extraHours
    })
    .eq('id', attendanceId)
    .select();

  if (error) throw error;
  return data[0];
}