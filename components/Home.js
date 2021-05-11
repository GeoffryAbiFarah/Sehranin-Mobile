import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import {Header, Button} from 'react-native-elements';
import { Card } from 'react-native-elements/dist/card/Card';
import { ListItem } from 'react-native-elements';
import { Avatar } from 'react-native-elements/dist/avatar/Avatar';
import image from '../images/background-img-party.jpg';
import { ScrollView } from 'react-native';
export default function Home() {

    
    const [parties, setParties] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [helper, setHelper] = useState(true);
    
    useEffect(() => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };

        fetch('https://sehranin-be.herokuapp.com/parties', requestOptions)

            .then(response => {
                response.json()
                    .then(data => {
                        console.log("HEHE: ",data);
                        setParties(data);
                    })
                    .catch(e => console.log(e));
            })
            .catch(err => {
                console.log("PARTIES FETCHING ERROR: ", err);
            })

    }, [helper])

    const handleSearch = () => {

        const place = searchText;
        
        if (place === ""){
            setHelper(helper => (!helper));
        }

        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };

        fetch("https://sehranin-be.herokuapp.com/parties/place/" + place, requestOptions)

            .then(response => {
                response.json()
                    .then(data => {
                        setParties(data);
                        console.log("DOUBLE HEHE", data)
                    })
                    .catch(e => console.log(e));
            })
            .catch(err => {

                console.log("FETCHING ERROR: ", err);

            })
        }

  return (
    <ScrollView style={styles.container}>
        <Header
        backgroundColor="black"
            placement="center"
            centerComponent={{ text: 'Sehranin', style: { color: '#fff', fontSize: 23 } }}
        />
        <View style={styles.headerContainer}>
            <Text style={styles.header}>Looking for an event ?</Text>
        </View>
        <View style={styles.searchContainer}>
        <TextInput
                style={styles.input}
                onChangeText={(text) => {
                    setSearchText(text);
                }}
                placeholder="  Search here..."
                keyboardType="default"
            />
        {/* <Button
        style={styles.buttonSearch}
          title="Search"
          onPress={() => console.log("hello")}
        /> */}
        <Button
            title="Search"
            onPress={() => handleSearch()}
        />
        </View>
        
      {/* Start of the parties */}
      <Card containerStyle={{padding: 0}} >
        {
            parties.map((party, i) => (
               <ListItem key={i} bottomDivider>
                <Avatar source={image} />
                <ListItem.Content>
                <ListItem.Title style={{color: "red"}}>{party.title}</ListItem.Title>
                <ListItem.Subtitle>{party.place}, {party.address}, {party.date}</ListItem.Subtitle>
                <ListItem.Subtitle>{party.number}</ListItem.Subtitle>
                <ListItem.Subtitle>{party.description}</ListItem.Subtitle>
                <ListItem.Subtitle>{party.price} L.L.</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
            ))
        }
        </Card>

      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
//   topBarContainer: {
//       backgroundColor: "black",
//       color: "white",
//       width: "100%",
//       height: "8%",
//       justifyContent: "center"
//   },
  headerContainer: {
      alignItems: "center",
      marginTop: 10
  },
  input: {
    height: 40,
    width: "70%",
    borderWidth: 1,
  },
  searchContainer: {
      flexDirection: "row",
      height: 40,
      margin: 11,
      justifyContent: "center"
  },
  barHeader: {
      color: "white",
      fontSize: 20,
      fontWeight: "bold",
      marginLeft: 5
  },
  header: {
      fontSize: 17,
      fontWeight: "bold",
  },
  buttonSearch: {
      color: "red"
  }
});
