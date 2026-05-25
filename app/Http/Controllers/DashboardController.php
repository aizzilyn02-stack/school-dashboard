<?php

namespace App\Http\Controllers;

use App\Models\Building;
use App\Models\Classroom;
use App\Models\DropoutRepeater;
use App\Models\Enrollment;
use App\Models\Room;
use App\Models\SchoolYear;
use App\Models\Teacher;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $schoolYears = SchoolYear::orderBy('year')->get()->map(function (SchoolYear $schoolYear) {
            return [
                'id' => $schoolYear->id,
                'year' => $schoolYear->year,
            ];
        })->toArray();

        $enrollments = Enrollment::with('schoolYear')->get()->map(function (Enrollment $enrollment) {
            return [
                'id' => $enrollment->id,
                'school_year_id' => $enrollment->school_year_id,
                'year' => $enrollment->schoolYear?->year,
                'grade_level' => $enrollment->grade_level,
                'male_students' => $enrollment->male_students,
                'female_students' => $enrollment->female_students,
            ];
        })->toArray();

        $dropoutRepeaters = DropoutRepeater::with('schoolYear')->get()->map(function (DropoutRepeater $dropoutRepeater) {
            return [
                'id' => $dropoutRepeater->id,
                'school_year_id' => $dropoutRepeater->school_year_id,
                'year' => $dropoutRepeater->schoolYear?->year,
                'grade_level' => $dropoutRepeater->grade_level,
                'dropouts' => $dropoutRepeater->dropouts,
                'repeaters' => $dropoutRepeater->repeaters,
                'total_students' => $dropoutRepeater->total_students,
                'dropout_rate' => $dropoutRepeater->dropout_rate,
                'repeater_rate' => $dropoutRepeater->repeater_rate,
            ];
        })->toArray();

        $classrooms = Classroom::with(['schoolYear', 'building'])->get()->map(function (Classroom $classroom) {
            return [
                'id' => $classroom->id,
                'school_year_id' => $classroom->school_year_id,
                'building_id' => $classroom->building_id,
                'year' => $classroom->schoolYear?->year,
                'room_name' => $classroom->room_name,
                'grade_level' => $classroom->grade_level,
                'seating_capacity' => $classroom->seating_capacity,
                'current_students' => $classroom->current_students,
                'building_name' => $classroom->building?->building_name,
            ];
        })->toArray();

        $teachers = Teacher::with('schoolYear')->get()->map(function (Teacher $teacher) {
            return [
                'id' => $teacher->id,
                'school_year_id' => $teacher->school_year_id,
                'year' => $teacher->schoolYear?->year,
                'teacher_name' => $teacher->teacher_name,
                'grade_level' => $teacher->grade_level,
                'subject' => $teacher->subject,
                'students_assigned' => $teacher->students_assigned,
                'is_advisor' => (bool) $teacher->is_advisor,
            ];
        })->toArray();

        $buildings = Building::with('rooms')->get()->map(function (Building $building) {
            return [
                'id' => $building->id,
                'building_name' => $building->building_name,
                'total_rooms' => $building->total_rooms,
                'condition' => $building->condition,
                'rooms' => $building->rooms->map(function (Room $room) {
                    return [
                        'id' => $room->id,
                        'room_number' => $room->room_number,
                        'room_type' => $room->room_type,
                        'area_sqm' => $room->area_sqm,
                        'condition' => $room->condition,
                        'usage_category' => $room->usage_category,
                    ];
                })->toArray(),
            ];
        })->toArray();

        $rooms = Room::with('building')->get()->map(function (Room $room) {
            return [
                'id' => $room->id,
                'building_name' => $room->building?->building_name,
                'room_number' => $room->room_number,
                'room_type' => $room->room_type,
                'length_m' => $room->length_m,
                'width_m' => $room->width_m,
                'area_sqm' => $room->area_sqm,
                'condition' => $room->condition,
                'usage_category' => $room->usage_category,
            ];
        })->toArray();

        // Build dynamic recommendations based on current data
        $recommendations = [];

        $addRec = function ($id, $title, $message, $score, $severity = 'info', $meta = []) use (&$recommendations) {
            $recommendations[] = [
                'id' => $id,
                'title' => $title,
                'message' => $message,
                'score' => $score,
                'severity' => $severity,
                'meta' => $meta,
            ];
        };

        // Aggregate helpers
        $enrollmentsByYear = [];
        foreach ($enrollments as $e) {
            $y = $e['year'] ?? 'unknown';
            $enrollmentsByYear[$y] = ($enrollmentsByYear[$y] ?? 0) + (($e['male_students'] ?? 0) + ($e['female_students'] ?? 0));
        }

        $totalStudents = array_sum($enrollmentsByYear);
        $totalDropouts = array_sum(array_map(fn($d) => $d['dropouts'] ?? 0, $dropoutRepeaters));
        $totalRepeaters = array_sum(array_map(fn($d) => $d['repeaters'] ?? 0, $dropoutRepeaters));
        $totalStudentsInDropoutSet = array_sum(array_map(fn($d) => $d['total_students'] ?? 0, $dropoutRepeaters));

        // 1. High overall dropout rate
        $overallDropoutRate = $totalStudentsInDropoutSet > 0 ? ($totalDropouts / $totalStudentsInDropoutSet) * 100 : 0;
        if ($overallDropoutRate > 5) {
            $addRec('dropout-high', 'High overall dropout rate', "Overall dropout rate is about " . round($overallDropoutRate,1) . "% — consider retention programs.", (int)($overallDropoutRate * 10), 'high');
        } else {
            $addRec('dropout-ok', 'Dropout rate within acceptable range', "Overall dropout rate is " . round($overallDropoutRate,1) . "%.", 10, 'low');
        }

        // 2. High repeater rate
        $overallRepeaterRate = $totalStudentsInDropoutSet > 0 ? ($totalRepeaters / $totalStudentsInDropoutSet) * 100 : 0;
        if ($overallRepeaterRate > 5) {
            $addRec('repeater-high', 'Elevated repeater rate', "Repeater rate is " . round($overallRepeaterRate,1) . "% — investigate curriculum gaps.", (int)($overallRepeaterRate * 8), 'high');
        }

        // 3. Enrollment year-over-year changes (compare last two years if available)
        $years = array_keys($enrollmentsByYear);
        rsort($years);
        if (count($years) >= 2) {
            $y1 = $years[0];
            $y2 = $years[1];
            $v1 = $enrollmentsByYear[$y1] ?? 0;
            $v2 = $enrollmentsByYear[$y2] ?? 0;
            if ($v2 > 0) {
                $pct = (($v1 - $v2) / max(1, $v2)) * 100;
                if ($pct < -3) {
                    $addRec('enrollment-decline', 'Enrollment declining', "Enrollment fell by " . round(abs($pct),1) . "% compared to previous year — review outreach and retention.", (int)(abs($pct) * 5), 'high');
                } elseif ($pct > 3) {
                    $addRec('enrollment-growth', 'Enrollment growth', "Enrollment grew by " . round($pct,1) . "% — plan resources for growth.", (int)($pct * 3), 'medium');
                }
            }
        }

        // 4. Classroom overcrowding and underutilization
        $overcrowded = 0; $underutilized = 0; $overcrowdedExamples = [];
        foreach ($classrooms as $c) {
            $cap = $c['seating_capacity'] ?? 0;
            $cur = $c['current_students'] ?? 0;
            if ($cap > 0) {
                $occ = ($cur / $cap) * 100;
                if ($occ > 110) { $overcrowded++; $overcrowdedExamples[] = $c; }
                if ($occ < 50) { $underutilized++; }
            }
        }
        if ($overcrowded > 0) {
            $addRec('overcrowded-classrooms', 'Classroom overcrowding', "$overcrowded classrooms exceed capacity — consider adding sections or reallocating students.", 80, 'high', ['examples' => array_slice($overcrowdedExamples,0,3)]);
        }
        if ($underutilized > 0) {
            $addRec('underutilized-classrooms', 'Underutilized classrooms', "$underutilized classrooms under 50% utilization — consider consolidation.", 40, 'medium');
        }

        // 5. Students-per-teacher anomalies
        $studentsPerTeacher = count($teachers) > 0 ? ($totalStudents / max(1, count($teachers))) : 0;
        if ($studentsPerTeacher > 35) {
            $addRec('high-students-per-teacher', 'High student-to-teacher ratio', "Average students per teacher is " . round($studentsPerTeacher,1) . ", which is high — consider hiring or redistribution.", (int)($studentsPerTeacher * 2), 'high');
        } elseif ($studentsPerTeacher < 12) {
            $addRec('low-students-per-teacher', 'Low student-to-teacher ratio', "Average students per teacher is " . round($studentsPerTeacher,1) . " — resources may be underused.", 20, 'low');
        }

        // 6. Buildings & rooms condition
        $poorBuildings = array_filter($buildings, fn($b) => in_array(strtolower($b['condition'] ?? ''), ['poor','bad','needs repair']));
        if (count($poorBuildings) > 0) {
            $addRec('building-condition', 'Buildings require maintenance', count($poorBuildings) . " building(s) flagged as poor condition — schedule inspections.", 70, 'high');
        }

        // 7. Room area per student concerns
        $smallAreaIssues = 0;
        foreach ($rooms as $r) {
            if (($r['area_sqm'] ?? 0) > 0) {
                // estimate students in the room by searching classrooms with same room number
                $students = 0;
                foreach ($classrooms as $c) {
                    if (!empty($c['room_name']) && $r['room_number'] && str_contains($c['room_name'], (string)$r['room_number'])) {
                        $students += $c['current_students'] ?? 0;
                    }
                }
                if ($students > 0) {
                    $sqmPerStudent = $r['area_sqm'] / max(1, $students);
                    if ($sqmPerStudent < 1.5) { $smallAreaIssues++; }
                }
            } else {
                // missing area data
                $smallAreaIssues += 0;
            }
        }
        if ($smallAreaIssues > 0) {
            $addRec('small-area', 'Insufficient area per student', "$smallAreaIssues rooms have less than 1.5 sqm per student — safety concern.", 60, 'high');
        }

        // 8. Gender imbalance per grade
        $byGrade = [];
        foreach ($enrollments as $e) {
            $g = $e['grade_level'] ?? 'Unknown';
            $byGrade[$g]['male'] = ($byGrade[$g]['male'] ?? 0) + ($e['male_students'] ?? 0);
            $byGrade[$g]['female'] = ($byGrade[$g]['female'] ?? 0) + ($e['female_students'] ?? 0);
        }
        foreach ($byGrade as $grade => $vals) {
            $m = $vals['male'] ?? 0; $f = $vals['female'] ?? 0; $total = $m + $f;
            if ($total > 0) {
                $ratio = $m / $total;
                if ($ratio > 0.65 || $ratio < 0.35) {
                    $addRec('gender-imbalance-' . md5($grade), 'Gender imbalance in ' . $grade, "Gender ratio in $grade is " . round($ratio * 100,1) . "% male — investigate enrollment patterns.", 45, 'medium', ['grade' => $grade]);
                }
            }
        }

        // 9. Spike in repeaters per grade/year
        foreach ($dropoutRepeaters as $d) {
            if (($d['repeater_rate'] ?? 0) > 10) {
                $addRec('repeater-grade-' . $d['id'], 'High repeater rate', "Repeater rate for " . ($d['grade_level'] ?? 'Unknown') . " in " . ($d['year'] ?? '') . " is " . round($d['repeater_rate'],1) . "%.", (int)($d['repeater_rate'] * 5), 'high');
            }
        }

        // 10. Teachers without assignments or advisors missing
        $teachersWithoutStudents = array_filter($teachers, fn($t) => empty($t['students_assigned']) || ($t['students_assigned'] == 0));
        if (count($teachersWithoutStudents) > 0) {
            $addRec('teachers-unassigned', 'Teachers with no students assigned', count($teachersWithoutStudents) . " teacher(s) appear to have no students assigned — verify assignments.", 30, 'medium');
        }

        // 11. Data quality: classrooms missing building or seating capacity
        $badClassrooms = array_filter($classrooms, fn($c) => empty($c['building_name']) || empty($c['seating_capacity']));
        if (count($badClassrooms) > 0) {
            $addRec('data-quality-classrooms', 'Classroom data incomplete', count($badClassrooms) . " classroom records missing building or seating capacity — clean data.", 25, 'medium');
        }

        // 12. Facility usage diagnostics
        $usageCounts = [];
        foreach ($rooms as $room) {
            $category = trim(strtolower($room['usage_category'] ?? 'other')) ?: 'other';
            $usageCounts[$category] = ($usageCounts[$category] ?? 0) + 1;
        }
        $unusedCount = ($usageCounts['unused'] ?? 0) + ($usageCounts['vacant'] ?? 0) + ($usageCounts['other'] ?? 0);
        $roomCount = count($rooms);
        if ($roomCount > 0 && $unusedCount / $roomCount > 0.35) {
            $addRec('low-facility-usage', 'Low facility usage detected', 'More than 35% of rooms are marked as underutilized or unused — optimize facility assignments.', 45, 'medium');
        }

        // 13. Many small classes (low students per classroom)
        $smallClasses = array_filter($classrooms, fn($c) => ($c['current_students'] ?? 0) < 8);
        if (count($smallClasses) > 5) {
            $addRec('many-small-classes', 'Many small classes', count($smallClasses) . " classes have fewer than 8 students — consider consolidation.", 30, 'low');
        }

        // 14. High variance in grade dropout rates
        $dropoutByGrade = [];
        foreach ($dropoutRepeaters as $d) {
            $g = $d['grade_level'] ?? 'Unknown';
            $dropoutByGrade[$g][] = $d['dropout_rate'] ?? 0;
        }
        foreach ($dropoutByGrade as $g => $vals) {
            if (count($vals) >= 2) {
                $max = max($vals); $min = min($vals);
                if (($max - $min) > 5) {
                    $addRec('dropout-variance-' . md5($g), 'Dropout variance in ' . $g, "Dropout rates vary by more than 5% across years for $g — target interventions.", 35, 'medium');
                }
            }
        }

        // 15. Recommend scheduled resource review when utilization crosses thresholds
        $utilizationRate = 0;
        $seatingCapacity = array_sum(array_map(fn($c) => $c['seating_capacity'] ?? 0, $classrooms));
        $occupiedSeats = array_sum(array_map(fn($c) => $c['current_students'] ?? 0, $classrooms));
        if ($seatingCapacity > 0) { $utilizationRate = ($occupiedSeats / $seatingCapacity) * 100; }
        if ($utilizationRate > 90) {
            $addRec('utilization-high', 'High facility utilization', "Overall seating utilization is " . round($utilizationRate,1) . "% — plan capacity increases.", 65, 'high');
        } elseif ($utilizationRate < 50) {
            $addRec('utilization-low', 'Low facility utilization', "Overall seating utilization is " . round($utilizationRate,1) . "% — consider resource consolidation.", 30, 'low');
        }

        // 16. Predictive capacity outlook based on recent enrollment growth
        if (count($years) >= 2 && $seatingCapacity > 0) {
            $currentEnrollment = $enrollmentsByYear[$years[0]] ?? 0;
            $previousEnrollment = $enrollmentsByYear[$years[1]] ?? 0;
            if ($previousEnrollment > 0) {
                $growthRate = ($currentEnrollment - $previousEnrollment) / $previousEnrollment;
                if ($growthRate > 0.05) {
                    $projectedUtilization = $utilizationRate * (1 + $growthRate);
                    if ($projectedUtilization > 95) {
                        $addRec('capacity-forecast', 'Projected capacity pressure', 'Enrollment growth suggests utilization may exceed 95% next cycle — plan additional capacity.', 55, 'high');
                    }
                }
            }
        }

        // Ensure we have at least 15 recommendations (fill low-priority placeholders if needed)
        $i = 1;
        while (count($recommendations) < 15) {
            $addRec('placeholder-' . $i, 'Recommendation ' . (count($recommendations) + 1), 'No urgent action detected for this slot. Keep monitoring.', 5, 'low');
            $i++;
        }

        // Sort recommendations by score desc
        usort($recommendations, fn($a, $b) => $b['score'] <=> $a['score']);

        return Inertia::render('dashboard', [
            'schoolYears' => $schoolYears,
            'enrollments' => $enrollments,
            'dropoutRepeaters' => $dropoutRepeaters,
            'classrooms' => $classrooms,
            'teachers' => $teachers,
            'buildings' => $buildings,
            'rooms' => $rooms,
            'recommendations' => $recommendations,
        ]);
    }
}
