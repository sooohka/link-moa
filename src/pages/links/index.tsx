import { AddLinkDialog } from "@/components/AddLinkDialog";
import Header from "@/components/Header";
import { useOverlay } from "@toss/use-overlay";

const Page = () => {
  const { open } = useOverlay();
  const handleAddNewLink = async () => {
    await new Promise<boolean>((res) => {
      open(({ isOpen, exit }) => (
        <AddLinkDialog
          isOpen={isOpen}
          onClose={() => {
            res(true);
            exit();
          }}
        ></AddLinkDialog>
      ));
    });
  };
  return (
    <main>
      <Header onAddLinkClick={handleAddNewLink} />
    </main>
  );
};

export default Page;
