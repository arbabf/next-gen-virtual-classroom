# Frontend

Frontend client for the classroom.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/en/docs/install)

### Installing

1. Ensure you're in this directory (`<repo>/source/frontend`)
2. Install dependencies with `yarn install`
3. Run the code for the first time with `yarn dev`
4. Exit (Ctrl+c) the frontend development server

## Testing

We have two types of tests:

- Unit and (limited) integration tests with Jest
- End-to-end tests with Playwright

Playwright has some significant prerequisites.

### Unit testing

Simply run `yarn run jest`.

### E2E testing

Playwright needs to run a dev server. This means you can't open the app
and run an E2E test at the same time. Since you need to set up a
testing environment, it's recommended to do this in Docker.

Playwright must first be set up on your environment:

1. Run `yarn playwright install-deps`
	- This will install a large number of dependencies, and it may break
	here because your host OS does not support the required packages.
	- If you can't support the required packages, you need to use Docker
	using the `mcr.microsoft.com/playwright:next` image, then continue.
2. Run `yarn playwright install`

Once you have the prerequisites, you can then run the tests with
`yarn playwright test`.

#### Using Docker

We recommend the official Playwright image: 
`mcr.microsoft.com/playwright:next`, which should include everything
you get out of `playwright install-deps` and `playwright install`.

Since you need to download browsers, you can save time by reusing the
same container. If using `docker run` this should already happen.

To run Playwright tests in Docker,

1. Run `docker run -it -v $(pwd):/app -w /app mcr.microsoft.com/playwright:next yarn run test:e2e`
	- This will run the tests in the container, and then exit.

## Troubleshooting and common issues

### Using `npm` and `package-lock.json`

Ensure no `package-lock.json` exists in `source/frontend` or
`source/backend`. These can conflict with `yarn.lock`.

`package-lock.json` is created if you try to use `npm install` instead
of `yarn` commands like `install` or `add`.

### `yarn run jest` encounters an unexpected token `export` or `import`

This is a known issue with Jest and Node.js. You can fix this by
overriding `transformIgnorePatterns` in `jest.config.js` to not contain
`node_modules`.

This transpiles all of `node_modules`, which can cause significant
slowdowns on tests that involve larger components with many
dependencies.
