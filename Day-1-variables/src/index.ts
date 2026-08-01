//I. Variables and Types

//A) Types
// 1-string
// 2-number
// 3-boolean: either true or false
// 4-null
// 5-unidentified
// 6-symbol: here it goes for unique variables
// 7-any: it is rarely used because it cancels the verifications of SVGUnitTypes ETC.

//B) Variables
// let fullName: string = "Baye Brian";
// let age: number = 20;
// let Occupation: string = "Student";
// let School: string = "COLTECH";
// let Department: string = "Computer Engineering";
// let Level: number = 400;
// let isFrontEndDeveloper: boolean = true;
// let FavouriteLanguage: string = "English Language";

// console.log(`Name: ${fullName}`);
// console.log(`Age: ${age}`);
// console.log(`School: ${School}`);
// console.log(`Occupation: ${Occupation}`);
// console.log(`Department: ${Department}`);
// console.log(`Level: ${Level}`);
// console.log(`Language: ${FavouriteLanguage}`);
// console.log(`Frontend Developer: ${isFrontEndDeveloper}`);

// let productName = "Keyboard";
// const Price = 50;
// let Quantity = 3;
// let inStock = 10;
// let Category: string = "Tech";

// const totalPrice = Price * Quantity;
// const QuantityAvailable = inStock - Quantity;

// console.log(`Product Name: ${productName}`);
// console.log(`Price: ${Price}`);
// console.log(`Ordered Qty: ${Quantity}`);
// console.log(`Initial Available Qty: ${inStock}`);
// console.log(`Total: ${totalPrice}`);
// console.log(`Final Available Qty: ${QuantityAvailable}`);

// //II. Arrays and Objects

// // A) Arrays
// let fruits: string[] = ["Apple", "Banana", "Mango", "Grapes"];
// console.log(fruits[3]);
// fruits.push("Orange");
// console.log(fruits);

// let scores: number[] = [20, 40, 60, 80, 100];
// console.log(scores);

// let completed: boolean[] = [true, false, true, false];
// console.log(completed);
// console.log(completed[0]);

// let Sentence: (string | number)[] = [
//   "Baye Brian",
//   20,
//   "Frontend Developer",
//   "currently Learning",
//   "Typescript",
// ];
// console.log(Sentence);

// // B) Objects
// // objects in js or inference types
// let student = {
//   name: "Baye Brian",
//   age: 20,
//   School: "COLTECH",
//   Department: "Software Engineering",
// };
// console.log(student);
// console.log(student.name);
// console.log(student.age);

// student.age = 21;
// console.log(student.age);

// // objects with types
// let students: {
//   name: string;
//   age: number;
//   School: string;
//   Department: String;
// } = {
//   name: "Baye Brian",
//   age: 20,
//   School: "COLTECH",
//   Department: "Software Engineering",
// };

// console.log(students);
// console.log(student.Department);

// student.School="University of Bamenda"
// console.log(student.School);

// // Arrays of objects

// let studentInfos =[
//     {
//         name: "Joseph",
//         age: 18,
//     },
//     {
//         name:"James",
//         age: 21,
//     },
//     {
//         name:"paul",
//         age: 23,
//     }
// ]

// studentInfos.forEach((studentInfo)=>{
//     console.log(studentInfo.name);
//     console.log(studentInfo.age);
// })

const Students=[
    {
        name:"Nesta",
        age: 21,
        department: "Management",
        level: 400,
    },
    {
        name:"Renzo",
        age: 25,
        department: "Custom",
        level: 400,
    },
    {
        name:"Dio",
        age: 23,
        department: "Agriculture",
        level: 400,
    },
    {
        name:"Justin",
        age: 20,
        department: "Arts",
        level: 400,
    },
    {
        name:"Rodrig",
        age: 20,
        department: "Networking",
        level: 400,
    },
]

Students.forEach(Student => {
    console.log(`Name: ${Student.name}`);
    console.log(`Age: ${Student.age}`);
    console.log(`Department: ${Student.department}`);
    console.log(`Level: ${Student.level}`);
});


Students.push({
        name:"Fru",
        age: 10,
        department: "ICT",
        level: 400,
    })


    const RemoveStudent= Students.filter(Student =>  Student.name !=="Nesta");
    console.log(RemoveStudent);
    

Students.forEach(Student => {
    console.log(`Name: ${Student.name}`);
    console.log(`Age: ${Student.age}`);
    console.log(`Department: ${Student.department}`);
    console.log(`Level: ${Student.level}`);
});

type Movie={
    name:string;
    year:number;
    watched:boolean;
};


const movies: Movie[]=[
    {
        name:"Avenger",
        year: 2020,
        watched: true,
    },
    {
        name:"Triplex",
        year: 2025,
        watched: false,
    },
    {
        name:"Mission Impossible",
        year: 2027,
        watched: true,
    },
]
console.log("=========ALL MOVIES=========");
movies.forEach((movie)=>{
    console.log(`${movie.name}.${movie.year}| Watched: ${movie.watched}`);
})
const SpiderMan={
    name:"SpiderMan",
    year: 2026,
    watched: true
}
movies.push(SpiderMan)
console.log("======Movie Successfully Added========");


movies.forEach(movie=>{
    console.log(`${movie.name}.${movie.year} | ${movie.watched}`);
})
console.log("=======Updated Movies========");

const RemoveMovie= movies.filter(movie => movie.name!=="Avenger")
console.log(RemoveMovie);
console.log("========Movie Successfully Removed========");

const WatchMovie = movies.filter(movie => movie.watched!== false)
console.log(WatchMovie);
console.log("========Movies Watched========");