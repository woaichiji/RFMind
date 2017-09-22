import objectPath from 'object-path';
let RFMind = function (tree = {"root": {id: 0, text: '', children: []}}) {
    this.tree = tree;
    if (!this.tree.root) {
        this.tree = {"root": {id: 0, text: '', children: []}};
    }
    this.incrementId = 0;
};

RFMind.prototype.setText = function (text) {
    this.tree.root.text = text;
};

/**
 * 添加一个节点
 * @param node 要添加的节点的对象
 * @param parentNode 父节点或者父节点ID，不填写默认是根节点
 * @returns {*} 返回添加的节点
 */
RFMind.prototype.addNode = function (node, parentNode = this.tree.root) {
    let id = parentNode;
    if (parentNode === null && parentNode === undefined) {
        parentNode = this.tree.root;
    }
    if (objectPath.has(parentNode, 'id')) {
        id = parentNode.id;
    }
    if (id !== null && id !== undefined) {
        let parentNodePath = this.findNode(parentNode.id);
        if (parentNodePath) {
            this.incrementId++;
            node.id = this.incrementId;
            let parent = objectPath.get(this.tree, parentNodePath);
            objectPath.push(parent, 'children', node);
            return node;
        } else {
            return null;
        }
    }
    return null;
};

RFMind.prototype.removeNode = function (id) {
    let currentNodePath = this.findNode(id);
    let currentNode = objectPath.get(this.tree, currentNodePath);
    if (currentNode) {
        objectPath.del(this.tree, currentNodePath, currentNode);
    }
    return currentNode;
};

/**
 * 编辑一个节点
 * @param id
 * @param node
 * @returns {*}
 */
RFMind.prototype.editNode = function (id, node) {
    let currentNodePath = this.findNode(id);
    let currentNode = objectPath.get(this.tree, currentNodePath);
    if (currentNode) {
        currentNode = Object.assign({}, currentNode, node);
        objectPath.set(this.tree, currentNodePath, currentNode);
    }
    return currentNode;
};

/**
 * 查找节点
 * @param id 查找的节点的ID
 * @param theNode 父节点下查找，如果不填写默认搜索整个树
 * @param basePath 该父节点的路径，如果不填写默认搜索整个树
 * @returns {*}
 */
RFMind.prototype.findNode = function (id, theNode = this.tree.root, basePath = 'root') {
    if (theNode.id === id) {
        return basePath;
        // return theNode;
    } else {
        if (theNode && theNode.children && theNode.children.length) {
            for (let i = 0; i < theNode.children.length; i++) {
                let child = theNode.children[i];
                let path = `${basePath}.children.${i}`;
                if (child.id === id) {
                    return path;
                }
                return this.findNode(id, child, path);
            }
        }
        return null;
    }
};
export default RFMind;
