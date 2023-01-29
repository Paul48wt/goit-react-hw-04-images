import { Component } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export class Searchbar extends Component {
  state = { searchQuery: '' };
  searchQueryChange = event => {
    this.setState({ searchQuery: event.currentTarget.value });
  };
  searchQuerySubmit = event => {
    event.preventDefault();

    if (this.state.searchQuery.trim() === '') {
      toast.error('Wow so easy!');
      return;
    }
    this.props.onSubmit(this.state.searchQuery);
  };
  render() {
    return (
      <header className="Searchbar">
        <form onSubmit={this.searchQuerySubmit} className="SearchForm">
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">Search</span>
          </button>

          <input
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.searchQuery}
            onChange={this.searchQueryChange}
          />
        </form>
      </header>
    );
  }
}
