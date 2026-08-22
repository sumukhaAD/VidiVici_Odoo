import { useState, useEffect } from 'react';
import { fetchAllEmployees } from './utils/employeeQueries.js'; 
import EmployeeCard from './EmployeeCard.jsx'; // Import the new card component

export default function Directory() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadEmployees() {
      try {
        const data = await fetchAllEmployees();
        setEmployees(data);
      } catch (error) {
        console.error("Error fetching directory:", error.message);
      } finally {
        setLoading(false);
      }
    }
    loadEmployees();
  }, []);

  if (loading) return <h2>Loading directory...</h2>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>Employee Directory</h1>
      
      {/* Grid container */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
        {employees.map((emp) => (
          
          /* Pass the employee data into the card component */
          <EmployeeCard key={emp.id} employee={emp} />

        ))}
      </div>
    </div>
  );
}