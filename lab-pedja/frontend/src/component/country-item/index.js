import React from "react";
import { connect } from "react-redux";

import CountryForm from "../country-form";
import ExpenseForm from "../expense-form";
import Expense from "../expense-item";

import * as country from "../../action/country";
import * as expense from "../../action/expense";


class CountryItem extends React.Component {
  constructor(props){
    super(props);
    this.state = { editing : false}

    this.handleUpdate = this.handleUpdate.bind(this);
  }

  handleUpdate(country){
    this.props.countryUpdate(country);
    this.setState({ editing : false });
  }
  
  render() {
    let {
      country, 
      countryDestroyAjax, 
      countryUpdate, 
      expenses,
      expenseCreate,
    } = this.props;

    let countryExpenses = expenses[country.id];

    let editingJSX = <countryForm onComplete={this.handleUpdate} country={country} />;
    let contentJSX =
      <div onDoubleClick={() => this.setState({ editing : true })} >
        <button className="delete" onClick={countryDestroyAjax.bind(null, country)}> delete </button>
        <h2>{country.name}</h2>
        <p>${country.budget}</p>
      </div>
    let renderJSX = this.state.editing ? editingJSX : contentJSX;

    return (
      <div className="country-item">
        {renderJSX}
        <ExpenseForm onComplete={expenseCreate} country={country} />
        <main className="expense-container">
          {
            countryExpenses.map((expense, index) => 
              <Expense expense={expense} key={index}/>
            )
          }
        </main>
      </div>
    )
  }
}

let mapStateToProps = state => {
  return {
    expenses : state.expenses,
  }
};

let mapDispatchToProps = dispatch => {
  return{
    countryUpdate: data => dispatch(country.updateAction(data)),
    countryDestroyAjax: data => dispatch(country.deleteCountry(data)),
    expenseCreate: data => dispatch(expense.createAction(data)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(CountryItem);
