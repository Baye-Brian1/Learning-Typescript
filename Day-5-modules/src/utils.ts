import { Student } from "./student";

export function displayStudent(student: Student){
        console.log(`ID:${student.id} Name: ${student.name} | Course: ${student.course}`);
}