import { useState } from 'react';
import Layout from '../../../components/Layout';
import { useRouter } from 'next/router';
import { Divider, Grid, CircularProgress } from '@material-ui/core';

import Cast from '../../../components/Cast';
import MovieDetail from '../../../components/MovieDetail';
import SimilarMovies from '../../../components/SimilarMovies';
import Reviews from '../../../components/Reviews';

import { fetchMovieDetails, fetchMovieCast, fetchMovieReviews, fetchSimilarMovies } from '../../../src/api/api';

const Details = ({ movieDetails, movieCast, movieReviews, similarMovies }) => {
	const [isLoading, setIsLoading] = useState(true);
	const router = useRouter();

	setTimeout(() => {
		setIsLoading(false);
	}, 600);

	return (
		<Layout>
			<div className="wrapper">
				{!isLoading ? (
					<React.Fragment>
						<MovieDetail movie={movieDetails} />
						<Divider variant="middle" />
						<Cast cast={movieCast} />
						<Divider variant="middle" />
						<Reviews reviews={movieReviews} />
						<Divider variant="middle" />
						<SimilarMovies movies={similarMovies} />
					</React.Fragment>
				) : (
					<Grid container justify="center">
						<CircularProgress />
					</Grid>
				)}

				<style jsx>{`
					.wrapper {
						max-width: 1000px;
						margin: auto;
						width: 70%;
					}
				`}</style>
			</div>
		</Layout>
	);
};

export async function getServerSideProps({ query }) {
	const id = query.id;
	const movieDetails = await fetchMovieDetails(id);
	const movieCast = await fetchMovieCast(id);
	const movieReviews = await fetchMovieReviews(id);
	const similarMovies = await fetchSimilarMovies(id);

	return { props: { movieDetails, movieCast, movieReviews, similarMovies } };
}

export default Details;
