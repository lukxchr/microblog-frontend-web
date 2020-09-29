export const getInitialsForUsername = (username?: string) => {
  if (!username) {
    return "?";
  }
  let words = username.split("_");
  if (words.length >= 2) {
    return (words[0][0] + words.slice(-1)[0]).toUpperCase();
  } else {
    return username.slice(0, 2).toUpperCase();
  }
};
