import React, { useState, useCallback, useEffect } from 'react';
import { FlatList, View, Text, StyleSheet, Platform, Button, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from  'react-navigation-header-buttons';

import HeaderButton from '../../components/UI/HeaderButton';
import ProductItem from '../../components/shop/ProductItem';
import * as cartActions from '../../store/actions/cart';
import * as productActions from '../../store/actions/product';
import Colors from '../../constants/Colors';

const ProductsOverviewScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState();
    const products = useSelector(state => state.products.availableProducts);
    const dispatch = useDispatch();

    const loadProducts = useCallback( async () => {
        setError(null);
        setIsLoading(true);
        try {
            await dispatch(productActions.fetchProducts());
        }
        catch (err) {
            setError(err.message);
        }
        setIsLoading(false);
    }, [dispatch, setIsLoading, setError]);

    //aysnc returns a promise

    useEffect(() => {
        const willFocusSub = props.navigation.addListener('willFocus', loadProducts );

        return () => {
            willFocusSub.remove();
        }; // clean up subscription
    }, [loadProducts]);

    useEffect(() => {
        setIsRefreshing(true);
        loadProducts().then(() => {
            setIsRefreshing(false);
        });
    }, [dispatch, loadProducts] );

    const selectItemHandler = (id, title) => {
        props.navigation.navigate('ProductDetail', { 
            productId: id,
            productTitle: title,
        });
    };

    if(error) {
        return (
            <View style={styles.centered}>
                <Text style={{ fontFamily: 'open-sans' }}>
                    An error occured!
                </Text>
                <Button color={Colors.primary} title='Try again!' onPress={loadProducts}/>
            </View>
        );
    }

    if (isLoading) {
        return (<View style={ styles.centered }>
            <ActivityIndicator size='large' color={Colors.primary} />
        </View>);
    }

    if(!isLoading && products.length === 0) {
        return (
            <View style={styles.centered}>
                <Text style={{ fontFamily: 'open-sans' }}>
                    No products found. Maybe start adding something!
                </Text>
            </View>
        );
    }

     return ( 
     <FlatList 
     onRefresh={loadProducts}
     refreshing={isRefreshing}
     // pull to refresh
     data = { products } 
     keyExtractor = { item => item.id } 
     renderItem = {itemData => (
     <ProductItem 
        image={itemData.item.imageUrl}
        title={itemData.item.title}
        price={itemData.item.price}
        onSelect={() => {
            selectItemHandler(itemData.item.id, itemData.item.title);
        }}
        >
            <Button 
            color={Colors.primary} 
            title="View Details" 
            onPress={() => {
                selectItemHandler(itemData.item.id, itemData.item.title);
            }}
            />
            <Button 
            color={Colors.primary}
            title="To Cart" 
            onPress={() => {
                dispatch(cartActions.addToCart(itemData.item))
            }}
            />
        </ProductItem>
     )}
     /> );
};

ProductsOverviewScreen.navigationOptions = navData => {
    return {
    headerTitle: 'All Products',
    headerLeft: ( <HeaderButtons HeaderButtonComponent={HeaderButton} >
        <Item title='Menu' iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu' } onPress={() => {
            navData.navigation.toggleDrawer();
        }} />
    </HeaderButtons> ),
    headerRight: ( <HeaderButtons HeaderButtonComponent={HeaderButton} >
        <Item title='Cart' iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart' } onPress={() => {
            navData.navigation.navigate('Cart');
        }} />
    </HeaderButtons> )
    }
};

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default ProductsOverviewScreen;