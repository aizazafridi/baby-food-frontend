// src/stylesheets/styles.js
import { StyleSheet } from 'react-native';

export default StyleSheet.create({

  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fdfdfd',
  },

  heading: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 10,
  },

  searchBar: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
  },

  tipBox: {
    backgroundColor: '#ffe8cc',
    padding: 12,
    borderRadius: 10,
    marginBottom: 20,
  },

  tipTitle: {
    fontWeight: '600',
    marginBottom: 4,
  },

  tipText: {
    fontSize: 14,
  },

  sectionTitle: {
    fontSize: 18,
    marginBottom: 8,
  },

  foodItem: {
    marginRight: 10,
    alignItems: 'center',
  },

  foodImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 4,
  },

  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderColor: '#ccc',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
  },
  navItem: {
    fontSize: 16,
  },
  
});
