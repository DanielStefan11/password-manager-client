export const capitalizeFirstLetter = (word: string): string | undefined => {
   if (word !== "" || word !== undefined) {
      const capitalizedWord = word.charAt(0).toUpperCase() + word.slice(1);
      return capitalizedWord;
   } else {
      return;
   }
};
