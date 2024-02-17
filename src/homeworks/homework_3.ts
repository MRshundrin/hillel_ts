// Ви маєте JS код, який необхідно розширити анотацією примітивів,
// масивів, об'єктів (за необхідності),
// подумати над використанням перерахувань,
// а також реалізувати описані у вигляді коментарів властивості та методи.
// Крім цього є завдання з *, яке не є обов'язковим, але може вас зацікавити.

type Lecturer = {
    name: string,
    surname: string,
    position: string,
    company: string,
    experience: number,
    courses: string[],
    contacts: string
}
class School {
    // implement 'add area', 'remove area', 'add lecturer', and 'remove lecturer' methods

    _areas: string[] = [];
    _lecturers: Lecturer[] = []; // Name, surname, position, company, experience, courses, contacts

    get areas(): string[] {
        return this._areas;
    }

    get lecturers(): Lecturer[] {
        return this._lecturers;
    }

    addArea(area: string): void {
        this._areas.push(area);
    }

    removeArea(area: string): void {
        const index: number = this._areas.indexOf(area);
        if (index !== -1) {
            this._areas.splice(index, 1);
        }
    }

    addLecturer(lecturer: Lecturer): void {
        this._lecturers.push(lecturer);
    }

    removeLecturer(lecturer: Lecturer): void {
        const index: number = this._lecturers.indexOf(lecturer);
        if (index !== -1) {
            this._lecturers.splice(index, 1);
        }
    }
}

class Area {
    // implement getters for fields and 'add/remove level' methods
    _levels: string[] = [];
    _name: string;

    constructor(name: string) {
        this._name = name;
    }

    addLevel(level: string): void {
        this._levels.push(level);
    }

    removeLevel(level: string): void {
        const index: number = this._levels.indexOf(level);
        if (index !== -1) {
            this._levels.splice(index, 1);
        }
    }

    get levels(): string[] {
        return this._levels;
    }

    get name(): string {
        return this._name;
    }
}

class Level {
    // implement getters for fields and 'add/remove group' methods

    _groups: string[] = [];
    _name: string;
    _description: string;

    constructor(name: string, description: string) {
        this._name = name;
        this._description = description;
    }

    addGroup(group: string): void {
        this._groups.push(group);
    }

    removeGroup(group: string): void {
        const index: number = this._groups.indexOf(group);
        if (index !== -1) {
            this._groups.splice(index, 1);
        }
    }

    get groups(): string[] {
        return this._groups;
    }

    get name(): string {
        return this._name;
    }

    get description(): string {
        return this._description;
    }
}

type StudentInfo ={
    firstName: string,
    lastName: string,
    birthYear: number,
    grades: string[],
    visits: string[],
    getPerformanceRating: () => number;
}
class Group {
    // implement getters for fields and 'add/remove student' and 'set status' methods
    _area: string;
    _status: string;
    _students: StudentInfo[] = []; // Modify the array so that it has a valid toSorted method*
    _directionName: string;
    _levelName: string;

    constructor(directionName: string, levelName: string, area: string, status: string) {
        this._directionName = directionName;
        this._levelName = levelName;
        this._area = area;
        this._status = status;
    }

    addStudent(student: StudentInfo): void {
        this._students.push(student);
    }

    removeStudent(student: StudentInfo): void {
        const index:number = this._students.indexOf(student);
        if (index !== -1) {
            this._students.splice(index, 1);
        }
    }

    setStatus(status: string): void {
        this._status = status;
    }

    get area(): string {
        return this._area;
    }

    get status(): string {
        return this._status;
    }

    get students(): StudentInfo[] {
        return this._students;
    }

    get directionName(): string {
        return this._directionName;
    }
    get levelName(): string {
        return this._levelName;
    }

    showPerformance(): StudentInfo[] {
        const sortedStudents = this._students.sort((a: StudentInfo, b: StudentInfo) => b.getPerformanceRating() - a.getPerformanceRating());
        return sortedStudents;
    }
}

class Student {
    // implement 'set grade' and 'set visit' methods

    _firstName: string;
    _lastName: string;
    _birthYear: number;
    _grades: { [workName: string]: number } = {}; // workName: mark
    _visits: { [lesson: string]: boolean } = {}; // lesson: present

    constructor(firstName: string, lastName: string, birthYear: number) {
        this._firstName = firstName;
        this._lastName = lastName;
        this._birthYear = birthYear;
    }

    get fullName(): string {
        return `${this._lastName} ${this._firstName}`;
    }

    set fullName(value: string) {
        [this._lastName, this._firstName] = value.split(' ');
    }

    get age(): number {
        return new Date().getFullYear() - this._birthYear;
    }

    setGrade(workName: string, mark: number): void {
        this._grades[workName] = mark;
    }

    setVisit(lesson: string, present: boolean): void {
        this._visits[lesson] = present;
    }

    getPerformanceRating(): number {
        const gradeValues: number[] = Object.values(this._grades);

        if (!gradeValues.length) return 0;

        const averageGrade: number = gradeValues.reduce((sum: number, grade: number) => sum + grade, 0) / gradeValues.length;
        const attendancePercentage: number = (Object.values(this._visits).filter(present => present).length / Object.keys(this._visits).length) * 100;

        return (averageGrade + attendancePercentage) / 2;
    }
}