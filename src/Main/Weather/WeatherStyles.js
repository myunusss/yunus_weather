import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#78c0fc',
  },
  contentContainer: {
    padding: 13, backgroundColor: 'rgba(255,255,255,0.2)', marginHorizontal: 20, marginTop: 20, borderRadius: 10, maxHeight: 250
  },
  titleContent: {
    position: 'absolute', left: 0, top: 10, fontSize: 12, color: '#fff'
  },
  infoContainer: {
    flexDirection: 'row', position: 'absolute', bottom: 10, left: 0
  },
  infoTextContainer: {
    flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginRight: 15
  },
  indicator: {
    width: 10, height: 10, borderRadius: 10, marginRight: 5
  },
  tableHeader: {
    height: 40, backgroundColor: 'rgba(50,100,200,0.7)', borderTopLeftRadius: 10, borderTopRightRadius: 10
  },
  tableHeaderTitle: {
    textAlign: 'center', fontWeight: '100', color: '#fff'
  },
  noDataContainer: {
    backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', height: 100
  }
})