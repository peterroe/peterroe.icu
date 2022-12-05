---
title: Algorithm - Peter Roe
display: ''
---

[[toc]]

## 汉明距离

```js
var hammingDistance = function(x, y) {
    let count = 0
    let s = x ^ y
    while(s != 0) {
        s = s & (s - 1)
        count ++
    }
    return count
};
```

利用 Brian Kernighan 算法 和异或算法

* 异或运算直接得到不同的位数
* Brain Kernighan 删除最后一位数字

## 位运算

> https://leetcode.cn/problems/bitwise-and-of-numbers-range

```js
var rangeBitwiseAnd = function(m, n) {
    let count = 0
    while(m != n) {
        m >>= 1
        n >>= 1
        count ++
    }
    return m << count
}

```

找两个数字的公共前缀，一定是与的结果。上面的思路是将数字一只右移动

## 位运算压缩

> https://leetcode.cn/problems/repeated-dna-sequences

```js
var findRepeatedDnaSequences = function(s) {
  let bin = new Map([
    ['A', 0],
    ['T', 3],
    ['C', 1],
    ['G', 2],
  ])
  let x = 0
  const ans = []
  if(s.length < 10) return ans
  for(let i = 0; i < 9; i++) {
    x = (x << 2) | bin.get(s[i])
  }
  const rc = new Map()
  for(let i = 10; i <= s.length; i++) {
    x = ((x << 2) | bin.get(s[i - 1])) & ((1 << 20) - 1)
    rc.set(x, (rc.get(x) || 0) + 1)
    if(rc.get(x) === 2) {
      ans.push(s.slice(i - 10, i))
    }
  }
  return ans
};
```

将字符串转换为映射为数字，节省储存空间

`((1 << 20) - 1)` 的意思是，产生 20 个 1

## 二叉树的右视图

```js
var rightSideView = function(root) {
    if(!root) return []
    const stack = [root]
    let arr = []
    while(stack.length) {
        let len = stack.length
        for(let i = 0; i < len; i++) {
            let el = stack.shift()
            if(i === 0) {
                arr.push(el.val)
            }
            if(el.right) {
                stack.push(el.right)
            }
            if(el.left) {
                stack.push(el.left)
            }
        }
    }
    return arr
};
```

## 岛屿数量

```js
/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function(grid) {
    let m = grid.length
    let n = grid[0].length
    const d = [
        [0, 1],
        [1, 0],
        [0, -1],
        [-1, 0]
    ]
    const dfs = (i, j) => {
        grid[i][j] = '0'
        for(let k = 0; k < d.length; k++) {
            let newI = i + d[k][0]
            let newJ = j + d[k][1]
            if(newI >=0 && newJ >=0 && newI < m && newJ < n && grid[newI][newJ] === '1') {
                dfs(newI, newJ)
            }
        }
    }
    let count = 0
    for(let i = 0; i < m; i++) {
        for(let j = 0; j < n; j++) {
            if(grid[i][j] === '1') {
                dfs(i, j)
                count++
            }
        }
    }
    return count
};
```

## 克隆图

> https://leetcode.cn/problems/clone-graph

bfs

```js
const cloneGraph = function(node) {
  if(!node) return node
  let stack = [node]
  let map = new Map([[node, new Node(node.val)]])
  while(stack.length) {
    let el = stack.shift()
    for(let it of el.neighbors) {
      if(!map.has(it)) {
        map.set(it, new Node(it.val))
        stack.push(neighbors)
      }
      map.get(el).neighbors.push(map.get(it))
    }
  }
  return map.get(node)
}
```

需要提前克隆一个头节点，确保能够顺利 push 进行的数组中

dfs

```js
const cloneGraph = function(node) {
  if(!node) return node
  const map = new Map()
  const dfs = (node) => {
    if(map.has(node)) return map.get(node)
    let newNode = new Node(node.val)
    map.set(node, newNode)
    for(let it of node.neighbors) {
      newNode.neighbors.push(dfs(it))
    }
    return newNode
  }
  return dfs(node)
}
```

## 二叉树最大路径

> https://leetcode.cn/problems/binary-tree-maximum-path-sum

