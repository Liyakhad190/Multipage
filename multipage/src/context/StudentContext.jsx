import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

const StudentContext = createContext();

const INITIAL_STUDENTS = [
  {
    id: 'STU-1001',
    name: 'Sophia Martinez',
    email: 'sophia.m@university.edu',
    phone: '+1 (555) 234-8901',
    rollNumber: 'CS-2023-042',
    department: 'Computer Science',
    semester: '6th Semester',
    gpa: 3.88,
    attendance: 94,
    status: 'Active',
    feeStatus: 'Paid',
    admissionDate: '2022-08-15',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    address: '742 Evergreen Terrace, Seattle, WA',
    guardianName: 'Carlos Martinez',
    guardianPhone: '+1 (555) 234-8900',
    bio: 'Specializing in Artificial Intelligence and Distributed Systems. President of the University Coding Club.',
    courses: [
      { code: 'CS401', name: 'Machine Learning', credits: 4, grade: 'A' },
      { code: 'CS405', name: 'Cloud Computing Systems', credits: 3, grade: 'A-' },
      { code: 'CS412', name: 'Advanced Algorithms', credits: 4, grade: 'A' },
      { code: 'MATH302', name: 'Applied Linear Algebra', credits: 3, grade: 'B+' }
    ],
    activities: ['ACM Student Chapter', 'Hackathon Winner 2024', 'Peer Tutor']
  },
  {
    id: 'STU-1002',
    name: 'Alexander Chen',
    email: 'a.chen@university.edu',
    phone: '+1 (555) 345-6789',
    rollNumber: 'EE-2023-118',
    department: 'Electrical Engineering',
    semester: '4th Semester',
    gpa: 3.72,
    attendance: 89,
    status: 'Active',
    feeStatus: 'Paid',
    admissionDate: '2023-08-20',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    address: '104 Beacon Street, Boston, MA',
    guardianName: 'David Chen',
    guardianPhone: '+1 (555) 345-6700',
    bio: 'Passionate about embedded systems, robotics, and sustainable IoT energy grids.',
    courses: [
      { code: 'EE301', name: 'Signals & Systems', credits: 4, grade: 'A' },
      { code: 'EE304', name: 'Microprocessor Architecture', credits: 4, grade: 'B+' },
      { code: 'PHYS201', name: 'Electromagnetism', credits: 3, grade: 'A-' }
    ],
    activities: ['Robotics Society Lead', 'IEEE Student Member']
  },
  {
    id: 'STU-1003',
    name: 'Emily Watson',
    email: 'emily.w@university.edu',
    phone: '+1 (555) 456-7890',
    rollNumber: 'BA-2022-085',
    department: 'Business Administration',
    semester: '8th Semester',
    gpa: 3.95,
    attendance: 98,
    status: 'Graduated',
    feeStatus: 'Paid',
    admissionDate: '2021-08-10',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    address: '221B Baker St, San Francisco, CA',
    guardianName: 'Margaret Watson',
    guardianPhone: '+1 (555) 456-7800',
    bio: 'Honors student focusing on Corporate Finance and International Economics. Valedictorian candidate.',
    courses: [
      { code: 'BA490', name: 'Strategic Business Policy', credits: 4, grade: 'A' },
      { code: 'FIN402', name: 'Corporate Valuation', credits: 3, grade: 'A' },
      { code: 'MKT310', name: 'Digital Market Strategies', credits: 3, grade: 'A' }
    ],
    activities: ['Finance Club Chair', 'Consulting Society', 'Dean\'s Honor Roll']
  },
  {
    id: 'STU-1004',
    name: 'Liam Johnson',
    email: 'liam.j@university.edu',
    phone: '+1 (555) 567-8901',
    rollNumber: 'ME-2023-064',
    department: 'Mechanical Engineering',
    semester: '4th Semester',
    gpa: 3.42,
    attendance: 84,
    status: 'Active',
    feeStatus: 'Pending',
    admissionDate: '2023-08-20',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    address: '430 Oak Ridge Way, Austin, TX',
    guardianName: 'Robert Johnson',
    guardianPhone: '+1 (555) 567-8900',
    bio: 'Thermodynamics enthusiast working on electric propulsion research projects.',
    courses: [
      { code: 'ME210', name: 'Thermodynamics I', credits: 4, grade: 'B' },
      { code: 'ME220', name: 'Mechanics of Materials', credits: 4, grade: 'B+' },
      { code: 'ENGR105', name: 'CAD Modeling & Simulation', credits: 3, grade: 'A-' }
    ],
    activities: ['Formula SAE Racing Team', 'Makerspace Mentor']
  },
  {
    id: 'STU-1005',
    name: 'Zara Patel',
    email: 'zara.p@university.edu',
    phone: '+1 (555) 678-9012',
    rollNumber: 'DS-2024-019',
    department: 'Data Science',
    semester: '2nd Semester',
    gpa: 3.81,
    attendance: 92,
    status: 'Active',
    feeStatus: 'Paid',
    admissionDate: '2024-08-18',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    address: '512 Michigan Ave, Chicago, IL',
    guardianName: 'Arun Patel',
    guardianPhone: '+1 (555) 678-9000',
    bio: 'Investigating deep learning applications in healthcare and genomic analysis.',
    courses: [
      { code: 'DS101', name: 'Data Structures & Algorithms', credits: 4, grade: 'A' },
      { code: 'STAT205', name: 'Probability & Statistics', credits: 3, grade: 'A-' },
      { code: 'DS102', name: 'Data Visualization & Ethics', credits: 3, grade: 'A' }
    ],
    activities: ['Women in Tech', 'DataCamp Ambassador']
  },
  {
    id: 'STU-1006',
    name: 'Marcus Brody',
    email: 'marcus.b@university.edu',
    phone: '+1 (555) 789-0123',
    rollNumber: 'CS-2023-091',
    department: 'Computer Science',
    semester: '6th Semester',
    gpa: 2.95,
    attendance: 76,
    status: 'On Leave',
    feeStatus: 'Overdue',
    admissionDate: '2022-08-15',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    address: '89 Colorado Blvd, Denver, CO',
    guardianName: 'Helen Brody',
    guardianPhone: '+1 (555) 789-0100',
    bio: 'Currently on medical leave for spring semester. Returning for fall term.',
    courses: [
      { code: 'CS310', name: 'Database Management Systems', credits: 4, grade: 'B-' },
      { code: 'CS320', name: 'Software Engineering Practices', credits: 3, grade: 'C+' }
    ],
    activities: ['Cybersecurity Club']
  }
];

