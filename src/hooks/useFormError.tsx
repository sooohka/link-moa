import { SubmitErrorHandler } from "react-hook-form";
import useErrorAlert from "./useErrorAlert";

const useFormError = () => {
  const { openErrorAlert } = useErrorAlert();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmitError: SubmitErrorHandler<any> = async (error) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function parse(obj: Record<string, any>): any[] {
      return Object.values(obj).reduce((prev, cur) => {
        if (cur.hasOwnProperty("message")) {
          return [...prev, cur];
        } else {
          return [...prev, ...parse(cur)];
        }
      }, []);
    }

    const [{ message: errorMessage }] = Object.values(parse(error));
    console.assert(errorMessage, "errors: ", error);
    await openErrorAlert({ title: errorMessage });

    return false;
  };
  return { onSubmitError };
};

export default useFormError;
