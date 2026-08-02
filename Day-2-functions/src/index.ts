// function greet(name: string, age: number){
//     console.log(`Hello my name is ${name} and I'm ${age} years old`);
    
// }

// greet("Brian", 20);

// function add(a:number, b:number):number{
//     return a+b;
// }

// const result= add(10, 20);
// console.log(`The sum of 10 and 20 results in ${result}`);

// const name = (firstName:string, middleName:string):string =>{
//     return `My name is ${firstName} ${middleName}`;
    
// }
// const fullName=name("Baye", "Brian")
// console.log(fullName);

// function Salut(name:string, country?:string){
//     console.log(`Hello ${name}`);
//     if (country){
//         console.log(`from ${country}`);  
//     }
//     // console.log(`from ${country}`);  
    
// }

// Salut("Brian")
// Salut("Brian", "UK")


// console.log("=====Full Name and Age of a person=====");
// const fullName=(name:string, age:number)=>{
//     console.log(`my name is ${name} and im ${age} years old`);
// }
// fullName("Baye Brian", 20);


// console.log("=====SQUARE OF A NUMBER=====");
// const Square=(value:number):number=>{
//     return value*value;
// }

// console.log(Square(5));


// console.log("=====Succses Verification=====");
// const Verify=(input:number)=>{
//     if(input>=50){
//         console.log("Student succesfully passed");
//     }else{
//         console.log("Student Failed");
//     }
// }

// Verify(70);
// Verify(40);    
// // OR
// console.log("=====Success or Score Verification=====");
// const Check=(score:number):boolean=>{

//  if(score <= 49) {
//     return false;
//  }  
//  else{
//     return true;
//  }
// };
//  const Passed= Check(50)
//  console.log(Passed?"Student Passed":"Student Failed");
 

// console.log("=====Address Verification=====");
// const address=(name:string, phone?:number): void=>{
//     console.log(`Name: ${name}`);
//     if(phone){
//         console.log(`Phone: ${phone}`);   
//     }else{
//         console.log("phone: Unprovided");
//     }
    
// }
// address("Brian");
// address("Brian", 675717944);

console.log("=====Student Grade Calculator======");
 type Students={
    name:string;
    course: string;
    scores: number[];
    average: number;
    grade: string;
 }
const students: Students[]=[
];

const calculateAverage=(scores:number[])=>{ 
    const total= scores.reduce((num, score) =>{
        return num+score;
    },0)
    const Average= total/scores.length;
    return Average;
}
const getGrade=(Average:number)=>{
    if (Average>=80){
        return "A";   
    }else if (Average>=70){
        return "B";   
    }
    else if (Average>=60){
        return "C";   
    }
    else if (Average>=50){
        return "D";   
    }
    else{
        return "F";   
    }
}
const displayStudent=()=>{
 students.forEach(student =>{
    console.log(student.name, student.course, student.scores, student.average, student.grade);
 })   
}
const scores=[30, 60, 90, 60]
const average= calculateAverage(scores);

const grades= getGrade(average)

const addStudent=()=>{
    
    const nestaStud={
        name: "Nesta",
        course: "Management",
        scores: scores,
        average: average,
        grade: grades
    }
    const brianStud=  {
        name: "Brian",
        course: "Software En",
        scores: scores,
        average: average,
        grade: grades
    }
    
   students.push(brianStud);
   students.push(nestaStud);
}
addStudent()
displayStudent()