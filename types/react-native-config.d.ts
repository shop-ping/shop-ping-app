declare module "react-native-config" {
  export interface NativeConfig {
    MAPBOX_TOKEN: string;
  }
  export const Config: NativeConfig;
  export default Config;
}
