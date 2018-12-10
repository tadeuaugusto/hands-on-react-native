import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    item: {
        paddingBottom: 12,
        flexDirection: 'row',
        paddingBottom: 16
    },
    itemName: {
        fontWeight: 'bold',
        fontSize: 18
    },
    wrapperItemPrice: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingRight: 16
    },
    itemPrice: {
        textAlign: 'center',
        color: '#24C6', fontWeight: 'bold'
    },

    header: {
        height: 192,
        backgroundColor: 'grey'
    },
    backButton: {
        position: 'absolute',
        top: 16,
        left: 16,
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10,
        backgroundColor: 'red'
    },
    tripName: {
        position: 'absolute',
        left: 16,
        bottom: 16
    },
    tripPrice: {
        position: 'absolute',
        bottom: 16,
        right: 32,
        textAlign: 'right',
        backgroundColor: 'blue',
        paddingTop: 4,
        paddingBottom: 4,
        paddingRight: 4,
        paddingLeft: 4,
        color: 'white'
    },
    input: {
        backgroundColor: '#e5e5e5',
        padding: 20,
        marginBottom: 16
    },
    btn: {
        backgroundColor: '#e5e5e5',
        padding: 20,
        marginBottom: 16
    }
})

export default styles