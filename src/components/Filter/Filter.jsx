
import React from 'react'
import { FilterInput, FilterLabel, FilterSpan } from './FilterStyle'
import { BsSearch } from 'react-icons/bs';
import { setFilter } from 'redax/contactsReduser';
import { useSelector, useDispatch } from 'react-redux';
import { filterSelector } from 'redax/selector';

export const Filter = () => {
	const filter = useSelector(filterSelector);
	const dispatch = useDispatch();

	const changeFilter = e => {
		dispatch(setFilter(e.currentTarget.value.toLowerCase()));
	};


	return (
		<FilterLabel>
			<FilterSpan><BsSearch /></FilterSpan>
			<FilterInput type="text"
				name="filter"
				title="Enter search name"
				onChange={changeFilter}
				value={filter}
				required />
		</FilterLabel>

	)
}
