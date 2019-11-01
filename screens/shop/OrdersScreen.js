import React, { useEffect, useCallback, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, View, FlatList, Platform, Text} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import HeaderButton from '../../components/UI/HeaderButton';


import { HeaderButtons, Item } from  'react-navigation-header-buttons';
import OrderItem from '../../components/shop/OrderItem';
import * as ordersActions from '../../store/actions/orders';
import Colors from '../../constants/Colors';

const OrdersScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState();

    const orders = useSelector(state => state.orders.orders);
    const dispatch = useDispatch();
    //dispatch actions using react-redux 

    const loadOrders = useCallback( async () => {
        setError(null);
        setIsLoading(true);
        try {
            await dispatch(ordersActions.fetchOrders());
        }
        catch (err) {
            setError(err.message);
        }
        setIsLoading(false);
    }, [dispatch, setIsLoading, setError]);

    useEffect(() => {
        const willFocusSub = props.navigation.addListener('willFocus', loadOrders );

        return () => {
            willFocusSub.remove();
        }; // clean up subscription
    }, [loadOrders]);

    useEffect(() => {
        setIsRefreshing(true);
        loadOrders().then(() => {
            setIsRefreshing(false);
        });
        // similar to async await
    }, [dispatch, loadOrders]);

    if(error) {
        return (
            <View style={styles.centered}>
                <Text style={{ fontFamily: 'open-sans' }}>
                    An error occured!
                </Text>
                <Button color={Colors.primary} title='Try again!' onPress={loadOrders}/>
            </View>
        );
    }

    if(isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size='large' color={Colors.primary} />
            </View>
        );
    }

    if(orders.length === 0) {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>
                    No orders found, maybe start ordering some!
                </Text>
            </View>
        );
    }

    return (
    <FlatList 
    onRefresh={loadOrders}
    refreshing={isRefreshing}
    data ={orders}
    keyExtractor={item => item.id} 
    renderItem={itemData => 
    (
        <OrderItem 
            amount={itemData.item.totalAmount} 
            date={itemData.item.readableDate} 
            items={itemData.item.items}
        />
    )}
     />
    );
};

OrdersScreen.navigationOptions = navData => {
    return { 
        headerTitle: 'Your Orders',
        headerLeft: ( <HeaderButtons HeaderButtonComponent={HeaderButton} >
            <Item title='Menu' iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu' } onPress={() => {
                navData.navigation.toggleDrawer();
            }} />
        </HeaderButtons> ),
    };
};

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default OrdersScreen;