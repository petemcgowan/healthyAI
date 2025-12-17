import React, {useRef, useState, useEffect} from 'react'
import {View, Text, Dimensions, StyleSheet, Image} from 'react-native'
import Video, {ReactVideoSource, ResizeMode} from 'react-native-video'
import {RFPercentage} from 'react-native-responsive-fontsize'

const {width, height} = Dimensions.get('window')

interface SlideComponentProps {
  title: string
  description: string
  videoSource: ReactVideoSource
  intro: boolean
  hasSeenIntro: boolean
  shouldPlay: boolean
  posterSource: any
  // shouldRenderVideo: boolean;
}

const SlideComponent = ({
  title,
  description,
  videoSource,
  intro,
  hasSeenIntro,
  shouldPlay,
  posterSource,
}: // shouldRenderVideo,
SlideComponentProps) => {
  const videoRef = useRef<Video>(null)

  // Simple State: Is the video ready to be shown?
  const [isVideoReady, setIsVideoReady] = useState(false)

  const isPaused = !shouldPlay || hasSeenIntro
  const posterUri = posterSource
    ? Image.resolveAssetSource(posterSource).uri
    : null

  // Reset the ready state if we scroll away.
  // This brings the poster back if the user swipes back to this slide later.
  // useEffect(() => {
  //   if (!shouldPlay) {
  //     setIsVideoReady(false);
  //   }
  // }, [shouldPlay]);

  return (
    <View style={styles.slideContainer}>
      <View style={styles.videoContainer}>
        {/* 1. THE VIDEO (Bottom Layer) */}
        {/* {shouldRenderVideo && ( */}
        <Video
          ref={videoRef}
          source={videoSource}
          paused={isPaused}
          // NOW that the video file is vertical, 'contain' is safe and correct.
          resizeMode={ResizeMode.CONTAIN}
          muted={true}
          rate={1.0}
          repeat={true}
          disableFocus={true}
          playWhenInactive={false}
          ignoreSilentSwitch="obey"
          // Simple Trigger: When video paints first frame, hide poster.
          onReadyForDisplay={() => setIsVideoReady(true)}
          style={styles.video}
        />
        {/* )} */}

        {/* 2. THE POSTER (Top Layer) */}
        {/* Only render if video is NOT ready. */}
        {!isVideoReady && posterUri && (
          <Image
            source={{uri: posterUri}}
            style={[StyleSheet.absoluteFill, {zIndex: 10}]}
            // MUST match the video's resizeMode so they overlap perfectly
            resizeMode="contain"
          />
        )}
      </View>

      <View style={styles.textBoxVideo}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.text}>{description}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  slideContainer: {
    width: width,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  videoContainer: {
    width: width,
    height: height * 0.63,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    overflow: 'hidden',
  },
  video: {
    width: width,
    height: height * 0.63,
  },
  textBoxVideo: {
    paddingHorizontal: 20,
    alignItems: 'center',
    marginTop: 20,
  },
  title: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: RFPercentage(3.2),
    marginBottom: 10,
  },
  text: {
    color: 'white',
    textAlign: 'center',
    fontSize: RFPercentage(2),
  },
})

export default SlideComponent
