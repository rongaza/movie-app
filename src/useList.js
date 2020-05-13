import { useState } from 'react';

export function useList() {
	const [list, setList] = useState([]);

	// add to watch list
	const toggleItem = (id) => {
		if (!listIncludes(id)) {
			setList((list) => [...list, id]);
		} else {
			const updatedList = list.filter((item) => item !== id);
			setList(updatedList);
		}
	};

	const listIncludes = (id) => {
		return list.includes(id);
	};

	return { list, toggleItem, listIncludes };
}
