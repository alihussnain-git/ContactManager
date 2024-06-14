import React, {useCallback, useEffect} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {EmptyScreen, FloatingActionButton} from '../../components';
import {useContacts} from '../../hooks';
import {ContactItem} from './components/ContactItem';
import {Contact} from 'react-native-contacts';
import {NavigationRoutes} from '../../navigation/routes';
import {SyncButton} from './components/SyncButton';
import {HomeScreenNavigationProp} from 'navigation/types';

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  const {navigate} = navigation;

  const {contacts, permissionDenied, syncContacts} = useContacts();

  useEffect(() => {
    if (!contacts.length) {
      syncContacts();
    }
  }, [contacts, syncContacts]);

  const navigateToEditContact = useCallback(
    (contact: Contact) => {
      navigate(NavigationRoutes.EditContact, {contact});
    },
    [navigate],
  );

  const navigateToAddContact = useCallback(() => {
    navigate(NavigationRoutes.AddContact);
  }, [navigate]);

  const renderItem = useCallback(
    ({item}: {item: Contact}) => {
      return (
        <ContactItem
          contact={item}
          onPress={() => navigateToEditContact(item)}
        />
      );
    },
    [navigateToEditContact],
  );

  const keyExtractor = useCallback((item: Contact) => item.recordID, []);
  const hasNoContacts = permissionDenied && !contacts.length;
  return (
    <View style={styles.container}>
      {contacts.length > 0 && <SyncButton onPress={syncContacts} />}
      {hasNoContacts ? (
        <EmptyScreen
          title="Contact permission denied. See app settings to import contacts."
          onPressCTA={syncContacts}
        />
      ) : (
        <FlatList
          data={contacts}
          ItemSeparatorComponent={() => <View style={styles.divider} />}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
        />
      )}
      <FloatingActionButton onPress={navigateToAddContact} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 8,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactName: {
    fontSize: 18,
    marginBottom: 10,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'grey',
  },
});
