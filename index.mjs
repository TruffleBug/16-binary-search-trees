import { Tree, prettyPrint } from "./node-tree.mjs";

const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
// const array = [7];

let testTree = new Tree(array);
testTree.insert(6347)
testTree.insert(6349)
testTree.insert(6546)

prettyPrint(testTree.root)

testTree.rebalance()
prettyPrint(testTree.root)
