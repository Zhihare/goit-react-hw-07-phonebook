
import { createSlice } from "@reduxjs/toolkit";
import { fetchContacts, addContact, deleteContact } from "./operations";

const { LightTheme } = require("constants/DarkMode");


const INITIAL_STATE = {
	contacts: {
		items: [],
		isLoading: false,
		error: null,
	},
	filter: '',
	modal: false,
	modalData: null,
	modalDelete: false,
	modalDeleteData: null,
	themes: LightTheme,

}


const handlePending = state => {
	state.contacts.isLoading = true;
};

const handleRejected = (state, action) => {
	state.contacts.isLoading = false;
	state.contacts.error = action.payload;
};

const contactsSlice = createSlice({
	name: 'contacts',
	// Початковий стан редюсера слайсу
	initialState: INITIAL_STATE,

	// name: "tasks",
	// initialState: {
	// 	items: [],
	// 	isLoading: false,
	// 	error: null,
	// },
	reducers: {
		setFilter(state, action) {
			state.filter = action.payload;
		},
		setModal(state, action) {
			state.modal = action.payload;
		},
		setModalData(state, action) {
			state.modalData = action.payload;
		},
		setModalDelete(state, action) {
			state.modalDelete = action.payload;
		},
		setModalDeleteData(state, action) {
			state.modalDeleteData = action.payload;
		},
		setTheme(state, action) {
			state.themes = action.payload;
		},
	},

	extraReducers: {
		[fetchContacts.pending]: handlePending,
		[fetchContacts.fulfilled](state, action) {
			state.contacts.isLoading = false;
			state.contacts.error = null;
			state.contacts.items = action.payload;
		},
		[fetchContacts.rejected]: handleRejected,
		[addContact.pending]: handlePending,
		[addContact.fulfilled](state, action) {
			state.contacts.isLoading = false;
			state.contacts.error = null;
			state.contacts.items.push(action.payload);
		},
		[addContact.rejected]: handleRejected,
		[deleteContact.pending]: handlePending,
		[deleteContact.fulfilled](state, action) {
			state.contacts.isLoading = false;
			state.contacts.error = null;
			const index = state.contacts.items.findIndex(item => item.id === action.payload.id);
			state.contacts.items.splice(index, 1);

			console.log(action.payload);
		},
		[deleteContact.rejected]: handleRejected,
	}
})
export const { setContacts, setDeleteContacts, setFilter, setModal, setModalData, setModalDelete, setModalDeleteData, setTheme } =
	contactsSlice.actions;
// Редюсер слайсу
export const contactsReducer = contactsSlice.reducer;



// const contactsSlice = createSlice({
// 	// Ім'я слайсу
// 	name: 'contacts',
// 	// Початковий стан редюсера слайсу
// 	initialState: INITIAL_STATE,
// reducers: {
// 	setContacts(state, action) {
// 		state.contacts.push(action.payload);
// 	},
// 	setDeleteContacts(state, action) {
// 		state.contacts = state.contacts.filter(contact => contact.name !== action.payload);
// 	},
// 	setFilter(state, action) {
// 		state.filter = action.payload;
// 	},
// 	setModal(state, action) {
// 		state.modal = action.payload;
// 	},
// 	setModalData(state, action) {
// 		state.modalData = action.payload;
// 	},
// 	setModalDelete(state, action) {
// 		state.modalDelete = action.payload;
// 	},
// 	setModalDeleteData(state, action) {
// 		state.modalDeleteData = action.payload;
// 	},
// 	setTheme(state, action) {
// 		state.themes = action.payload;
// 	},
// },
// });

// export const { setContacts, setDeleteContacts, setFilter, setModal, setModalData, setModalDelete, setModalDeleteData, setTheme } =
// 	contactsSlice.actions;
// // Редюсер слайсу
// export const contactsReducer = contactsSlice.reducer;
