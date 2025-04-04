import React, { useState, useEffect } from "react";

const TimeSheet = () => {
  // Employee Data with Additional Fields
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

  // State for Edit Modal
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  
  const [filter, setFilter] = useState('');
  const handleEditClick = (employee) => {
    setEditingEmployee(employee);
  };

  const handleSaveEdit = (updatedEmployee) => {
    setEmployees((prevEmployees) =>
      prevEmployees.map((emp) =>
        emp.id === updatedEmployee.id ? updatedEmployee : emp
      )
    );
    setEditingEmployee(null);
  };
  
  const [currentTime, setCurrentTime] = useState('');
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

  // Sort filtered employees based on sort configuration
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

  // Function to handle sorting when column header is clicked
  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Function to render sort indicator in column headers
  const getSortIndicator = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'asc' ? ' ↑' : ' ↓';
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
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
      {/* <h1 className="text-2xl font-bold mb-4">Employee Timesheet</h1> */}

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

      {/* Employee Table */}
      <div className="overflow-x-auto bg-white p-6 rounded-lg shadow-md">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th 
                className="px-4 py-2 text-left cursor-pointer hover:bg-gray-300"
                onClick={() => requestSort('name')}
              >
                Employee Name {getSortIndicator('name')}
              </th>
              <th 
                className="px-4 py-2 text-left cursor-pointer hover:bg-gray-300"
                onClick={() => requestSort('startTime')}
              >
                Start Time {getSortIndicator('startTime')}
              </th>
              <th 
                className="px-4 py-2 text-left cursor-pointer hover:bg-gray-300"
                onClick={() => requestSort('finishTime')}
              >
                Finish Time {getSortIndicator('finishTime')}
              </th>
              <th 
                className="px-4 py-2 text-left cursor-pointer hover:bg-gray-300"
                onClick={() => requestSort('totalTime')}
              >
                Total Time {getSortIndicator('totalTime')}
              </th>
              <th 
                className="px-4 py-2 text-left cursor-pointer hover:bg-gray-300"
                onClick={() => requestSort('systemUsageTime')}
              >
                System Usage {getSortIndicator('systemUsageTime')}
              </th>
              <th 
                className="px-4 py-2 text-left cursor-pointer hover:bg-gray-300"
                onClick={() => requestSort('systemIdleTime')}
              >
                Idle Time {getSortIndicator('systemIdleTime')}
              </th>
              <th 
                className="px-4 py-2 text-left cursor-pointer hover:bg-gray-300"
                onClick={() => requestSort('productiveTime')}
              >
                Productive Time {getSortIndicator('productiveTime')}
              </th>
              <th 
                className="px-4 py-2 text-left cursor-pointer hover:bg-gray-300"
                onClick={() => requestSort('screenshots')}
              >
                Screenshots {getSortIndicator('screenshots')}
              </th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedEmployees.map((employee) => (
              <tr key={employee.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{employee.name}</td>
                <td className="px-4 py-2">{employee.startTime}</td>
                <td className="px-4 py-2">{employee.finishTime}</td>
                <td className="px-4 py-2">{employee.totalTime}</td>
                <td className="px-4 py-2">{employee.systemUsageTime}</td>
                <td className="px-4 py-2">{employee.systemIdleTime}</td>
                <td className="px-4 py-2">{employee.productiveTime}</td>
                <td className="px-4 py-2">{employee.screenshots}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleEditClick(employee)}
                    className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingEmployee && (
        <EditEmployeeModal
          employee={editingEmployee}
          onSave={handleSaveEdit}
          onClose={() => setEditingEmployee(null)}
        />
      )}
    </div>
  );
};

// Edit Employee Modal Component
const EditEmployeeModal = ({ employee, onSave, onClose }) => {
  const [editedEmployee, setEditedEmployee] = useState({
    name: "",
    startTime: "",
    finishTime: "",
    totalTime: "",
    systemUsageTime: "",
    systemIdleTime: "",
    productiveTime: "",
    screenshots: 0
  });

  useEffect(() => {
    if (employee) {
      setEditedEmployee(employee);
    }
  }, [employee]);

  const handleChange = (e) => {
    setEditedEmployee({ ...editedEmployee, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    onSave(editedEmployee);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4 text-center">Edit Employee</h2>

        {/* Grid Layout for Better UI */}
        <div className="grid grid-cols-2 gap-4">
          {/* Name Field (Full Width) */}
          <div className="col-span-2">
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={editedEmployee.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Time Fields (Two Columns) */}
          <div>
            <label className="block text-sm font-medium">Start Time</label>
            <input
              type="text"
              name="startTime"
              value={editedEmployee.startTime}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Finish Time</label>
            <input
              type="text"
              name="finishTime"
              value={editedEmployee.finishTime}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Total Time</label>
            <input
              type="text"
              name="totalTime"
              value={editedEmployee.totalTime}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">System Usage Time</label>
            <input
              type="text"
              name="systemUsageTime"
              value={editedEmployee.systemUsageTime}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Idle Time</label>
            <input
              type="text"
              name="systemIdleTime"
              value={editedEmployee.systemIdleTime}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Productive Time</label>
            <input
              type="text"
              name="productiveTime"
              value={editedEmployee.productiveTime}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Screenshots (Single Field) */}
          <div className="col-span-2">
            <label className="block text-sm font-medium">Screenshots</label>
            <input
              type="number"
              name="screenshots"
              value={editedEmployee.screenshots}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-2 mt-5">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimeSheet;