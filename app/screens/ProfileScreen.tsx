import { Button, Icon, Screen, Text, TextField, TextFieldAccessoryProps } from "../components"
import { Image, ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import React, { FC, useRef, useState } from "react"
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


  useHeader({
    rightTx: "common.logOut",
    onRightPress: logout,
  })
  // @demo remove-block-end


  const [isSubmitted, setIsSubmitted] = useState(false)
  const [attemptsCount, setAttemptsCount] = useState(0)
  const {
    profileStore: {
      firstName,
      lastName,
      email,
      phoneNumber,
      setFirstName,
      setLastName,
      setEmail,
      setPhoneNumber,
      validationErrors,
    },
  } = useStores()



  const errors: typeof validationErrors = isSubmitted ? validationErrors : ({} as any)

  function submitProfile() {
    setIsSubmitted(true)
    setAttemptsCount(attemptsCount + 1)

    if (Object.values(validationErrors).some((v) => !!v)) return

    // Make a request to your server to get an authentication token.
    // If successful, reset the fields and set the token.
    setIsSubmitted(false)
    setFirstName("")
    setLastName("")
    setEmail("")
    setPhoneNumber("")
  }
  

  const $bottomContainerInsets = useSafeAreaInsetsStyle(["bottom"])
  return (
    <View style={$container}>
      <View style={$topContainer}>

        <Text
          testID="welcome-heading"
          style={$welcomeHeading}
          tx="welcomeScreen.readyForLaunch"
          preset="heading"
        />
        <Text tx="welcomeScreen.exciting" preset="subheading" />

      </View>

      <View style={[$bottomContainer, $bottomContainerInsets]}>
        <TextField
          value={firstName}
          onChangeText={setFirstName}
          containerStyle={$textField}
          keyboardType="default"
          autoCapitalize="none"
          autoComplete="name-given"
          autoCorrect={false}
          labelTx="profileScreen.firstNameFieldLabel"
          placeholderTx="profileScreen.firstNameFieldPlaceholder"
        />
        <TextField
          value={lastName}
          onChangeText={setLastName}
          containerStyle={$textField}
          autoCapitalize="none"
          keyboardType="default"
          autoComplete="name-family"
          autoCorrect={false}
          labelTx="profileScreen.lastNameFieldLabel"
          placeholderTx="profileScreen.lastNameFieldPlaceholder"
          helper={errors?.lastName}
          status={errors?.lastName ? "error" : undefined}
        />
        <TextField
          value={email}
          onChangeText={setEmail}
          containerStyle={$textField}
          autoCapitalize="none"
          autoComplete="email"
          autoCorrect={false}
          keyboardType="email-address"
          labelTx="profileScreen.emailFieldLabel"
          placeholderTx="profileScreen.emailFieldPlaceholder"
          helper={errors?.email}
          status={errors?.email ? "error" : undefined}
        />
        <TextField
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          containerStyle={$textField}
          autoCapitalize="none"
          autoComplete="tel"
          autoCorrect={false}
          keyboardType="phone-pad"
          labelTx="profileScreen.phoneNumberFieldLabel"
          placeholderTx="profileScreen.phoneNumberFieldPlaceholder"
          helper={errors?.phoneNumber}
          status={errors?.phoneNumber ? "error" : undefined}
        />


        {/* @demo remove-block-start */}
        <Button
          testID="next-screen-button"
          preset="reversed"
          tx="welcomeScreen.letsGo"
          onPress={submitProfile}
        />
        {/* @demo remove-block-end */}
      </View>
  </View>
  )
})

const $container: ViewStyle = {
  flex: 1,
  backgroundColor: colors.background,
  alignItems: "center",
}

const $topContainer: ViewStyle = {
  flexShrink: 1,
  flexGrow: 1,
  flexBasis: "30%",
  justifyContent: "center",
  paddingHorizontal: spacing.large,
  width: "100%",
  maxWidth: 1000,
}

const $bottomContainer: ViewStyle = {
  flexShrink: 1,
  flexGrow: 0,
  flexBasis: "70%",
  backgroundColor: colors.palette.neutral100,
  borderTopLeftRadius: 16,
  borderTopRightRadius: 16,
  paddingHorizontal: spacing.large,
  justifyContent: "space-around",
  width: "100%",
  maxWidth: 1000,
}

const $welcomeHeading: TextStyle = {
  marginBottom: spacing.medium,
}

const $textField: ViewStyle = {
  marginBottom: spacing.large,
}