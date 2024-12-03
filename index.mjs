import { Tree, prettyPrint } from "./node-tree.mjs";

const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
// const array = [];

let testTree = new Tree(array);
console.log('testTree', testTree)
// console.log('testArray', testTree.array)
prettyPrint(testTree.root)

testTree.insert(16)
testTree.deleteItem(7)

prettyPrint(testTree.root)
