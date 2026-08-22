import { Link } from 'react-router-dom';

export default function EmployeeCard({ employee }) {
  // Placeholder for the status logic (Green = present, Yellow = absent/leave)
  const statusColor = 'gray'; 

  return (
    <div style={{ border: '1px solid #ccc', padding: '16px', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <h3 style={{ margin: '0 0 10px 0' }}>{employee.name}</h3>
        
        {/* Status Indicator Dot */}
        <div 
          style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: statusColor, marginTop: '5px' }} 
          title="Status pending"
        ></div>
      </div>
      
      <p style={{ margin: '5px 0' }}><strong>ID:</strong> {employee.login_id}</p>
      <p style={{ margin: '5px 0' }}><strong>Dept:</strong> {employee.department}</p>
      <p style={{ margin: '5px 0' }}><strong>Role:</strong> {employee.role}</p>
      
      <Link 
        to={`/employee/${employee.id}`} 
        style={{ display: 'inline-block', marginTop: '15px', color: '#007bff', textDecoration: 'none', fontWeight: 'bold' }}
      >
        View Profile →
      </Link>
    </div>
  );
}