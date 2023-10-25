import React from 'react'
import { RiDeleteBin6Line } from 'react-icons/ri';
import { ContactsListButton, ContactsListContainer, ContactsListName } from './ContactsListStyle';
import { useDispatch, useSelector } from "react-redux";
import { setModalDelete, setModalDeleteData } from 'redax/contactsReduser';
import { contactsSelector, filterSelector, isErrorSelector, isLoadingSelector } from 'redax/selector';
import Loader from 'components/Loader/Loader';
import ErrorMessage from 'components/error/Error';

export const ContactsList = () => {
	const error = useSelector(isErrorSelector);
	const isLoader = useSelector(isLoadingSelector);
	const contacts = useSelector(contactsSelector);
	const filter = useSelector(filterSelector);

	const dispatch = useDispatch();


	const onOpenModalDelete = (modalDataDelete) => {
		dispatch(setModalDelete(true));
		dispatch(setModalDeleteData(modalDataDelete));
	}

	const getContacts = () => {
		const normalizedFilter = filter.toLowerCase();
		return contacts.filter(contact =>
			contact.name.toLowerCase().includes(normalizedFilter)
		);
	};

	const filterContacts = getContacts();

	return (
		<ContactsListContainer>
			{isLoader && <Loader />}
			{error && <ErrorMessage message={error} />}
			{filterContacts.map(({ name, number, id }) => {
				return (
					<ContactsListName key={id}>
						<p>{name}: {number}</p>
						<ContactsListButton onClick={() => onOpenModalDelete(id)}><RiDeleteBin6Line /> </ContactsListButton>
					</ContactsListName>
				);
			})
			}
		</ContactsListContainer>
	);
};
