import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useFetchData(url, urlParameters) {
	const [response, setResponse] = useState([]);

	const fetchData = async () => {
		try {
			const res = await axios.get(url, {
				params: { ...urlParameters },
			});
			console.log(res);
			setResponse(res);
		} catch (error) {
			setResponse(error);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	return response;
}
