import React from 'react'

import { ConteinerContactsButton } from 'components/ContactsForm/CotactsFormStyle';
import { ModalTitle, ModalWindow, Overlay } from 'components/Modal/ModalStyle';
import { setModalDelete, setModalDeleteData } from 'redax/contactsReduser';
import { useDispatch, useSelector } from 'react-redux';
import { modalDeleteDataSelector } from 'redax/selector';
import { deleteContact } from 'redax/operations';

export function ModalDelete() {
	const modalDeleteData = useSelector(modalDeleteDataSelector);
	const dispatch = useDispatch();

	const handleDelete = contactId => {
		dispatch(deleteContact(contactId));
	}

	const onCloseModalDelete = () => {
		dispatch(setModalDelete(false));
		dispatch(setModalDeleteData(null));
	}

	const deleteNumber = () => {
		handleDelete(modalDeleteData);
		onCloseModalDelete();
	}




	return (
		<Overlay>
			<ModalWindow>
				<ModalTitle>Are you sure want to delete this contact?</ModalTitle>
				<ConteinerContactsButton type="button"
					style={{
						width: '150px', height: '60px',
					}}
					onClick={() => deleteNumber()}>
					Yes</ConteinerContactsButton>
				<ConteinerContactsButton type="button"
					style={{
						width: '150px', height: '60px',
					}}
					onClick={() => onCloseModalDelete()}
				>No</ConteinerContactsButton>
			</ModalWindow>
		</Overlay>
	)
}
