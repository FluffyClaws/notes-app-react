export const validateFields = (content: string, category: string) => {
  const errors = { content: "", category: "" };
  if (!content) {
    errors.content = "Please fill out this field";
  }
  if (!category) {
    errors.category = "Please select a category";
  }
  return errors;
};
