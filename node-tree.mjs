class Node {
    constructor(value) {
        this.value = value,
        this.leftChild = null,
        this.rightChild = null
    }
}

class Tree {
    constructor(array) {
        // this.array = this.arrayClean(array)
        this.root = this.buildTree(this.arrayClean(array))
    }

    // sorts into balanced binary tree & returns level-0 root node
    buildTree(array, startIndex = 0, endIndex = array.length - 1) {
        // console.log(array)
        if (startIndex > endIndex) return null;
        
        const midIndex = Math.floor((startIndex + endIndex) / 2);
        const root = new Node(array[midIndex]);
        
        root.leftChild = this.buildTree(array, startIndex, midIndex - 1);
        root.rightChild = this.buildTree(array, midIndex + 1, endIndex);
        
        return root;
    }

    // removes duplicates & sorts array
    arrayClean(array) {
        return Array.from(new Set(array)).sort((a, b) => a - b);
    }

    // inserts value
    insert(value, root = this.root) {
        if (!root) return this.root = new Node(value);

        if (value == root.value) return console.log(`${value} already exists in tree.`);
            
        if(value < root.value) {
            if (!root.leftChild) {
                root.leftChild = new Node(value);
            } else {
                return this.insert(value, root.leftChild);
            };
            return;
        } else if (value > root.value) {
            if (!root.rightChild) {
                root.rightChild = new Node(value);
            } else {
                return this.insert(value, root.rightChild);
            };
            return;
        };
    };

    // deletes value
    delete(value) {
        const deleteNode = function(node, value){
            // empty tree
            if(node === null) {
                return null;
            }
            if (value == node.value) {
                // no children
                if (node.leftChild == null && node.rightChild == null) {
                    return null;
                }
                // 1 child -- no left child
                if (node.leftChild == null) {
                    return node.rightChild;
                }
                // 1 child -- no right child
                if (node.rightChild == null) {
                    return node.leftChild;
                }
                // 2 children
                let tempNode = node.rightChild;
                while (tempNode.leftChild != null) {
                    tempNode = tempNode.leftChild;
                };
                node.value = tempNode.value;
                node.rightChild = deleteNode(node.rightChild, tempNode.value);
                return node;
            } else if (value < node.value) {
                node.leftChild = deleteNode(node.leftChild, value);
                return node;
            }  else {
                node.rightChild = deleteNode(node.rightChild, value);
                return node;
            };
        };
        this.root = deleteNode(this.root, value);
    }

    // finds node with given value
    find(value, current = this.root) {
        if (!current) return 'Value does not exist.';

        if (current.value === value) return current;
        else if (value < current.value) {
            return this.find(value, current.leftChild);
        } else if (value > current.value) {
            return this.find(value, current.rightChild);
        };
    }

    // // finds parent of value
    // findParent(value, current = this.root) {
    //     if (!current) return null;

    //     if (current.leftChild && current.leftChild.value === value) return current;
    //     else if (current.rightChild && current.rightChild.value === value) return current;
    //     else {
    //         if (value < current.value) {
    //             return this.findParent(value, current.leftChild);
    //         } else if (value > current.value) {
    //             return this.findParent(value, current.rightChild);
    //         };
    //     };
    // }

    // calls callback on each node using breadth-first traversal method
    levelOrder(callback, current = this.root) {
        if(!callback) throw new Error('Callback function required.');
        if(!current) return;
        
        let queue = [current];
        while (queue.length > 0) {
            const node = queue.shift();
            callback(node)
            // node.value = callback(node.value);

            if(node.leftChild) queue.push(node.leftChild);
            if(node.rightChild) queue.push(node.rightChild);
        };
    }

    // calls callback on each node using depth-first traversal method given
    // (left, current, right)
    inOrder(callback, current = this.root) {
        if(!callback) throw new Error('Callback function required.');
        if(!current) return;

        this.inOrder(callback, current.leftChild);
        callback(current);
        this.inOrder(callback, current.rightChild);      
    }

    // calls callback on each node using depth-first traversal method given
    // (current, left, right)
    preOrder(callback, current = this.root) {
        if(!callback) throw new Error('Callback function required.');
        if(!current) return;

        callback(current);
        this.preOrder(callback, current.leftChild);
        this.preOrder(callback, current.rightChild);
    }

    // calls callback on each node using depth-first traversal method given
    // (left, right, current)
    postOrder(callback, current = this.root) {
        if(!callback) throw new Error('Callback function required.');
        if(!current) return;

        this.postOrder(callback, current.leftChild);
        this.postOrder(callback, current.rightChild);
        callback(current);
    }

    // returns number of edges in longest path from given node to a leaf
    height(node) {
        if(!node) return 0;

        let leftHeight = this.height(node.leftChild);
        let rightHeight = this.height(node.rightChild);
        return Math.max(leftHeight, rightHeight) + 1;
    }
}



// prints tree visual (given by TOD)
function prettyPrint (node, prefix = "", isLeft = true) {
    if (node === null) return;
    if (node.rightChild !== null) {
        prettyPrint(node.rightChild, `${prefix}${isLeft ? "│   " : "    "}`, false);
    };
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
    if (node.leftChild !== null) {
        prettyPrint(node.leftChild, `${prefix}${isLeft ? "    " : "│   "}`, true);
    };
};

export {Tree, prettyPrint}


