import React from 'react'
import { RiDeleteBin6Line } from 'react-icons/ri';
import { ContactsListButton, ContactsListContainer, ContactsListName } from './ContactsListStyle';
import { useDispatch, useSelector } from "react-redux";
import { setModalDelete, setModalDeleteData } from 'redax/contactsReduser';
import { contactsSelector, filterSelector } from 'redax/selector';

export const ContactsList = () => {

	const contacts = useSelector(contactsSelector);
	const filter = useSelector(filterSelector);

	const dispatch = useDispatch();


	const onOpenModalDelete = (modalDataDelete) => {
		dispatch(setModalDelete(true));
		dispatch(setModalDeleteData(modalDataDelete));
	}

	const getContacts = () => {
		const normalizedFilter = filter.toLowerCase();
		return console.log(contacts),
			contacts.filter(contact =>
				contact.name.toLowerCase().includes(normalizedFilter)
			);
	};

	const filterContacts = getContacts();

	return (
		<ContactsListContainer>
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
