import { supabase } from './supabaseClient.js';
import { generateLoginId } from './authUtils.js';

export async function addEmployee(employeeData) {
  const currentYear = new Date().getFullYear();

  // 1. Count employees joined this year to generate the serial number
  const { count, error: countError } = await supabase
    .from('employees')
    .select('*', { count: 'exact', head: true })
    .gte('joined_at', `${currentYear}-01-01T00:00:00Z`)
    .lt('joined_at', `${currentYear + 1}-01-01T00:00:00Z`);

  if (countError) throw countError;

  const serialNumber = (count || 0) + 1;

  // 2. Generate the Login ID (Assume company code is provided or hardcoded)
  const loginId = generateLoginId(
    employeeData.companyCode || '0C2I',
    employeeData.firstName,
    employeeData.lastName,
    currentYear,
    serialNumber
  );

  // 3. Insert the new employee into the database
  const { data, error: insertError } = await supabase
    .from('employees')
    .insert([{
      login_id: loginId,
      name: `${employeeData.firstName} ${employeeData.lastName}`,
      email: employeeData.email,
      department: employeeData.department,
      mobile: employeeData.mobile,
      role: employeeData.role || 'employee'
      // Add wage/salary fields here if the form collects them
    }])
    .select();

  if (insertError) throw insertError;

  // 4. Allocate default time-off for the new employee
  const { error: allocationError } = await supabase
    .from('time_off_allocations')
    .insert([{
      employee_id: data[0].id,
      paid_time_off_days: 24,
      sick_leave_days: 7
    }]);

  if (allocationError) {
    console.error("Failed to allocate time off, but employee was created:", allocationError);
  }

  return data[0];
}

// 5. Employee: Update their own limited profile fields
export async function updateMyProfile(employeeId, updateData) {
  const { data, error } = await supabase
    .from('employees')
    .update({
      mobile: updateData.mobile,
      // Ensure you add these columns to your Supabase table if they don't exist yet!
      address: updateData.address, 
      profile_picture_url: updateData.profilePictureUrl
    })
    .eq('id', employeeId)
    .select();

  if (error) throw error;
  return data[0];
}