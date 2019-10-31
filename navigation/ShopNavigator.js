import React from 'react';

import { SafeAreaView, View, Image, StyleSheet, Platform, Button, ScrollView } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { DrawerNavigatorItems, createDrawerNavigator } from 'react-navigation-drawer';
import { Ionicons } from '@expo/vector-icons';
// import SafeAreaView from 'react-native-safe-area-view';
// import { SafeAreaProvider } from 'react-native-safe-area-context';

import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductsDetailScreen';
import CartScreen from '../screens/shop/CartScreen';
import OrdersScreen from '../screens/shop/OrdersScreen';
import UserProductsScreen from '../screens/user/UserProductsScreen';
import EditProductScreen from '../screens/user/EditProductScreen';
import AuthScreen from  '../screens/user/AuthScreen';
import StartupScreen from '../screens/StartupScreen';
import Colors from '../constants/Colors';

const defaultNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
    },
    headerTitleStyle: {
        fontFamily: 'open-sans-bold'
    },
    headerBackTitle:{
        fontFamily: 'open-sans'
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
};

const ProductsNavigator = createStackNavigator({
    ProductsOverview: ProductsOverviewScreen,
    ProductDetail: ProductDetailScreen,
    Cart: CartScreen
},{
     navigationOptions: {
        drawerIcon: drawerConfig => ( 
        <Ionicons 
        name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
        size = {23}
        color={drawerConfig.tintColor}
        />
        )
    },
    defaultNavigationOptions: defaultNavOptions
});

const OrdersNavigator = createStackNavigator({
    Orders: OrdersScreen
},
{
    navigationOptions: {
        drawerIcon: drawerConfig => ( 
        <Ionicons 
        name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
        size = {23}
        color={drawerConfig.tintColor}
        />
        )
    }, // only used when navigator is inside another navigator
    defaultNavigationOptions: defaultNavOptions
});

const AdminNavigator = createStackNavigator({
    UserProducts: UserProductsScreen,
    EditProduct: EditProductScreen
},
{
    navigationOptions: {
        drawerIcon: drawerConfig => ( 
        <Ionicons 
        name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
        size = {23}
        color={drawerConfig.tintColor}
        />
        )
    }, // only used when navigator is inside another navigator
    defaultNavigationOptions: defaultNavOptions
});

const Logout = (props) => (
    <SafeAreaView 
        forceInset={{ top: 'always', horizontal: 'never' }}
        style={styles.container}>
        <View style={styles.imgview}>
            <Image source={require('../assets/shop.png')}
            style={styles.img}/>
        </View>
    <ScrollView contentContainerStyle = {{ paddingTop: 20 }} >
        <DrawerNavigatorItems {...props} /> 
    {/* to add existing drawer items */ }
    </ScrollView>
    </SafeAreaView>
  )

const ShopNavigator = createDrawerNavigator({
    Products: ProductsNavigator,
    Orders: OrdersNavigator,
    Admin: AdminNavigator
}, {
    contentOptions: {
        activetintColor: Colors.primary
    },
    contentComponent: Logout,
});

const AuthNavigator = createStackNavigator({
    Auth: AuthScreen
}, {
    defaultNavigationOptions: defaultNavOptions
});

const MainNavigator = createSwitchNavigator({
    Startup: StartupScreen,
    Auth: AuthNavigator,
    Shop: ShopNavigator
});

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    imgview: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 20,
        height: 150,
        backgroundColor: 'white'
    },
    img: {
        height: 120,
        width: 120,
        borderRadius: 60
    },
  });

export default createAppContainer(MainNavigator);