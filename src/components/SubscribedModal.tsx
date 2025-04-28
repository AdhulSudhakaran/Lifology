import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { observer } from 'mobx-react-lite';
import { useStore } from '../store/StoreProvider';
import { DeviceHeight, DeviceWidth, Normalise } from '../utils/CommonHelper';
import Modal from 'react-native-modal';


const SubscribedModal = observer(() => {
  const store = useStore();
  return (
    <Modal
      isVisible={store.isModalVisible}
      onBackButtonPress={()=>store.toggleModal(false)}
      onSwipeCancel={()=> store.toggleModal(false)}
      onSwipeMove={()=>store.toggleModal(false)}
      useNativeDriverForBackdrop
      animationIn={'slideInUp'}
      animationOut={'slideOutDown'}
      animationInTiming={600}
      animationOutTiming={800}
      useNativeDriver
      style={{
        margin: 0,
        justifyContent: 'flex-end',
        width: DeviceWidth,
        height: DeviceHeight,
      
      }}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>My Subscriptions</Text>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => store.toggleModal(false)}
          >
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={store.subscribedPodcasts}
          keyExtractor={(item: any) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.subscribedItem}>
              <View style={styles.itemInfo}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text style={styles.itemAuthor}>{item.author}</Text>
              </View>
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => store.removeSubscribed(item.id)}
              >
                <Text style={styles.removeButtonText}>Remove</Text>
              </TouchableOpacity>
            </View>
          )}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No subscriptions yet</Text>
            </View>
          }
          contentContainerStyle={styles.listContent}
        />
      </View>
    </Modal>
  );
});

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: '#fff',
    height: DeviceHeight * 0.6,
    width: DeviceWidth,
    paddingHorizontal:Normalise(15)
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold'
  },
  closeButton: {
    padding: 10
  },
  closeButtonText: {
    fontSize: 20
  },
  subscribedItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5'
  },
  itemInfo: {
    flex: 1
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '500'
  },
  itemAuthor: {
    fontSize: 14,
    color: '#666'
  },
  removeButton: {
    backgroundColor: '#ff4444',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4
  },
  removeButtonText: {
    color: '#fff',
    fontSize: 14
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  emptyText: {
    fontSize: 16,
    color: '#999'
  },
  listContent: {
    flexGrow: 1
  }
});

export default SubscribedModal;