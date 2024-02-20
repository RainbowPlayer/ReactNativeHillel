import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native"
import LikeIcon from '../../../assets/Like.png'
import BuyIcon from '../../../assets/Buy.png'


const mockItemData = [
    {
      title: "Pizza 1",
      isNew: true,
      image: "https://img.freepik.com/free-photo/top-view-pepperoni-pizza-with-mushroom-sausages-bell-pepper-olive-corn-black-wooden_141793-2158.jpg",
      price: {
        newPrice: "$10.99",
        oldPrice: "$14.99",
      },
      description: "Long title long title lo...",
    }
    
];

const Item = () => {
    const { title, isNew, image, price, description } = mockItemData[0];
    return(
        <View style={style.containerItem}>
            <View style={style.containerImage}>
                <Image source={{ uri: image }} style={style.image}/>
                {isNew && <Text style={style.newBadge}>New</Text>}
            </View>
            <View style={style.containerContent}>
                <Text style={style.title}>{title}</Text>
                <Image source={LikeIcon} style={style.likeIcon}/>
            <View style={style.containerPrice}>
                <Text style={style.newPrice}>{price.newPrice}</Text>
                <Text style={style.oldPrice}>{price.oldPrice}</Text>
            </View>
            <Text style={style.description}>{description}</Text>
            </View>
            
            <TouchableOpacity>
                <View style={style.buySection}>
                    <Text style={style.buyButton}>Buy</Text>
                    <Image source={BuyIcon} style={style.buyIcon}/>
                </View>
                
            </TouchableOpacity>
        </View>
    )
}

const style = StyleSheet.create({
    containerItem: {
        padding: 10,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        marginTop: 20,
        flexDirection: 'row',
        gap: 10,
    },

    containerImage: {
        marginBottom: 8,
        position: 'relative',
    },

    image: {
        width: 150,
        height: 150,
        borderRadius: 50,
    },

    newBadge: {
        position: 'absolute',
        top: -10,
        right: -10,
        backgroundColor: 'red',
        color: 'white',
        padding: 5,
        borderRadius: 5,
        fontSize: 12,
    },

    title: {
        fontWeight: 'bold',
        fontSize: 18,
    },

    containerContent: {
        flexDirection: 'column',
        gap: 10,
    },

    containerPrice: {
        flexDirection: "row",
        gap: 10,
    },

    newPrice: {
        color: 'green',
        marginRight: 10,
    },

    oldPrice: {
        textDecorationLine: 'line-through',
        color: '#999',
    },

    description: {
        color: '#666',
        fontSize: 14,
        marginBottom: 8,
    },

    buyButton: {
        borderRadius: 5,
    },

    likeIcon: {
        position: 'absolute',
        width: 50,
        height: 50,
        left: 130,
        top: -40
    },

    buySection: {
        flexDirection: 'row',
        position: 'end'
    },

    buyIcon: {
        width: 20,
        height: 20
    }
});

export default Item;