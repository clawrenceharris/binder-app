import { FlatList, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { useRoute } from '@react-navigation/native'
import Header from '../components/Header'
import { Colors, assets } from '../constants'
import SchoolListItemToJoin from '../components/SchoolListItemToJoin'
import ClassListItemToJoin from '../components/ClassListItemToJoin'
const SearchSelect = ({ navigation }) => {

  const route = useRoute()

  const [search, setSearch] = useState('')
  const [selectedData, setSelectedData] = useState([])
  const [newData, setNewData] = useState(null)

  const { defaultData, data, selectionLimit, update, title, isClass } = route.params
  const [_data, setData] = useState(data)
  const handleSearch = (value) => {
    setSearch(value)

    setNewData({   //creates a map of default data with the name matching the search value

      name: value,
      ...defaultData
    })

    if (!value.length) {
      return setData(_data)
    }
    const filteredData = _data.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase()))

    if (filteredData.length) {
      setData(filteredData)
    }

    else {
      setData(filteredData)
    }

  }
  const isSelected = (item) => selectedData.includes(item)


  const onSelect = (item) => {

    if (selectedData.includes(item)) //if we select an item that is already selected
    {
      const deselect = selectedData.filter(selected => selected != item) // create a new data array that does not include the selected item
      return setSelectedData(deselect)
    }

    if (selectedData.length === selectionLimit && selectionLimit != 1) {
      return
    }

    if (selectedData.length === selectionLimit && selectionLimit == 1) {
      return setSelectedData([item]); // add item to selected items array

    }

    setSelectedData([...selectedData, item]); // add item to selected items array

  }


  const headerRight = () => (
    <Text
      onPress={() => {
        if (selectionLimit == 1) {
          update(selectedData[0])
        }

        else {
          update(selectedData);
        }
        navigation.goBack()
      }}
      style={{ fontFamily: 'KanitMedium', color: Colors.light.primary, margin: 10, fontSize: 16 }}>Done
    </Text>
  )

  const headerLeft = () => (
    <Text
      onPress={() => navigation.goBack()}
      style={{ fontFamily: 'KanitMedium', color: 'white', margin: 10, fontSize: 16 }}>Cancel
    </Text>
  )


  return (
    <View style={{ flex: 1, backgroundColor: '#333' }}>


      <Header
        title={title}
        navigation={navigation}
        direction={'vertical'}
        headerRight={headerRight()}
        headerLeft={headerLeft()}
        shadow
      />



      <View style={{ paddingHorizontal: 20 }}>
        <ScrollView>
          <TextInput
            style={styles.input}
            placeholder="Search for Schools..."
            selectionColor={Colors.light.primary}
            onChangeText={handleSearch}
            value={search}
            placeholderTextColor={'#6F6F6F'}
          />

          {search && <SchoolListItemToJoin
            isSelected={isSelected(newData)}

            onSelect={() => onSelect(newData)}
            school={newData}
          />}

          {_data.length > 0 ? <FlatList
            scrollEnabled={false}
            data={_data}
            renderItem={({ item }) =>
              !isClass ? <SchoolListItemToJoin
                isSelected={isSelected(item)}
                onSelect={() => onSelect(item)}
                school={item}

              /> : <ClassListItemToJoin
                Class={item}
                isSelected={isSelected(item)}
                onSelect={() => onSelect(item)}
              />
            }
            keyExtractor={(item) => item?.id}
          />

            :
            <></>
          }
        </ScrollView>
      </View>


    </View>
  )

}

const styles = StyleSheet.create({
  input: {
    fontSize: 16,
    color: 'white',
    backgroundColor: '#454545',
    borderRadius: 25,
    padding: 10,
    width: '100%',
    marginVertical: 20
  },

})

export default SearchSelect