import moment from 'moment';

export const checkStatus = (response, callback) => {
	if (response.ok) {
		callback(null);
		return response;
	} else {
		console.log(response);
		let error = new Error(response.statusText);
		error.response = response;
		return Promise.reject(error).catch((error) => {
			callback(error.response);
		});
	}
};

export const getCertificationParameters = (certList) => {
	if (certList.length === 0) return null;
	let certOrder = ['NR', 'G', 'PG', 'PG-13', 'R', 'NC-17'];
	let tmp = [];

	certOrder.forEach((cert) => {
		if (certList.includes(cert)) {
			tmp.push(cert);
		}
	});

	return {
		certification: tmp.join('|'),
	};
};

export const getGenreParameters = (genres) => {
	if (genres.length === 0) return null;
	// return `&with_genres=${genres.join(',')}`;
	return { with_genres: genres.join(',') };
};

export const getStartingDateParameters = (date) => {
	if (date === null) return null;
	return { 'primary_release_date.gte': moment(date).format('YYYY-MM-DD') };
};

export const getEndingDateParameters = (date) => {
	if (date === null) return null;
	return { 'primary_release_date.lte': moment(date).format('YYYY-MM-DD') };
};

export const getSortOrder = (sort) => {
	return { sort_by: sort };
};

export const getVoteRating = (rating) => {
	const start = rating[0];
	const end = rating[1];

	return {
		'vote_average.lte': end,
		'vote_average.gte': start,
	};
};
