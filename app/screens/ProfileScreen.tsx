import {
  Button,
  Text,
} from "../components"
import { Image, ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import React, { FC } from "react"
import { colors, spacing } from "../theme"

import { AppStackScreenProps } from "../navigators" // @demo remove-current-line
import { isRTL } from "../i18n"
import { observer } from "mobx-react-lite"
import { useHeader } from "../utils/useHeader" // @demo remove-current-line
import { useSafeAreaInsetsStyle } from "../utils/useSafeAreaInsetsStyle"
import { useStores } from "../models" // @demo remove-current-line

interface ProfileScreenProps extends AppStackScreenProps<"Profile"> {} // @demo remove-current-line

export const ProfileScreen: FC<ProfileScreenProps> = observer(function ProfileScreen(
  _props, // @demo remove-current-line
) {
  // @demo remove-block-start
  const { navigation } = _props
  const {
    authenticationStore: { logout },
  } = useStores()

  function goNext() {
    navigation.navigate("Demo", { screen: "DemoShowroom" })
  }

  useHeader({
    rightTx: "common.logOut",
    onRightPress: logout,
  })
  // @demo remove-block-end

  const $bottomContainerInsets = useSafeAreaInsetsStyle(["bottom"])

  return (
    <h1>Profile</h1>
    // <View style={$container}>
    //   <View style={$topContainer}>
    //     <Image style={$welcomeLogo} source={welcomeLogo} resizeMode="contain" />
    //     <Text
    //       testID="welcome-heading"
    //       style={$welcomeHeading}
    //       tx="welcomeScreen.readyForLaunch"
    //       preset="heading"
    //     />
    //     <Text tx="welcomeScreen.exciting" preset="subheading" />
    //     <Image style={$welcomeFace} source={welcomeFace} resizeMode="contain" />
    //   </View>

    //   <View style={[$bottomContainer, $bottomContainerInsets]}>
    //     <Text tx="welcomeScreen.postscript" size="md" />
    //     {/* @demo remove-block-start */}
    //     <Button
    //       testID="next-screen-button"
    //       preset="reversed"
    //       tx="welcomeScreen.letsGo"
    //       onPress={goNext}
    //     />
    //     {/* @demo remove-block-end */}
    //   </View>
    // </View>
  )
})

const $container: ViewStyle = {
  flex: 1,
  backgroundColor: colors.background,
}

const $topContainer: ViewStyle = {
  flexShrink: 1,
  flexGrow: 1,
  flexBasis: "57%",
  justifyContent: "center",
  paddingHorizontal: spacing.large,
}

const $bottomContainer: ViewStyle = {
  flexShrink: 1,
  flexGrow: 0,
  flexBasis: "43%",
  backgroundColor: colors.palette.neutral100,
  borderTopLeftRadius: 16,
  borderTopRightRadius: 16,
  paddingHorizontal: spacing.large,
  justifyContent: "space-around",
}
const $welcomeLogo: ImageStyle = {
  height: 88,
  width: "100%",
  marginBottom: spacing.huge,
}

const $welcomeFace: ImageStyle = {
  height: 169,
  width: 269,
  position: "absolute",
  bottom: -47,
  right: -80,
  transform: [{ scaleX: isRTL ? -1 : 1 }],
}

const $welcomeHeading: TextStyle = {
  marginBottom: spacing.medium,
}