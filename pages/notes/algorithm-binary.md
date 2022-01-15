---
title: 二分法
date: 2022-01-04
type: algorithm
---

[[toc]]

## 经典实现

```js
function binaryFind(target, nums) {
  let start = 0
  let end = nums.length - 1
  while(start <= end) {
    const mid = Math.ceil((start + end) / 2)
    if(nums[mid] == target) {
      return mid
    } else if(nums[mid] > target) {
      end = mid - 1
    } else {
      start = mid + 1
    }
  }
  return -1
}
```

## 注意的点

```js
//下面两种都可以
const mid = Math.ceil((start + end) / 2)
const mid = Math.floor((start + end) / 2)

//！！！一定要带上等于号
start <= end

//记得+1或者-1
start = mid + 1
end = mid - 1

//记得返回-1
return -1
```

## 二分法精髓

```js
//剩下三个数字：
[1,3,4]  //nums[mid] 一定是3

//剩下四个数字：
[3,5,6,7] 	//nums[mid]取决于用ceil还是floor

//当结束的时候，如果找到了，直接return退出，如果没找到：

//如果选用的是floor
[1,4]	//那么start = 1 , end = 0， 相等的时候 start==end==4

//如果选用的是ceil
[1,4] //那么start = 1, end  = 0， 相等的时候 start==end==1
```