# fn

A simple FaaS service for my public functions.

# Adding a function

## Frontend

First, create a new component for your function in the `components/functions`
folder. You can use an existing one as a template. Then in `App.js` import your
new function and add it to the functions list. Finally, create a `<Route>` for
your function basing the path on the title of the the function.
