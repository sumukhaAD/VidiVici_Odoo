import { supabase } from './supabaseClient.js';

// 1. Employee: Submit a new time-off request
export async function submitTimeOffRequest(employeeId, requestData) {
  const { data, error } = await supabase
    .from('time_off_requests')
    .insert([{
      employee_id: employeeId,
      start_date: requestData.startDate,
      end_date: requestData.endDate,
      type: requestData.type, // 'paid_time_off' | 'sick_leave' | 'unpaid_leave'
      status: 'pending',
      attachment_url: requestData.attachmentUrl || null
    }])
    .select();

  if (error) {
    console.error("Error submitting time off:", error.message);
    throw error;
  }
  return data[0];
}

// 2. Employee: Fetch ONLY their own requests (for their specific view)
export async function fetchMyTimeOffRequests(employeeId) {
  const { data, error } = await supabase
    .from('time_off_requests')
    .select('*')
    .eq('employee_id', employeeId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

// 3. Admin/HR: Fetch ALL requests across the company
export async function fetchAllTimeOffRequests() {
  const { data, error } = await supabase
    .from('time_off_requests')
    .select(`
      *,
      employees ( name, department ) 
    `)
    .order('created_at', { ascending: false });
    // Note: The select above joins the employee table to get their name!

  if (error) throw error;
  return data;
}

// 4. Admin/HR: Approve or Reject a request
export async function updateTimeOffStatus(requestId, newStatus) {
  const { data, error } = await supabase
    .from('time_off_requests')
    .update({ status: newStatus }) // 'approved' or 'rejected'
    .eq('id', requestId)
    .select();

  if (error) throw error;
  return data[0];
}