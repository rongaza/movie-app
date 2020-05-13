import { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import { fetchData } from '../src/api/api';
import Layout from '../components/Layout';
import {
	makeStyles,
	Grid,
	Card,
	CardMedia,
	CardContent,
	IconButton,
	CardActionArea,
	Typography,
} from '@material-ui/core';
import { CircularProgress } from '@material-ui/core';

import { addFavorite, removeFavorite } from '../redux/actions/favoritesActions';
import { addToList, removeFromList } from '../redux/actions/watchListActions';

import ListMovies from '../components/ListMovies';
import UserList from '../components/UserList';

const Lists = ({ dispatch, favorites, watch }) => {
	const [isLoading, setIsLoading] = useState(true);
	const [favoritesList, setFavoritesList] = useState([]);
	const [watchList, setWatchList] = useState([]);

	const fetchListData = async (favorites) => {
		const list = [];

		for (let i = 0; i < favorites.length; i++) {
			const id = favorites[i];
			const url = `https://api.themoviedb.org/3/movie/${id}`;
			const urlParams = { api_key: process.env.movieAPIKey };
			const details = await fetchData(url, urlParams);
			list.push(details);
		}
		return list;
	};

	const getListData = async () => {
		const favList = await fetchListData(favorites);
		const watList = await fetchListData(watch);
		setFavoritesList(favList);
		setWatchList(watList);
		setTimeout(() => {
			setIsLoading(false);
		}, 500);
	};

	const renderList = (list) => {
		if (list.length > 0) {
			return list.map((movie) => <UserList movie={movie} />);
		} else {
			return <Typography>There are no movies in this list.</Typography>;
		}
	};

	useEffect(() => {
		getListData();
	}, [favorites, watch]);

	return (
		<Layout>
			<div>
				{isLoading ? (
					<Grid container justify="center">
						<CircularProgress />
					</Grid>
				) : (
					<React.Fragment>
						<div className="wrapper">
							<Typography variant="h5" gutterBottom>
								Favorites
							</Typography>
							<div className="display-list">{renderList(favoritesList)}</div>
						</div>
						<div className="wrapper">
							<Typography variant="h5" gutterBottom>
								Watch List
							</Typography>
							<div className="display-list">{renderList(watchList)}</div>
						</div>
						;
					</React.Fragment>
				)}
			</div>
			<style jsx>{`
				.wrapper {
					max-width: 1000px;
					margin: auto;
					width: 90%;
				}
				.loading-wrapper {
					display: flex;
					max-width: 1000px;
					margin: auto;
					width: 50%;
				}
				.display-list {
					display: flex;
					width: 100%;
					flex-wrap: nowrap;
					overflow-x: auto;
					max-height: auto;
					min-height: 300px;
					overflow-y: hidden;
					margin-bottom: 20px;
				}
			`}</style>
		</Layout>
	);
};

const mapStateToProps = ({ favorites, watchList }) => {
	return { favorites, watch: watchList };
};

export default connect(mapStateToProps)(Lists);
