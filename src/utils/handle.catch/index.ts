export const handleError = (error: unknown) => {
  console.log({ error });
  if (error instanceof Error) {
    return { reason: error.message };
  } else {
    return { reason: "An Error Occured!" };
  }
};
