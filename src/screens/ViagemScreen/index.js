import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Viagem from './Viagem';
import { FlatList } from 'react-native-gesture-handler';
import MapView from 'react-native-maps';

class ViagemScreen extends Component {

    static navigationOption = {
        header: null
    }

    renderItem = viagem => {
        console.log('viagem: ', viagem);
        return <Viagem onPress={() => this.props.navigation.navigate('DespesaScreen', {
            viagem: viagem.item
        })} title={ viagem.item.name } thumbnail={ viagem.item.thumbnail }
        />
    }

    render() {
        const viagens = [
            { id: '1', name: 'Praga', lat: '48.928258', lng: '16.120291', thumbnail: 'https://i.imgur.com/LNKc5V3.jpg', price: 1000 },
            { id: '2', name: 'Amsterdam', lat: '48.928258', lng: '16.120291', thumbnail: 'https://i.imgur.com/ZLY8rUI.jpg', price: 1000 },
            { id: '3', name: 'Bruxelas', lat: '48.928258', lng: '16.120291', thumbnail: 'https://i.imgur.com/eyeCyYV.jpg', price: 1000 },
            { id: '4', name: 'Leewardenn', lat: '48.928258', lng: '16.120291', thumbnail: 'https://i.imgur.com/ZLY8rUI.jpg', price: 1000 },
            { id: '5', name: 'Cork', lat: '48.928258', lng: '16.120291', thumbnail: 'https://i.imgur.com/eyeCyYV.jpg', price: 1000 },
        ]

        return (
            <View style={{
                backgroundColor: 'yellow',
                flex: 1,
                justifyContent: 'space-between',
                alignItems: 'stretch'
            }}>
                <View style={{ flex: 1}}>
                    <MapView
                        style={{ flex: 1 }}
                        initialRegion={{
                            latitude: 37.78825,
                            longitude: -122.4324,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                    />
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('CadastrarViagem')}
                        style={{
                            position: 'absolute',
                            bottom: 0,
                            right: 20,
                            padding: 10 }}
                    >
                        <Image source={require('../../../assets/add-trip.png')} />
                    </TouchableOpacity>
                </View>
                <View style={{ backgroundColor: 'green' }}>
                    <FlatList
                        data={viagens}
                        renderItem={this.renderItem}
                        horizontal
                        pagingEnabled
                        keyExtractor={ item => item.id } />
                </View>
            </View>
        )
    }
}

export default ViagemScreen