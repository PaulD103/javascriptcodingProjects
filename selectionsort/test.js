// set the array
var numbers = new Array();

for (var i = 0; i < 10; i++) {
	numbers[i] = Math.random(0, 1) * 13;
}
console.log(numbers);

function selectionSort(arr, i) {
  var len = arr.length;

  // for loops runs through the whole array and outputs the smallest number starting at arr[i]
  var min = i;
  for (var j = i; j < len; j++){
    if (arr[j] <= arr[min]){
      min = j;
    }
  }
  console.log(arr);
  var smallestNumber = arr[min];
  arr[min] = arr[i];
  arr[i] = smallestNumber;

  if (i < len) {
    i++;
    selectionSort(arr, i);
  } else {
    console.log(`Sorted!`);
  }
}

// function is called
selectionSort(numbers, 0);
