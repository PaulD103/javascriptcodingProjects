# SelectionSort Algorithm

The [Selection Sort](https://www.w3schools.in/data-structures-tutorial/sorting-techniques/selection-sort-algorithm/) algorithm is the simplest sorting algorithm in which the current and the smallest element are repeatedly exchanged if they are in the wrong order.
<br>

## Functionality:

* at first the algorithm goes through the whole algorithm and chooses the smallest Number
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
_selectionsort(i);
```
