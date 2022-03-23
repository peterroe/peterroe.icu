---
title: 贪心算法
date: 2022-03-21
type: algorithm
---

## 贪心算法秘籍

1. 贪心策略

确定贪心策略，选择一个当前看上去很好的方案

2. 局部最优解

根据贪心策略，一步一步，得到局部最优解

3. 全局最优解

所有的局部最优解合成为原来一个问题的最优解

> 例如冒泡排序，本质上可以看为是贪心算法，因为每次从左到右扫描，都得到了当前一个最大的数字，就可以把数字从小到大排列

## 冒泡排序

```js
function bubbleSort() {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        const temp = arr[j]
        arr[j] = arr[j + 1]
        arr[j + 1] = temp
      }
    }
  }
  return arr
}
```

## 盛水最多的容器

这题的解题思路在于**双指针**，从左到右扫描，从右到左扫描，找到最大的容器，然后更新最大容器的面积

<https://leetcode-cn.com/problems/container-with-most-water/>

```ts
function maxArea(height: number[]): number {
  let [maxArea, i, j] = [0, 0, height.length - 1]
  while(i < j) {
    let area = Math.min(height[i], height[j]) * (j - i)
    maxArea = Math.max(area, maxArea)
    height[i] < height[j] ? i++ : j--
  }
  return maxArea
};
```

我们发现，在这一题中，双指针并不能一次找到最大的那个容器，但是双指针的移动顺序，目的是在寻求局部的最优解

例如，当我们选择`i++`还是`j--`的时候，我们可以明确知道两个中间哪个操作会让我们得到尽可能大的值，所以全局最优解一定在局部最优解里面，然后在这些可能是最大的值中找到最大的那个值。

