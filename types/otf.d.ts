/**
 * Allows type-safe imports of OTF fonts.
 * From https://stackoverflow.com/questions/72003991/font-loadasync-unsafe-assignment-of-an-any-value-on-imported-fonts
 */
declare module "*.otf" {
  import { FontSource } from "expo-font";
  const value: FontSource;
  export default value;
}
