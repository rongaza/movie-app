import React, { useState } from 'react';
import { makeStyles, Grid, Paper, Typography, Card, CardContent } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import ChatBubbleOutlinedIcon from '@material-ui/icons/ChatBubbleOutlined';
import PersonIcon from '@material-ui/icons/Person';

const useStyles = makeStyles({
	root: {
		minHeight: 200,
		maxHeight: 285,
		overflowY: 'hidden',
		margin: 'auto',
		marginTop: 10,
		padding: 10,
		paddingBottom: 50,
		width: '95%',
	},
});

const Reviews = ({ reviews }) => {
	const classes = useStyles();
	const [reviewNumber, setReviewNumber] = useState(1);

	const handleChangeReview = (e, value) => {
		setReviewNumber(() => value);
	};

	return (
		<div className="wrapper">
			<Typography variant="h5" style={{ marginBottom: '30px' }}>
				Reviews{' '}
				<ChatBubbleOutlinedIcon
					style={{
						position: 'relative',
						top: '6px',
					}}
				/>
			</Typography>
			{reviews.results.length > 0 ? (
				<React.Fragment>
					<Paper className={classes.root} elevation={5}>
						<div
							style={{
								paddingBottom: '10px',
								height: '270px',
								overflowY: 'scroll',
							}}
						>
							<Grid container direction="column">
								<Grid item>
									<Typography variant="h6" gutterBottom>
										<PersonIcon
											style={{
												position: 'relative',
												top: '-2px',
											}}
										/>{' '}
										{
											reviews.results[
												reviewNumber - 1
											].author
										}
									</Typography>
								</Grid>
								<Grid item>
									{reviews.results[reviewNumber - 1].content
										.split('\n')
										.map((i, key) => {
											return (
												<Typography
													variant="body2"
													color="textSecondary"
													component="p"
													gutterBottom
													key={key}
												>
													{i}
												</Typography>
											);
										})}
								</Grid>
							</Grid>
						</div>
					</Paper>
					<Grid container justify="center">
						<Pagination
							count={reviews.results.length}
							page={reviewNumber}
							siblingCount={0}
							onChange={handleChangeReview}
							style={{ marginTop: '30px' }}
						/>
					</Grid>
				</React.Fragment>
			) : (
				<Card className={classes.root}>
					<CardContent>There are no reviews for this movie</CardContent>
				</Card>
			)}

			<style jsx>{`
				.wrapper {
					margin-top: 30px;
					margin-bottom: 30px;
					maxheight: 380px;
					width: 100%;
					padding: 10px;
				}
			`}</style>
		</div>
	);
};

export default Reviews;
