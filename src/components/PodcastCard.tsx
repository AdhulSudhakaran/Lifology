import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { DeviceWidth, Normalise } from '../utils/CommonHelper'
import { useStore } from '../store/StoreProvider'
import { observer } from 'mobx-react-lite'
import CustomImage from './CustomImage'
import FastImage from 'react-native-fast-image'

interface PodcastCardProps {
    id?: any;
    title?: string;
    author?: string;
    coverImage?: string;
}


const PodcastCard: React.FC<PodcastCardProps> = observer(({
    id,
    title,
    author,
    coverImage,
}) => {
    const store = useStore();
    const isSubscribed = store.subscribedPodcasts.some((p: any) => p.id === id);
    return (
        <View style={styles.cardWrapper} >
            <View style={styles.innerRow} >
                <CustomImage
                    source={{
                        uri: coverImage,
                        priority: FastImage.priority.high,
                    }}
                    imageStyle={styles.image}
                    loaderSize="large"
                    loaderColor="#3498db"
                    resizeMode={FastImage.resizeMode.cover}
                />
                <View style={styles.podcastWrap} >
                    <Text style={styles.podcastName} numberOfLines={1} >{title}</Text>
                    <Text style={styles.podcastSubText} >{author}</Text>
                </View>
            </View>
            <TouchableOpacity style={styles.subscribeBtn} onPress={() => store.toggleSubscribe(id)}>
                <Text style={styles.subText} >{isSubscribed ? 'Subscribed' : 'Subscribe'}</Text>
            </TouchableOpacity>
        </View>
    )
});

export default PodcastCard

const styles = StyleSheet.create({
    cardWrapper: {
        paddingVertical: Normalise(5),
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    innerRow: {
        flexDirection: 'row',
        gap: Normalise(15)
    },
    image: {
        height: Normalise(60),
        width: Normalise(60),
        backgroundColor: '#000',
        borderRadius: Normalise(8)
    },
    podcastWrap: {
        marginTop: Normalise(5)
    },
    podcastName: {
        fontSize: Normalise(16),
        fontWeight: 'bold',
        color: '#000',
        width: DeviceWidth * 0.42,
    },
    podcastSubText: {
        fontSize: Normalise(11),
        fontWeight: '400',
        color: 'gray',
    },
    subscribeBtn: {
        height: Normalise(33),
        paddingHorizontal: Normalise(15),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#e6e5e3',
        borderRadius: Normalise(16),
    },
    subText: {
        fontSize: Normalise(13)
    },
})