import Fab from '@components/Fab';
import GenericFlatList from '@components/GenericFlatList';
import PlusIcon from '@components/Icons/Plus';
import { useAppSelector } from '@hooks/reduxHooks';
import { useGetBookingsQuery } from '@redux/modules/booking';
import { selectAuth } from '@redux/slices/auth_slice';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import AddBookingModal from './components/AddBookingModal';
import BookingItem from './components/BookingItem';

const Home = () => {
  const [selectedIndex, setSelectedIndex] = useState(() => 0);
  const [modalVisible, setModalVisible] = useState(() => false);
  const { username } = useAppSelector(selectAuth);
  const { data } = useGetBookingsQuery({ user: username });
  const onTabPress = (index: number) => setSelectedIndex(index);
  const toggleModal = () => setModalVisible((prev) => !prev);
  const renderTab = (index: number) => {
    switch (index) {
      case 0:
        return (
          <GenericFlatList
            data={data?.slice(0, 5)}
            renderDetails={BookingItem}
          />
        );
      case 1:
        return <GenericFlatList data={data} renderDetails={BookingItem} />;
      default:
        return <View />;
    }
  };
  return (
    <View style={styles.container}>
      <SegmentedControlTab
        values={['Latest bookings', 'All bookings']}
        selectedIndex={selectedIndex}
        onTabPress={onTabPress}
        tabStyle={styles.tabStyle}
        tabsContainerStyle={styles.tabsContainerStyle}
        activeTabStyle={styles.activeTabStyle}
        tabTextStyle={styles.tabTextStyle}
      />
      {renderTab(selectedIndex)}
      <Fab onPress={toggleModal} Icon={<PlusIcon />} />
      <AddBookingModal visible={modalVisible} toggleVisible={toggleModal} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  tabStyle: { paddingVertical: 8, borderColor: '#AEC57D' },
  tabsContainerStyle: {
    marginHorizontal: 8,
    marginTop: 8,
  },
  activeTabStyle: {
    backgroundColor: '#AEC57D',
  },
  tabTextStyle: {
    color: '#AEC57D',
  },
});

export default Home;
