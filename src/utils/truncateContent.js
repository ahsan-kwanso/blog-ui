// Utility function to truncate content
export const truncateContent = (content, wordLimit) => {
  const words = content.split(" ");
  return words.length <= wordLimit
    ? content
    : `${words.slice(0, wordLimit).join(" ")} ...`;
};
