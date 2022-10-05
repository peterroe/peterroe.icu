<template>
  <div>
    <table>
      <tr>
        <td>empty-cells: show</td>
        <td>empty-cells: hide</td>
      </tr>
      <tr>
        <td>
          <table border-separate style="empty-cells: show">
            <tr>
              <td>1</td>
              <td>2</td>
            </tr>
            <tr>
              <td>3</td>
              <td />
            </tr>
          </table>
        </td>
        <td>
          <table border-separate style="empty-cells: hide">
            <tr>
              <td>1</td>
              <td>2</td>
            </tr>
            <tr>
              <td>3</td>
              <td />
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </div>
</template>
