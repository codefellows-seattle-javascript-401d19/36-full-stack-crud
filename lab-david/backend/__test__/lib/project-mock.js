'use strict';

const faker = require('faker');
const categoryMock = require('./category-mock');
const Project = require('../../model/project');

const projectMock = module.exports = {};

projectMock.create = () => {
  let mock = {};

  return categoryMock.create()
    .then(category => {
      mock.category = category;

      return new Project({
        title : faker.company.bsNoun(2),
        year : 2017,
      
        languages : faker.database.engine(3),
      
        description : faker.company.catchPhrase(10).split(' '),
        category : category._id,
      }).save();
    })
    .then(project => {
      mock.project = project;
      return mock;
    });
};

projectMock.createMany = (creationCount) => {
  let mock = {};
  
  return categoryMock.create()
    .then(category => {
      mock.category = category;
  
      return Promise.all(new Array(creationCount)
        .fill(0)
        .map(() => {
          return new Project({
            title : faker.company.bsNoun(2),
            year : faker.date.soon,
            
            languages : faker.database.engine(3).split(' '),
            
            description : faker.company.catchPhrase(10).split(' '),
            category : category._id,
          }).save();
        }));
    })
    .then(project => {
      mock.project = project;
      return project;
    });
};

projectMock.remove = () => Promise.all([
  Project.remove({}),
  categoryMock.remove(),
]);