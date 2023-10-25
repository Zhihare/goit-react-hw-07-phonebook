
import { GoSun } from 'react-icons/go';
import { HiMoon } from 'react-icons/hi';
import { ContactsForm } from "./ContactsForm/ContactsForm";
import { ContactsList } from "./ContactsList/ContactsList";
import { Filter } from "./Filter/Filter";
import { ConteinerApp, ContentApp, TitleApp, ToogleDarkMode } from "./AppStyle";
import { Modal } from "./Modal/Modal";
import { ModalDelete } from "./ModalDelete/ModalDelete";
import { ThemeProvider } from "styled-components";
import { DarkTheme, LightTheme } from "constants/DarkMode";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "redax/contactsReduser";
import { modalDeleteSelector, modalSelector, themesSelector } from 'redax/selector';
import { fetchContacts } from 'redax/operations';
import { useEffect } from 'react';


export function App() {

  const modal = useSelector(modalSelector);
  const modalDelete = useSelector(modalDeleteSelector);
  const themes = useSelector(themesSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const changeTheme = () => {
    if (themes === LightTheme) {
      dispatch(setTheme(DarkTheme));
      return;
    }
    if (themes !== LightTheme) {
      dispatch(setTheme(LightTheme));
      return;
    }
  };

  const icon = themes === LightTheme ?
    <HiMoon size={30} /> :
    <GoSun size={30} />;

  return (
    <ThemeProvider theme={{ themes }} >
      <ConteinerApp>
        <ContentApp>
          <TitleApp title="Phonebook">Phonebook</TitleApp>
          <ContactsForm />
          <TitleApp>Contacts</TitleApp>
          <Filter />
          <ContactsList />
          <ToogleDarkMode onClick={changeTheme}>{icon}</ToogleDarkMode>

          {modal && <Modal />}

          {modalDelete && <ModalDelete />}
        </ContentApp>
      </ConteinerApp>
    </ThemeProvider>
  );

};
