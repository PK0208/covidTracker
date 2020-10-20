import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity, Alert, Dimensions
} from 'react-native';

import Modal from "react-native-modal";

import { Header, Button } from 'native-base';

export default class App extends Component {
  state: {
    countryArr: [],
    detailsByCountry: [],
    isModalVisible: Boolean,
    country: string,
    population: string,
    cases: string,
    deaths: string,
    todayDeaths: string,
    recovered: string,
    active: string,


  }

  constructor(props: Props) {
    super(props);
    this.state = {
      countryArr: [],
      detailsByCountry: [],
      isModalVisible: false,
      country: '',
      population: '',
      cases: '',
      deaths: '',
      todayDeaths: '',
      recovered: '',
      active: '',

    };
  }


  componentDidMount() {
    console.log('componentDidMount --APP');
    this.getCountriesInfo();
  }

  getCountriesInfo = async () => {
    await fetch('https://disease.sh/v3/covid-19/countries')
      .then(response => response.json())
      .then(data => {
        //console.log('All Countries', JSON.stringify(data));
        this.setState({ countryArr: data });

      });
  }

  onCountryChange = async (country, countryCode) => {
    console.log('onCountryChange', country, countryCode);
    const covidDetails = await fetch(`https://disease.sh/v3/covid-19/countries/${countryCode}`)
      .then(response => response.json())
      .then(data => {
        console.log('Deatails By Countries', JSON.stringify(data));
        console.log('Deatails By Countries country', JSON.stringify(data.country));
        console.log('Deatails By Countries population', JSON.stringify(data.population));
        console.log('Deatails By Countries cases', JSON.stringify(data.cases));
        console.log('Deatails By Countries todayCases', JSON.stringify(data.todayCases));
        console.log('Deatails By Countries deaths', JSON.stringify(data.deaths));
        console.log('Deatails By Countries todayDeaths', JSON.stringify(data.todayDeaths));
        console.log('Deatails By Countries recovered', JSON.stringify(data.recovered));
        console.log('Deatails By Countries active', JSON.stringify(data.active));
        this.setState({ detailsByCountry: data });
        this.setState({ isModalVisible: true });
        this.setState({ country: data.country })
        this.setState({ population: data.population })
        this.setState({ cases: data.cases })
        this.setState({ todayCases: data.todayCases })
        this.setState({ deaths: data.deaths })
        this.setState({ todayDeaths: data.todayDeaths })
        this.setState({ recovered: data.recovered })
        this.setState({ active: data.active })


      });

  }

  toggleModal = () => {
    console.log("toggleModal");
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>

            <Header style={styles.header} >
              <Text style={styles.headerText}>Covid 19 Tracker</Text>
              <Text>By Praveen Kumar</Text>
            </Header>



            {this.state.countryArr.map((item, index) => (
              <View>
                <TouchableOpacity onPress={() => this.onCountryChange(item.country, item.countryInfo.iso2)}>
                  <Text>{item.country}</Text>
                </TouchableOpacity>

              </View>
            ))}


            <Modal isVisible={this.state.isModalVisible}>
              <View style={styles.modalContent}>
                {/* <Text style={styles.modalHeader}>
                  Covid Details 
                    </Text> */}
                <View style={{ flexDirection: 'row', margin: 5 }}>
                  <Text style={styles.modalHeader}>Covid Details For </Text>
                  <Text style={styles.modalHeader}>{this.state.country}</Text>
                </View>

                <View
                  style={styles.line}>
                </View>
                {/* country */}

                <View style={{ flexDirection: 'row', margin: 5 }}>
                  <Text style={styles.contentByCountry}>Population :</Text>
                  <Text style={styles.content}>{this.state.population}</Text>
                </View>

                <View
                  style={styles.line}>
                </View>

                <View style={{ flexDirection: 'row', margin: 5 }}>
                  <Text style={styles.contentByCountry}>Cases :</Text>
                  <Text style={styles.content}>{this.state.cases}</Text>
                </View>

                <View
                  style={styles.line}>
                </View>

                <View style={{ flexDirection: 'row', margin: 5 }}>
                  <Text style={styles.contentByCountry}>Today Cases :</Text>
                  <Text style={styles.content}>{this.state.todayCases}</Text>
                </View>

                <View
                  style={styles.line}>
                </View>

                <View style={{ flexDirection: 'row', margin: 5 }}>
                  <Text style={styles.contentByCountry}>Active :</Text>
                  <Text style={styles.content}>{this.state.active}</Text>
                </View>

                <View
                  style={styles.line}>
                </View>

                <View style={{ flexDirection: 'row', margin: 5 }}>
                  <Text style={styles.contentByCountry}>Recovered :</Text>
                  <Text style={styles.content}>{this.state.recovered}</Text>
                </View>

                <View
                  style={styles.line}>
                </View>


                <View style={{ flexDirection: 'row', margin: 5 }}>
                  <Text style={styles.contentByCountry}>Total Deaths :</Text>
                  <Text style={styles.content}>{this.state.deaths}</Text>
                </View>

                <View
                  style={styles.line}>
                </View>


                <View style={{ flexDirection: 'row', margin: 5 }}>
                  <Text style={styles.contentByCountry}>Today Deaths :</Text>
                  <Text style={styles.content}>{this.state.todayDeaths}</Text>
                </View>
                <View
                  style={styles.line}>
                </View>





                <Button
                  style={[
                    styles.modalAcceptButton,
                    {
                      width: "49%",
                      backgroundColor: '#D5DEE3',
                      marginRight: 10,
                      marginTop: 5,
                    },
                  ]}
                  onPress={this.toggleModal}
                >
                  <Text
                    uppercase={false}
                    style={[
                      styles.modalAcceptText,
                      { color: '#000000' },
                    ]}
                  >
                    ok
                    </Text>
                </Button>


              </View>

            </Modal>

          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
}
const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#FFFFFF',
  },
  header: {
    backgroundColor: '#D5DEE3',
    flexDirection: "column",
    alignItems: 'center',

  },
  headerText: {
    color: '#000000',
    fontSize: 22,
    fontWeight: '800',
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    maxHeight: Dimensions.get("window").height * 0.9,
  },

  modalHeader: {
    fontSize: 18,
    marginVertical: 10,
    textAlign: "center",
    lineHeight: 28,
  },
  modalAcceptText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  modalAcceptButton: {
    paddingTop: 0,
    paddingBottom: 0,
    paddingHorizontal: 8,
    marginLeft: 70,
    backgroundColor: '#eb99ff',
    justifyContent: "center",
  },
  contentByCountry: {
    fontSize: 16,
    margin: 5,
    fontWeight: '800',
  },
  content: {
    fontSize: 16,
    margin: 5,
  },
  line: {
    width: "100%",
    height: 1,
    backgroundColor: '#000000',
  }
});  