---
title: Algorithm - Peter Roe
display: ''
---

[[toc]]

## 链表反转

> https://leetcode.cn/problems/UHnkqh/

```js
var reverseList = function(head) {
  let prev = null;
  let curr = head;
  while (curr) {
    // 第一步获取后面的节点
    const next = curr.next
    // 第二部改变当前节点的指向
    curr.next = prev
    // 更新 prev 为当前节点
    prev = curr
    // 更新 curr 为下一个节点
    curr = next
  }
  return prev;
};
```

链表翻转，在于记录前一个节点，可以使用循环的形式

## 链表交换问题

> https://leetcode.cn/problems/swap-nodes-in-pairs/

```js
var swapPairs = function(head) {
  if (head === null|| head.next === null) {
      return head;
  }
  const newHead = head.next
  head.next = swapPairs(newHead.next)
  newHead.next = head
  return newHead
};
```

这一题的思路，可以从假设只有三个或者四个节点的链表出发，就容易找出递归关系，假设是四个节点，就会发现，交换的时候 1 后面不是 3，从而意识到需要递归

## 括号生成问题

> https://leetcode.cn/problems/generate-parentheses/

```js
const generateParenthesis = (n) => {
  const result = []
  const back = (left, right, str) => {
    // 每次进入 back 函数的 str 都是“未来”可能合法的括号串
    // 如 (、((、(()、()(

    // 如果说'('和')'的数量符合要求了，那么一定是合法的括号串
    if(left == n && right == n) {
        result.push(str)
    }
    if(left < n) {
        back(left + 1, right, str + '(')
    }
    if(right < left) {
        back(left, right + 1, str + ')')
    }
  }
  back(0, 0, "")
  return result
}
```

首先要搞清怎样的括号是合法的和不合法的，例子：

* 合法的：`(())()、(()())`
* 不合法的： `)()(、())()(`

会发现，合法的括号，在任何一个`)`之前，`(`的数量都要大于`)`的数量，否则就是不合法的括号，我们就可以利用这个规则构造合法的括号

## 电话号字母组合问题

> https://leetcode.cn/problems/letter-combinations-of-a-phone-number/

```ts
var letterCombinations = function(digits) {
  const m = ['', '', 'abc', 'def','ghi','jkl','mno','pqrs','tuv','wxyz']
  let array = []
  for(let i = 0; i < digits.length; i++) {
    array.push(m[digits[i]])
  }
  let result = []
  const dfs = (i, str) => {
    if(i == array.length) {
      str && result.push(str)
      return 
    }
    for(let j = 0; j < array[i].length; j++) {
      const char = array[i][j]
      dfs(i + 1, str + char)
    }
  }
  dfs(0, '')
  return result
};
```

因为要组合的目标个数是不确定的，所以可以利用 dfs 的思想，一直向下查找，直到找到最后一个目标，然后在利用循环，组合枚举每一层可能的字母，并将状态带到下一个 dfs，便于跳出前存储状态

## 盛水容器问题

> https://leetcode.cn/problems/container-with-most-water/

```ts
var maxArea = function(height) {
  let [i, j] = [0, height.length - 1]
  let max = 0
  while(i < j) {
    max = height[i] < height[j] ?
      Math.max(max, (j - i) * height[i++]) :
      Math.max(max, (j - i) * height[j--]) 
  }
  return max
};
```

解题的思路在于，首先我们推导出面积公式 `S(i, j) = min(h[i], h[j]) * (j - i)`，然后尝试去移动 i 和 j，判断面积的变化趋势

得出，只有小边向中心移动，才有可能使得面积**更大**

## ~~ 转为整数

```ts
let a = -10.24
let b = 43.54

~~a == 10
~~b == 43
```

## 不同纬度看Z行变换

> https://leetcode.cn/problems/zigzag-conversion/

```js
/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
var convert = function(s, numRows) {
    let arr = new Array(numRows).fill('')
    let index = 0
    let flag = 1
    for(let c of s) {
        arr[index] += c
        if(index == 0 || index == numRows - 1) flag = -flag
        index += flag
    }
    return arr.join('')
};
```

俯视图看起来像是Z字形分布在二维数组，但是右视图看起来像是一维数组，这就是Z字形变换的关键。

上文还有巧妙的一点，用 flag 记录每次方向

## 中心扩散看最长回文串

> https://leetcode.cn/problems/longest-palindromic-substring/

```js
/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {
    let maxLen = 0
    let str = ''
    for(let i = 0; i < s.length; i++) {
        let j = i;
        let k = i;
        while(j - 1 >=0 && s[j - 1] == s[i]) j--
        while(k + 1 < s.length && s[k + 1] == s[i]) k--
        while(j - 1 >=0 && s.length && s[j - 1] == s[k + 1]) {
            j--
            k++
        }
        if(k - j + 1 > maxLen) {
            maxLen = k - j + 1
            str = s.slice(j, k + 1)
        }
    }
    return str
};
```

中心扩散法核心在于，确定**中心点**。可能是一个字符，也可能是两个或多个字符

但是它们一定是**相同**的字符

## 滑动窗口看最长子串

> https://leetcode.cn/problems/longest-substring-without-repeating-characters/

```js
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    let set = new Set()
    let l = 0
    let r = 0
    let len = 0
    while(l < s.length) {
        while(!set.has(s[r]) && r < s.length) {
            set.add(s[r])
            r ++
        }
        len = Math.max(len, r - l)
        set.delete(s[l])
        l++
    }
    return len
};
```

解体的思路在于穷举 `s[i] (0 < i < s.length)` 作为**子串起始字符**的最长连续不重复子串，得出最大长度

上面的方法相比穷举法而言，好处在于利用 Set 储存了上一个状态的结果，避免了重复计算。

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
