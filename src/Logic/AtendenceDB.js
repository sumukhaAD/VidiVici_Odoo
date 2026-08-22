import { supabase } from '../utils/supabaseClient.js';
// Make sure this path points exactly to where your logic is exported
import { calculateWorkHours, getExtraHours } from './attendanceLogic.js'; 

export async function checkIn(employeeId) {
  const { data, error } = await supabase
    .from('attendance')
    .insert([{
      employee_id: employeeId,
      check_in_time: new Date().toISOString(),
      status: 'present'
    }])
    .select();

  if (error) throw error;
  return data[0];
}

export async function checkOut(attendanceId, checkInTime) {
  const checkOutTime = new Date().toISOString();
  
  // Call your pure functions
  const workHours = calculateWorkHours(checkInTime, checkOutTime);
  const extraHours = getExtraHours(workHours); 

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