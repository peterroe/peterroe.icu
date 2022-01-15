---
title: 双指针
date: 2022-01-16
type: algorithm
---

## 维护区间数据

双指针最简单的特性就是维护具有一定单调性，增加和删除都很方便

[leetCode乘积小于k的子数组](https://leetcode-cn.com/problems/subarray-product-less-than-k/)

```js
let l = 0
let product = 1
let sum = 0
for(let r = 0; r < nums.length; r++) { //限定右边界
  product *= 1
  while(l <= r && product >= k) { //找左边界
    product /= nums[r]
    l++
  }
  sum += r - l + 1
}
```

## 子序列匹配

[leetCode匹配最长单词](https://leetcode-cn.com/problems/longest-word-in-dictionary-through-deleting/)

```js
let findLongestWord = function(s, dictionary) {
  let res = ''
  for(let name of dictionary) {
    let i = 0;
    let j = 0
    while(i < s.length && j < name.length) {
      if(s[i] == name[j]) {
          j++
      }
      i++
    }
    if(j == name.length) {
      if(name.length > res.length ||(name.length = res.length &&  name < res )) {
          res = name
      }
    }
  }
  return res
};
```

## 利用序列有序性

[leetCode输入有序数组](https://leetcode-cn.com/problems/two-sum-ii-input-array-is-sorted/)

```js
var twoSum = function(numbers, target) {
  let i = 0;
  let j = numbers.length - 1
  while(i < j) {
    let sum = numbers[i] + numbers[j]
    if(sum == target) {
      return [i + 1, j + 1]
    } else if(sum < target) {
      i++
    } else {
      j--
    }
  }
};
```