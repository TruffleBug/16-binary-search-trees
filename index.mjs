import { Tree, prettyPrint } from "./node-tree.mjs";

const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
// const array = [7];

let testTree = new Tree(array);
// console.log('testTree', testTree)
// console.log('testArray', testTree.array)
prettyPrint(testTree.root)

console.log(testTree.height(testTree.root))

// function multiplyBy2(x) {
//     return x.value = x.value * 2
// }

// function printValue(x) {
//     console.log(x.value)
// }

// testTree.postOrder(printValue)

