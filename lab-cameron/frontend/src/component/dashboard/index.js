import React, { Component } from 'react';
import { connect } from 'react-redux';
import CategoryForm from '../category-form';
import CategoryItem from '../category-item';
import * as category from '../../action/category';

const Dashboard = ({ categories, categoryCreate }) => {
  return (
    <div className='dashboard'>
      <h2 id='category-headline'>Create Category</h2>
      <CategoryForm onComplete={categoryCreate} />
      {
        categories.map(category => {
          return <div key={category.id}>
            <CategoryItem category={category} />
          </div>;
        })
      }
    </div>
  );
};

const mapStateToProps = state => {
  return {
    categories: state.category,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    categoryCreate: data => dispatch(category.createAction(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
