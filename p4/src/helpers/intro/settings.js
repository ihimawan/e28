export const validateName = name => {
  return (
    name != null &&
    name !== "" &&
    name.length <= 10 &&
    name.search(/[^a-zA-Z]+/) === -1
  );
};
