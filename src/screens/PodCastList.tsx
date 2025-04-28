


import React, { useEffect, useRef } from 'react'
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import PodcastCard from '../components/PodcastCard'
import { DeviceHeight, DeviceWidth, getResHeight, Normalise } from '../utils/CommonHelper'
import LinearGradient from 'react-native-linear-gradient';
import { useStore } from '../store/StoreProvider';
import SubscribedModal from '../components/SubscribedModal';
import { observer } from 'mobx-react-lite';
import Animated, { useAnimatedStyle, useSharedValue, withSequence, withSpring, withTiming } from 'react-native-reanimated';





const PodCastList: React.FC = observer(() => {
    const store = useStore();
    const offset = useSharedValue(0);
   

    const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);


    useEffect(() => {
        if (store.subscribedPodcasts?.length > 0) {
            offset.value = withSequence(
                withTiming(-5, { duration: 50 }),
                withSpring(0, { damping: 10, stiffness: 500 }),
            );
        }
    }, [store.subscribedPodcasts])


    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: offset.value }],
    }));


    const ListHeaderComponent = () => (
        <Text style={styles.subLabel} >Popular on Queue</Text>
    )
    return (
        <View style={styles.container} >
            <Text style={styles.label} >Add Podcasts</Text>

            <FlatList
                data={store.podcasts}
                style={styles.flatlistStyle}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.contentContainerStyle}
                keyExtractor={(item: any) => item.id.toString()}
                initialNumToRender={15}
                maxToRenderPerBatch={15}
                windowSize={15}
                removeClippedSubviews
                updateCellsBatchingPeriod={50}
                ListHeaderComponent={ListHeaderComponent}
                renderItem={({ item }) => (
                    <PodcastCard {...item} />
                )}
            />


            <LinearGradient
                colors={['#ffffff00', '#fff',]}
                style={styles.gradient}
            >

                <TouchableOpacity activeOpacity={0.9} style={[styles.button,]} onPress={() => store.toggleModal(true)}  >
                    <Text style={styles.buttonText}>Show Added ({store.subscribedPodcasts?.length})</Text>
                </TouchableOpacity>


            </LinearGradient>
            <SubscribedModal />
        </View>
    )
})

export default PodCastList

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15,
        paddingTop: DeviceHeight * 0.1,
    },
    label: {
        fontSize: Normalise(40),
        fontWeight: 'bold',
        color: '#000',
        letterSpacing: -2
    },
    subLabel: {
        fontSize: Normalise(20),
        fontWeight: 'bold',
        color: '#000',
    },
    flatlistStyle: {
        paddingTop: Normalise(22)
    },
    contentContainerStyle: {
        gap: Normalise(13),
        paddingBottom: DeviceHeight * 0.18,
        paddingHorizontal: Normalise(13)
    },

    gradient: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: getResHeight(170), // Enough to give a nice fade effect
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 20,
    },
    button: {
        backgroundColor: '#919190', // Light gray like in your image
        borderRadius: 30,
        width: DeviceWidth * 0.8,
        height: Normalise(60),
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: Normalise(15)
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '400',
    },






})
