import React, { useState } from 'react'
import { ContainerContactsForm, ContainerContactsLabel, ConteinerContactsButton, ConteinerContactsInput } from './CotactsFormStyle';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter, setModal, setModalData } from 'redax/contactsReduser';
import { nanoid } from "nanoid";
import { contactsSelector } from 'redax/selector';
import { addContact } from 'redax/operations';
import { toast } from 'react-toastify';

export const ContactsForm = () => {
	const contacts = useSelector(contactsSelector);
	const dispatch = useDispatch();

	const [name, setName] = useState('');
	const [number, setNumber] = useState('');


	const onOpenModal = (modalData) => {
		dispatch(setModal(true));
		dispatch(setModalData(modalData));
	}

	const handleAddContact = (name, number) => {

		if (contacts.some(contact => contact.name === name)) {
			toast.error(` A contact has already been created for this name: ${name}`, {
				position: "top-left",
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "dark",
			});
			return;
		}
		if (contacts.some(contact => contact.number === number)) {
			toast.error(` A contact has already been created for this number: ${number}`, {
				position: "top-left",
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "dark",
			});
			return;
		}

		const newContact = {
			id: nanoid(),
			name,
			number,
		};

		onOpenModal(name);
		dispatch(addContact(newContact));

		reset();
	};

	const reset = () => {
		dispatch(setFilter(''));
	};


	const handleNameChenge = event => {
		setName(event.target.value)
	}

	const handleNumberChenge = event => {
		setNumber(event.target.value)
	}


	const handleSubmit = event => {
		event.preventDefault();
		handleAddContact(name, number);
		setName('');
		setNumber('');

	}
	return (
		<ContainerContactsForm onSubmit={handleSubmit}>
			<ContainerContactsLabel>
				<span>Name</span>
				<ConteinerContactsInput onChange={handleNameChenge} value={name} type="text" name="name" required />
			</ContainerContactsLabel>
			<ContainerContactsLabel>
				<span>Number</span>
				<ConteinerContactsInput onChange={handleNumberChenge} value={number} type="tel" name="number" required />
			</ContainerContactsLabel>
			<ConteinerContactsButton type="submit" >Add contact</ConteinerContactsButton>
		</ContainerContactsForm >
	)
}

