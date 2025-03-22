# **GitHub Repositories With Search Functionality**

## **Description**

A modern React application that enables users to explore GitHub repositories through an intuitive interface. The app allows users to search for GitHub profiles by username and then browse through their repositories allowing for filtering.

Key Features:
- Search for GitHub users by username
- View an about user page with more detailed user profile information
- Browse through user repositories with pagination support
- Filter repositories by name and programming language
- Clean and responsive user interface
- Authenticated API requests to ensure reliable access

Built with React, TypeScript, and the GitHub REST API.

## **Prerequisites**

Before running the application, ensure you have Yarn installed on your system. If you don't have Yarn installed:

1. First, install Node.js from [nodejs.org](https://nodejs.org/)
2. Then install Yarn using npm (Node Package Manager, comes with Node.js):
   ```bash
   npm install --global yarn
   ```
3. Verify the installation:
   ```bash
   yarn --version
   ```

## **Running the application**

1. Clone the repository
2. Run `yarn install` to install the dependencies
3. Create a .env.local file and introduce your GitHub API key like in .env.example
4. Run `yarn start` to start the application

## **Running the tests**

1. Run `yarn test` to run the tests



## **Todo**

- [x] Create clean React Typescript app
- [x] Update file tree structure
- [x] Add services to fetch data from the GitHub API
    - [x] Add user service
        - [x] Add method to search user by query
        - [x] Add method to fetch user by username
    - [x] Add repository service
        - [x] Add method to get user repositories
            - [x] Add pagination
- [x] Add basic tests for the services
    - [x] Add tests for the user service
        - [x] Add getUser test
        - [x] Add searchUser test
    - [x] Add tests for the repository service
        - [x] Add getUserRepositories test
- [x] Authenticate API requests -> reached limit of non authenticated requests
- [x] Make a simple UI with a search input and a list of repositories
    - [x] Add first page -> User search
        - [x] Add needed components
        - [x] Add search functionality
    - [x] Add second page -> Repository visualization and search
        - [x] Add needed components
        - [x] Add search functionality
- [x] Add filter by name
- [x] Add filter by programming language
- [x] Allow pagination features of the repositories
- [x] Polish the UI
- [x] Add documentation to the code

## **Future Improvements**

- [ ] Add more tests
- [ ] Make the repository cards able to be opened to display more information (revealing the full description)
- [ ] Add a loading state
- [ ] Add a error banners/ error handling
- [ ] Add a not found state
- [ ] Handle rate limiting from the GitHub API
- [ ] Use the v4 of the GitHub API (GraphQL)
- [ ] Split the repositories component into more components