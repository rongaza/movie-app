import React from 'react';
import { makeStyles, Grid, Card, CardMedia, CardContent, Typography } from '@material-ui/core';

const useStyles = makeStyles({
	root: {
		minWidth: 150,
		minHeight: 300,
		margin: 10,
	},
	media: {
		height: 200,
	},
});
const Cast = ({ cast }) => {
	const classes = useStyles();

	return (
		<div className="wrapper">
			<Grid item>
				<Typography variant="h5" style={{ marginBottom: '30px' }}>
					Cast
				</Typography>
			</Grid>
			<div className="horizontal-list">
				{cast.map((actor) => {
					return (
						<Card key={actor.id} className={classes.root}>
							{actor.profile_path !== null ? (
								<CardMedia
									className={classes.media}
									image={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
									src={actor.name}
								/>
							) : (
								<CardMedia
									className={classes.media}
									image={'/profilePhoto.jpg'}
									src={actor.name}
								/>
							)}
							<CardContent>
								<Typography variant="body1">
									{actor.character}
								</Typography>
								<Typography variant="caption">{actor.name}</Typography>
							</CardContent>
						</Card>
					);
				})}
			</div>

			<style jsx>{`
				.wrapper {
					height: auto;
					margin: 20px 0px;
					padding: 20px 5px;
				}
				.horizontal-list {
					display: flex;
					flex-wrap: nowrap;
					overflow-x: scroll;
					max-height: auto;
					overflow-y: hidden;
				}
			`}</style>
		</div>
	);
};

export default Cast;
