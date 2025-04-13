import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const index = () => {
  return (
   <SafeAreaView style={styles.view}>
      <View>
        <Text>Hello Vipusa</Text>
      </View>
   </SafeAreaView>
  )
}

export default index

const styles = StyleSheet.create({
  view : {
     backgroundColor : '#1F1E1B'
  }
})