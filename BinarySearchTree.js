class Node {
    constructor(data, left = null, right = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

class Tree {
    constructor(arr){
        //sort array and remove duplicates
        let sortedArr = [...new Set(arr.sort((a, b) => a - b))];
        this.root = buildTree(sortedArr);
    }

    insert(data) {
        const node = this.root;
        if (node === null) {
            this.root = new Node(data);
            return;
        } else {
            const searchTree = (node) => {
                if (data < node.data) {
                    if (node.left === null) {
                        node.left = new Node(data);
                        return;
                    } else if (node.left !== null) {
                        return searchTree(node.left);
                    }
                } else if (data > node.data) {
                    if (node.right === null) {
                        node.right = new Node(data);
                        return;
                    } else if (node.right !== null) {
                        return searchTree(node.right);
                    }
                } else {
                    return null;
                }
            }
            return searchTree(node);
        }
    }

    delete(data) {
        const deleteNode = (node, data) => {
            if (node == null) {
                return null;
            }
            if (data == node.data) {
                //node has no children
                if (node.left == null && node.right == null) {
                    return null;
                }
                //node has no left child
                if (node.left == null) {
                    return node.right;
                }
                //node has no right child
                if (node.right == null) {
                    return node.left;
                }
                //node has two children
                let tempNode = node.right;
                while (tempNode.left !== null) {
                    tempNode = tempNode.left;
                }
                node.data = tempNode.data;
                node.right = deleteNode(node.right, tempNode.data);
                return node;
            } else if (data < node.data) {
                node.left = deleteNode(node.left, data);
                return node;
            } else {
                node.right = deleteNode(node.right, data);
                return node;
            }
        }
        this.root = deleteNode(this.root, data);
    }

    find(data) {
        let current = this.root;
        while (current.data !== data) {
            if (data < current.data) {
                current = current.left;
            } else {
                current = current.right;
            }
            if (current === null) return null;
        }
        return current;
    }

    levelOrder() {
        let result = [];
        let Q = [];
        if (this.root != null) {
            Q.push(this.root);
            while (Q.length > 0) {
                let node = Q.shift();
                result.push(node.data);
                if (node.left != null) {
                    Q.push(node.left);
                }
                if (node.right != null) {
                    Q.push(node.right);
                }
            }
            return result;
        } else {
            return null;
        }
    }

    inOrder() {
        if (this.root == null) {
            return null;
        } else {
            let result = new Array();
            const traverseInOrder = (node) => {
                node.left && traverseInOrder(node.left);
                result.push(node.data);
                node.right && traverseInOrder(node.right);
            }
            traverseInOrder(this.root);
            return result;
        }
    }

    preOrder() {
        if (this.root == null) {
            return null;
        } else {
            let result = new Array();
            const traversePreOrder = (node) => {
                result.push(node.data);
                node.left && traversePreOrder(node.left);
                node.right && traversePreOrder(node.right);
            }
            traversePreOrder(this.root);
            return result;
        }
    }

    postOrder() {
        if (this.root == null) {
            return null;
        } else {
            let result = new Array();
            const traversePostOrder = (node) => {
                node.left && traversePostOrder(node.left);
                node.right && traversePostOrder(node.right);
                result.push(node.data);
            }
            traversePostOrder(this.root);
            return result;
        }
    }

    minHeight(node = this.root) {
        if (node == null) return -1;
        let left = this.minHeight(node.left);
        let right = this.minHeight(node.right);
        if (left < right) {
            return left + 1;
        } else {
            return right + 1;
        }
    }

    maxHeight(node = this.root) {
        if (node == null) return -1;
        let left = this.maxHeight(node.left);
        let right = this.maxHeight(node.right);
        if (left > right) {
            return left + 1;
        } else {
            return right + 1;
        }
    }

    isBalanced() {
        return(this.minHeight() >= this.maxHeight() - 1);
    }

    rebalance() {
        let arr = this.levelOrder();
        arr.sort((a, b) => a - b);
        return this.root = buildTree(arr);
    }

    printTree(node = this.root, prefix = "", isLeft = true) {
        if (node === null) {
            return;
        }
        if (node.right !== null) {
            this.printTree(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
        if (node.left !== null) {
            this.printTree(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
    }
}

const buildTree = (arr, start = 0, end = arr.length - 1) => {
    if (start > end) return null;

    let mid = parseInt((start + end) / 2);
    let root = new Node(arr[mid]);

    root.left = buildTree(arr, start, mid - 1);
    root.right = buildTree(arr, mid + 1, end);

    return root;
}

module.exports = Tree;