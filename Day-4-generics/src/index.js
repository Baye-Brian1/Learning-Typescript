"use strict";
// Generics
Object.defineProperty(exports, "__esModule", { value: true });
const numbers = [1, 2, 3, 4];
const names = [
    "brain",
    "nesta",
    "kim"
];
const response = {
    success: true,
    data: {
        name: "joebass",
        age: 20
    }
};
function identity(value) {
    return value;
}
console.log(identity("brian"));
console.log(identity(19));
console.log(identity(true));
const text = {
    item: "Hello"
};
console.log(text.item);
const Number = {
    item: 100,
};
console.log(Number.item);
//# sourceMappingURL=index.js.map