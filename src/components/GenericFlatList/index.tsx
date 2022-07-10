import React, { useCallback } from 'react';
import { FlatList, Pressable, StyleSheet } from 'react-native';

const flatListConfigs = {
  maxToRenderPerBatch: 8,
  updateCellsBatchingPeriod: 30,
  initialNumToRender: 8,
  removeClippedSubviews: true,
};

type GenericFlatListProps<T, G, E> = {
  data?: T[];
  onPressListItem?: (item: T) => void;
  renderDetails: React.FC<{ item: T }>;
  keyExtractor?: (item: T, index: number) => string;
  itemExtraProps?: G;
};
const GenericFlatList = <T, G, E>({
  data,
  onPressListItem,
  renderDetails: ListItemComponent,
  keyExtractor,
}: GenericFlatListProps<T, G, E>) => {
  const renderItem = ({ item, index }: { item: T; index: number }) => (
    <Pressable onPress={() => onPressListItem?.(item)} key={index}>
      <ListItemComponent item={item} />
    </Pressable>
  );

  const memoizedRenderItem = useCallback(
    renderItem,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data],
  );

  return (
    <FlatList
      {...flatListConfigs}
      style={styles.list}
      data={data}
      renderItem={memoizedRenderItem}
      keyExtractor={keyExtractor}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    marginTop: 8,
  },
});

export default GenericFlatList;
