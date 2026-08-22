import { supabase } from './supabaseClient.js';

export async function fetchAllEmployees() {
  const { data, error } = await supabase
    .from('employees')
    .select('id, name, department, role, mobile'); 
  if (error) throw error;
  return data;
}

export async function fetchEmployeeProfile(employeeId) {
  const { data, error } = await supabase
    .from('employees')
    .select('*')
    .eq('id', employeeId)
    .single();
  if (error) throw error;
  return data;
}

export async function fetchSalaryInfo(employeeId) {
  const { data, error } = await supabase
    .from('employees')
    .select('monthly_wage, basic_pct, hra_pct_of_basic, pf_employee_pct, pf_employer_pct')
    .eq('id', employeeId)
    .single();
  if (error) throw error;
  return data;
}