import React, { useState, useEffect, useRef } from 'react';
import {} from '@material-ui/core/styles';
import { makeStyles, MenuItem, FormControl, Slider, Select, Typography, Button, Grid } from '@material-ui/core/';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

import MomentUtils from '@date-io/moment';

import {
	getCertificationParameters,
	getGenreParameters,
	getStartingDateParameters,
	getEndingDateParameters,
	getSortOrder,
	getVoteRating,
} from '../src/lib';

const useStyles = makeStyles((theme) => ({
	container: {
		display: 'grid',
	},
	filterItem: {
		alignContent: 'flex-start',
		marginBottom: '35px',
	},
	buttonList: {
		marginRight: 2,
		marginBottom: 5,
	},
}));

const FilterResults = ({ updateSearchParameters, search, toggleSearchButton }) => {
	const classes = useStyles();

	const [sortOrder, setSortOrder] = useState('popularity.desc');
	const [openSort, setOpenSort] = useState(true);
	const [startingDate, setStartingDate] = useState(null);
	const [endingDate, setEndingDate] = useState(null);
	const [genres, setGenres] = useState([]);
	const [certifications, setCertifications] = useState([]);
	const [voterRating, setVoterRating] = useState([0, 10]);

	const isInitialMount = useRef(true);

	const sortValues = [
		{ name: 'Popularity Descending', value: 'popularity.desc' },
		{ name: 'Popularity Ascending', value: 'popularity.asc' },
		{ name: 'Rating Descending', value: 'vote_average.desc' },
		{ name: 'Rating Ascending', value: 'vote_average.asc' },
		{ name: 'Release Date Descending', value: 'primary_release_date.desc' },
		{ name: 'Release Date Ascending', value: 'primary_release_date.asc' },
		{ name: 'Title (A-Z)', value: 'original_title.desc' },
		{ name: 'Title (Z-A)', value: 'original_title.asc' },
	];

	const genreCategories = [
		{ name: 'Action', value: 28 },
		{ name: 'Adventure', value: 12 },
		{ name: 'Animation', value: 16 },
		{ name: 'Comedy', value: 35 },
		{ name: 'Crime', value: 80 },
		{ name: 'Drama', value: 99 },
		{ name: 'Family', value: 18 },
		{ name: 'Fantasy', value: 14 },
		{ name: 'History', value: 36 },
		{ name: 'Horror', value: 27 },
		{ name: 'Music', value: 10402 },
		{ name: 'Mystery', value: 9648 },
		{ name: 'Romance', value: 10749 },
		{ name: 'Science Fiction', value: 878 },
		{ name: 'TV Movie', value: 10770 },
		{ name: 'Thriller', value: 53 },
		{ name: 'War', value: 10752 },
		{ name: 'Western', value: 37 },
	];

	const certificationList = ['NR', 'G', 'PG', 'PG-13', 'R', 'NC-17'];

	const handleSortOrder = (event) => {
		setSortOrder(event.target.value);
	};

	const handleDateChange = (date) => {
		setStartingDate(date);
	};

	const handleSetGenres = (e) => {
		const value = parseInt(e.currentTarget.value);
		if (genres.includes(value)) {
			let newGenres = genres.filter((genre) => genre !== value);
			setGenres(newGenres);
		} else {
			setGenres([...genres, value]);
		}
	};

	const handleSetCertifications = (e) => {
		const value = e.currentTarget.value;
		if (certifications.includes(value)) {
			let updatedCerts = certifications.filter((certification) => certification !== value);
			setCertifications(updatedCerts);
		} else {
			setCertifications([...certifications, value]);
		}
	};

	const handleVoterRating = (e, newValue) => {
		console.log(newValue);
		setVoterRating(newValue);
	};

	const handleSearchButton = () => {
		let tmpParams = {};
		[
			getStartingDateParameters(startingDate),
			getEndingDateParameters(endingDate),
			getCertificationParameters(certifications),
			getGenreParameters(genres),
			getSortOrder(sortOrder),
		].forEach((param) => {
			if (param !== null) {
				tmpParams = { ...tmpParams, ...param };
			}
		});

		return search(tmpParams);
	};

	const handleUpdateSearchParameters = () => {
		let tmpParams = {};
		[
			getStartingDateParameters(startingDate),
			getEndingDateParameters(endingDate),
			getCertificationParameters(certifications),
			getGenreParameters(genres),
			getSortOrder(sortOrder),
			getVoteRating(voterRating),
		].forEach((param) => {
			if (param !== null) {
				tmpParams = { ...tmpParams, ...param };
			}
		});
		updateSearchParameters(tmpParams);
	};

	const handleClearSearchButton = () => {
		setStartingDate(null);
		setEndingDate(null);
		setGenres([]);
		setCertifications([]);
		setVoterRating([0, 10]);
	};

	useEffect(() => {
		if (isInitialMount.current) {
			isInitialMount.current = false;
		} else {
			handleUpdateSearchParameters();
		}
	}, [startingDate, endingDate, certifications, genres, sortOrder, voterRating]);

	return (
		<React.Fragment>
			<ExpansionPanel>
				<ExpansionPanelSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel1a-content"
					id="panel1a-header"
				>
					<Typography variant="h6">Sort</Typography>
				</ExpansionPanelSummary>
				<ExpansionPanelDetails>
					<FormControl>
						<Select
							labelId="sort-select"
							id="sort-select"
							value={sortOrder}
							onChange={handleSortOrder}
							onOpen={() => setOpenSort(true)}
							onClose={() => setOpenSort(false)}
						>
							{sortValues.map((selectItem) => {
								return (
									<MenuItem
										value={selectItem.value}
										key={selectItem.name}
									>
										{selectItem.name}
									</MenuItem>
								);
							})}
						</Select>
					</FormControl>
				</ExpansionPanelDetails>
			</ExpansionPanel>

			<ExpansionPanel defaultExpanded={false}>
				<ExpansionPanelSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel1a-content"
					id="panel1a-header"
				>
					<Typography variant="h6">Filters</Typography>
				</ExpansionPanelSummary>
				<ExpansionPanelDetails>
					<form>
						<FormControl>
							<Grid container direction={'column'} spacing={3}>
								<Grid item>
									<Typography variant="body1">
										Date Range
									</Typography>
								</Grid>
								<MuiPickersUtilsProvider utils={MomentUtils}>
									<Grid item>
										<KeyboardDatePicker
											disableToolbar
											id="date-picker-inline"
											label="starting date"
											value={startingDate}
											onChange={(date) =>
												setStartingDate(date)
											}
											KeyboardButtonProps={{
												'aria-label':
													'change date',
											}}
											style={{
												marginBottom: '5px',
											}}
										/>
										<KeyboardDatePicker
											disableToolbar
											id="date-picker-inline"
											label="ending date"
											value={endingDate}
											onChange={(date) =>
												setEndingDate(date)
											}
										/>
									</Grid>
								</MuiPickersUtilsProvider>

								<Grid item>
									<Typography variant="body1">Genres</Typography>
								</Grid>
								<Grid container wrap={'wrap'}>
									{genreCategories.map((genre) => {
										return (
											<Button
												className={
													classes.buttonList
												}
												key={genre.value}
												size="small"
												variant={
													genres.includes(
														genre.value
													)
														? 'contained'
														: 'outlined'
												}
												color="primary"
												value={genre.value}
												onClick={
													handleSetGenres
												}
											>
												{genre.name}
											</Button>
										);
									})}
								</Grid>

								<Grid item>
									<Typography variant="body1">Ratings</Typography>
								</Grid>
								<Grid container wrap={'wrap'}>
									{certificationList.map((cert) => {
										return (
											<Button
												key={cert}
												className={
													classes.buttonList
												}
												size="small"
												variant={
													certifications.includes(
														cert
													)
														? 'contained'
														: 'outlined'
												}
												color="primary"
												value={cert}
												onClick={
													handleSetCertifications
												}
											>
												{cert}
											</Button>
										);
									})}
								</Grid>

								<Grid item>
									<Grid container>
										<Typography variant="body1">
											Audience Score
										</Typography>
										<Slider
											value={voterRating}
											max={10}
											min={0}
											onChange={handleVoterRating}
										/>
									</Grid>
								</Grid>
								<Grid item>
									<Button
										variant="contained"
										color="primary"
										onClick={handleSearchButton}
										style={{ marginRight: '5px' }}
									>
										Search
									</Button>
									<Button
										variant="outlined"
										color="primary"
										onClick={handleClearSearchButton}
									>
										Clear
									</Button>
								</Grid>
							</Grid>
						</FormControl>
					</form>
				</ExpansionPanelDetails>
			</ExpansionPanel>
			<style jsx>{`
				.filter-item {
					align-content: flex-start;
					margin-bottom: 55px;
				}
				.button-list {
					display: flex;
					flex-wrap: wrap;
				}
			`}</style>
		</React.Fragment>
	);
};

export default FilterResults;
