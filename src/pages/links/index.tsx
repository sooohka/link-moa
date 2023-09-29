import { AddLinkDialog } from "@/components/AddLinkDialog";
import Header from "@/components/Header";
import LinkCard from "@/components/LinkCard";
import useErrorAlert from "@/hooks/useErrorAlert";
import useOverlay from "@/hooks/useOverlay";
import { api } from "@/utils/api";
import { signIn, useSession } from "next-auth/react";

const Page = () => {
  const { render } = useOverlay();
  const { status } = useSession();
  const { openErrorAlert } = useErrorAlert();
  const linkCtx = api.useContext().links;
  const { data } = api.links.findAll.useQuery(undefined, {
    enabled: status === "authenticated",
  });
  const { mutate: deleteLink } = api.links.delete.useMutation({
    onSuccess: () => {
      linkCtx.findAll.invalidate();
      // refetch
    },
  });

  const handleAddNewLink = async () => {
    if (status !== "authenticated") {
      await openErrorAlert({
        title: "로그인 후 이용해주세요.",
      });
      signIn();
      return;
    }
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

  const handleDelete = async (id: number) => {
    deleteLink({ id });
  };

  return (
    <main>
      <Header
        onAddLinkClick={handleAddNewLink}
        onLoginClick={handleLogin}
        isAuthenticated={status === "authenticated"}
      />
      <div
        className="container grid w-full gap-4 px-4
        sm:grid-cols-1
        md:grid-cols-3
        lg:grid-cols-4
      "
      >
        {data?.map((link) => (
          <LinkCard
            key={link.id}
            link={link}
            onDelete={handleDelete}
          ></LinkCard>
        ))}
      </div>
    </main>
  );
};

export default Page;
