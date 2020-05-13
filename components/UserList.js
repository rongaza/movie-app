import React from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';
import { addFavorite, removeFavorite } from '../redux/actions/favoritesActions';
import { addToList, removeFromList } from '../redux/actions/watchListActions';
import { makeStyles, Grid, Card, CardMedia, CardContent, IconButton, CardActionArea } from '@material-ui/core';
import { FavoriteBorder, AddToQueue, RemoveFromQueue } from '@material-ui/icons/';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		flexDirection: 'column',
		margin: 10,
		minWidth: 160,
		minHeight: 300,
	},
	card: {
		// margin: 10,
	},

	media: {
		height: 230,
		minWidth: 150,
		marginTop: 5,
	},
}));

const UserList = ({ movie, favorites, watchList, dispatch }) => {
	const classes = useStyles();

	const isOnList = (list, id) => {
		return list.includes(id);
	};

	const handleAddFavorite = (id) => {
		if (!isOnList(favorites, id)) {
			dispatch(addFavorite(id));
		} else {
			dispatch(removeFavorite(id));
		}
	};

	const handleAddToWatchList = (id) => {
		if (!isOnList(watchList, id)) {
			dispatch(addToList(id));
		} else {
			dispatch(removeFromList(id));
		}
	};

	return (
		<Card className={classes.root} key={movie.id}>
			<Link
				href={{
					pathname: '/details/[title]/[id]',
					query: {
						movieid: movie.id,
					},
				}}
				as={`/details/${movie.title.split(' ').join('-')}/${movie.id}`}
			>
				<CardActionArea>
					<CardMedia
						className={classes.media}
						image={
							movie.poster_path
								? `https://image.tmdb.org/t/p/w342${movie.poster_path}`
								: '/profilePhoto.jpg'
						}
					/>
				</CardActionArea>
			</Link>
			<CardContent>
				<Grid container justify="center">
					<IconButton onClick={() => handleAddFavorite(movie.id)}>
						<FavoriteBorder
							color={isOnList(favorites, movie.id) ? 'secondary' : 'action'}
						/>
					</IconButton>
					<IconButton onClick={() => handleAddToWatchList(movie.id)}>
						{isOnList(watchList, movie.id) ? <RemoveFromQueue /> : <AddToQueue />}
					</IconButton>
				</Grid>
			</CardContent>
		</Card>
	);
};

const mapStateToProps = ({ favorites, watchList }) => {
	return { favorites, watchList };
};

export default connect(mapStateToProps)(UserList);