export function StudentProvider({ children }) {
  const [students, setStudents] = useState(() => {
    try {
      const saved = localStorage.getItem('sms_students_data');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load students from localStorage:', e);
    }
    return INITIAL_STUDENTS;
  });

  const [toast, setToast] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('sms_students_data', JSON.stringify(students));
    } catch (e) {
      console.error('Failed to save students to localStorage:', e);
    }
  }, [students]);

  // Toast auto-dismiss
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
  };

  const addStudent = (studentData) => {
    const newId = `STU-${Math.floor(1000 + Math.random() * 9000)}`;
    const newStudent = {
      ...studentData,
      id: studentData.id || newId,
      gpa: Number(studentData.gpa) || 3.5,
      attendance: Number(studentData.attendance) || 85,
      admissionDate: studentData.admissionDate || new Date().toISOString().split('T')[0],
      avatar: studentData.avatar || `https://images.unsplash.com/photo-${1530000000000 + Math.floor(Math.random() * 1000000)}?w=150&auto=format&fit=crop&q=80`,
      courses: studentData.courses || [
        { code: 'GEN101', name: 'Core Foundations', credits: 3, grade: 'A' },
        { code: 'GEN102', name: 'Academic Writing & Research', credits: 3, grade: 'B+' }
      ],
      activities: studentData.activities || ['Student Union']
    };

    setStudents((prev) => [newStudent, ...prev]);
    showToast(`Student "${newStudent.name}" enrolled successfully!`, 'success');
    return newStudent;
  };

  const updateStudent = (id, updatedData) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...updatedData } : s))
    );
    showToast('Student information updated successfully!', 'info');
  };

  const deleteStudent = (id) => {
    const studentToDelete = students.find((s) => s.id === id);
    setStudents((prev) => prev.filter((s) => s.id !== id));
    showToast(
      `Student ${studentToDelete ? `"${studentToDelete.name}"` : id} removed from records.`,
      'error'
    );
  };

  const getStudentById = (id) => {
    return students.find((s) => s.id.toLowerCase() === (id || '').toLowerCase());
  };

  const resetToSampleData = () => {
    setStudents(INITIAL_STUDENTS);
    localStorage.setItem('sms_students_data', JSON.stringify(INITIAL_STUDENTS));
    showToast('Reset to original sample student records.', 'info');
  };

  // Aggregated analytics & stats
  const stats = useMemo(() => {
    const total = students.length;
    const active = students.filter((s) => s.status === 'Active').length;
    const graduated = students.filter((s) => s.status === 'Graduated').length;
    const onLeave = students.filter((s) => s.status === 'On Leave').length;
    
    const avgGpa = total > 0 
      ? (students.reduce((acc, s) => acc + (Number(s.gpa) || 0), 0) / total).toFixed(2)
      : '0.00';

    const avgAttendance = total > 0
      ? Math.round(students.reduce((acc, s) => acc + (Number(s.attendance) || 0), 0) / total)
      : 0;

    const feesPaid = students.filter((s) => s.feeStatus === 'Paid').length;
    const feesPending = students.filter((s) => s.feeStatus === 'Pending' || s.feeStatus === 'Overdue').length;

    // Department counts
    const departmentsMap = {};
    students.forEach((s) => {
      const dept = s.department || 'General';
      departmentsMap[dept] = (departmentsMap[dept] || 0) + 1;
    });

    const departments = Object.keys(departmentsMap).map((name) => ({
      name,
      count: departmentsMap[name],
      percentage: total > 0 ? Math.round((departmentsMap[name] / total) * 100) : 0
    }));

    return {
      total,
      active,
      graduated,
      onLeave,
      avgGpa,
      avgAttendance,
      feesPaid,
      feesPending,
      departments
    };
  }, [students]);

  // Filtered students based on search and filters
  const filteredStudents = useMemo(() => {
    return students.filter((s) => {
      const matchesSearch =
        searchQuery === '' ||
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.rollNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.department.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesDept =
        departmentFilter === 'All' || s.department === departmentFilter;

      const matchesStatus =
        statusFilter === 'All' || s.status === statusFilter;

      return matchesSearch && matchesDept && matchesStatus;
    });
  }, [students, searchQuery, departmentFilter, statusFilter]);

  return (
    <StudentContext.Provider
      value={{
        students,
        filteredStudents,
        stats,
        searchQuery,
        setSearchQuery,
        departmentFilter,
        setDepartmentFilter,
        statusFilter,
        setStatusFilter,
        addStudent,
        updateStudent,
        deleteStudent,
        getStudentById,
        resetToSampleData,
        toast,
        showToast,
        setToast
      }}
    >
      {children}
    </StudentContext.Provider>
  );
}

export function useStudents() {
  const context = useContext(StudentContext);
  if (!context) {
    throw new Error('useStudents must be used within a StudentProvider');
  }
  return context;
}
