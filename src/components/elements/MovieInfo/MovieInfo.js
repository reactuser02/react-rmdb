import React from 'react';

import { IMAGE_BASE_URL, POSTER_SIZE, BACKDROP_SIZE } from '../../../config';

import FontAwesome from 'react-fontawesome';

import MovieThumb from '../MovieThumb/MovieThumb';

import './MovieInfo.css';

const MovieInfo = ({ movie, directors }) => (
  <div
    className="rmdb-movieinfo"
    style={{
      background: movie.backdrop_path
        ? `url('${IMAGE_BASE_URL}${BACKDROP_SIZE}${movie.backdrop_path}')`
        : '#000'
    }}
  >
    <div className="rmdb-movieinfo-content">
      <div className="rmdb-movieinfo-thumb">
        <MovieThumb
          image={
            movie.poster_path
              ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`
              : './images/no_image.jpg'
          }
          clickable={false}
        />
      </div>
      <div className="rmdb-movieinfo-text">
        <h1>{movie.title}</h1>
        <h3>PLOT</h3>
        <p>{movie.overview}</p>
        <h3>IMDB Rating</h3>
        <div className="rmdb-rating">
          <meter
            min="0"
            max="100"
            optimum="100"
            low="40"
            high="70"
            value={movie.vote_average * 10}
          />
          <p className="rmdb-score">{movie.vote_average}</p>
        </div>
        <h3>
          DIRECTOR
          {directors.length > 1 ? 'S' : null}
        </h3>
        {directors.map(director => (
          <p key={director.id} className="rmdb-director">
            {director.name}
          </p>
        ))}
      </div>
      <FontAwesome className="fa-file" name="film" size="5x" />
    </div>
  </div>
);

export default MovieInfo;
