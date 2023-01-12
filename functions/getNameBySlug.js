import _ from "lodash";

export default function getNameBySlug(text) {
  return _(text)
    .replace("-", " ")
    .replace(
      /\w\S*/g,
      (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    );
}
