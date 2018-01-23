import React from "react";
import { connect } from "react-redux";

import CountryForm from "../country-form";
import CountryItem from "../country-item";
import * as country from '../../action/country';

class Dashboard extends React.Component {
  
  componentDidMount() {
    this.props.countriesGetAjax();
  }
  
  render() {
    
    let {
      countries,
      countryUpdate,
      countryCreateAjax,
      countryDestroyAjax,
      countriesGetAjax,
    } = this.props;
    
    return (
      <div className="dashboard">
        <CountryForm onComplete={countryCreateAjax} />
        <div className="countries">
          {countries.map((country, index) => (
            <CountryItem 
              key={index} 
              country={country}
              destroyCountry={countryDestroyAjax} 
              updateCountry={countryUpdate}
            />
          ))}
        </div>
      </div>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    countries : state.countries,
  }
};

let mapDispatchToProps = (dispatch) => {
  return{
    countryUpdate: (data) => dispatch(country.updateAction(data)),
    countryCreateAjax: (data) => dispatch(country.postCountry(data)),
    countryDestroyAjax: (data) => dispatch(country.deleteCountry(data)),
    countriesGetAjax: () => dispatch(country.getAction()),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
