import { AsyncStorage } from "react-native";
import md5 from "md5";

class Storage {
  static setItem = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  };
  static getItem = async key => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        return JSON.parse(value);
      }
    } catch (error) {
      console.log(error);
    }
  };
  static removeItem = async key => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.log(error);
    }
  };

  static updateItem = async (key, payload) => {
    try {
      const result = await Storage.getItem(key);
      if (result) {
        if (result.hash === md5(payload.user.toString())) {
          return payload;
        } else {
          const userUpdated = await AsyncStorage.setItem(
            key,
            JSON.stringify(payload)
          );
          return userUpdated;
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
}

export default Storage;
