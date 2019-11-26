# fetchez
This is a simple wrapper to simplify the usage of fetch

# Examples
## Simple request
For simple requests, fetchez is similar to fetch :
```
import fetchez from "fetchez";

fetchez(url);
// or
fetchez(url, {
  method: "POST",
  herders: { ... },
  body: { ... }
});
```
Fetchez returns a promise :
```
fetchez(...)
  .then(json => console.log(json))
  .catch(err => console.log(err));
```
