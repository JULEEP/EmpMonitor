// import { useState, useEffect } from 'react';

// const TimesheetPage = () => {
//   // Sample employee data with additional time tracking fields
//   const [employees, setEmployees] = useState([
//     { 
//       id: 1, 
//       name: 'Pavan Kumar', 
//       startTime: '09:57 IST',
//       finishTime: '18:30 IST',
//       totalTime: '8h 33m',
//       systemUsageTime: '7h 45m',
//       systemIdleTime: '48m',
//       productiveTime: '6h 12m',
//       screenshots: 42
//     },
//     { 
//       id: 2, 
//       name: 'Yvonne Hayes', 
//       startTime: '09:57 IST',
//       finishTime: '17:45 IST',
//       totalTime: '7h 48m',
//       systemUsageTime: '7h 15m',
//       systemIdleTime: '33m',
//       productiveTime: '5h 52m',
//       screenshots: 38
//     },
//     { 
//       id: 3, 
//       name: 'Roi Kumar', 
//       startTime: '09:55 IST',
//       finishTime: '18:25 IST',
//       totalTime: '8h 30m',
//       systemUsageTime: '7h 50m',
//       systemIdleTime: '40m',
//       productiveTime: '6h 30m',
//       screenshots: 45
//     },
//     { 
//       id: 4, 
//       name: 'Virat Kumar', 
//       startTime: '09:40 IST',
//       finishTime: '18:10 IST',
//       totalTime: '8h 30m',
//       systemUsageTime: '7h 55m',
//       systemIdleTime: '35m',
//       productiveTime: '6h 45m',
//       screenshots: 50
//     },
//     { 
//       id: 5, 
//       name: 'Inn Corby', 
//       startTime: '09:35 IST',
//       finishTime: '17:50 IST',
//       totalTime: '8h 15m',
//       systemUsageTime: '7h 30m',
//       systemIdleTime: '45m',
//       productiveTime: '6h 00m',
//       screenshots: 36
//     },
//     { 
//       id: 6, 
//       name: 'Nour Dakh', 
//       startTime: '09:36 IST',
//       finishTime: '18:06 IST',
//       totalTime: '8h 30m',
//       systemUsageTime: '7h 45m',
//       systemIdleTime: '45m',
//       productiveTime: '6h 20m',
//       screenshots: 41
//     },
//     { 
//       id: 7, 
//       name: 'Aditi Sai', 
//       startTime: '09:52 IST',
//       finishTime: '18:22 IST',
//       totalTime: '8h 30m',
//       systemUsageTime: '7h 40m',
//       systemIdleTime: '50m',
//       productiveTime: '6h 15m',
//       screenshots: 39
//     },
//     { 
//       id: 8, 
//       name: 'Simon Hartman', 
//       startTime: '09:25 IST',
//       finishTime: '17:55 IST',
//       totalTime: '8h 30m',
//       systemUsageTime: '7h 50m',
//       systemIdleTime: '40m',
//       productiveTime: '6h 35m',
//       screenshots: 47
//     },
//     { 
//       id: 9, 
//       name: 'Ramesh Kumar', 
//       startTime: '09:29 IST',
//       finishTime: '18:29 IST',
//       totalTime: '9h 00m',
//       systemUsageTime: '8h 15m',
//       systemIdleTime: '45m',
//       productiveTime: '7h 00m',
//       screenshots: 53
//     },
//     { 
//       id: 10, 
//       name: 'Sally Cross', 
//       startTime: '09:34 IST',
//       finishTime: '17:34 IST',
//       totalTime: '8h 00m',
//       systemUsageTime: '7h 20m',
//       systemIdleTime: '40m',
//       productiveTime: '5h 50m',
//       screenshots: 35
//     },
//     { 
//       id: 11, 
//       name: 'Hati Kumar', 
//       startTime: '09:34 IST',
//       finishTime: '18:04 IST',
//       totalTime: '8h 30m',
//       systemUsageTime: '7h 45m',
//       systemIdleTime: '45m',
//       productiveTime: '6h 25m',
//       screenshots: 43
//     },
//     { 
//       id: 12, 
//       name: 'Misha Khan', 
//       startTime: '09:37 IST',
//       finishTime: '18:07 IST',
//       totalTime: '8h 30m',
//       systemUsageTime: '7h 50m',
//       systemIdleTime: '40m',
//       productiveTime: '6h 30m',
//       screenshots: 46
//     },
//     { 
//       id: 13, 
//       name: 'Vishnu Flandalin', 
//       startTime: '09:38 IST',
//       finishTime: '18:08 IST',
//       totalTime: '8h 30m',
//       systemUsageTime: '7h 55m',
//       systemIdleTime: '35m',
//       productiveTime: '6h 40m',
//       screenshots: 49
//     },
//     { 
//       id: 14, 
//       name: 'Arjun Reddy', 
//       startTime: '09:45 IST',
//       finishTime: '18:15 IST',
//       totalTime: '8h 30m',
//       systemUsageTime: '7h 50m',
//       systemIdleTime: '40m',
//       productiveTime: '6h 35m',
//       screenshots: 48
//     },
//     { 
//       id: 15, 
//       name: 'Priya Sharma', 
//       startTime: '09:50 IST',
//       finishTime: '18:20 IST',
//       totalTime: '8h 30m',
//       systemUsageTime: '7h 45m',
//       systemIdleTime: '45m',
//       productiveTime: '6h 25m',
//       screenshots: 44
//     }
//   ]);
//   const [filter, setFilter] = useState('');
//   const [currentTime, setCurrentTime] = useState('');
//   const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

