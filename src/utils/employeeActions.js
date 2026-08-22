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
      role: employeeData.role || 'employee',
      // Add wage/salary fields here if the form collects them
    }])
    .select();

  if (insertError) throw insertError;
  return data[0];
}