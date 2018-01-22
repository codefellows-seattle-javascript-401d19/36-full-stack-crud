## 31 Budget Tracker
 
 #### App
* The app component should manage the frontend routes and have a navbar
The `/` route should display the `Dashboard` component

#### Dashboard Component 
*  Props: Yes
*  Uses Props: Yes
*  Has State: App State
 
The dashboard renders on the `/` route a form where the user may input the name of a category and the budget in dollars.  On submission, it renders the category, as well as delete and update buttons.  

Using the mapStatetoProps() hook method, the category is saved in state with properties: 
`id (int)` `timestamp(date)` `name (string)` `budget (int)`

Using the mapDispatchToProps() hook method, the categoryCreate(), categoryUpdate(), and categoryRemove() methods are given access to the dispatch method where they can execute their specific functions when called elsewhere in the app.

#### CategoryForm Component
*  Props: Yes
*  Uses Props: Yes
*  Has State: UI State

Using the bound handleChange() method, the category can pass its name and budget to the state as `key: value` pairs.

Using the bound handleSubmit() method, the category fields can be reset to an empty state.

Using the componentWillReceiveProps() hook method, the form may be used for both updating and submitting new information.

Uses a render () method as a hook to create a form element with two input fields and a submission button.  On value entry, the UI state is updated and on change, the previously described handleChange method sets the state.

#### CategoryItem
*  Props: Yes
*  Uses Props: Yes
*  Has State: No

Uses the render () method as a hook to create a div with an `h2` heading which contains the name of a category and a budget, both of which are accessed as props which are passed in by the Dashboard component. It also renders a button that has `onClick` delete functionality provided by the categoryRemove() method.  It also renders a category form which will enable updating of the category information.

###### reducer
* create a category reducer in your your reducer direcoty
* this reducer should support the following interactions 
  * `CATEGORY_CREATE`
  * `CATEGORY_UPDATE`
  * `CATEGORY_DESTORY`

###### action creators
* you should create an action createor for each interaction supported by your category reducer
##  Documentation  
Write a description of the project in your README.md
