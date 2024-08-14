import { StyleSheet } from 'react-native';

const containerStyle = StyleSheet.create({
  section: {
    margin: 32,
  },
});

const inputStyle = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

const textStyle = StyleSheet.create({
  sectionHeader: {
    fontWeight: '700',
    fontSize: 18,
  },
});

export { containerStyle, inputStyle, textStyle };
