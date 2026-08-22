import { supabase } from '../utils/supabaseClient.js';
// Make sure this path points exactly to your logic file
import { calculateSalaryBreakdown } from './salaryLogic.js';

export async function getSalaryBreakdownForEmployee(employeeId) {
  const { data: emp, error } = await supabase
    .from('employees')
    .select('monthly_wage, basic_pct, hra_pct_of_basic, pf_employee_pct, pf_employer_pct')
    .eq('id', employeeId)
    .single();

  if (error) throw error;

  // Passing the database values directly into your function
  return calculateSalaryBreakdown(emp.monthly_wage, {
    basicPct: emp.basic_pct,
    hraPctOfBasic: emp.hra_pct_of_basic,
    pfEmployeePct: emp.pf_employee_pct,
    pfEmployerPct: emp.pf_employer_pct,
  });
}
