import React from 'react'
import { FlatList,Platform, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from  'react-navigation-header-buttons';

import HeaderButton from '../../components/UI/HeaderButton';
import ProductItem from '../../components/shop/ProductItem';
import Colors from '../../constants/Colors';
import * as productActions from '../../store/actions/product';

const UserProductsScreen = props => {
    const userproducts = useSelector(state => state.products.userProducts);
    const dispatch = useDispatch();

    return (
        <FlatList 
            data={userproducts} 
            keyExtractor={item => item.id}
            renderItem={itemData => (
                <ProductItem 
                    image={itemData.item.imageUrl}
                    title={itemData.item.title}
                    price={itemData.item.price}
                    onSelect={() => {}}
                >
                <Button 
                    color={Colors.primary} 
                    title="Edit" 
                    onPress={() => {}}
                />
                <Button 
                    color={Colors.primary}
                    title="Delete" 
                    onPress={() => {
                        dispatch(productActions.deleteProduct(itemData.item.id));
                    }}
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
    };
};


export default UserProductsScreen;