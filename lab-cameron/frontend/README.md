# Budget Tracker

Simple budget tracker app using React and Redux

# Tech Used

- babel
- react
- redux
- webpack
- jsx
- react-router

# Features

Provider stores all App state in the redux store. UI state is handled within
the category-form component.

Dashboard serves as the homepage, served via react-router. It holds category-form
as a top-level form to add budget tracking to a list of budgets below.

Each category has a name, budget, id and timestamp associated with it.

In the category rendered space below the top-level category-form, category-items
are listed, where you can update their contents (name and budget) as well as
remove them from the application state altogether.

# Installation

1. clone the repo
2. `npm install`
3. `npm start`
4. open `localhost:<PORT>`

# Credits

Cameron Moorehead - https://github.com/CameronMoorehead

# License

GPL-3.0
