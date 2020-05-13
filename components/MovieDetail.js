import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, IconButton } from '@material-ui/core';
import { FavoriteBorder, AddToQueue, RemoveFromQueue, ThumbUp } from '@material-ui/icons/';

import { addFavorite, removeFavorite } from '../redux/actions/favoritesActions';
import { addToList, removeFromList } from '../redux/actions/watchListActions';

const useStyles = makeStyles({
	root: {
		width: 342,
		height: 450,
	},
});

const MovieDetail = ({ dispatch, favorites, watchList, movie }) => {
	const [videoTrailerID, setVideoTrailerID] = useState(null);

	const fetchVideoTrailerID = async (id) => {
		const url = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.movieAPIKey}&language=en-US`;
		const res = await fetch(url);
		const data = await res.json();

		if (data.results.length > 0) {
			setVideoTrailerID(data.results[0].key);
		}
	};

	const isOnList = (list, id) => {
		return list.includes(id);
	};

	const handleAddFavorite = () => {
		if (!isOnList(favorites, movie.id)) {
			dispatch(addFavorite(movie.id));
		} else {
			dispatch(removeFavorite(movie.id));
		}
	};

	const handleAddToWatchList = () => {
		if (!isOnList(watchList, movie.id)) {
			dispatch(addToList(movie.id));
		} else {
			dispatch(removeFromList(movie.id));
		}
	};
	useEffect(() => {
		fetchVideoTrailerID(movie.id);
	});

	return (
		<div>
			{videoTrailerID ? (
				<div className="video-container">
					<iframe
						width="100%"
						height="100%"
						src={`https://www.youtube.com/embed/${videoTrailerID}`}
						frameBorder="0"
						allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
						allowFullScreen
					></iframe>
				</div>
			) : null}

			<div className="movie-info" style={{ width: '100%' }}>
				<div style={{ display: 'flex' }}>
					<span style={{ justifyContent: 'center' }}>
						<Typography variant="h6" gutterBottom>
							{movie.vote_average * 10}%{' '}
							<ThumbUp
								style={{ position: 'relative', top: '3px' }}
								size="large"
							/>
						</Typography>
					</span>
				</div>

				<div>
					<Typography variant="h4">{movie.original_title}</Typography>
					<p>{moment(movie.release_date).format('M-DD-YYYY')}</p>
					<p>{movie.tagline}</p>
					<p>{movie.overview}</p>
				</div>
				<div>
					<IconButton onClick={handleAddFavorite}>
						<FavoriteBorder
							color={isOnList(favorites, movie.id) ? 'secondary' : 'action'}
						/>
					</IconButton>
					<IconButton onClick={handleAddToWatchList}>
						{isOnList(watchList, movie.id) ? <RemoveFromQueue /> : <AddToQueue />}
					</IconButton>
				</div>
			</div>

			<style jsx>{`
				.movie-info {
					padding: 20px 0px;
					color: black;
				}

				.video-container {
					position: relative;
					height: 100%;
					widkth: 100%;
				}

				.video-container::after {
					padding-top: 56.25%;
					display: block;
					content: '';
				}

				.video-container iframe {
					position: absolute;
					top: 0;
					left: 0;
				}
			`}</style>
		</div>
	);
};

const mapStateToProps = ({ favorites, watchList }) => {
	return { favorites, watchList };
};

export default connect(mapStateToProps)(MovieDetail);
