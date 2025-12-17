// --- REUSABLE HELPER COMPONENT ---
// This handles drawing one circle + text.

import {StyleSheet, Text, View} from 'react-native'
import {RFPercentage} from 'react-native-responsive-fontsize'
import Svg, {Circle, G} from 'react-native-svg'

// We reuse this for KG, Pounds, and both Stones/Pounds circles.
const WeightDisplay = ({
  value,
  label,
  radius,
}: {
  value: number
  label: string
  radius: number
}) => {
  const strokeWidth = 10
  const halfCircle = radius + strokeWidth
  const circumference = 2 * Math.PI * radius
  const circleColor = '#4FD1C5' // Teal
  const textColor = '#E0E0E0' // Off-white

  return (
    <View style={{alignItems: 'center', marginHorizontal: 10}}>
      <View style={{width: radius * 2, height: radius * 2}}>
        <Svg
          height={radius * 2}
          width={radius * 2}
          viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}>
          <G rotation="-90" origin={`${halfCircle}, ${halfCircle}`}>
            {/* Background track circle (optional, adds depth) */}
            <Circle
              cx="50%"
              cy="50%"
              r={radius}
              fill="transparent"
              stroke={circleColor}
              strokeWidth={strokeWidth}
              strokeOpacity={0.2}
            />
            {/* Foreground circle */}
            <Circle
              cx="50%"
              cy="50%"
              r={radius}
              fill="transparent"
              stroke={circleColor}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              // If you want it full, use 0. If you want to animate, use AnimatedCircle logic here.
              strokeDasharray={circumference}
              strokeDashoffset={0}
            />
          </G>
        </Svg>

        {/* The Number inside */}
        <View
          style={[
            StyleSheet.absoluteFill,
            {justifyContent: 'center', alignItems: 'center'},
          ]}>
          <Text
            style={{
              fontSize: radius / 1.6,
              color: textColor,
              fontWeight: '900',
            }}>
            {Math.round(value)}
          </Text>
        </View>
      </View>
      {/* The Unit Label (e.g. "kg") */}
      <Text style={styles.unitLabel}>{label}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  unitLabel: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: RFPercentage(2.5),
    marginTop: 5,
    textAlign: 'center',
    textTransform: 'lowercase',
  },
})

export default WeightDisplay
