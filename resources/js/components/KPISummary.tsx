import React, { useMemo } from 'react';
import { Users, UserCheck, UserX, Repeat, GraduationCap, School, Building, Armchair } from 'lucide-react';
import { KPICard } from './KPICard';

interface Props {
  selectedYear: string;
  selectedGrade: string;
  enrollments: any[];
  dropoutRepeaters: any[];
  classrooms: any[];
  teachers: any[];
}

export function KPISummary({ selectedYear, selectedGrade, enrollments, dropoutRepeaters, classrooms, teachers }: Props) {
  const filteredEnrollments = useMemo(
    () =>
      enrollments.filter((entry) => {
        if (selectedYear && entry.year !== selectedYear) return false;
        if (selectedGrade !== 'All Grades' && entry.grade_level !== selectedGrade) return false;
        return true;
      }),
    [enrollments, selectedYear, selectedGrade]
  );

  const filteredDropouts = useMemo(
    () =>
      dropoutRepeaters.filter((entry) => {
        if (selectedYear && entry.year !== selectedYear) return false;
        if (selectedGrade !== 'All Grades' && entry.grade_level !== selectedGrade) return false;
        return true;
      }),
    [dropoutRepeaters, selectedYear, selectedGrade]
  );

  const filteredClassrooms = useMemo(
    () =>
      classrooms.filter((entry) => {
        if (selectedYear && entry.year !== selectedYear) return false;
        if (selectedGrade !== 'All Grades' && entry.grade_level !== selectedGrade) return false;
        return true;
      }),
    [classrooms, selectedYear, selectedGrade]
  );

  const filteredTeachers = useMemo(
    () =>
      teachers.filter((entry) => {
        if (selectedYear && entry.year !== selectedYear) return false;
        if (selectedGrade !== 'All Grades' && entry.grade_level !== selectedGrade) return false;
        return true;
      }),
    [teachers, selectedYear, selectedGrade]
  );

  const years = useMemo(() => {
    const yearSet = new Set<string>();

    enrollments.forEach((entry) => {
      if (entry.year) {
        yearSet.add(entry.year);
      }
    });
    dropoutRepeaters.forEach((entry) => {
      if (entry.year) {
        yearSet.add(entry.year);
      }
    });
    classrooms.forEach((entry) => {
      if (entry.year) {
        yearSet.add(entry.year);
      }
    });
    teachers.forEach((entry) => {
      if (entry.year) {
        yearSet.add(entry.year);
      }
    });

    return Array.from(yearSet).sort((a, b) => a.localeCompare(b));
  }, [enrollments, dropoutRepeaters, classrooms, teachers]);

  const selectedYearIndex = selectedYear ? years.indexOf(selectedYear) : -1;
  const previousYear = selectedYearIndex > 0 ? years[selectedYearIndex - 1] : undefined;

  const kpis = useMemo(() => {
    const totalEnrollment = filteredEnrollments.reduce(
      (sum, entry) => sum + ((entry.male_students || 0) + (entry.female_students || 0)),
      0
    );
    const maleStudents = filteredEnrollments.reduce((sum, entry) => sum + (entry.male_students || 0), 0);
    const femaleStudents = filteredEnrollments.reduce((sum, entry) => sum + (entry.female_students || 0), 0);
    const totalDropouts = filteredDropouts.reduce((sum, entry) => sum + (entry.dropouts || 0), 0);
    const totalRepeaters = filteredDropouts.reduce((sum, entry) => sum + (entry.repeaters || 0), 0);
    const totalStudents = filteredDropouts.reduce((sum, entry) => sum + (entry.total_students || 0), 0);
    const dropoutRate = totalStudents > 0 ? (totalDropouts / totalStudents) * 100 : 0;
    const repeaterRate = totalStudents > 0 ? (totalRepeaters / totalStudents) * 100 : 0;
    const totalTeachers = filteredTeachers.length;
    const totalClassrooms = filteredClassrooms.length;
    const seatingCapacity = filteredClassrooms.reduce((sum, entry) => sum + (entry.seating_capacity || 0), 0);
    const currentStudents = filteredClassrooms.reduce((sum, entry) => sum + (entry.current_students || 0), 0);
    const utilizationRate = seatingCapacity > 0 ? (currentStudents / seatingCapacity) * 100 : 0;
    const studentsPerTeacher = totalTeachers > 0 ? totalEnrollment / totalTeachers : 0;

    const canCompare = selectedYear && previousYear;

    const filterByYear = (data: any[], year: string) =>
      data.filter((entry) => {
        if (entry.year !== year) return false;
        if (selectedGrade !== 'All Grades' && entry.grade_level !== selectedGrade) return false;
        return true;
      });

    const previousEnrollments = canCompare ? filterByYear(enrollments, previousYear!) : [];
    const previousDropouts = canCompare ? filterByYear(dropoutRepeaters, previousYear!) : [];
    const previousClassrooms = canCompare ? filterByYear(classrooms, previousYear!) : [];
    const previousTeachers = canCompare ? filterByYear(teachers, previousYear!) : [];

    const previousTotalEnrollment = previousEnrollments.reduce(
      (sum, entry) => sum + ((entry.male_students || 0) + (entry.female_students || 0)),
      0
    );
    const previousMaleStudents = previousEnrollments.reduce((sum, entry) => sum + (entry.male_students || 0), 0);
    const previousFemaleStudents = previousEnrollments.reduce((sum, entry) => sum + (entry.female_students || 0), 0);
    const previousTotalDropouts = previousDropouts.reduce((sum, entry) => sum + (entry.dropouts || 0), 0);
    const previousTotalRepeaters = previousDropouts.reduce((sum, entry) => sum + (entry.repeaters || 0), 0);
    const previousTotalStudents = previousDropouts.reduce((sum, entry) => sum + (entry.total_students || 0), 0);
    const previousDropoutRate = previousTotalStudents > 0 ? (previousTotalDropouts / previousTotalStudents) * 100 : 0;
    const previousRepeaterRate = previousTotalStudents > 0 ? (previousTotalRepeaters / previousTotalStudents) * 100 : 0;
    const previousTotalTeachers = previousTeachers.length;
    const previousTotalClassrooms = previousClassrooms.length;
    const previousSeatingCapacity = previousClassrooms.reduce((sum, entry) => sum + (entry.seating_capacity || 0), 0);
    const previousCurrentStudents = previousClassrooms.reduce((sum, entry) => sum + (entry.current_students || 0), 0);
    const previousUtilizationRate = previousSeatingCapacity > 0 ? (previousCurrentStudents / previousSeatingCapacity) * 100 : 0;
    const previousStudentsPerTeacher = previousTotalTeachers > 0 ? previousTotalEnrollment / previousTotalTeachers : 0;

    return {
      totalEnrollment,
      maleStudents,
      femaleStudents,
      dropoutRate,
      repeaterRate,
      totalTeachers,
      totalClassrooms,
      seatingCapacity,
      utilizationRate,
      studentsPerTeacher,
      totalEnrollmentChange: canCompare ? totalEnrollment - previousTotalEnrollment : undefined,
      maleStudentsChange: canCompare ? maleStudents - previousMaleStudents : undefined,
      femaleStudentsChange: canCompare ? femaleStudents - previousFemaleStudents : undefined,
      dropoutRateChange: canCompare ? dropoutRate - previousDropoutRate : undefined,
      repeaterRateChange: canCompare ? repeaterRate - previousRepeaterRate : undefined,
      totalTeachersChange: canCompare ? totalTeachers - previousTotalTeachers : undefined,
      totalClassroomsChange: canCompare ? totalClassrooms - previousTotalClassrooms : undefined,
      utilizationRateChange: canCompare ? utilizationRate - previousUtilizationRate : undefined,
      studentsPerTeacherChange: canCompare ? studentsPerTeacher - previousStudentsPerTeacher : undefined,
    };
  }, [filteredEnrollments, filteredDropouts, filteredTeachers, filteredClassrooms, enrollments, dropoutRepeaters, classrooms, teachers, selectedGrade, selectedYear, previousYear]);

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      <KPICard
        title="Total Enrollment"
        value={kpis.totalEnrollment}
        icon={Users}
        change={kpis.totalEnrollmentChange}
        changeLabel="vs prior year"
        color="blue"
      />
      <KPICard
        title="Male Students"
        value={kpis.maleStudents}
        icon={UserCheck}
        change={kpis.maleStudentsChange}
        changeLabel="vs prior year"
        color="green"
      />
      <KPICard
        title="Female Students"
        value={kpis.femaleStudents}
        icon={Users}
        change={kpis.femaleStudentsChange}
        changeLabel="vs prior year"
        color="purple"
      />
      <KPICard
        title="Dropout Rate"
        value={kpis.dropoutRate}
        icon={UserX}
        change={kpis.dropoutRateChange}
        changeLabel="vs prior year"
        suffix="%"
        color="red"
      />
      <KPICard
        title="Repeater Rate"
        value={kpis.repeaterRate}
        icon={Repeat}
        change={kpis.repeaterRateChange}
        changeLabel="vs prior year"
        suffix="%"
        color="orange"
      />
      <KPICard
        title="Total Teachers"
        value={kpis.totalTeachers}
        icon={GraduationCap}
        change={kpis.totalTeachersChange}
        changeLabel="vs prior year"
        color="blue"
      />
      <KPICard
        title="Total Classrooms"
        value={kpis.totalClassrooms}
        icon={School}
        change={kpis.totalClassroomsChange}
        changeLabel="vs prior year"
        color="green"
      />
      <KPICard
        title="Utilization Rate"
        value={kpis.utilizationRate}
        icon={Building}
        change={kpis.utilizationRateChange}
        changeLabel="vs prior year"
        suffix="%"
        color="purple"
      />
      <KPICard
        title="Students / Teacher"
        value={kpis.studentsPerTeacher}
        icon={Armchair}
        change={kpis.studentsPerTeacherChange}
        changeLabel="vs prior year"
        color="amber"
      />
    </div>
  );
}
