import { StyleSheet } from "react-native"

const style = StyleSheet.create({
    
    title: {
    fontWeight: 700,
    letterSpacing: 5,
    textAlign: 'center',
    fontSize: 18,
    marginTop: 36,
    color: 'white',
  },
  Item: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemText: {
    marginTop: 7,
    fontWeight: 300,
    color: 'white',
    fontSize: 20,
  },
  itemIcon: {
    backgroundColor: 'grey',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    margin: 10,
  },
  textListBlack : {
    fontWeight: 700,
    color: 'rgb(0, 0, 0)',
  }
})

export default style