//   // Update current time every second
//   useEffect(() => {
//     const timer = setInterval(() => {
//       const now = new Date();
//       setCurrentTime(now.toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata' }) + ' IST');
//     }, 1000);

//     return () => clearInterval(timer);
//   }, []);

//   // Filter employees based on search input
//   const filteredEmployees = employees.filter(employee =>
//     employee.name.toLowerCase().includes(filter.toLowerCase())
//   );

//   // Sort employees
//   const sortedEmployees = [...filteredEmployees].sort((a, b) => {
//     if (!sortConfig.key) return 0;
    
//     if (a[sortConfig.key] < b[sortConfig.key]) {
//       return sortConfig.direction === 'asc' ? -1 : 1;
//     }
//     if (a[sortConfig.key] > b[sortConfig.key]) {
//       return sortConfig.direction === 'asc' ? 1 : -1;
//     }
//     return 0;
//   });

//   const requestSort = (key) => {
//     let direction = 'asc';
//     if (sortConfig.key === key && sortConfig.direction === 'asc') {
//       direction = 'desc';
//     }
//     setSortConfig({ key, direction });
//   };

//   // Calculate productivity percentage
//   const calculateProductivity = (employee) => {
//     const productiveMinutes = convertToMinutes(employee.productiveTime);
//     const totalMinutes = convertToMinutes(employee.systemUsageTime);
//     return totalMinutes > 0 ? Math.round((productiveMinutes / totalMinutes) * 100) : 0;
//   };

//   // Helper function to convert time strings to minutes
//   const convertToMinutes = (timeStr) => {
//     const matches = timeStr.match(/(\d+)h\s*(\d*)m/);
//     if (!matches) return 0;
//     const hours = parseInt(matches[1]) || 0;
//     const minutes = parseInt(matches[2]) || 0;
//     return hours * 60 + minutes;
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-4 md:p-8">
//       <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
//         {/* Header */}
//         <div className="bg-blue-600 px-6 py-4">
//           <div className="flex flex-col md:flex-row md:items-center md:justify-between">
//             <div>
//               <h1 className="text-2xl font-bold text-white">Employee Timesheet</h1>
//               <p className="text-blue-100">Current Time: {currentTime}</p>
//             </div>
//             <div className="mt-2 md:mt-0">
//               <span className="text-white">Last Updated: {new Date().toLocaleString()}</span>
//             </div>
//           </div>
//         </div>

//         {/* Controls */}
//         <div className="p-4 border-b border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//           <div className="flex-1">
//             <input
//               type="text"
//               placeholder="Search employees..."
//               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               value={filter}
//               onChange={(e) => setFilter(e.target.value)}
//             />
//           </div>
//           <div className="flex items-center space-x-2">
//             <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
//               <option>Today</option>
//               <option>Yesterday</option>
//               <option>This Week</option>
//               <option>This Month</option>
//               <option>Custom Range</option>
//             </select>
//             <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
//               Export CSV
//             </button>
//             <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
//               Add Entry
//             </button>
//           </div>
//         </div>

