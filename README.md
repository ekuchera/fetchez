# fetchez
This is a simple wrapper to simplify the usage of fetch.
It helps with a simple management of the auth token and with loading of multiple pages of a REST API.

# Examples
## Simple request
Import fetchez :
```
import fetchez from "fetchez";
```
For simple requests, fetchez is similar to fetch :
```
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

## With auth
Fetchez can automatically add the token ao authentify your request.
### Configuration
First, you have to provite the function that gets the token :
```
// Example of a token stored in the local storage.
const getToken = () => `Bearer ${localStorage.getItem("Token"}`;

fetchez.configure({ getToken });
```
### Usage
Then, you just have to activate the token option :
```
fetchez(url, { auth: true, ... }).then(...)...;
```
And fetchez will add the header :
```
Authorization: Bearer ...
```
