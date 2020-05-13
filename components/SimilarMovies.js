import React, { useState } from 'react';
import Link from 'next/link';
import { makeStyles, Card, CardMedia, Typography, Grid } from '@material-ui/core';

const useStyles = makeStyles({
	root: {
		minHeight: 100,
		minWidth: 92,
		margin: 10,
	},
	media: {
		height: 150,
		maxWidth: 92,
	},
});

const SimilarMovies = ({ movies }) => {
	const classes = useStyles();

	return (
		<div className="wrapper">
			<Grid item>
				<Typography variant="h5" style={{ marginBottom: '30px' }}>
					Similar Movies
				</Typography>
			</Grid>
			<div className="movie-list">
				{movies.results.length > 0 ? (
					movies.results.map((movie) => {
						return (
							<Link
								href={{
									pathname: '/details/[title]/[id]',
									query: {
										movieid: movie.id,
									},
								}}
								as={`/details/${movie.title.split(' ').join('-')}/${
									movie.id
								}`}
								key={movie.id}
							>
								<a>
									<Card className={classes.root}>
										<CardMedia
											className={classes.media}
											image={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
										/>
									</Card>
								</a>
							</Link>
						);
					})
				) : (
					<div>There are no similar movies</div>
				)}
			</div>
			<style jsx>{`
				.wrapper {
					margin-top: 30px;
					margin-bottom: 100px;
					padding: 10px;
				}
				.movie-list {
					display: flex;
					flex-wrap: nowrap;
					max-height: 325px;
					padding-bottom: 20px;
					overflow-x: auto;
					overflow-y: hidden;
				}
			`}</style>
		</div>
	);
};

export default SimilarMovies;
