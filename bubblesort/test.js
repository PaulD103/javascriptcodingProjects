// set the array

var numbers = new Array();

for (var i = 0; i < 10; i++) {
	numbers[i] = Math.random(0, 1) * 13;
}
console.log(numbers);

function bubbleSort(arr) {
var len = arr.length;

  // For loops run the length of the input array to get each number for sorting
  for (var i = len; i > 0; i--) {
    for(j = 0; j<i; j++) {

       // This condition is used to sort the numbers with a specific criterion
       var smallerNumber;
       if(arr[j-1] >= arr[j]) {
         smallerNumber = arr[j];
         arr[j] = arr[j-1];
         arr[j-1] = smallerNumber;
       }
     }
   }
    console.log(numbers);
 }

 // Function is called
 bubbleSort(numbers);
