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
        let uniqueArr = [...new Set(arr.sort((a, b) => a - b))];
        this.root = buildTree(uniqueArr);
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