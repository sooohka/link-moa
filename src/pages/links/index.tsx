import { AddLinkDialog } from "@/components/AddLinkDialog";
import Header from "@/components/Header";
import useOverlay from "@/hooks/useOverlay";
import { api } from "@/utils/api";
import { signIn, useSession } from "next-auth/react";

const Page = () => {
  const { render } = useOverlay();
  const { status } = useSession();
  const { data } = api.links.findAll.useQuery();
  const handleAddNewLink = async () => {
    await render(({ isOpen, close }) => (
      <AddLinkDialog
        isOpen={isOpen}
        onClose={() => {
          close(true);
        }}
      ></AddLinkDialog>
    ));
  };

  const handleLogin = () => {
    signIn();
  };
  console.log(data);
  return (
    <main>
      <Header
        onAddLinkClick={handleAddNewLink}
        onLoginClick={handleLogin}
        isAuthenticated={status === "authenticated"}
      />
    </main>
  );
};

export default Page;
