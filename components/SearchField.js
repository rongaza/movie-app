import React, { useState, useEffect, useRef } from 'react';
import { Grid, TextField, Button } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import {CircularProgress } from '@material-ui/core';

const SearchField = ({ searchQuery, clearSearchResults }) => {
	const [searchParameters, setSearchParameters] = useState('');

	const handleOnChange = (e) => {
		setSearchParameters(e.target.value);
	};

	const handleSearchButton = (e) => {
		e.preventDefault();
		if (searchParameters === '') {
			console.log('error');
		} else {
			searchQuery(searchParameters);
		}
	};

	useEffect(() => {
		if (searchParameters === '') {
			clearSearchResults();
		} else {
			searchQuery(searchParameters);
		}
	}, [searchParameters]);

	return (
		<Grid container justify="center">
			<form onSubmit={handleSearchButton}>
				<TextField label="Search" onChange={handleOnChange} style={{ margin: '0px 10px' }} />
				<Button onClick={handleSearchButton} type="submit" variant="contained">
					<SearchIcon />
					Search
				</Button>
			</form>
			<style jsx>{`
				form {
					display: flex;
					justify-conent: center;
					align-items: flex-end;
				}
			`}</style>
		</Grid>
	);
};

export default SearchField;
