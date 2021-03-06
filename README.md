# Via Exercise
Via Exercise

## Getting started

Install the dependencies

```
npm i
```

## Run the local dev server
```
npm run dev
```

### Things to notice
1. I didn't add ES6 Babel Preset, but it should run on any modern browser.

2. If the API returns 404 - an error message should display.\
To test it, go to "modules/app-config.js" and use the second "URL_ENDPOINT_DRIVER_DATA_API".

* I used Redux for global state management and thunks for async actions.
* I used React Hooks and functional components (didn't separate to container/presentational components, felt like an overhead for this exercise).
* I used Material UI for a few things (tooltip / search bar).
* I implemented my own "search" algorithm.
* Responsive design is supported from 320px to 900px - the rest is considered desktop devices.

That's it I believe.
This is just a taste of how I approach things, I hope it gives a sample of my skills.

Let me know if you run into problems.

## Dev Server
The server should be running on "http://localhost:4000".

### Enjoy!