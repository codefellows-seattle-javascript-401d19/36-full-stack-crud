# Lab 36 Full Stack CRUD

## Overview

This is a synth tracker app. A new synth company can be created with the form on the home page. This will add a new synth to the list of synths. The synth will have an update form attached which allows a user to update that synth. There will also be a delete button to delete this synth company. Each synth company can have synths added. The name of each synth must be unique. Within each synth company will be a form where one can add synths. Also within the synth company will be a list of synths, each of which can be updated or deleted. To edit any section, double-click on that section, and a form to update the name or location/polyphony will appear. The synth companies are sent via http requests (managed by superagent) to the backend server where they are stored in mongo. Note that the name property of a synth company/synth is unique, so duplicate names are disallowed. 

***
## Getting Started

To get started using this application, familiarity with node and npm, as well as git is assumed. Fork/clone this repo to your machine, and do an `npm i`. Also navigate to the backend folder and do the same. Follow the directions in the server readme to start Mongo and run the server. To view on localhost in your browser, type `npm run watch`.
***
## Technology/Credits

Created by Andrew Bloom. Using react, redux, babel, webpack, et al. See package.json for details.