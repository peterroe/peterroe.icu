---
title: 递归和分治
date: 2022-01-20
---

## 分治算法

分治的流程可以分为三步：分解->解决->合并。

1. 分解原问题为相同的子问题
2. 分解到容易求解的边界后，进行递归求解
3. 将子问题的解合并为原问题的解

[路径总和III](https://leetcode-cn.com/problems/path-sum-iii/)

```js
var pathSum = function(root, targetSum) {
    if(!root) {
        return 0
    }
    return count(root, targetSum) + pathSum(root.left,targetSum) + pathSum(root.right, targetSum)
};

function count(root, sum) {
    if(!root) {
        return 0
    }
    return (root.val == sum).valueOf() + count(root.left, sum - root.val) + count(root.right, sum - root.val)
}
```