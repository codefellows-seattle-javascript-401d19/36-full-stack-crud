import React from 'react';
import SchoolForm from '../school-form';
import * as schoolActions from '../../action/school';
import * as expenseActions from '../../action/expense';
import { connect } from 'react-redux';
import ExpenseItem from '../expense-item';
import ExpenseForm from '../expense-form';

class SchoolItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editing: false };

    let memberFunctions = Object.getOwnPropertyNames(SchoolItem.prototype);
    for (let functionName of memberFunctions) {
      if (functionName.startsWith('handle')) {
        this[functionName] = this[functionName].bind(this);
      }
    }
  }

  handleUpdate(school) {
    this.props.schoolUpdate(school);
    this.setState({ editing: false });
  }
  render() {
    let { school, schoolRemove, schoolUpdate, expenses, expenseCreate } = this.props;

    let schoolExpenses = expenses[school._id];

    let editingJSX = <SchoolForm onComplete={this.handleUpdate} school={school} />;
    let contentJSX = (
      <div onDoubleClick={() => this.setState({ editing: true })}>
        <h2> {school.name} </h2>
        <p> City: {school.city} </p>
        <button
          onClick={() => {
            schoolRemove(school);
          }}
        >
          {' '}
					Delete{' '}
        </button>
      </div>
    );

    let renderJSX = this.state.editing ? editingJSX : contentJSX;

    return (
      <li className="school-item">
        {renderJSX}
        <ExpenseForm school={school} onComplete={expenseCreate} />
        <main className="expense-container">
          {schoolExpenses.map((expense, i) => <ExpenseItem expense={expense} key={i} />)}
        </main>
      </li>
    );
  }
}

let mapStateToProps = state => {
  return {
    expenses: state.expenses,
  };
};

let mapDispatchToProps = dispatch => ({
  expenseCreate: data => dispatch(expenseActions.createAction(data)),
  schoolUpdate: data => dispatch(schoolActions.updateSchool(data)),
  schoolRemove: data => dispatch(schoolActions.removeSchool(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SchoolItem);