```js
var maxPathSum = function(root) {
    let maxValue = -Infinity
    const dfs = (node) => {
        if(!node) return 0
        let left = dfs(node.left)
        let right = dfs(node.right)
        let curMax = left + node.val + right
        maxValue = Math.max(maxValue, curMax) //挑战最大记录
        let outputMax = node.val + Math.max(left, right, 0)
        return outputMax < 0 ? 0 : outputMax
    }
    dfs(root)
    return maxValue
};
```

每次递归的要做的事情

* 尝试将当前接点当成根节点，挑战最大记录
* 对上一次递归提供自己能提供最大的值
* 对负值的考虑

## 边缘搜索

> https://leetcode.cn/problems/surrounded-regions

```js
 var solve = function(board) {
  let m = board.length
  let n = board[0].length
  let f = new Array(m).fill(0).map(it => new Array(n).fill(0))
  const d = [
      [0, 1],
      [1, 0],
      [0, -1],
      [-1, 0]
  ]
  const dfs = (i, j) => {
    if(board[i][j] === 'X') return 
    f[i][j] = 1
    for(let k = 0; k < d.length; k++) {
      let newi = i + d[k][0]
      let newj = j + d[k][1]
      if(newi < 0 && newj < 0 &&  newi >= m && newj >= n && f[newi][newj] === 0)
      dfs(newi, newj)
    }
  }
  for(let i = 0; i < m; i++) {
    for(let j = 0; j < n; j++) {
      if(i === 0 || i === m - 1 || j === 0 || j === n - 1) {
        dfs(i, j)
      }
    }
  }
  for(let i = 0; i < m; i++) {
    for(let j = 0; j < n; j++) {
      if(f[i][j] == 0)
      board[i][j] = 'X'
    }
  }
};
```

妙在从边缘开始搜索，一定是满足条件的

## 买股票时机2

> https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-ii/

```js
var maxProfit = function(prices) {
    let res = 0
    for(let i = 1; i < prices.length; i++) {
        let tmp = prices[i] - prices[i - 1]
        res = tmp > 0 ? tmp + res : res
    }
    return res
};
```

上升的时候不用担心今天买明天卖会不会亏损

## 锯齿 bfs

```js
var zigzagLevelOrder = function(root) {
  if(!root) return []
  let res = []
  let stack = [root]
  let f = true
  while(stack.length) {
    const len = stack.length
    let arr = []
    for(let i = 0; i < len; i++) {
      const el = stack.shift()
      arr.push(el.val)
      if(el.left) stack.push(el.left)
      if(el.right) stack.push(el.right)
    }
    f && arr.reverse()
    res.push(arr)
    f = !f
  }
  return res
};
```

## 归并排序 + 链表

> https://leetcode.cn/problems/sort-list/description/

```js
function merge(node1, node2) {
  console.log(node1, node2)
  let node = {}, head = node
  while(node1 && node2) {
    let val1 = node1.val
    let val2 = node2.val
    if(val1 < val2) {
      node.next = node1
      node1 = node1.next
    } else {
      node.next = node2
      node2 = node2.next
    }
    node = node.next
  }
  node.next = node1 ? node1 : node2
  return head.next
}
var sortList = function(node) {
  let i = node, j = node, k = { next: node }
  while(j) {
    j = j.next? j.next.next : j.next
    i = i.next
    k = k.next
  }
  if(i == j) return node
  k.next = null  
  return merge(sortList(node), sortList(i))
};
```

## 二叉树递归

> https://leetcode.cn/problems/convert-sorted-list-to-binary-search-tree/description/

```js
var sortedListToBST = function(head) {
    if(!head) return null
    let i = head, j = head, k = { next: head }
    while(j && j.next) {
        j = j.next.next
        i = i.next
        k = k.next
    }
    if(i == j) return new TreeNode(i.val)

    if(head) {
        k.next = null
        i.left = sortedListToBST(head)
    }
    if(i.next) {
        i.right = sortedListToBST(i.next)
    }

    return new  TreeNode(i.val, i.left, i.right)
};
```

## 合法IP地址

> https://leetcode.cn/problems/restore-ip-addresses/description/

