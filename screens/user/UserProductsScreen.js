import React from 'react'
import { FlatList,Platform, Alert, Button, Text, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from  'react-navigation-header-buttons';

import HeaderButton from '../../components/UI/HeaderButton';
import ProductItem from '../../components/shop/ProductItem';
import Colors from '../../constants/Colors';
import * as productActions from '../../store/actions/product';

const UserProductsScreen = props => {
    const userproducts = useSelector(state => state.products.userProducts);
    const dispatch = useDispatch();

    const editProductHandler = (id) => {
        props.navigation.navigate('EditProduct', {productId: id})
    };

    const deleteHandler = (id) => {
        Alert.alert(
            'Are you sure?', 
            'Do you really want to delete this item?',
            [
                { text: 'No', style: 'default' },
                { text: 'Yes', style: 'destructive', onPress:() => {
                    dispatch(productActions.deleteProduct(id));
                } }
            ]    
        )
    };


    if(userproducts.length === 0) {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>
                    No products found, maybe start adding some!
                </Text>
            </View>
        );
    }

    return (
        <FlatList 
            data={userproducts} 
            keyExtractor={item => item.id}
            renderItem={itemData => (
                <ProductItem 
                    image={itemData.item.imageUrl}
                    title={itemData.item.title}
                    price={itemData.item.price}
                    onSelect={() => {
                        editProductHandler(itemData.item.id);
                    }}
                >
                <View style={{ alignContent: 'stretch', justifyContent:'space-evenly' }}>
                <Button 
                    color={Colors.primary} 
                    title="Edit" 
                    onPress={() => {
                        editProductHandler(itemData.item.id);
                    }}
                />
                </View>
                <Button 
                    color={Colors.primary}
                    title="Delete" 
                    onPress={deleteHandler.bind(this, itemData.item.id)}
                />
                </ProductItem>
            )} 
        />
    );
};

UserProductsScreen.navigationOptions = navData => {
    return {
    headerTitle: 'Your Products',
    headerLeft: ( <HeaderButtons HeaderButtonComponent={HeaderButton} >
        <Item title='Menu' iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu' } onPress={() => {
            navData.navigation.toggleDrawer();
        }} />
    </HeaderButtons> ),
    headerRight: ( <HeaderButtons HeaderButtonComponent={HeaderButton} >
        <Item title='Add' iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create' } onPress={() => {
            navData.navigation.navigate('EditProduct');
        }} />
    </HeaderButtons> ),
    };
};


export default UserProductsScreen;