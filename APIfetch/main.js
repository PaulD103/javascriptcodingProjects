let path = 'https://javascriptcodingtestapi.herokuapp.com/data';
let headline = document.getElementById("fetchedValue");
fetch(path, {
  method: 'GET',
  headers: { 'Content-Type': 'application/json'}
}).then(
    res => res.json())
  .then(
    (result) => {
        console.log(result.data);
        headline.innerText = `Data: \n\n"${result.data}"`;
    },
    (error) => {
        console.error("Something went wrong!");
        headline.innerText = "Something went wrong!";
      }
  )
