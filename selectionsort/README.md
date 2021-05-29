# SelectionSort Algorithm

The [Selection Sort](https://www.w3schools.in/data-structures-tutorial/sorting-techniques/selection-sort-algorithm/) algorithm is the simplest sorting algorithm in which the current and the smallest element are repeatedly exchanged if they are in the wrong order.
<br>

## Functionality
### First run

* the for-loop outputs the smallest number of the array: **1**
* after this the current number array[i] **(5)** and the smallest number **(1)** get swapped

from... <br>
`[5,3,8,1,4,9]` <br>
to ... <br>
`[1,3,8,5,4,9]` <br>

<hr>

### Second run

* the for-loop outputs the smallest number of the array starting at array[1] (position 2): **3**
* the current number array[i] **(3)** and the smallest number **(3)** get swapped and nothing changes in this run

from... <br>
`[1,3,8,5,4,9]` <br>
to ... <br>
`[1,3,8,5,4,9]` <br>

<hr>

### Third run

* the for-loop outputs the smallest number of the array starting at array[2] (position 3): **4**
* the current number array[i] **(8)** and the smallest number **(4)** get swapped

from... <br>
`[1,3,8,5,4,9]` <br>
to ... <br>
`[1,3,4,5,8,9]` <br>

<hr>

### Fourth run

* the for-loop outputs the smallest number of the array starting at array[3] (position 4): **5**
* the current number array[i] **(5)** and the smallest number **(5)** get swapped and nothing changes in this run

from... <br>
`[1,3,8,5,4,9]` <br>
to ... <br>
`[1,3,4,5,8,9]` <br>

<hr>
... the algorithm goes through the whole array until the last number
<hr>

### Last run

* the for-loop outputs the smallest number of the array starting at array[5] (position 6): **9**
* the current number array[i] **(9)** and the smallest number **(9)** get swapped

from... <br>
`[1,3,8,5,4,9]` <br>
to ... <br>
`[1,3,4,5,8,9]` <br>

<br>

## Code

* at first the algorithm goes through the whole array and chooses the smallest number
* with every run i increases by 1 => this means i always is the current number/run

```javascript
var min = i;

for (var j = i; j < arr.length; j++){
	if (arr[j] <= arr[min]){
		min = j; // if the current number is greater than arr[j], then min will be changed to i
	}
}
```
<br>

* after we got the position of the smallest number through the for-loop, we change the current and the smallest number

```javascript
var smallestNumber = arr[min];
arr[min] = arr[i];
arr[i] = smallestNumber;
```
<br>

* after that step we increase i for checking the next number in the array
* with i we call the recursive function _selectionsort(i)_

```javascript
selectionsort(arr, i);
```