//         {/* Timesheet Table */}
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th 
//                   className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
//                   onClick={() => requestSort('name')}
//                 >
//                   Employee Name
//                   {sortConfig.key === 'name' && (
//                     <span className="ml-1">
//                       {sortConfig.direction === 'asc' ? '↑' : '↓'}
//                     </span>
//                   )}
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Start Time
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Finish Time
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Total Time
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   System Usage
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Idle Time
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Productive Time
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Productivity
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Screenshots
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {sortedEmployees.map((employee) => (
//                 <tr key={employee.id} className="hover:bg-gray-50">
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="flex items-center">
//                       <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
//                         <span className="text-blue-600 font-medium">
//                           {employee.name.charAt(0)}
//                         </span>
//                       </div>
//                       <div className="ml-4">
//                         <div className="text-sm font-medium text-gray-900">{employee.name}</div>
//                         <div className="text-sm text-gray-500">EMP-{employee.id.toString().padStart(4, '0')}</div>
//                       </div>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                     {employee.startTime}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                     {employee.finishTime}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                     {employee.totalTime}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                     {employee.systemUsageTime}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                     {employee.systemIdleTime}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                     {employee.productiveTime}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="flex items-center">
//                       <div className="w-16 bg-gray-200 rounded-full h-2.5">
//                         <div 
//                           className={`h-2.5 rounded-full ${calculateProductivity(employee) > 70 ? 'bg-green-600' : calculateProductivity(employee) > 40 ? 'bg-yellow-500' : 'bg-red-600'}`}
//                           style={{ width: `${calculateProductivity(employee)}%` }}
//                         ></div>
//                       </div>
//                       <span className="ml-2 text-xs font-medium text-gray-500">
//                         {calculateProductivity(employee)}%
//                       </span>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                     <div className="flex items-center">
//                       {employee.screenshots}
//                       <button className="ml-2 text-blue-600 hover:text-blue-900">
//                         <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//                         </svg>
//                       </button>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
//                     <button className="text-red-600 hover:text-red-900">Delete</button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Pagination */}
//         <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
//           <div className="flex-1 flex justify-between sm:hidden">
//             <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
//               Previous
//             </a>
//             <a href="#" className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
//               Next
//             </a>
//           </div>
//           <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
//             <div>
//               <p className="text-sm text-gray-700">
//                 Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredEmployees.length}</span> of{' '}
//                 <span className="font-medium">{employees.length}</span> results
//               </p>
//             </div>
//             <div>
//               <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
//                 <a
//                   href="#"
//                   className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
//                 >
//                   <span className="sr-only">Previous</span>
//                   <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
//                     <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
//                   </svg>
//                 </a>
//                 <a
//                   href="#"
//                   aria-current="page"
//                   className="z-10 bg-blue-50 border-blue-500 text-blue-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
//                 >
//                   1
//                 </a>
//                 <a
//                   href="#"
//                   className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
//                 >
//                   2
//                 </a>
//                 <a
//                   href="#"
//                   className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
//                 >
//                   <span className="sr-only">Next</span>
//                   <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
//                     <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
//                   </svg>
//                 </a>
//               </nav>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TimesheetPage;



import { useState, useEffect } from 'react';

const TimesheetPage = () => {
  // Sample employee data with additional time tracking fields
  const [employees, setEmployees] = useState([
    { 
      id: 1, 
      name: 'Pavan Kumar', 
      startTime: '09:57 IST',
      finishTime: '18:30 IST',
      totalTime: '8h 33m',
      systemUsageTime: '7h 45m',
      systemIdleTime: '48m',
      productiveTime: '6h 12m',
      screenshots: 42
    },
    { 
      id: 2, 
      name: 'Yvonne Hayes', 
      startTime: '09:57 IST',
      finishTime: '17:45 IST',
      totalTime: '7h 48m',
      systemUsageTime: '7h 15m',
      systemIdleTime: '33m',
      productiveTime: '5h 52m',
      screenshots: 38
    },
    { 
      id: 3, 
      name: 'Roi Kumar', 
      startTime: '09:55 IST',
      finishTime: '18:25 IST',
      totalTime: '8h 30m',
      systemUsageTime: '7h 50m',
      systemIdleTime: '40m',
      productiveTime: '6h 30m',
      screenshots: 45
    },
    { 
      id: 4, 
      name: 'Virat Kumar', 
      startTime: '09:40 IST',
      finishTime: '18:10 IST',
      totalTime: '8h 30m',
      systemUsageTime: '7h 55m',
      systemIdleTime: '35m',
      productiveTime: '6h 45m',
      screenshots: 50
    },
    { 
      id: 5, 
      name: 'Inn Corby', 
      startTime: '09:35 IST',
      finishTime: '17:50 IST',
      totalTime: '8h 15m',
      systemUsageTime: '7h 30m',
      systemIdleTime: '45m',
      productiveTime: '6h 00m',
      screenshots: 36
    },
    { 
      id: 6, 
      name: 'Nour Dakh', 
      startTime: '09:36 IST',
      finishTime: '18:06 IST',
      totalTime: '8h 30m',
      systemUsageTime: '7h 45m',
      systemIdleTime: '45m',
      productiveTime: '6h 20m',
      screenshots: 41
    },
    { 
      id: 7, 
      name: 'Aditi Sai', 
      startTime: '09:52 IST',
      finishTime: '18:22 IST',
      totalTime: '8h 30m',
      systemUsageTime: '7h 40m',
      systemIdleTime: '50m',
      productiveTime: '6h 15m',
      screenshots: 39
    },
    { 
      id: 8, 
      name: 'Simon Hartman', 
      startTime: '09:25 IST',
      finishTime: '17:55 IST',
      totalTime: '8h 30m',
      systemUsageTime: '7h 50m',
      systemIdleTime: '40m',
      productiveTime: '6h 35m',
      screenshots: 47
    },
    { 
      id: 9, 
      name: 'Ramesh Kumar', 
      startTime: '09:29 IST',
      finishTime: '18:29 IST',
      totalTime: '9h 00m',
      systemUsageTime: '8h 15m',
      systemIdleTime: '45m',
      productiveTime: '7h 00m',
      screenshots: 53
    },
    { 
      id: 10, 
      name: 'Sally Cross', 
      startTime: '09:34 IST',
      finishTime: '17:34 IST',
      totalTime: '8h 00m',
      systemUsageTime: '7h 20m',
      systemIdleTime: '40m',
      productiveTime: '5h 50m',
      screenshots: 35
    },
    { 
      id: 11, 
      name: 'Hati Kumar', 
      startTime: '09:34 IST',
      finishTime: '18:04 IST',
      totalTime: '8h 30m',
      systemUsageTime: '7h 45m',
      systemIdleTime: '45m',
      productiveTime: '6h 25m',
      screenshots: 43
    },
    { 
      id: 12, 
      name: 'Misha Khan', 
      startTime: '09:37 IST',
      finishTime: '18:07 IST',
      totalTime: '8h 30m',
      systemUsageTime: '7h 50m',
      systemIdleTime: '40m',
      productiveTime: '6h 30m',
      screenshots: 46
    },
    { 
      id: 13, 
      name: 'Vishnu Flandalin', 
      startTime: '09:38 IST',
      finishTime: '18:08 IST',
      totalTime: '8h 30m',
      systemUsageTime: '7h 55m',
      systemIdleTime: '35m',
      productiveTime: '6h 40m',
      screenshots: 49
    },
    { 
      id: 14, 
      name: 'Arjun Reddy', 
      startTime: '09:45 IST',
      finishTime: '18:15 IST',
      totalTime: '8h 30m',
      systemUsageTime: '7h 50m',
      systemIdleTime: '40m',
      productiveTime: '6h 35m',
      screenshots: 48
    },
    { 
      id: 15, 
      name: 'Priya Sharma', 
      startTime: '09:50 IST',
      finishTime: '18:20 IST',
      totalTime: '8h 30m',
      systemUsageTime: '7h 45m',
      systemIdleTime: '45m',
      productiveTime: '6h 25m',
      screenshots: 44
    }
  ]);
  
  const [filter, setFilter] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata' }) + ' IST');
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Filter employees based on search input
  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(filter.toLowerCase())
  );

  // Sort employees
  const sortedEmployees = [...filteredEmployees].sort((a, b) => {
    if (!sortConfig.key) return 0;
    
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Calculate productivity percentage
  const calculateProductivity = (employee) => {
    const productiveMinutes = convertToMinutes(employee.productiveTime);
    const totalMinutes = convertToMinutes(employee.systemUsageTime);
    return totalMinutes > 0 ? Math.round((productiveMinutes / totalMinutes) * 100) : 0;
  };

  // Helper function to convert time strings to minutes
  const convertToMinutes = (timeStr) => {
    const matches = timeStr.match(/(\d+)h\s*(\d*)m/);
    if (!matches) return 0;
    const hours = parseInt(matches[1]) || 0;
    const minutes = parseInt(matches[2]) || 0;
    return hours * 60 + minutes;
  };

  // Helper function to convert minutes to time string format
  const convertToTimeString = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  // Calculate total time based on start and finish times
  const calculateTotalTime = (startTime, finishTime) => {
    // Extract hours and minutes from time strings
    const startMatches = startTime.match(/(\d+):(\d+)/);
    const finishMatches = finishTime.match(/(\d+):(\d+)/);
    
    if (!startMatches || !finishMatches) return '0h 0m';
    
    const startHours = parseInt(startMatches[1]);
    const startMinutes = parseInt(startMatches[2]);
    const finishHours = parseInt(finishMatches[1]);
    const finishMinutes = parseInt(finishMatches[2]);
    
    // Calculate total minutes
    let totalMinutes = (finishHours * 60 + finishMinutes) - (startHours * 60 + startMinutes);
    
    // Handle cases where finish time is next day
    if (totalMinutes < 0) {
      totalMinutes += 24 * 60;
    }
    
    // Convert to hours and minutes format
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    
    return `${hours}h ${minutes}m`;
  };

  // Handle edit button click
  const handleEditClick = (employee) => {
    setEditingEmployee({...employee});
  };

  // Handle cancel edit
  const handleCancelEdit = () => {
    setEditingEmployee(null);
  };

  // Handle edit form input changes
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    
    let updatedEmployee = {...editingEmployee, [name]: value};
    
    // Auto-calculate total time when start or finish time changes
    if (name === 'startTime' || name === 'finishTime') {
      const newTotalTime = calculateTotalTime(
        name === 'startTime' ? value : editingEmployee.startTime,
        name === 'finishTime' ? value : editingEmployee.finishTime
      );
      updatedEmployee.totalTime = newTotalTime;
    }
    
    setEditingEmployee(updatedEmployee);
  };

  // Handle save edit
  const handleSaveEdit = () => {
    setEmployees(employees.map(emp => 
      emp.id === editingEmployee.id ? editingEmployee : emp
    ));
    setEditingEmployee(null);
  };

  // Handle delete button click
  const handleDeleteClick = (employee) => {
    setEmployeeToDelete(employee);
    setShowDeleteModal(true);
  };

  // Handle confirm delete
  const handleConfirmDelete = () => {
    setEmployees(employees.filter(emp => emp.id !== employeeToDelete.id));
    setShowDeleteModal(false);
    setEmployeeToDelete(null);
  };

  // Handle cancel delete
  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setEmployeeToDelete(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 px-6 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Employee Timesheet</h1>
              <p className="text-blue-100">Current Time: {currentTime}</p>
            </div>
            <div className="mt-2 md:mt-0">
              <span className="text-white">Last Updated: {new Date().toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="p-4 border-b border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search employees..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-2">
            <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Today</option>
              <option>Yesterday</option>
              <option>This Week</option>
              <option>This Month</option>
              <option>Custom Range</option>
            </select>
            <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
              Export CSV
            </button>
          </div>
        </div>

        {/* Timesheet Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort('name')}
                >
                  Employee Name
                  {sortConfig.key === 'name' && (
                    <span className="ml-1">
                      {sortConfig.direction === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Start Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Finish Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  System Usage
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Idle Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Productive Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Productivity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Screenshots
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedEmployees.map((employee) => (
                <tr key={employee.id} className="hover:bg-gray-50">
                  {editingEmployee && editingEmployee.id === employee.id ? (
                    // Edit mode
                    <>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 font-medium">
                              {employee.name.charAt(0)}
                            </span>
                          </div>
                          <div className="ml-4">
                            <input
                              name="name"
                              value={editingEmployee.name}
                              onChange={handleEditChange}
                              className="text-sm border border-gray-300 rounded px-2 py-1 w-full"
                            />
                            <div className="text-sm text-gray-500">EMP-{employee.id.toString().padStart(4, '0')}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          name="startTime"
                          value={editingEmployee.startTime.replace(' IST', '')}
                          onChange={handleEditChange}
                          className="text-sm border border-gray-300 rounded px-2 py-1 w-24"
                          placeholder="HH:MM"
                        />
                        <span className="ml-1">IST</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          name="finishTime"
                          value={editingEmployee.finishTime.replace(' IST', '')}
                          onChange={handleEditChange}
                          className="text-sm border border-gray-300 rounded px-2 py-1 w-24"
                          placeholder="HH:MM"
                        />
                        <span className="ml-1">IST</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          name="totalTime"
                          value={editingEmployee.totalTime}
                          onChange={handleEditChange}
                          className="text-sm border border-gray-300 rounded px-2 py-1 w-24"
                          disabled
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          name="systemUsageTime"
                          value={editingEmployee.systemUsageTime}
                          onChange={handleEditChange}
                          className="text-sm border border-gray-300 rounded px-2 py-1 w-24"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          name="systemIdleTime"
                          value={editingEmployee.systemIdleTime}
                          onChange={handleEditChange}
                          className="text-sm border border-gray-300 rounded px-2 py-1 w-24"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          name="productiveTime"
                          value={editingEmployee.productiveTime}
                          onChange={handleEditChange}
                          className="text-sm border border-gray-300 rounded px-2 py-1 w-24"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-16 bg-gray-200 rounded-full h-2.5">
                            <div 
                              className={`h-2.5 rounded-full ${calculateProductivity(editingEmployee) > 70 ? 'bg-green-600' : calculateProductivity(editingEmployee) > 40 ? 'bg-yellow-500' : 'bg-red-600'}`}
                              style={{ width: `${calculateProductivity(editingEmployee)}%` }}
                            ></div>
                          </div>
                          <span className="ml-2 text-xs font-medium text-gray-500">
                            {calculateProductivity(editingEmployee)}%
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          name="screenshots"
                          type="number"
                          value={editingEmployee.screenshots}
                          onChange={handleEditChange}
                          className="text-sm border border-gray-300 rounded px-2 py-1 w-16"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button 
                          onClick={handleSaveEdit}
                          className="text-green-600 hover:text-green-900 mr-3"
                        >
                          Save
                        </button>
                        <button 
                          onClick={handleCancelEdit}
                          className="text-gray-600 hover:text-gray-900"
                        >
                          Cancel
                        </button>
                      </td>
                    </>
                  ) : (
                    // View mode
                    <>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 font-medium">
                              {employee.name.charAt(0)}
                            </span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                            <div className="text-sm text-gray-500">EMP-{employee.id.toString().padStart(4, '0')}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {employee.startTime}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {employee.finishTime}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {employee.totalTime}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {employee.systemUsageTime}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {employee.systemIdleTime}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {employee.productiveTime}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-16 bg-gray-200 rounded-full h-2.5">
                            <div 
                              className={`h-2.5 rounded-full ${calculateProductivity(employee) > 70 ? 'bg-green-600' : calculateProductivity(employee) > 40 ? 'bg-yellow-500' : 'bg-red-600'}`}
                              style={{ width: `${calculateProductivity(employee)}%` }}
                            ></div>
                          </div>
                          <span className="ml-2 text-xs font-medium text-gray-500">
                            {calculateProductivity(employee)}%
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div className="flex items-center">
                          {employee.screenshots}
                          <button className="ml-2 text-blue-600 hover:text-blue-900">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button 
                          onClick={() => handleEditClick(employee)}
                          className="text-blue-600 hover:text-blue-900 mr-3"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => handleDeleteClick(employee)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="flex-1 flex justify-between sm:hidden">
            <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Previous
            </a>
            <a href="#" className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Next
            </a>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredEmployees.length}</span> of{' '}
                <span className="font-medium">{employees.length}</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <a
                  href="#"
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <span className="sr-only">Previous</span>
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </a>
                <a
                  href="#"
                  aria-current="page"
                  className="z-10 bg-blue-50 border-blue-500 text-blue-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                >
                  1
                </a>
                <a
                  href="#"
                  className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                >
                  2
                </a>
                <a
                  href="#"
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <span className="sr-only">Next</span>
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </a>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md mx-auto">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Confirm Delete</h3>
            <p className="text-gray-600 mb-6">
              AAre you sure you want to delete the timesheet entry for <strong>{employeeToDelete?.name}</strong>? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleCancelDelete}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimesheetPage;