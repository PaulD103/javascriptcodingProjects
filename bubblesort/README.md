# BubbleSort Algorithm

The [Bubble Sort](https://www.w3resource.com/javascript-exercises/javascript-function-exercise-24.php) algorithm is the simplest sorting algorithm in which the neighboring elements are repeatedly exchanged if they are in the wrong order.
<br>
<br>

## Functionality:
<br>

**First pass:**  
<br>
>(  **7**  **2**  6 8 3 6 2 5 2 ) **=>** (  **2**  **7**  6 8 3 6 2 5 2 )

**-** here the algorithm compares the first two elements and swaps them if 7 > 2
***
**-** this principle is carried out until the previous number is not greater than the next \
**-** as in this case, if 7 > 8 then the numbers would swap, but this is not the case
<br>
> ( 2 6 **7**  **8**  3 6 2 5 2 ) **=>** ( 2 6 **7**  **8**  3 6 2 5 2 )

**. . .** sorts further down to the last number
<br>
> ( 2 6 7 3 6 2 5 **8** **2** ) **=>** ( 2 6 7 3 6 2 5 **2** **8** )
***
**Second pass:**  
<br>
> ( **2** **6** 7 3 6 2 5 8 2 ) **=>** ( **2** **6** 7 3 6 2 5 2 8 )

**...**
> ( 2 6 3 6 2 5 7 **8** **2** ) **=>** ( 2 6 3 6 2 5 7 **2** **8** )
***

**More runs:**\
**To the end:**

<br>

> ( 2 2 2 3 5 6 6 7 8 )

<br>
<br>
<br>

## Code
<br>

**-** here the numbers are determined which the algorithm uses for sorting \
**-** in order to get random sizes in a certain size interval, I am using a for loop that creates bars depending on the length of the loop

```javascript
// set the array

var numbers = new Array();

for (var i = 0; i < 140; i++) {
	numbers[i] = Math.random(0, 1) * 13;
}
```
***

<br>

**-** In order to give the algorithm a meaning, a function is written that takes the numbers specified in the loop as parameters and sorts them

```javascript
   function bubbleSort(arr) {
   var len = arr.length;

     // For loops run the length of the input array to get each number for sorting
     for (var i = len; i > 0; i--) {
       for(j = 0; j<i; j++) {

          // This condition is used to sort the numbers with a specific criterion
          var smallerNumber;
      	  if(arr[j-1] >= arr[j]) {
<<<<<<< HEAD
            smallerNumber = arr[j+1];
            arr[j+1] = arr[j];
            arr[j] = smallerNumber;
=======
            smallerNumber = arr[j];
            arr[j] = arr[j-1];
            arr[j-1] = smallerNumber;
>>>>>>> 628b216e79b5df2cf3f75bd28d63a22e99159e01
      	  }
        }
      }
    }
   ```
***

<br>

**-** Finally the function is called with the transferred parameter (numbers) \
**-** then the numbers are called in the correctly sorted order


```javascript

// Function is called
bubbleSort(numbers);