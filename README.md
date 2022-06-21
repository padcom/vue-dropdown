# Dropdown library

This is a library with a simple dropdown component.

It might be seen as a bit of an overkill to create all those things just to have ~40 lines of Vue code.
However, this project shows the following, which is basically needed to do any kind of serious development:

- project for the library so that the component isn't so lonely
- project to test the library components after they have been bundled
- unit testing support using vitest (super fast, super cool)
- project build setup using vite (super fast, super cool)

On top of that the way I chose to implement the dropdown was to use the native "select/option" elemenents.
That is because it behaves automatically properly on every platform. For example, on mobile it will present
a native select, which is working completely different from the one used on desktop. It works properly with
screen readers and other assistive technologies out of the box.

## Starting the project

To start the project issue the following command:
```
$ nvm use && npm install && npm start
```

To build the project issue the following command:
```
$ npm run build
```

To publish the project issue the following command:
```
$ npm run publish
```
