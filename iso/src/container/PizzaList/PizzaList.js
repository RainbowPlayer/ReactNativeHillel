import React, { useState } from 'react';
import { StatusBar, Text, View, FlatList, SafeAreaView, TextInput, Modal, TouchableOpacity, RefreshControl } from 'react-native';
import Item from '../../components/Item/Item';
import CustomTouch from '../../components/CustomTouch';
import itemData from '../../../../constants/db.json';
import CustomCheckbox from '../../components/CustomCheckBox/CustomCheckBox';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import styles from './style';

const PizzaList = () => {
  const [searchVisible, setSearchVisible] = useState(false);
  const [filterText, setFilterText] = useState('');
  const [isNewFilter, setIsNewFilter] = useState(false);
  const [filteredData, setFilteredData] = useState(itemData.mockItemData);
  const [modalVisible, setModalVisible] = useState(false);
  const [favoritePizzas, setFavoritePizzas] = useState([]);
  const navigation = useNavigation();

  const applySearchAndFilter = (text, isNew) => {
    const filtered = itemData.mockItemData.filter(item =>
      item.title.toLowerCase().includes(text.toLowerCase()) &&
      (isNew ? item.isNew === isNew : true)
    );
    setFilteredData(filtered);
  };

  React.useEffect(() => {
    console.log("Current favorite pizzas:", favoritePizzas);
  }, [favoritePizzas]);

  const handleFavoritePress = (pizza) => {
    setFavoritePizzas(currentFavorites => {
      const isAlreadyFavorite = currentFavorites.some(fav => fav.title === pizza.title);
      if (isAlreadyFavorite) {
        // Якщо піца вже є у списку улюблених, видаляємо її зі списку
        return currentFavorites.filter(fav => fav.title !== pizza.title);
      } else {
        // Якщо піци немає у списку, додаємо її
        return [...currentFavorites, pizza];
      }
    });
  };

  const renderItem = ({ item }) => (
    <Item
      data={item}
      onPress={() => navigation.navigate('PizzaDetailScreen', { pizza: item })}
      onFavoritePress={() => handleFavoritePress(item)}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttonContainer}>
        <CustomTouch onPress={() => setModalVisible(true)} style={styles.buttonStyle}>
          <Text style={styles.textStyle}>Filter</Text>
        </CustomTouch>
        <CustomTouch onPress={() => navigation.navigate('FavoritesScreen', { favoritePizzas })} style={styles.buttonStyle}>
          <Ionicons name="heart-outline" size={24} color="black" />
        </CustomTouch>
        <CustomTouch onPress={() => setSearchVisible(!searchVisible)} style={styles.buttonStyle}>
          <Text style={styles.textStyle}>Search</Text>
        </CustomTouch>
        {searchVisible && (
          <TextInput
            style={styles.textInputStyle}
            onChangeText={text => {
              setFilterText(text);
              applySearchAndFilter(text, isNewFilter);
            }}
            value={filterText}
            placeholder="Search pizza"
          />
        )}
      </View>
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
        refreshControl={<RefreshControl refreshing={false} onRefresh={() => {}} />}
      />
      <StatusBar style="auto" />
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <TouchableOpacity
          style={styles.centeredView}
          activeOpacity={1}
          onPressOut={() => setModalVisible(false)}
        >
          <View style={styles.modalView}>
            <CustomCheckbox
              isChecked={isNewFilter}
              onCheck={() => {
                setIsNewFilter(!isNewFilter);
                applySearchAndFilter(filterText, !isNewFilter);
              }}
            />
            <Text style={styles.modalText}>New Items Only</Text>
            <CustomTouch
              style={styles.buttonStyle}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.textStyle}>Close Filter</Text>
            </CustomTouch>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
};

export default PizzaList;
