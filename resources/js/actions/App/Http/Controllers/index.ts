import DashboardController from './DashboardController'
import SchoolYearController from './SchoolYearController'
import EnrollmentController from './EnrollmentController'
import DropoutRepeaterController from './DropoutRepeaterController'
import ClassroomController from './ClassroomController'
import TeacherController from './TeacherController'
import BuildingController from './BuildingController'
import RoomController from './RoomController'
import Settings from './Settings'
const Controllers = {
    DashboardController: Object.assign(DashboardController, DashboardController),
SchoolYearController: Object.assign(SchoolYearController, SchoolYearController),
EnrollmentController: Object.assign(EnrollmentController, EnrollmentController),
DropoutRepeaterController: Object.assign(DropoutRepeaterController, DropoutRepeaterController),
ClassroomController: Object.assign(ClassroomController, ClassroomController),
TeacherController: Object.assign(TeacherController, TeacherController),
BuildingController: Object.assign(BuildingController, BuildingController),
RoomController: Object.assign(RoomController, RoomController),
Settings: Object.assign(Settings, Settings),
}

export default Controllers