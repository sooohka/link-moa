import ErrorAlert from "@/components/ErrorAlert";
import useOverlay from "./useOverlay";

interface Props {
  title: string;
  description?: string;
}
const useErrorAlert = () => {
  const { render } = useOverlay();

  const openErrorAlert = async (props: Props) => {
    const { title, description } = props;
    const res = await render<void>(({ isOpen, close }) => (
      <ErrorAlert
        isOpen={isOpen}
        onClose={() => {
          close();
        }}
        title={title}
        description={description}
      ></ErrorAlert>
    ));
    return res
  };
  return { openErrorAlert };
};

export default useErrorAlert;
