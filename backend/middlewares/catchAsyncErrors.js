export const catchAsyncErrors = (theaFunction) => {
  return (req, res, next) => {
    Promise.resolve(theaFunction(req, res, next)).catch(next);
  };
};
