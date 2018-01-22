import './_dashboard.scss';
import React from 'react';
import {connect} from 'react-redux';
import CategoryForm from '../category-form';
import CategoryItem from '../category-item';
import * as categoryActions from '../../action/category';

class Dashboard extends React.Component {
	render() {
		let { 
			categories,
			categoryCreate,
			categoryUpdate,
			categoryRemove,
		} = this.props;


	return (
		<div className='dashboard'>
			<div>
				<CategoryForm onComplete={categoryCreate} />
				<div className='category-container'>
				{
					categories.map((category, i) => 
								<CategoryItem key={i}
								category={category} 
								onUpdate={categoryUpdate} 
								onRemove={categoryRemove}/>
				)}
				</div>
			</div>
		</div>
		);
	}
}

let mapStateToProps = (state) => {
	return {
		categories: state.categories,
	}
};

let mapDispatchToProps = (dispatch) => {
	return {
		categoryCreate: (data) => dispatch(categoryActions.createAction(data)),
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);