import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import './SearchBar.css';

export default class SearchBar extends Component {
  state = {
    value: ''
  };

  timeout = null;

  componentDidMount() {
    if (localStorage.getItem('HomeState')) {
      const searchTerm = JSON.parse(localStorage.getItem('HomeState'))
        .searchTerm;
      this.setState({
        value: searchTerm
      });
    }
  }

  doSearch = e => {
    this.setState({
      value: e.target.value
    });
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.props.onSearch(this.state.value);
    }, 500);
  };

  render() {
    return (
      <div className="rmdb-searchbar">
        <div className="rmdb-searchbar-content">
          <FontAwesome className="rmdb-fa-search" name="search" size="2x" />
          <input
            type="text"
            className="rmdb-searchbar-input"
            placeholder="Search"
            onChange={this.doSearch}
            value={this.state.value}
          />
        </div>
      </div>
    );
  }
}
