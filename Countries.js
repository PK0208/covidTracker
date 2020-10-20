import React, { Component } from 'react';
import { Text } from 'react-native';




getAllCountriesList = async () => {
    console.log('getAllCountriesList');
    await fetch('https://disease.sh/v3/covid-19/countries')
        .then(response => response.json())
        .then(data => {
            console.log('Countries Data', JSON.stringify(data));
        })

}

const Countries = () => {
    return (
        <Text>Hello, I am your Countries!</Text>
    );
}

export default Countries;
