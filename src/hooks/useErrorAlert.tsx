import ErrorAlert from "@/components/ErrorAlert";
import { useOverlay } from "@toss/use-overlay";

interface Props {
  title: string;
  description?: string;
}
const useErrorAlert = () => {
  const { open } = useOverlay();

  const openErrorAlert = async (props: Props) => {
    const { title, description } = props;
    return new Promise<boolean>((res) => {
      open(({ isOpen, exit }) => (
        <ErrorAlert
          isOpen={isOpen}
          onClose={() => {
            res(true);
            exit();
          }}
          title={title}
          description={description}
        ></ErrorAlert>
      ));
    });
  };
  return { openErrorAlert };
};

export default useErrorAlert;
