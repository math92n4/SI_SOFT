const string = "Hello World"

const encodedString = btoa(string)

console.log(encodedString)

const decodedString = atob(encodedString)

console.log(decodedString)