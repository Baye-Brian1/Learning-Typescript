"use strict";
// class Student{
//   name: string;
//   age: number;
Object.defineProperty(exports, "__esModule", { value: true });
//   constructor(name:string, age:number){
//     this.name= name;
//     this.age= age;
//   }
//   display(){
//     console.log(`${this.name} is ${this.age} years old`);
//   }
// }
// const student1 = new Student("Brian", 19)
// student1.display();
// class Student{
//   constructor(
//     public name: string,
//     public age: number
//   ){}
//   greet(){
//     console.log(`Hello ${this.name}`);
//   }
// }
// const student1=new Student("Brian", 20)
// student1.greet();
// class Student{
//   private name;
//   constructor(name: string){
//     this.name= name;
//   }
//   showName(){
//     console.log(this.name);
//   }
// }
// const Stud= new Student("Nesta")
// Stud.showName()
// class Person{
//   protected name: string;
//   constructor(name:string){
//     this.name= name;
//   }
// }
// class Students extends Person{
//   display(){
//      console.log(this.name);
//   }
// }
// const s = new Students("Joebass")
// s.display()
class Student {
    id;
    name;
    course;
    scores;
    average = 0;
    constructor(id, name, course, scores) {
        this.id = id;
        this.name = name;
        this.course = course;
        this.scores = scores;
        this.calculateAverage();
    }
    calculateAverage() {
        if (this.scores.length === 0) {
            this.average = 0;
            return;
        }
        const total = this.scores.reduce((sum, score) => sum + score, 0);
        this.average = total / this.scores.length;
    }
    displayStudent() {
        console.log(`ID: ${this.id} | Name: Mr/Mrs. ${this.name} | Course: ${this.course}
      | Scores ${this.scores} | Average: ${this.average}`);
    }
}
class StudentManager {
    students = [];
    addStudent(student) {
        this.students.push(student);
        console.log(`Added: ${student.name}`);
    }
    removeStudent(id) {
        const before = this.students.length;
        this.students = this.students.filter(student => student.id !== id);
        if (this.students.length < before) {
            console.log(`Removed student with ID: ${id}`);
        }
        else {
            console.log(`Student with ID: ${id} not found`);
        }
    }
    displayStudents() {
        console.log(`Students`);
        if (this.students.length === 0) {
            console.log("No students");
            return;
        }
        this.students.forEach(student => student.displayStudent());
    }
}
//# sourceMappingURL=index.js.map