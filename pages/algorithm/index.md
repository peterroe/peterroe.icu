---
title: Algorithm - Peter Roe
display: ''
---

## 从兜底逻辑看两数相加

> https://leetcode.cn/problems/add-two-numbers/

```js
var addTwoNumbers = function(l1, l2) {
    let head = null, tail = null;
    let carry = 0;
    while (l1 || l2) {
        const n1 = l1 ? l1.val : 0;
        const n2 = l2 ? l2.val : 0;
        const sum = n1 + n2 + carry;
        if (!head) {
            head = tail = new ListNode(sum % 10);
        } else {
            tail.next = new ListNode(sum % 10);
            tail = tail.next;
        }
        carry = Math.floor(sum / 10);
        if (l1) {
            l1 = l1.next;
        }
        if (l2) {
            l2 = l2.next;
        }
    }
    if (carry > 0) {
        tail.next = new ListNode(carry);
    }
    return head;
};
```

上面的代码妙在，l1 或者 l2 到头的时候，没有选择退出循环，而是继续循环，模拟 0 **补位**的效果，减少了**判断的逻辑**代码。所以只有两个链表都走完了才会退出循环

还一个重要点在于，使用 head 和 tail 记录首尾的位置，head 用作返回值，tail 用于延长链表。且用 `if (!head)` 区分第一次和之后的情况

## 从HashMap看两数之和

> https://leetcode.cn/problems/two-sum/

```js
var twoSum = function(nums, target) {
    const map = new Map();
    for(let i = 0, len = nums.length;i < len;i++) {
        if(map.has(target - nums[i])) {
            return [map.get(target - nums[i]), i];
        }
        map.set(nums[i], i);
    }
    return [];
};
```

我们知道，数组可以存储下标和值的关系，通过下标可以访问到值。上面的巧妙之处在一利用 Map ，构造了**值到下标**的映射关系

那么我们有了值和下标的**双向**映射关系，就可以仅遍历一次得出结果
