import React from 'react';
import Link from 'next/link';
import { makeStyles, Card, CardMedia, CardContent, Avatar, Typography, Grid, FormHelperText } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import { useMediaQuery } from 'react-responsive';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		flexDirection: 'column',
		margin: 10,
		width: 165,
	},
	card: {
		// margin: 10,
	},

	media: {
		height: 250,
		width: 165,
		marginTop: 5,
	},
}));

const ListMovies = ({ movies }) => {
	const classes = useStyles();

	return (
		<React.Fragment>
			{movies.map((movie) => {
				return (
					<Card key={movie.id} className={classes.root}>
						<Grid container justify="center">
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
							>
								<a>
									<CardMedia
										className={classes.media}
										image={
											movie.poster_path
												? `https://image.tmdb.org/t/p/w185${movie.poster_path}`
												: '/profilePhoto.jpg'
										}
									/>
								</a>
							</Link>
						</Grid>
						<CardContent
							className={classes.movieInfo}
							style={{ textOverflow: 'wrap' }}
						>
							<Grid container alignItems="center" direction="column">
								<Grid item>
									<Link
										href={{
											pathname:
												'/details/[title]/[id]',
											query: {
												movieid: movie.id,
											},
										}}
										as={`/details/${movie.title
											.split(' ')
											.join('-')}/${movie.id}`}
									>
										<a style={{ textDecoration: 'none' }}>
											<Typography variant="body1">
												{movie.title}
											</Typography>
										</a>
									</Link>
								</Grid>

								<Grid item style={{ marginTop: '0px' }}>
									<Typography variant="caption" gutterBottom>
										{moment(movie.release_date).format('L')}
									</Typography>
								</Grid>

								<Grid item style={{ marginTop: '10px' }}>
									{movie.vote_average * 10}%{'  '}
									<ThumbUpIcon
										style={{
											position: 'relative',
											top: '4px',
										}}
										fontSize="small"
									/>
								</Grid>
							</Grid>
						</CardContent>
					</Card>
				);
			})}
		</React.Fragment>
	);
};

export default ListMovies;
