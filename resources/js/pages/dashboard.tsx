import { Head } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import { DashboardLayout } from '../components/DashboardLayout';
import { KPISummary } from '../components/KPISummary';
import { EnrollmentCharts } from '../components/EnrollmentCharts';
import { DropoutRepeaterCharts } from '../components/DropoutRepeaterCharts';
import { ClassroomCharts } from '../components/ClassroomCharts';
import { TeacherCharts } from '../components/TeacherCharts';
import { FacilitiesCharts } from '../components/FacilitiesCharts';
import { DataInputForm } from '../components/DataInputForm';
import { DataManagement } from '../components/DataManagement';
import { Plus, TrendingUp, Lightbulb, AlertTriangle } from 'lucide-react';

interface EnrollmentItem {
  id: number;
  year: string | null;
  grade_level: string;
  male_students: number;
  female_students: number;
}

interface DropoutItem {
  id: number;
  year: string | null;
  grade_level: string;
  dropouts: number;
  repeaters: number;
  total_students: number;
  dropout_rate: number;
  repeater_rate: number;
}

interface ClassroomItem {
  id: number;
  year: string | null;
  room_name: string;
  grade_level: string;
  seating_capacity: number;
  current_students: number;
  building_name: string | null;
}

interface TeacherItem {
  id: number;
  year: string | null;
  teacher_name: string;
  grade_level: string;
  subject: string;
  students_assigned: number;
  is_advisor: boolean;
}

interface BuildingItem {
  id: number;
  building_name: string;
  total_rooms: number;
  condition: string;
}

interface RoomItem {
  id: number;
  building_name: string | null;
  room_number: string;
  room_type: string;
  length_m: number | null;
  width_m: number | null;
  area_sqm: number | null;
  condition: string;
  usage_category: string;
}

interface SchoolYear {
  id: number;
  year: string;
}

interface RecommendationItem {
  id: string;
  title: string;
  message: string;
  score: number;
  severity: 'low' | 'medium' | 'high' | 'info';
  meta?: Record<string, any>;
}

interface DashboardProps {
  schoolYears: SchoolYear[];
  enrollments: EnrollmentItem[];
  dropoutRepeaters: DropoutItem[];
  classrooms: ClassroomItem[];
  teachers: TeacherItem[];
  buildings: BuildingItem[];
  rooms: RoomItem[];
  recommendations?: RecommendationItem[];
}

const gradeOptions = [
  'All Grades',
  'Kindergarten',
  'Grade 1',
  'Grade 2',
  'Grade 3',
  'Grade 4',
  'Grade 5',
  'Grade 6',
];

const sections = [
  { id: 'overview', label: 'Overview' },
  { id: 'enrollment', label: 'Enrollment' },
  { id: 'dropout', label: 'Dropout & Repeaters' },
  { id: 'classrooms', label: 'Classrooms' },
  { id: 'teachers', label: 'Teachers' },
  { id: 'facilities', label: 'Facilities' },
  { id: 'data-management', label: 'Data Management' },
];

