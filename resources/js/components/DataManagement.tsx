import React, { useMemo, useState } from 'react';
import { Plus, Edit, Trash2, X } from 'lucide-react';
import { usePage } from '@inertiajs/react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface Props {
  enrollments: any[];
  dropoutRepeaters: any[];
  classrooms: any[];
  teachers: any[];
  schoolYears?: { id: number; year: string }[];
}

const tabs = [
  { id: 'enrollment', label: 'Enrollment' },
  { id: 'dropout', label: 'Dropout / Repeater' },
  { id: 'classroom', label: 'Classrooms' },
  { id: 'teacher', label: 'Teachers' },
] as const;

const getCsrfToken = (): string => {
  // Try to get from meta tag
  const metaToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
  if (metaToken) return metaToken;
  
  // Try to get from input
  const inputToken = (document.querySelector('input[name="_token"]') as HTMLInputElement)?.value;
  if (inputToken) return inputToken;
  
  // Fallback to empty string (will cause error if not found, which is better than silent failure)
  return '';
};

export function DataManagement({ enrollments, dropoutRepeaters, classrooms, teachers, schoolYears = [] }: Props) {
  const [activeTab, setActiveTab] = useState<'enrollment' | 'dropout' | 'classroom' | 'teacher'>('enrollment');
  const [editingItem, setEditingItem] = useState<any>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newItem, setNewItem] = useState<any>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [fetchedSchoolYears, setFetchedSchoolYears] = useState<any[]>(Array.isArray(schoolYears) ? schoolYears : []);
  const [deleteItem, setDeleteItem] = useState<any>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const handleEdit = (item: any) => {
    setEditingItem({ ...item });
    setError('');
    setShowEditModal(true);
  };

  const handleDelete = (item: any) => {
    setDeleteItem(item);
    setError('');
    setShowDeleteConfirm(true);
  };

  const handleAdd = async () => {
    let schoolYearId = fetchedSchoolYears.length > 0 ? fetchedSchoolYears[0].id : null;

    // Fetch school years if not already available
    if (fetchedSchoolYears.length === 0) {
      try {
        const response = await fetch('/school-years');
        if (response.ok) {
          const years = await response.json();
          const formattedYears = years.map((year: any) => ({
            id: year.id,
            year: year.year,
          }));
          setFetchedSchoolYears(formattedYears);
          schoolYearId = formattedYears.length > 0 ? formattedYears[0].id : null;
        }
      } catch (err) {
        console.error('Error fetching school years:', err);
      }
    }

    setNewItem(getDefaultNewItem(schoolYearId));
    setError('');
    setShowAddModal(true);
  };

  const getDefaultNewItem = (defaultSchoolYearId: number | null = null) => {
    const schoolYearId = defaultSchoolYearId !== null
      ? defaultSchoolYearId
      : fetchedSchoolYears.length > 0
      ? fetchedSchoolYears[0].id
      : null;
    
    switch (activeTab) {
      case 'enrollment':
        return {
          grade_level: '',
          male_students: 0,
          female_students: 0,
          school_year_id: schoolYearId,
        };
      case 'dropout':
        return {
          grade_level: '',
          dropouts: 0,
          repeaters: 0,
          total_students: 0,
          school_year_id: schoolYearId,
        };
      case 'classroom':
        return {
          room_name: '',
          grade_level: '',
          seating_capacity: 0,
          current_students: 0,
          school_year_id: schoolYearId,
          building_id: null,
        };
      case 'teacher':
        return {
          teacher_name: '',
          grade_level: '',
          subject: '',
          students_assigned: 0,
          is_advisor: false,
          school_year_id: schoolYearId,
        };
      default:
        return {};
    }
  };

  const confirmDelete = async () => {
    if (!deleteItem) return;
    
    setIsLoading(true);
    setError('');
    
    try {
      const routeMap: any = {
        enrollment: 'enrollments',
        dropout: 'dropout-repeaters',
        classroom: 'classrooms',
        teacher: 'teachers',
      };
      
      const route = routeMap[activeTab];
      const csrfToken = getCsrfToken();
      
      if (!csrfToken) {
        setError('Security token not found. Please refresh the page and try again.');
        setIsLoading(false);
        return;
      }
      
      const response = await fetch(`/${route}/${deleteItem.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': csrfToken,
        },
      });

      if (response.ok) {
        setDeleteItem(null);
        setShowDeleteConfirm(false);
        window.location.reload();
      } else {
        const errorData = await response.json().catch(() => ({}));
        setError(errorData.message || 'Failed to delete record');
        setIsLoading(false);
      }
    } catch (err) {
      console.error('Delete error:', err);
      setError('Error deleting record. Please try again.');
      setIsLoading(false);
    }
  };

  const handleSaveEdit = async () => {
    if (!editingItem) return;

    setIsLoading(true);
    setError('');
    
    try {
      const routeMap: any = {
        enrollment: 'enrollments',
        dropout: 'dropout-repeaters',
        classroom: 'classrooms',
        teacher: 'teachers',
      };

      const route = routeMap[activeTab];
      const payload = prepareEditPayload(editingItem);
      const csrfToken = getCsrfToken();

      if (!csrfToken) {
        setError('Security token not found. Please refresh the page and try again.');
        setIsLoading(false);
        return;
      }

      const response = await fetch(`/${route}/${editingItem.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': csrfToken,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setShowEditModal(false);
        setEditingItem(null);
        window.location.reload();
      } else {
        const errorData = await response.json().catch(() => ({}));
        if (errorData.errors) {
          const errorMessages = Object.values(errorData.errors).flat().join(', ');
          setError(errorMessages || 'Failed to update record');
        } else {
          setError(errorData.message || 'Failed to update record');
        }
        setIsLoading(false);
      }
    } catch (err) {
      console.error('Update error:', err);
      setError('Error updating record. Please try again.');
      setIsLoading(false);
    }
  };

  const handleSaveAdd = async () => {
    if (!newItem) return;

    setIsLoading(true);
    setError('');
    
    try {
      const routeMap: any = {
        enrollment: 'enrollments',
        dropout: 'dropout-repeaters',
        classroom: 'classrooms',
        teacher: 'teachers',
      };

      const route = routeMap[activeTab];
      const payload = prepareEditPayload(newItem);
      const csrfToken = getCsrfToken();

      if (!csrfToken) {
        setError('Security token not found. Please refresh the page and try again.');
        setIsLoading(false);
        return;
      }

      const response = await fetch(`/${route}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': csrfToken,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setShowAddModal(false);
        setNewItem(null);
        window.location.reload();
      } else {
        const errorData = await response.json().catch(() => ({}));
        if (errorData.errors) {
          const errorMessages = Object.values(errorData.errors).flat().join(', ');
          setError(errorMessages || 'Failed to add record');
        } else {
          setError(errorData.message || 'Failed to add record');
        }
        setIsLoading(false);
      }
    } catch (err) {
      console.error('Add error:', err);
      setError('Error adding record. Please try again.');
      setIsLoading(false);
    }
  };

  const prepareEditPayload = (item: any) => {
    switch (activeTab) {
      case 'enrollment':
        return {
          grade_level: item.grade_level,
          male_students: parseInt(item.male_students) || 0,
          female_students: parseInt(item.female_students) || 0,
          school_year_id: item.school_year_id,
        };
      case 'dropout':
        return {
          grade_level: item.grade_level,
          dropouts: parseInt(item.dropouts) || 0,
          repeaters: parseInt(item.repeaters) || 0,
          total_students: parseInt(item.total_students) || 0,
          school_year_id: item.school_year_id,
        };
      case 'classroom':
        return {
          room_name: item.room_name,
          grade_level: item.grade_level,
          seating_capacity: parseInt(item.seating_capacity) || 0,
          current_students: parseInt(item.current_students) || 0,
          school_year_id: item.school_year_id,
          building_id: item.building_id,
        };
      case 'teacher':
        return {
          teacher_name: item.teacher_name,
          grade_level: item.grade_level,
          subject: item.subject,
          students_assigned: parseInt(item.students_assigned) || 0,
          is_advisor: item.is_advisor || false,
          school_year_id: item.school_year_id,
        };
      default:
        return {};
    }
  };

  const summary = useMemo(() => ({
    enrollment: enrollments.reduce(
      (sum, item) => sum + ((item.male_students || 0) + (item.female_students || 0)),
      0
    ),
    dropouts: dropoutRepeaters.reduce((sum, item) => sum + (item.dropouts || 0), 0),
    repeaters: dropoutRepeaters.reduce((sum, item) => sum + (item.repeaters || 0), 0),
    classrooms: classrooms.length,
    teachers: teachers.length,
  }), [enrollments, dropoutRepeaters, classrooms, teachers]);

  const records = useMemo(() => {
    switch (activeTab) {
      case 'enrollment':
        return enrollments;
      case 'dropout':
        return dropoutRepeaters;
      case 'classroom':
        return classrooms;
      case 'teacher':
        return teachers;
      default:
        return [];
    }
  }, [activeTab, enrollments, dropoutRepeaters, classrooms, teachers]);

  const renderHeaders = () => {
    switch (activeTab) {
      case 'enrollment':
        return (
          <tr className="border-b border-slate-200">
            <th className="py-3 px-4 text-left text-sm font-semibold text-slate-600">Year</th>
            <th className="py-3 px-4 text-left text-sm font-semibold text-slate-600">Grade</th>
            <th className="py-3 px-4 text-right text-sm font-semibold text-slate-600">Male</th>
            <th className="py-3 px-4 text-right text-sm font-semibold text-slate-600">Female</th>
            <th className="py-3 px-4 text-right text-sm font-semibold text-slate-600">Total</th>
            <th className="py-3 px-4 text-center text-sm font-semibold text-slate-600">Actions</th>
          </tr>
        );
      case 'dropout':
        return (
          <tr className="border-b border-slate-200">
            <th className="py-3 px-4 text-left text-sm font-semibold text-slate-600">Year</th>
            <th className="py-3 px-4 text-left text-sm font-semibold text-slate-600">Grade</th>
            <th className="py-3 px-4 text-right text-sm font-semibold text-slate-600">Dropouts</th>
            <th className="py-3 px-4 text-right text-sm font-semibold text-slate-600">Repeaters</th>
            <th className="py-3 px-4 text-right text-sm font-semibold text-slate-600">Dropout %</th>
            <th className="py-3 px-4 text-right text-sm font-semibold text-slate-600">Repeater %</th>
            <th className="py-3 px-4 text-center text-sm font-semibold text-slate-600">Actions</th>
          </tr>
        );
      case 'classroom':
        return (
          <tr className="border-b border-slate-200">
            <th className="py-3 px-4 text-left text-sm font-semibold text-slate-600">Year</th>
            <th className="py-3 px-4 text-left text-sm font-semibold text-slate-600">Room</th>
            <th className="py-3 px-4 text-left text-sm font-semibold text-slate-600">Grade</th>
            <th className="py-3 px-4 text-right text-sm font-semibold text-slate-600">Capacity</th>
            <th className="py-3 px-4 text-right text-sm font-semibold text-slate-600">Current</th>
            <th className="py-3 px-4 text-center text-sm font-semibold text-slate-600">Actions</th>
          </tr>
        );
      case 'teacher':
        return (
          <tr className="border-b border-slate-200">
            <th className="py-3 px-4 text-left text-sm font-semibold text-slate-600">Year</th>
            <th className="py-3 px-4 text-left text-sm font-semibold text-slate-600">Teacher</th>
            <th className="py-3 px-4 text-left text-sm font-semibold text-slate-600">Grade</th>
            <th className="py-3 px-4 text-left text-sm font-semibold text-slate-600">Subject</th>
            <th className="py-3 px-4 text-right text-sm font-semibold text-slate-600">Students</th>
            <th className="py-3 px-4 text-center text-sm font-semibold text-slate-600">Actions</th>
          </tr>
        );
      default:
        return null;
    }
  };

  const renderRow = (item: any, index: number) => {
    switch (activeTab) {
      case 'enrollment':
        return (
          <tr key={item.id ?? index} className="border-b border-slate-100 hover:bg-slate-50">
            <td className="py-3 px-4 text-sm text-slate-800">{item.year ?? 'N/A'}</td>
            <td className="py-3 px-4 text-sm text-slate-800">{item.grade_level}</td>
            <td className="py-3 px-4 text-right text-sm text-slate-800">{item.male_students}</td>
            <td className="py-3 px-4 text-right text-sm text-slate-800">{item.female_students}</td>
            <td className="py-3 px-4 text-right text-sm text-slate-800">{(item.male_students || 0) + (item.female_students || 0)}</td>
            <td className="py-3 px-4 text-center text-sm text-slate-800">
              <div className="inline-flex items-center gap-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="rounded-full p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition"
                  title="Edit record"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(item)}
                  className="rounded-full p-2 text-slate-500 hover:bg-red-50 hover:text-red-600 transition"
                  title="Delete record"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </td>
          </tr>
        );
      case 'dropout':
        return (
          <tr key={item.id ?? index} className="border-b border-slate-100 hover:bg-slate-50">
            <td className="py-3 px-4 text-sm text-slate-800">{item.year ?? 'N/A'}</td>
            <td className="py-3 px-4 text-sm text-slate-800">{item.grade_level}</td>
            <td className="py-3 px-4 text-right text-sm text-slate-800">{item.dropouts}</td>
            <td className="py-3 px-4 text-right text-sm text-slate-800">{item.repeaters}</td>
            <td className="py-3 px-4 text-right text-sm text-slate-800">{item.dropout_rate?.toFixed(2)}%</td>
            <td className="py-3 px-4 text-right text-sm text-slate-800">{item.repeater_rate?.toFixed(2)}%</td>
            <td className="py-3 px-4 text-center text-sm text-slate-800">
              <div className="inline-flex items-center gap-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="rounded-full p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition"
                  title="Edit record"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(item)}
                  className="rounded-full p-2 text-slate-500 hover:bg-red-50 hover:text-red-600 transition"
                  title="Delete record"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </td>
          </tr>
        );
      case 'classroom':
        return (
          <tr key={item.id ?? index} className="border-b border-slate-100 hover:bg-slate-50">
            <td className="py-3 px-4 text-sm text-slate-800">{item.year ?? 'N/A'}</td>
            <td className="py-3 px-4 text-sm text-slate-800">{item.room_name}</td>
            <td className="py-3 px-4 text-sm text-slate-800">{item.grade_level}</td>
            <td className="py-3 px-4 text-right text-sm text-slate-800">{item.seating_capacity}</td>
            <td className="py-3 px-4 text-right text-sm text-slate-800">{item.current_students}</td>
            <td className="py-3 px-4 text-center text-sm text-slate-800">
              <div className="inline-flex items-center gap-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="rounded-full p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition"
                  title="Edit record"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(item)}
                  className="rounded-full p-2 text-slate-500 hover:bg-red-50 hover:text-red-600 transition"
                  title="Delete record"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </td>
          </tr>
        );
      case 'teacher':
        return (
          <tr key={item.id ?? index} className="border-b border-slate-100 hover:bg-slate-50">
            <td className="py-3 px-4 text-sm text-slate-800">{item.year ?? 'N/A'}</td>
            <td className="py-3 px-4 text-sm text-slate-800">{item.teacher_name}</td>
            <td className="py-3 px-4 text-sm text-slate-800">{item.grade_level}</td>
            <td className="py-3 px-4 text-sm text-slate-800">{item.subject}</td>
            <td className="py-3 px-4 text-right text-sm text-slate-800">{item.students_assigned}</td>
            <td className="py-3 px-4 text-center text-sm text-slate-800">
              <div className="inline-flex items-center gap-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="rounded-full p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition"
                  title="Edit record"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(item)}
                  className="rounded-full p-2 text-slate-500 hover:bg-red-50 hover:text-red-600 transition"
                  title="Delete record"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </td>
          </tr>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">Data Management</h2>
            <p className="mt-2 text-sm text-slate-600">Manage and review records across enrollment, dropout, classroom, and teacher data.</p>
          </div>
          <button 
            onClick={handleAdd}
            className="inline-flex items-center gap-2 rounded-3xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
            <Plus className="h-4 w-4" />
            Add Record
          </button>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-700">
            <div className="font-semibold text-slate-900">Enrollment</div>
            <div className="mt-2 text-2xl font-bold">{summary.enrollment}</div>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-700">
            <div className="font-semibold text-slate-900">Dropouts</div>
            <div className="mt-2 text-2xl font-bold">{summary.dropouts}</div>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-700">
            <div className="font-semibold text-slate-900">Repeaters</div>
            <div className="mt-2 text-2xl font-bold">{summary.repeaters}</div>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-700">
            <div className="font-semibold text-slate-900">Teachers</div>
            <div className="mt-2 text-2xl font-bold">{summary.teachers}</div>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-700">
            <div className="font-semibold text-slate-900">Classrooms</div>
            <div className="mt-2 text-2xl font-bold">{summary.classrooms}</div>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                activeTab === tab.id ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              {renderHeaders()}
            </thead>
            <tbody>{records.map(renderRow)}</tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      <Dialog open={showEditModal} onOpenChange={(open) => {
        setShowEditModal(open);
        if (!open) {
          setError('');
        }
      }}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit {activeTab === 'enrollment' ? 'Enrollment' : activeTab === 'dropout' ? 'Dropout/Repeater' : activeTab === 'classroom' ? 'Classroom' : 'Teacher'} Record</DialogTitle>
            <DialogDescription>Update the record details below.</DialogDescription>
          </DialogHeader>

          {error && (
            <div className="rounded-lg bg-red-50 p-4 text-sm text-red-700 border border-red-200">
              {error}
            </div>
          )}

          {editingItem && (
            <div className="space-y-4 py-4">
              {activeTab === 'enrollment' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Grade Level</label>
                    <input
                      type="text"
                      value={editingItem.grade_level || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, grade_level: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Male Students</label>
                    <input
                      type="number"
                      value={editingItem.male_students ?? ''}
                      onChange={(e) => setEditingItem({ ...editingItem, male_students: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Female Students</label>
                    <input
                      type="number"
                      value={editingItem.female_students ?? ''}
                      onChange={(e) => setEditingItem({ ...editingItem, female_students: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-500"
                    />
                  </div>
                </>
              )}

              {activeTab === 'dropout' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Grade Level</label>
                    <input
                      type="text"
                      value={editingItem.grade_level || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, grade_level: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Dropouts</label>
                    <input
                      type="number"
                      value={editingItem.dropouts || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, dropouts: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Repeaters</label>
                    <input
                      type="number"
                      value={editingItem.repeaters || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, repeaters: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Total Students</label>
                    <input
                      type="number"
                      value={editingItem.total_students || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, total_students: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-500"
                    />
                  </div>
                  {/* Dropout/Repeater rates are computed automatically from totals */}
                </>
              )}

              {activeTab === 'classroom' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Room Name</label>
                    <input
                      type="text"
                      value={editingItem.room_name || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, room_name: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Grade Level</label>
                    <input
                      type="text"
                      value={editingItem.grade_level || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, grade_level: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Seating Capacity</label>
                    <input
                      type="number"
                      value={editingItem.seating_capacity || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, seating_capacity: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Current Students</label>
                    <input
                      type="number"
                      value={editingItem.current_students || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, current_students: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-500"
                    />
                  </div>
                </>
              )}

              {activeTab === 'teacher' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Teacher Name</label>
                    <input
                      type="text"
                      value={editingItem.teacher_name || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, teacher_name: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Grade Level</label>
                    <input
                      type="text"
                      value={editingItem.grade_level || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, grade_level: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Subject</label>
                    <input
                      type="text"
                      value={editingItem.subject || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, subject: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Students Assigned</label>
                    <input
                      type="number"
                      value={editingItem.students_assigned || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, students_assigned: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-500"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="is_advisor"
                      checked={editingItem.is_advisor || false}
                      onChange={(e) => setEditingItem({ ...editingItem, is_advisor: e.target.checked })}
                      className="rounded border-slate-300"
                    />
                    <label htmlFor="is_advisor" className="text-sm font-medium text-slate-700">Is Advisor</label>
                  </div>
                </>
              )}
            </div>
          )}

          <div className="flex gap-2 justify-end pt-4">
            <button
              onClick={() => setShowEditModal(false)}
              disabled={isLoading}
              className="px-4 py-2 rounded-lg border border-slate-300 text-sm font-medium text-slate-700 hover:bg-slate-50 transition disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveEdit}
              disabled={isLoading}
              className="px-4 py-2 rounded-lg bg-slate-900 text-sm font-medium text-white hover:bg-slate-800 transition disabled:opacity-50"
            >
              {isLoading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Record Modal */}
      <Dialog open={showAddModal} onOpenChange={(open) => {
        setShowAddModal(open);
        if (!open) {
          setError('');
        }
      }}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add New {activeTab === 'enrollment' ? 'Enrollment' : activeTab === 'dropout' ? 'Dropout/Repeater' : activeTab === 'classroom' ? 'Classroom' : 'Teacher'} Record</DialogTitle>
            <DialogDescription>Fill in the details to create a new record.</DialogDescription>
          </DialogHeader>

          {error && (
            <div className="rounded-lg bg-red-50 p-4 text-sm text-red-700 border border-red-200">
              {error}
            </div>
          )}

          {newItem && (
            <div className="space-y-4 py-4">
              {activeTab === 'enrollment' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">School Year</label>
                    <select
                      value={newItem.school_year_id || ''}
                      onChange={(e) => setNewItem({ ...newItem, school_year_id: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-500"
                    >
                      <option value="">Select a school year</option>
                      {fetchedSchoolYears.map((year) => (
                        <option key={year.id} value={year.id}>{year.year}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Grade Level</label>
                    <input
                      type="text"
                      value={newItem.grade_level || ''}
                      onChange={(e) => setNewItem({ ...newItem, grade_level: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Male Students</label>
                    <input
                      type="number"
                      value={newItem.male_students ?? ''}
                      onChange={(e) => setNewItem({ ...newItem, male_students: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Female Students</label>
                    <input
                      type="number"
                      value={newItem.female_students ?? ''}
                      onChange={(e) => setNewItem({ ...newItem, female_students: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-500"
                    />
                  </div>
                </>
              )}

              {activeTab === 'dropout' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">School Year</label>
                    <select
                      value={newItem.school_year_id || ''}
                      onChange={(e) => setNewItem({ ...newItem, school_year_id: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-500"
                    >
                      <option value="">Select a school year</option>
                      {fetchedSchoolYears.map((year) => (
                        <option key={year.id} value={year.id}>{year.year}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Grade Level</label>
                    <input
                      type="text"
                      value={newItem.grade_level || ''}
                      onChange={(e) => setNewItem({ ...newItem, grade_level: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Dropouts</label>
                    <input
                      type="number"
                      value={newItem.dropouts || ''}
                      onChange={(e) => setNewItem({ ...newItem, dropouts: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Repeaters</label>
                    <input
                      type="number"
                      value={newItem.repeaters || ''}
                      onChange={(e) => setNewItem({ ...newItem, repeaters: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Total Students</label>
                    <input
                      type="number"
                      value={newItem.total_students || ''}
                      onChange={(e) => setNewItem({ ...newItem, total_students: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-500"
                    />
                  </div>
                  {/* Dropout/Repeater rates are computed automatically from totals */}
                </>
              )}

              {activeTab === 'classroom' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">School Year</label>
                    <select
                      value={newItem.school_year_id || ''}
                      onChange={(e) => setNewItem({ ...newItem, school_year_id: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-500"
                    >
                      <option value="">Select a school year</option>
                      {fetchedSchoolYears.map((year) => (
                        <option key={year.id} value={year.id}>{year.year}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Room Name</label>
                    <input
                      type="text"
                      value={newItem.room_name || ''}
                      onChange={(e) => setNewItem({ ...newItem, room_name: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Grade Level</label>
                    <input
                      type="text"
                      value={newItem.grade_level || ''}
                      onChange={(e) => setNewItem({ ...newItem, grade_level: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Seating Capacity</label>
                    <input
                      type="number"
                      value={newItem.seating_capacity || ''}
                      onChange={(e) => setNewItem({ ...newItem, seating_capacity: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Current Students</label>
                    <input
                      type="number"
                      value={newItem.current_students || ''}
                      onChange={(e) => setNewItem({ ...newItem, current_students: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-500"
                    />
                  </div>
                </>
              )}

              {activeTab === 'teacher' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">School Year</label>
                    <select
                      value={newItem.school_year_id || ''}
                      onChange={(e) => setNewItem({ ...newItem, school_year_id: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-500"
                    >
                      <option value="">Select a school year</option>
                      {fetchedSchoolYears.map((year) => (
                        <option key={year.id} value={year.id}>{year.year}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Teacher Name</label>
                    <input
                      type="text"
                      value={newItem.teacher_name || ''}
                      onChange={(e) => setNewItem({ ...newItem, teacher_name: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Grade Level</label>
                    <input
                      type="text"
                      value={newItem.grade_level || ''}
                      onChange={(e) => setNewItem({ ...newItem, grade_level: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Subject</label>
                    <input
                      type="text"
                      value={newItem.subject || ''}
                      onChange={(e) => setNewItem({ ...newItem, subject: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Students Assigned</label>
                    <input
                      type="number"
                      value={newItem.students_assigned || ''}
                      onChange={(e) => setNewItem({ ...newItem, students_assigned: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-500"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="new_is_advisor"
                      checked={newItem.is_advisor || false}
                      onChange={(e) => setNewItem({ ...newItem, is_advisor: e.target.checked })}
                      className="rounded border-slate-300"
                    />
                    <label htmlFor="new_is_advisor" className="text-sm font-medium text-slate-700">Is Advisor</label>
                  </div>
                </>
              )}
            </div>
          )}

          <div className="flex gap-2 justify-end pt-4">
            <button
              onClick={() => setShowAddModal(false)}
              disabled={isLoading}
              className="px-4 py-2 rounded-lg border border-slate-300 text-sm font-medium text-slate-700 hover:bg-slate-50 transition disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveAdd}
              disabled={isLoading}
              className="px-4 py-2 rounded-lg bg-slate-900 text-sm font-medium text-white hover:bg-slate-800 transition disabled:opacity-50"
            >
              {isLoading ? 'Adding...' : 'Add Record'}
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-3xl shadow-lg p-6 max-w-sm mx-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="shrink-0 h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                <Trash2 className="h-5 w-5 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">Delete Record</h3>
            </div>
            {error && (
              <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700 border border-red-200 mb-4">
                {error}
              </div>
            )}
            <p className="text-sm text-slate-600 mb-6">
              Are you sure you want to delete this {activeTab === 'enrollment' ? 'enrollment' : activeTab === 'dropout' ? 'dropout/repeater' : activeTab === 'classroom' ? 'classroom' : 'teacher'} record? This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                disabled={isLoading}
                className="px-4 py-2 rounded-lg border border-slate-300 text-sm font-medium text-slate-700 hover:bg-slate-50 transition disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={isLoading}
                className="px-4 py-2 rounded-lg bg-red-600 text-sm font-medium text-white hover:bg-red-700 transition disabled:opacity-50"
              >
                {isLoading ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
