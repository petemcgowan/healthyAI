import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet'
import React from 'react'
import {Linking, Text, View, Dimensions, StyleSheet} from 'react-native'
import {RFPercentage} from 'react-native-responsive-fontsize'
// import ColourContext from '../state/ColourContext';
import {CustomNewBackground} from './CustomNewBackground'

const {height} = Dimensions.get('window')
const ITEM_HEIGHT = height * 0.8

interface BottomHelpProps {
  helpSubHeading: string
  helpText: string
  helpReferenceTitle: string
  helpReferenceLink: string
}

const BottomHelp = ({
  helpSubHeading,
  helpText,
  helpReferenceTitle,
  helpReferenceLink,
}: BottomHelpProps) => {
  return (
    <BottomSheet
      animateOnMount
      backgroundComponent={CustomNewBackground}
      // snapPoints={[100, 300]}
      snapPoints={[
        height > 750 ? height * 0.14 : height * 0.14,
        ITEM_HEIGHT - height * 0.1,
      ]}
      style={styles.bottomSheet}>
      <BottomSheetScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContainer}>
        <Text style={styles.helpSubHeadingText}>{helpSubHeading}</Text>
        <View style={styles.helpTextContainer}>
          <Text style={styles.helpText}>{helpText}</Text>

          {helpReferenceTitle !== null && (
            <Text style={styles.helpReferenceTitle1}>Reference: </Text>
          )}

          {helpReferenceTitle !== null && (
            <Text style={styles.helpReferenceTitle2}>{helpReferenceTitle}</Text>
          )}

          {helpReferenceLink !== null && (
            <Text
              style={styles.helpReferenceLink}
              onPress={() => Linking.openURL(helpReferenceLink)}>
              {helpReferenceLink}
            </Text>
          )}
        </View>
      </BottomSheetScrollView>
    </BottomSheet>
  )
}

const styles = StyleSheet.create({
  bottomSheet: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.51,
    shadowRadius: 13.16,
    elevation: 20,
  },
  helpSubHeadingText: {
    fontSize: RFPercentage(5),
    color: 'white',
    margin: 'auto',
  },
  scrollView: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.51,
    shadowRadius: 13.16,
    elevation: 20,
  },
  scrollViewContainer: {
    paddingHorizontal: 18,
  },
  helpText: {
    // color: colourData[index].dominant,
    color: 'white',
    fontSize: RFPercentage(2),
    textAlign: 'center',
  },
  helpTextContainer: {
    marginVertical: 20,
  },
  helpReferenceTitle1: {
    fontStyle: 'italic',
    marginTop: 15,
  },
  helpReferenceTitle2: {
    fontStyle: 'italic',
    color: 'rgba(255,255,255, 0.8)',
    fontSize: RFPercentage(2),
  },
  helpReferenceLink: {
    color: 'mediumblue',
    textDecorationLine: 'underline',
  },
})

export default BottomHelp
