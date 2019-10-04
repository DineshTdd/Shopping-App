import React from 'react';
import {  ScrollView, Text, Image, Button, StyleSheet } from 'react-native';

import { useSelector } from 'react-redux';

const ProductDetailScreen = props => {
    const productId = props.navigation.getParam('productId');
    const selectedProduct = useSelector(
        state => state.products.availableProducts.find(prod => prod.id === productId)
        );   

    return (
        <ScrollView>
            <Text>{selectedProduct.title}</Text>
        </ScrollView>
    );
};

ProductDetailScreen.navigationOPtions = navData => {
    return {
        headerTitle: navData.navigation.getParam('productTitle'),
    };
};

const styles = StyleSheet.create({});

export default ProductDetailScreen;