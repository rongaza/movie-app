import React, { useState } from 'react';
import ListMovies from '../components/ListMovies';
import Layout from '../components/Layout';
import SearchField from '../components/SearchField';
import { Grid, CircularProgress, LinearProgress } from '@material-ui/core';
import axios from 'axios';

const SandBox = (props) => {
	const [results, setResults] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [showLoadingBar, setShowLoadingBar] = useState(false);
	const [error, setError] = useState(null);

	const urlParams = {
		api_key: process.env.movieAPIKey,
		language: 'en-US',
		page: '1',
		include_adult: 'false',
	};
	const url = 'https://api.themoviedb.org/3/search/movie/';

	const searchQuery = (query) => {
		handleFetchData(url, query);
	};

	const clearSearchResults = () => {
		setResults([]);
	};

	const handleFetchData = (url, query) => {
		setIsLoading(true);
		fetchData(url, query);
		setTimeout(() => {
			setIsLoading(false);
		}, 500);
		setShowLoadingBar(false);
	};

	const fetchData = async (url, query) => {
		try {
			const res = await axios.get(url, {
				params: { ...urlParams, query: query },
			});
			const data = res.data.results;
			setResults(data);
		} catch (error) {
			console.log(error);
			setError(error);
		}
	};

	const renderResults = () => {
		if (error) {
			return <div>There was an {error} error</div>;
		} else {
			return <ListMovies movies={results} />;
		}
	};

	return (
		<Layout>
			{error && <p>{error.status}</p>}
			<SearchField searchQuery={searchQuery} clearSearchResults={clearSearchResults} />

			{isLoading ? (
				<div style={{ width: '100%', marginTop: '20px' }}>
					<LinearProgress color="secondary" />
				</div>
			) : (
				<div className="display-list">{renderResults()}</div>
			)}
			<style jsx>{`
				.wrapper {
					display: flex;
					justify-content: center;
				}

				.content {
					display: flex;
					flex-wrap: nowrap;
				}
				.pagination {
					display: flex;
					justify-content: center;
					width: 100%;
					margin: 50px 0px;
				}
				.display-list {
					display: flex;
					flex-wrap: wrap;
					justify-content: center;
					margin-top: 20px;
				}
			`}</style>
		</Layout>
	);
};

export default SandBox;
