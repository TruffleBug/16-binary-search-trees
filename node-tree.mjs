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
    deleteItem(value, root = this.root) {
        // empty tree
        if (!root) return console.log('Empty tree -- nothing to delete.');

        // traverse down tree
        if (value < root.value) {
            return this.deleteItem(value, root.leftChild)
        } else if (value > root.value) {
            return this.deleteItem(value, root.rightChild)
        }

        // case 1: delete leaf 
        if(value == root.value && !root.leftChild && !root.rightChild) {
            console.log('test success')
            // GETTING TO THIS POINT, BUT NOT DELETING NODE
            return null
        }
        // case 2: delete node w/ 1 child
        // case 3: delete node w/ 2 children
        // value does not exist
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


