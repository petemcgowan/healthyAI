import React, {useEffect} from 'react'
import {StatusBar, useColorScheme, StyleSheet} from 'react-native'
import {SafeAreaProvider} from 'react-native-safe-area-context'
import {Provider} from 'react-redux'
import {PersistGate} from 'redux-persist/integration/react'
import BootSplash from 'react-native-bootsplash'
import TheoryComponent from './components/TheoryComponent'
import {LogBox} from 'react-native'
import {GestureHandlerRootView} from 'react-native-gesture-handler'

// Import your Store and Persistor
import {store, persistor} from './redux/store'

// --- LOGBOX CONFIGURATION ---
// Suppress the annoying warnings we discussed
LogBox.ignoreLogs([
  'InteractionManager has been deprecated',
  'Selector unknown returned the root state',
  'SafeAreaView has been deprecated',
])

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark'
  const [helpData, setHelpData] = React.useState([])

  useEffect(() => {
    const init = async () => {
      // Any async loading tasks (auth check, font loading) go here.

      // ...

      // When ready, hide the splash screen with a smooth fade
      await BootSplash.hide({fade: true})
      console.log('BootSplash hidden')
    }

    init()
  }, [])

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GestureHandlerRootView style={{flex: 1}}>
          <SafeAreaProvider>
            <StatusBar
              barStyle={isDarkMode ? 'light-content' : 'dark-content'}
              backgroundColor={isDarkMode ? '#000000' : '#ffffff'}
            />
            {/*
                  If you aren't using a StackNavigator yet and just showing
                  the Swiper directly, this works. Otherwise, put your
                  <Stack.Navigator> here.
              */}
            <TheoryComponent helpData={helpData} />
          </SafeAreaProvider>
        </GestureHandlerRootView>
      </PersistGate>
    </Provider>
  )
}

const styles = StyleSheet.create({
  // Add global styles here if needed
})

export default App
