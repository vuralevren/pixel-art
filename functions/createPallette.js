import _ from "lodash";

export const getDefaultPictureBySize = (size) => {
  switch (size) {
    case 16:
      return "https://c1-europe.altogic.com/_storage/63ad6bca816efec7d19e9656/63b3e6aa4a447286302dc9c2/63b3e6b97a722c6f19af172c";
    case 32:
      return "https://c1-europe.altogic.com/_storage/63ad6bca816efec7d19e9656/63b3e6aa4a447286302dc9c2/63bbecc7d7f8c3befa6c9fc2";
    case 48:
      return "https://c1-europe.altogic.com/_storage/63ad6bca816efec7d19e9656/63b3e6aa4a447286302dc9c2/63bbecd137dba4803c4a9ea4";
    case 64:
      return "https://c1-europe.altogic.com/_storage/63ad6bca816efec7d19e9656/63b3e6aa4a447286302dc9c2/63bbecd237dba4803c4a9ea5";

    default:
      // 16
      return "https://c1-europe.altogic.com/_storage/63ad6bca816efec7d19e9656/63b3e6aa4a447286302dc9c2/63b3e6b97a722c6f19af172c";
  }
};

export const getClassNamesPalletteBySize = (size) => {
  switch (size) {
    case 16:
      return "w-5 h-5 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14";
    case 32:
      return "w-2.5 h-2.5 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7";
    case 48:
      return "w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 lg:w-5 lg:h-5";
    case 64:
      return "w-1.5 h-1.5 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 lg:w-3.5 lg:h-3.5";

    default:
      // 16
      return "w-5 h-5 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14";
  }
};

export const getClassNamesShowPalletteBySize = (size) => {
  switch (size) {
    case 16:
      return "w-4 h-4";
    case 32:
      return "w-2 h-2";
    case 48:
      return "w-1.5 h-1.5";
    case 64:
      return "w-1 h-1";

    default:
      // 16
      return "w-1.5 h-1.5 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 lg:w-1.5 lg:h-1.5";
  }
};

export default function createPallette(size) {
  return _.map(new Array(size), (row, rowIndex) =>
    _.map(new Array(size), (column, columnIndex) => ({
      y: rowIndex,
      x: columnIndex,
      color: "#fff",
    }))
  );
}
