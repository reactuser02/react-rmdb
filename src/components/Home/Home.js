import React, { Component } from 'react';
import {
  API_URL,
  API_KEY,
  IMAGE_BASE_URL,
  BACKDROP_SIZE,
  POSTER_SIZE
} from '../../config';

import HeroImage from '../elements/HeroImage/HeroImage';
import SearchBar from '../elements/SearchBar/SearchBar';
import FourColGrid from '../elements/FourColGrid/FourColGrid';
import MovieThumb from '../elements/MovieThumb/MovieThumb';
import LoadMoreBtn from '../elements/LoadMoreBtn/LoadMoreBtn';
import Spinner from '../elements/Spinner/Spinner';

import './Home.css';

export default class Home extends Component {
  state = {
    movies: [],
    heroImage: null,
    loading: false,
    currentPage: 0,
    totalPages: 0,
    searchTerm: ''
  };

  componentDidMount() {
    if (localStorage.getItem('HomeState')) {
      const state = JSON.parse(localStorage.getItem('HomeState'));
      this.setState({
        ...state
      });
    } else {
      this.setState({
        loading: true
      });
      const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
      this.fetchItems(endpoint);
    }
  }

  searchItems = searchTerm => {
    let endpoint = '';
    this.setState({
      movies: [],
      loading: true,
      searchTerm
    });

    if (searchTerm === '') {
      endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    } else {
      endpoint = `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${searchTerm}&page=1`;
    }
    this.fetchItems(endpoint);
  };

  fetchItems = url => {
    fetch(url)
      .then(response => response.json(), err => console.error(err))
      .then(response => {
        this.setState(
          {
            movies: [...this.state.movies, ...response.results],
            heroImage: response.results[0],
            currentPage: response.page,
            totalPages: response.total_pages,
            loading: false
          },
          () => {
            localStorage.setItem('HomeState', JSON.stringify(this.state));
          }
        );
      });
  };

  loadMoreItems = () => {
    let endpoint = '';
    this.setState({
      loading: true
    });
    if (this.state.searchTerm === '') {
      endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${this
        .state.currentPage + 1}`;
    } else {
      endpoint = `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${
        this.state.searchTerm
      }&page=${this.state.currentPage + 1}`;
    }
    this.fetchItems(endpoint);
  };

  render() {
    return (
      <div className="rmdb-home">
        {this.state.heroImage ? (
          <div>
            <HeroImage
              image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}/${
                this.state.heroImage.backdrop_path
              }`}
              title={this.state.heroImage.original_title}
              text={this.state.heroImage.overview}
            />
          </div>
        ) : null}

        <SearchBar
          searchTerm={this.state.searchTerm}
          onSearch={this.searchItems}
        />

        <div className="rmdb-home-grid">
          <FourColGrid
            header={this.state.searchTerm ? 'Search Results' : 'Popular Movies'}
            loading={this.state.loading}
          >
            {this.state.movies.map(movie => (
              <MovieThumb
                key={movie.id}
                clickable={true}
                image={
                  movie.poster_path
                    ? `${IMAGE_BASE_URL}${POSTER_SIZE}/${movie.poster_path}`
                    : './images/no_image.jpg'
                }
                movieId={movie.id}
                movieName={movie.original_title}
              />
            ))}
          </FourColGrid>
          {this.state.loading ? <Spinner /> : null}
          {!this.state.loading &&
          this.state.currentPage <= this.state.totalPages ? (
            <LoadMoreBtn text="Load More" onClick={this.loadMoreItems} />
          ) : null}
        </div>
      </div>
    );
  }
}
