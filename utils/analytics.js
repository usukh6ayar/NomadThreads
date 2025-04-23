import * as Analytics from "expo-firebase-analytics";

export const logEvent = async (name, properties = {}) => {
  try {
    await Analytics.logEvent(name, properties);
  } catch (error) {
    console.error("Analytics error:", error);
  }
};

export const setUserProperties = async (properties) => {
  try {
    await Analytics.setUserProperties(properties);
  } catch (error) {
    console.error("Analytics error:", error);
  }
};