```js
var restoreIpAddresses = function(s) {
    const res = []
    const dfs = (str, i, arr) => {
        if(arr.length == 4 && i == s.length) {
            res.push(arr)
        }
        if(Number(str + s[i]) <= 255 && arr.length < 4) {
            if(str + s[i] !== '0') {
                dfs(str + s[i], i + 1, arr)
            }
            dfs("", i + 1, [...arr, str + s[i]])
        }
    }
    dfs("", 0, [])
    return res.map(it => it.join('.'))
};
```

## 删除重复元素II

> https://leetcode.cn/problems/remove-duplicates-from-sorted-list-ii/description/

```js
var deleteDuplicates = function(head) {
   if (!head) {
       return head;
   }

   const dummy = new ListNode(0, head);

   let cur = dummy;
   while (cur.next && cur.next.next) {
       if (cur.next.val === cur.next.next.val) {
           const x = cur.next.val;
           while (cur.next && cur.next.val === x) {
               cur.next = cur.next.next;
           } 
       } else {
           cur = cur.next;
       }
   }
   return dummy.next;
};
```

妙处

* 由于头节点也有可能被删除，所以需要假设一个虚拟节点指向 head
* 在排除重复元素的时候，每次循环都执行 `cur.next = cur.next.next`，就可以不声明额外的变量

## 简单排列

```js
var combine = function(n, k) {
  const list = new Array(n).fill(0).map((_, i) => i + 1)
  // 回溯
  const u = new Array(n).fill(0)
  const cur = []
  const result = []
  const recursive = () => {
    if(cur.length == k) {
      result.push(Array.from(cur))
      return 
    }
    for(let i = j; i < list.length; i++) {
      if(u[i] == 1) continue
      cur.push(list[i])
      u[i] = 1
      recursive()
      u[i] = 0
      cur.pop()
    }
  }
  recursive(0)
  return result
};

combine(4, 2)
```

## 去重排列

```js
var combine = function(n, k) {
  const list = new Array(n).fill(0).map((_, i) => i + 1)
  // 回溯
  const u = new Array(n).fill(0)
  const cur = []
  const result = []
  const recursive = (j) => {
    if(cur.length == k) {
      result.push(Array.from(cur))
      return 
    }
    for(let i = j; i < list.length; i++) {
      if(u[i] == 1) continue
      cur.push(list[i])
      u[i] = 1
      recursive(i) // 标记位置
      u[i] = 0
      cur.pop()
    }
  }
  recursive(0)
  return result
};

combine(4, 2)
```

## 最小覆盖子串

```js
const initO = (t) => {
  const o = {}
    for(let i = 0; i < t.length; i++) {
      if(o[t[i]]) {
        o[t[i]] ++
      } else {
        o[t[i]] = 1
      }
      
    }
    return o
}
var minWindow = function(s, t) {

  const o = initO(t)
  let res = ''
  let len = Object.keys(o).length
  let [l, r] = [0, 0]

  while(r < s.length) {
    if(o[s[r]] !== undefined) {
      o[s[r]] -= 1
      if(o[s[r]] === 0) len--
    }
  
    while(len === 0) {

      const newRes = s.slice(l, r + 1)

      if(!res || newRes.length < res.length) res = newRes

      if(o[s[l]] !== undefined) {
        o[s[l]] ++
        if(o[s[l]] === 1) len ++
      }
      l ++
    }
    r++
  }
  return res
};
```

解题方法还是从滑动窗口出发，创新点是需要记录下 map 的 size 和对应值的个数

## 文件路径问题

> https://leetcode.cn/problems/simplify-path/

```js
var simplifyPath = function(path) {
    const names = path.split("/");
    const stack = [];
    for (const name of names) {
        if (name === "..") {
            if (stack.length) {
                stack.pop();
            } 
        } else if (name.length && name !== ".") {
            stack.push(name);
        }
    }
    return "/" + stack.join("/");
};
```

解题的关键在于，通过 `/` 分割各个路径，维护一个栈数据结构，然后判断是否是 `.` 还是 `..`

## 区间合并问题

