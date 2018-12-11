import React from 'react';
import { Text, Dimensions, TouchableOpacity, Image } from 'react-native';
import styles from './styles';

const Viagem = props => {

    const dim = Dimensions.get('window');

    return (
        <TouchableOpacity onPress={ props.onPress } style={ styles.wrapperTrip }>
            <Image source={{ uri: props.thumbnail }} style={ [ styles.imageTrip, { width: dim.width - 32 } ] }/>

            <Text>{ props.title }</Text>
            <Text style={ styles.ticketsButton }>R$ { props.price.toFixed(2) }</Text>
        </TouchableOpacity>
    )
}

export default Viagem;