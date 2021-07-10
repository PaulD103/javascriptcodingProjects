# API Fetch

Code for how to fetch data from an API. For this example I used an extra [API](https://javascriptcodingtestapi.herokuapp.com/data) for test cases, that you can use, too.
<br>

## Code
```javascript
let path = 'https://javascriptcodingtestapi.herokuapp.com/data';
fetch(path, {
  method: 'GET',
  headers: { 'Content-Type': 'application/json'}
}).then(
    res => res.json());
  .then(
    (result) => {
        console.log(result.data);
    },
    (error) => {
        console.error("Something went wrong!");
      }
  )

```
<br>
<hr>

## Build your own API

If you are more interested in APIs, here is an [tutorial](https://github.com/PaulD103/flask-herokuAPI), on how you can create one of these with python.
