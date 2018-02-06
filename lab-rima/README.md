## HTML tree structure

It structures a html tag tree which is an instance of k-ary tree.

#### Parameters:

One html file path

Ex. htmlTree(file path);

#### Return value

HTML tag k-ary tree

Ex. 

kary Tree
{ root: 
   TreeNode {
     val: { eN: 'html', tC: '' },
     children: [ [TreeNode], [TreeNode] ] } }

## Usage

git clone this repo under your desired location.
```
git clone <clone ssh of thie repo>
```
If you like to see all nodes logged in terminal, run this.
```
node index.js 'file path'
```
This logs nodes like below. (Here uses minimal.html in __test__/assets.)
```
<Here is the result when you breadth-first-traverse a html tree.>


-----Node.Val
 { eN: 'html', tC: '' }
-----Node.Children
 [ TreeNode { val: { eN: 'head', tC: '' }, children: [ [TreeNode] ] },
  TreeNode {
    val: { eN: 'body', tC: '' },
    children: [ [TreeNode], [TreeNode], [TreeNode] ] } ] 

-----Node.Val
 { eN: 'head', tC: '' }
-----Node.Children
 [ TreeNode {
    val: { eN: 'title', tC: 'minimal html to tree' },
    children: [] } ] 

-----Node.Val
 { eN: 'body', tC: '' }
-----Node.Children
 [ TreeNode {
    val: { eN: 'header', tC: '' },
    children: [ [TreeNode], [TreeNode] ] },
  TreeNode { val: { eN: 'main', tC: '' }, children: [ [TreeNode] ] },
  TreeNode { val: { eN: 'footer', tC: '' }, children: [ [TreeNode] ] } ] 

-----Node.Val
 { eN: 'title', tC: 'minimal html to tree' }
-----Node.Children
 [] 

-----Node.Val
 { eN: 'header', tC: '' }
-----Node.Children
 [ TreeNode {
    val: { eN: 'h2', tC: 'We\'re building a tree!' },
    children: [] },
  TreeNode { val: { eN: 'nav', tC: '' }, children: [ [TreeNode] ] } ] 


...continue
```
If you want to run test, install jest and eslint.
```
npm i
```
run test.
```
npm test
npm run lint
```

#### Error
* If file doesn't exist, it throws an error.
* If html doesn't start with <!DOCTYPE html><html>, it throws an error.
