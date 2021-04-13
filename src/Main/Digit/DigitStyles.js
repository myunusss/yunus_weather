import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  buttonSubmit: {
    backgroundColor: 'green',
    elevation: 1,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  container: {
    flex: 1,
    padding: 13,
  },
  inputLabel: {
    fontSize: 14,
    color: '#000'
  },
  textInfo: {
    fontSize: 14,
    color: '#000',
    marginTop: 10,
    textAlign: 'center'
  },
  textInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: '#fff',
    elevation: 1,
    marginVertical: 10,
    height: 40,
  },
  textInput: {
    padding: 10,
    flex: 1,
    width: '100%',
    color: '#000'
  },
  titleHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
    color: '#000'
  }
})