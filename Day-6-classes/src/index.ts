// class Student{
//   name: string;
//   age: number;

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