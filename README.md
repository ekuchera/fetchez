# fetchez
This is a simple wrapper to simplify the usage of fetch for React.
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
Fetchez can automatically add the token to authentify your request.
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

## Load multiple pages
Fetchez can automatically load a paginated api and merge it as one request
### Configuration
Assuming that we have an API that returns something like this :
```
{
  "next": "https://...?page=2", // Or null
  "results": [
    ...
  ]
}
```
We have to configure fetchez like this :
```
// How to go to next page
// If the returned value evaluates as "false", it is considered to be the last page
const getNext = res => res.next;
// How to merge pages
// mergedResults : List of all merged elements
// newElement : Current page to merge
const mergeResults = (mergedResults, newElement) => [...(mergedResults || []), ...newElement.results];

fetchez.configure({ getNext, mergeResults });
```
### Usage
To use it, you simply need to activate the option :
```
fetchez(url, { loadAll: true }).then(mergedResults => console.log(mergedResults));
```