> https://leetcode.cn/problems/merge-intervals/

```js
var merge = function(intervals) {
  if(intervals.length <= 1) return intervals;
  intervals.sort((a, b) => a[0] - b[0]);
  let ans = [];
  ans.push(intervals[0]);
  for(let i = 1; i < intervals.length; i++){
      if(intervals[i][0] > ans[ans.length - 1][1]) ans.push(intervals[i]);
      else if (intervals[i][0] <= ans[ans.length - 1][1] && intervals[i][1] > ans[ans.length - 1][1]){
          ans[ans.length - 1][1] = intervals[i][1];
      }
  }
  return ans;
};
```

对数组排序是一个很好的思路，避免了需要双向扩展数组，然后遍历输入数组，有三种情况

* 在右边界外面，选择 push
* 在右边界内，忽略
* 和右边界重叠，选择扩展右边界

## 最大子数组和

> https://leetcode.cn/problems/maximum-subarray/

```js
var maxSubArray = function(nums) {
  let max = nums[0], pre = 0
  nums.forEach(it => {
    pre = Math.max(pre + it, it)
    max = Math.max(max, pre)
  });
  return max
};
```

`max` 之所以设为 `nums[0]` 而不是 `0`，是因为可能有负数

## 回溯

> https://leetcode.cn/problems/permutations/

```js
var permute = function(nums) {
  let result = []
  let f = Array.from({length: nums.length})
  let s = []
  const back = () => {
    if(result.length === nums.length) {
      s.push(Array.from(result))
      return 
    }
    for(let i = 0; i < nums.length; i++) {
      if(f[i]) continue
      f[i] = 1
      result.push(nums[i])
      back()
      f[i] = 0
      result.pop()
    }
  }
  back()
  return s
};
```

需要声明三个数组，一个用来标记是否已经使用过，一个用来存储结果，一个用来存储最终结果。

## 最长有效括号

> https://leetcode.cn/problems/longest-valid-parentheses/

```js

function findMaxLenFromIndex(s, i) {
  let j = i
  let lc = 0
  let rc = 0
  let len = 0
  while(j < s.length) {
    if(s[j] == '(') {
      lc ++
    }else {
      rc ++
    }

    if(rc > lc) {
      break;
    }

    if(lc == rc) {
      len = Math.max(len, lc + rc)
    }

    j++
  }
  return len
}

var longestValidParentheses = function(s) {
  let len = 0
  for(let i = 0; i < s.length; i++) {
    if(s[i] === ')') {
      continue
    }
    let l = findMaxLenFromIndex(s, i)
    len = Math.max(len, l)
  }
  return len
};
```

只需要遵循合法的括号规则，即左括号数量大于等于右括号数量，就可以计算出最长的有效括号长度。

## 下一个排列

> https://leetcode.cn/problems/next-permutation/

```js
function findLowRight(arr) {
  let i = arr.length - 2;
  while(arr[i] >= arr[i + 1]) {
    i--
  }
  return i
}

function findUpperRight(arr, i) {
  let min = arr[i + 1]
  let minIndex = i + 1
  for(let j = i; j < arr.length; j++) {
    if(arr[j] > arr[i] && arr[j] < min) {
      arr
      j
      minIndex = j
    }
  }
  return minIndex
}

function exchange(arr,i, j) {
  let t = arr[i]
  arr[i] = arr[j]
  arr[j] = t
}

function sortFrom(arr, i) {
  for(let j = i; j < arr.length - 1; j++) {
    for(let k = i; k < arr.length - j - 1 + i ; k++) {
      if(arr[k] > arr[k + 1]) {
        exchange(arr, k, k + 1)
      }
    }
  }
}

var nextPermutation = function(nums) {
  let i = findLowRight(nums)
  if(i == -1) {
    return sortFrom(nums, 0)
  }
  let j = findUpperRight(nums, i)
  exchange(nums, i, j)
  sortFrom(nums, i + 1)
};
```

需要知道如何确定下一个更大的排列。这个问题的关键在于，从右往左找到第一个比右边小的数，然后从右往左找到第一个比这个数大的数，交换这两个数，然后将这个数右边的数排序。

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
