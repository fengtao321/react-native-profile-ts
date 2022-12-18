import { Instance, SnapshotOut, types } from "mobx-state-tree"

export const ProfileStoreModel = types
  .model("ProfileStore")
  .props({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  })
  .views((store) => ({
    get validationErrors() {
      return {
        lastName:(function () {
          if (store.lastName.length === 0) return "can't be blank"
          return ""
        })(),
        email: (function () {
          if (store.email.length === 0) return "can't be blank"
          if (store.email.length < 6) return "must be at least 6 characters"
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(store.email))
            return "must be a valid email address"
          return ""
        })(),
        phoneNumber: (function () {
          if (store.phoneNumber.length === 0) return "can't be blank"
          if (store.phoneNumber.length < 6) return "must be at least 6 characters"
          return ""
        })(),
      }
    },
  }))
  .actions((store) => ({
    setFirstName(value?: string) {
      store.firstName = value.trim()
    },
    setLastName(value: string) {
      store.lastName = value.trim()
    },
    setEmail(value: string) {
      store.email = value.replace(/ /g, "")
    },
    setPhoneNumber(value: string) {
      store.phoneNumber = value.replace(/ /g, "")
    },
  }))
  .preProcessSnapshot((snapshot) => {
    // remove sensitive data from snapshot to avoid secrets
    // being stored in AsyncStorage in plain text if backing up store
    const { firstName, lastName, email, phoneNumber,...rest } = snapshot // eslint-disable-line @typescript-eslint/no-unused-vars

    // see the following for strategies to consider storing secrets on device
    // https://reactnative.dev/docs/security#storing-sensitive-info

    return rest
  })

export interface AuthenticationStore extends Instance<typeof ProfileStoreModel> {}
export interface AuthenticationStoreSnapshot extends SnapshotOut<typeof ProfileStoreModel> {}

// @demo remove-file