export default function Dashboard({
  schoolYears,
  enrollments,
  dropoutRepeaters,
  classrooms,
  teachers,
  buildings,
  rooms,
  recommendations = [],
}: DashboardProps) {
  const [selectedYear, setSelectedYear] = useState(() => {
    return (schoolYears && schoolYears.length > 0) ? schoolYears[schoolYears.length - 1].year : '';
  });
  const [selectedGrade, setSelectedGrade] = useState('All Grades');
  const [activeSection, setActiveSection] = useState('overview');
  const [showDataForm, setShowDataForm] = useState(false);
  const [dataFormInitialTab, setDataFormInitialTab] = useState<'enrollment' | 'dropout' | 'classroom' | 'teacher'>('enrollment');

  const filteredEnrollments = useMemo(
    () =>
      enrollments.filter((item) => {
        if (selectedYear && item.year !== selectedYear) {
          return false;
        }
        if (selectedGrade !== 'All Grades' && item.grade_level !== selectedGrade) {
          return false;
        }
        return true;
      }),
    [enrollments, selectedYear, selectedGrade]
  );

  const filteredDropouts = useMemo(
    () =>
      dropoutRepeaters.filter((item) => {
        if (selectedYear && item.year !== selectedYear) {
          return false;
        }
        if (selectedGrade !== 'All Grades' && item.grade_level !== selectedGrade) {
          return false;
        }
        return true;
      }),
    [dropoutRepeaters, selectedYear, selectedGrade]
  );

  const filteredClassrooms = useMemo(
    () =>
      classrooms.filter((item) => {
        if (selectedYear && item.year !== selectedYear) {
          return false;
        }
        if (selectedGrade !== 'All Grades' && item.grade_level !== selectedGrade) {
          return false;
        }
        return true;
      }),
    [classrooms, selectedYear, selectedGrade]
  );

  const filteredTeachers = useMemo(
    () =>
      teachers.filter((item) => {
        if (selectedYear && item.year !== selectedYear) {
          return false;
        }
        if (selectedGrade !== 'All Grades' && item.grade_level !== selectedGrade) {
          return false;
        }
        return true;
      }),
    [teachers, selectedYear, selectedGrade]
  );

  const totalEnrollment = filteredEnrollments.reduce(
    (sum, item) => sum + ((item.male_students || 0) + (item.female_students || 0)),
    0
  );
  const totalMale = filteredEnrollments.reduce((sum, item) => sum + item.male_students, 0);
  const totalFemale = filteredEnrollments.reduce((sum, item) => sum + item.female_students, 0);
  const avgDropoutRate = (() => {
    const totalDropouts = filteredDropouts.reduce((s, it) => s + (it.dropouts || 0), 0);
    const totalStudents = filteredDropouts.reduce((s, it) => s + (it.total_students || 0), 0);
    return totalStudents > 0 ? (totalDropouts / totalStudents) * 100 : 0;
  })();

  const avgRepeaterRate = (() => {
    const totalRepeaters = filteredDropouts.reduce((s, it) => s + (it.repeaters || 0), 0);
    const totalStudents = filteredDropouts.reduce((s, it) => s + (it.total_students || 0), 0);
    return totalStudents > 0 ? (totalRepeaters / totalStudents) * 100 : 0;
  })();
  const teacherCount = filteredTeachers.length;
  const totalClassrooms = filteredClassrooms.length;
  const seatingCapacity = filteredClassrooms.reduce((sum, item) => sum + item.seating_capacity, 0);
  const occupiedSeats = filteredClassrooms.reduce((sum, item) => sum + item.current_students, 0);
  const utilizationRate = seatingCapacity > 0 ? (occupiedSeats / seatingCapacity) * 100 : 0;
  const studentsPerTeacher = teacherCount > 0 ? totalEnrollment / teacherCount : 0;

  const filteredRecommendations = useMemo(() => {
    const recommendationsList: RecommendationItem[] = [];

    const addRec = (
      id: string,
      title: string,
      message: string,
      score: number,
      severity: RecommendationItem['severity'] = 'info',
      meta: Record<string, any> = {}
    ) => {
      recommendationsList.push({ id, title, message, score, severity, meta });
    };

    const totalDropouts = filteredDropouts.reduce((sum, item) => sum + (item.dropouts || 0), 0);
    const totalRepeaters = filteredDropouts.reduce((sum, item) => sum + (item.repeaters || 0), 0);
    const totalDropoutStudents = filteredDropouts.reduce((sum, item) => sum + (item.total_students || 0), 0);
    const currentDropoutRate = totalDropoutStudents > 0 ? (totalDropouts / totalDropoutStudents) * 100 : 0;
    const currentRepeaterRate = totalDropoutStudents > 0 ? (totalRepeaters / totalDropoutStudents) * 100 : 0;

    if (currentDropoutRate > 5) {
      addRec(
        'dropout-high-filtered',
        'Filtered dropout warning',
        `${selectedGrade !== 'All Grades' ? selectedGrade + ' ' : ''}dropout rate is ${Math.round(currentDropoutRate * 10) / 10}% for the active view — consider targeted retention programs.`,
        Math.round(currentDropoutRate * 10),
        'high'
      );
    } else if (currentDropoutRate > 0) {
      addRec(
        'dropout-stable-filtered',
        'Dropout rate stable',
        `${selectedGrade !== 'All Grades' ? selectedGrade + ' ' : ''}dropout rate is ${Math.round(currentDropoutRate * 10) / 10}% for the selected filters.`,
        12,
        'low'
      );
    }

    if (currentRepeaterRate > 5) {
      addRec(
        'repeater-high-filtered',
        'Filtered repeater risk',
        `${selectedGrade !== 'All Grades' ? selectedGrade + ' ' : ''}repeater rate is ${Math.round(currentRepeaterRate * 10) / 10}% — review curriculum support for this group.`,
        Math.round(currentRepeaterRate * 8),
        'high'
      );
    }

    const totalFilteredEnrollment = totalEnrollment;
    const enrollmentByYear: Record<string, number> = {};
    enrollments
      .filter((item) => selectedGrade === 'All Grades' || item.grade_level === selectedGrade)
      .forEach((item) => {
        if (!item.year) return;
        enrollmentByYear[item.year] = (enrollmentByYear[item.year] || 0) + (item.male_students + item.female_students);
      });

    const yearKeys = Object.keys(enrollmentByYear).sort((a, b) => Number(b.replace(/\D/g, '')) - Number(a.replace(/\D/g, '')));
    if (yearKeys.length >= 2) {
      const currentYear = yearKeys[0];
      const previousYear = yearKeys[1];
      const currentValue = enrollmentByYear[currentYear] || 0;
      const previousValue = enrollmentByYear[previousYear] || 0;
      if (previousValue > 0) {
        const change = ((currentValue - previousValue) / previousValue) * 100;
        if (change < -3) {
          addRec(
            'enrollment-decline-filtered',
            'Filtered enrollment decline',
            `${selectedGrade !== 'All Grades' ? selectedGrade + ' ' : ''}enrollment declined ${Math.round(Math.abs(change) * 10) / 10}% versus ${previousYear}.`,
            Math.round(Math.abs(change) * 5),
            'high'
          );
        } else if (change > 3) {
          addRec(
            'enrollment-growth-filtered',
            'Filtered enrollment increase',
            `${selectedGrade !== 'All Grades' ? selectedGrade + ' ' : ''}enrollment increased ${Math.round(change * 10) / 10}% versus ${previousYear}.`,
            Math.round(change * 3),
            'medium'
          );
        }
      }
    }

    const overcrowdedRooms = filteredClassrooms.filter((item) => item.seating_capacity > 0 && (item.current_students / item.seating_capacity) * 100 > 110);
    const underutilizedRooms = filteredClassrooms.filter((item) => item.seating_capacity > 0 && (item.current_students / item.seating_capacity) * 100 < 50);
    if (overcrowdedRooms.length > 0) {
      addRec(
        'overcrowded-rooms-filtered',
        'Filtered overcrowded classrooms',
        `${overcrowdedRooms.length} filtered classrooms exceed capacity — rebalance classes or add sections.`,
        80,
        'high',
        { examples: overcrowdedRooms.slice(0, 3) }
      );
    }
    if (underutilizedRooms.length > 0) {
      addRec(
        'underutilized-rooms-filtered',
        'Filtered underutilized classrooms',
        `${underutilizedRooms.length} classrooms operate below 50% utilization — consider consolidation.`,
        35,
        'medium'
      );
    }

    if (studentsPerTeacher > 35) {
      addRec(
        'ratio-high-filtered',
        'Filtered teacher-student imbalance',
        `Current student-to-teacher ratio is ${Math.round(studentsPerTeacher * 10) / 10} for the active filters — staffing adjustments are recommended.`,
        Math.round(studentsPerTeacher * 2),
        'high'
      );
    } else if (studentsPerTeacher < 12 && totalFilteredEnrollment > 0) {
      addRec(
        'ratio-low-filtered',
        'Filtered staffing underuse',
        `Current student-to-teacher ratio is ${Math.round(studentsPerTeacher * 10) / 10} — resources may be underutilized.`,
        20,
        'low'
      );
    }

    const usageCounts: Record<string, number> = {};
    rooms.forEach((room) => {
      const category = (room.usage_category || 'other').toLowerCase().trim() || 'other';
      usageCounts[category] = (usageCounts[category] || 0) + 1;
    });
    const unusedRooms = (usageCounts['unused'] || 0) + (usageCounts['vacant'] || 0) + (usageCounts['other'] || 0);
    if (rooms.length > 0 && unusedRooms / rooms.length > 0.35) {
      addRec(
        'facility-low-usage-filtered',
        'Filtered facility usage low',
        'A large portion of facility inventory appears underused — optimize room assignments and scheduling.',
        45,
        'medium'
      );
    }

    const smallClasses = filteredClassrooms.filter((item) => item.current_students < 8);
    if (smallClasses.length > 5) {
      addRec(
        'small-classes-filtered',
        'Many filtered small classes',
        `${smallClasses.length} classes have fewer than 8 students — evaluate consolidation opportunities.`,
        30,
        'low'
      );
    }

    if (utilizationRate > 90) {
      addRec(
        'utilization-high-filtered',
        'Filtered utilization high',
        `Current utilization is ${Math.round(utilizationRate * 10) / 10}% in the active view — monitor overcrowding closely.`,
        70,
        'high'
      );
    } else if (utilizationRate < 50 && totalFilteredEnrollment > 0) {
      addRec(
        'utilization-low-filtered',
        'Filtered utilization low',
        `Current utilization is ${Math.round(utilizationRate * 10) / 10}% — consider optimizing facility allocation.`,
        30,
        'low'
      );
    }

    if (yearKeys.length >= 2 && seatingCapacity > 0) {
      const currentYear = yearKeys[0];
      const previousYear = yearKeys[1];
      const growthRate = (enrollmentByYear[currentYear] - enrollmentByYear[previousYear]) / Math.max(1, enrollmentByYear[previousYear]);
      if (growthRate > 0.05) {
        const projected = utilizationRate * (1 + growthRate);
        if (projected > 95) {
          addRec(
            'capacity-forecast-filtered',
            'Filtered capacity forecast',
            'Projected utilization from current enrollment trends may breach 95% — plan ahead.',
            55,
            'high'
          );
        }
      }
    }

    const teacherWithoutStudents = filteredTeachers.filter((teacher) => !teacher.students_assigned || teacher.students_assigned === 0);
    if (teacherWithoutStudents.length > 0) {
      addRec(
        'teacher-no-students-filtered',
        'Filtered teacher assignment gap',
        `${teacherWithoutStudents.length} teachers currently have no assigned students in the active view — confirm assignments.`,
        25,
        'medium'
      );
    }

    const incompleteClassrooms = filteredClassrooms.filter((classroom) => !classroom.building_name || !classroom.seating_capacity);
    if (incompleteClassrooms.length > 0) {
      addRec(
        'classroom-data-gap-filtered',
        'Filtered classroom data gaps',
        `${incompleteClassrooms.length} filtered classroom records lack building or seating data — clean the dataset.`,
        20,
        'medium'
      );
    }

    if (recommendationsList.length === 0) {
      addRec('no-data-filtered', 'No insights available', 'The selected filter set has limited data. Add more records or broaden the view for better analysis.', 10, 'info');
    }

    while (recommendationsList.length < 8) {
      addRec(
        `placeholder-filtered-${recommendationsList.length + 1}`,
        'Monitoring opportunity',
        'No urgent action is detected for this configuration. Keep reviewing the data as it updates.',
        5,
        'low'
      );
    }

    return recommendationsList.sort((a, b) => b.score - a.score).slice(0, 15);
  }, [
    enrollments,
    filteredEnrollments,
    filteredDropouts,
    filteredClassrooms,
    filteredTeachers,
    rooms,
    selectedGrade,
    utilizationRate,
    studentsPerTeacher,
    totalEnrollment,
    seatingCapacity,
  ]);

  const renderInsightsPanel = () => {
    const items = filteredRecommendations.slice(0, 4);

    const getClasses = (severity: string) => {
      if (severity === 'high') return { wrapper: 'bg-amber-50 border-amber-500 text-amber-900', badge: 'bg-red-100 text-red-700', icon: AlertTriangle };
      if (severity === 'medium') return { wrapper: 'bg-blue-50 border-blue-500 text-blue-900', badge: 'bg-amber-100 text-amber-700', icon: Lightbulb };
      return { wrapper: 'bg-green-50 border-green-500 text-green-900', badge: 'bg-gray-100 text-gray-700', icon: TrendingUp };
    };

    return (
      <div className="bg-white rounded-xl shadow-md p-6 mt-6">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Lightbulb className="w-6 h-6 text-amber-500" />
          Smart Insights & Recommendations
        </h3>
        <div className="space-y-4">
          {items.map((rec) => {
            const cls = getClasses(rec.severity || 'info');
            const Icon = cls.icon;
            return (
              <div key={rec.id} className={`p-4 rounded-lg border-l-4 ${cls.wrapper}`}>
                <div className="flex items-start gap-3">
                  <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-bold text-sm">{rec.title}</h4>
                      <span className={`text-xs px-2 py-1 rounded ${cls.badge}`}>{(rec.severity || 'info').toUpperCase()}</span>
                    </div>
                    <p className="text-sm text-gray-700">{rec.message}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const getSectionContent = () => {
    switch (activeSection) {
      case 'enrollment':
        return (
          <div className="space-y-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="text-3xl font-bold">Enrollment Analytics</h2>
                <p className="text-gray-500 mt-1">Detailed student enrollment trends and statistics</p>
              </div>
              <button
                onClick={() => { setDataFormInitialTab('enrollment'); setShowDataForm(true); }}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
              >
                <Plus className="w-5 h-5" />
                Add Enrollment Data
              </button>
            </div>
            <EnrollmentCharts selectedYear={selectedYear} selectedGrade={selectedGrade} enrollments={enrollments} />
          </div>
        );
      case 'dropout':
        return (
          <div className="space-y-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="text-3xl font-bold">Dropout & Repeater Analytics</h2>
                <p className="text-gray-500 mt-1">Monitor dropout and repeater rates across grades</p>
              </div>
              <button
                onClick={() => { setDataFormInitialTab('dropout'); setShowDataForm(true); }}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
              >
                <Plus className="w-5 h-5" />
                Add Dropout Data
              </button>
            </div>
            <DropoutRepeaterCharts selectedYear={selectedYear} selectedGrade={selectedGrade} dropoutRepeaters={dropoutRepeaters} />
          </div>
        );
      case 'classrooms':
        return (
          <div className="space-y-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="text-3xl font-bold">Classroom Analysis</h2>
                <p className="text-gray-500 mt-1">Seating capacity, utilization, and distribution analytics</p>
              </div>
              <button
                onClick={() => { setDataFormInitialTab('classroom'); setShowDataForm(true); }}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
              >
                <Plus className="w-5 h-5" />
                Add Classroom Data
              </button>
            </div>
            <ClassroomCharts selectedYear={selectedYear} selectedGrade={selectedGrade} classrooms={classrooms} />
          </div>
        );
      case 'teachers':
        return (
          <div className="space-y-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="text-3xl font-bold">Teacher Deployment Analytics</h2>
                <p className="text-gray-500 mt-1">Teacher distribution and student-to-teacher ratios</p>
              </div>
              <button
                onClick={() => { setDataFormInitialTab('teacher'); setShowDataForm(true); }}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
              >
                <Plus className="w-5 h-5" />
                Add Teacher Data
              </button>
            </div>
            <TeacherCharts selectedYear={selectedYear} selectedGrade={selectedGrade} teachers={teachers} />
          </div>
        );
      case 'facilities':
        return (
          <div className="space-y-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="text-3xl font-bold">Facilities Management</h2>
                <p className="text-gray-500 mt-1">Building conditions, room types, and usage analytics</p>
              </div>
            </div>
            <FacilitiesCharts buildings={buildings} rooms={rooms} />
          </div>
        );
      case 'data-management':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold">Data Management</h2>
              <p className="text-gray-500 mt-1">View, edit, and delete existing data records</p>
            </div>
            <DataManagement enrollments={enrollments} dropoutRepeaters={dropoutRepeaters} classrooms={classrooms} teachers={teachers} schoolYears={schoolYears} />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Head title="Dashboard" />
      <DashboardLayout
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        selectedYear={selectedYear}
        onYearChange={setSelectedYear}
        selectedGrade={selectedGrade}
        onGradeChange={setSelectedGrade}
        schoolYears={schoolYears}
      >
        <div className="space-y-6">
          {activeSection === 'overview' ? (
            <div className="space-y-6">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-slate-900">Dashboard Overview</h1>
                  <p className="text-gray-500 mt-2">Comprehensive analytics for school performance monitoring</p>
                </div>
                <button
                  onClick={() => { setDataFormInitialTab('enrollment'); setShowDataForm(true); }}
                  className="inline-flex items-center gap-2 rounded-3xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-blue-700"
                >
                  <Plus className="h-5 w-5" />
                  Add New Data
                </button>
              </div>

              <KPISummary
                selectedYear={selectedYear}
                selectedGrade={selectedGrade}
                enrollments={enrollments}
                dropoutRepeaters={dropoutRepeaters}
                classrooms={classrooms}
                teachers={teachers}
              />

              <div className="grid gap-6 lg:grid-cols-2">
                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="text-xl font-semibold text-slate-900 mb-4">Quick Enrollment Overview</h3>
                  <EnrollmentCharts selectedYear={selectedYear} selectedGrade={selectedGrade} enrollments={enrollments} />
                </div>
                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="text-xl font-semibold text-slate-900 mb-4">Dropout & Repeater Overview</h3>
                  <DropoutRepeaterCharts selectedYear={selectedYear} selectedGrade={selectedGrade} dropoutRepeaters={dropoutRepeaters} />
                </div>
              </div>

              {renderInsightsPanel()}
            </div>
          ) : (
            getSectionContent()
          )}
        </div>
      </DashboardLayout>

      {showDataForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4">
          <div className="w-full max-w-4xl rounded-[32px] bg-white shadow-2xl ring-1 ring-slate-200">
            <DataInputForm selectedYear={selectedYear} selectedGrade={selectedGrade} initialTab={dataFormInitialTab} onClose={() => setShowDataForm(false)} />
          </div>
        </div>
      )}
    </>
  );
}

Dashboard.layout = {
  breadcrumbs: [
    {
      title: 'Dashboard',
      href: '/dashboard',
    },
  ],
};
