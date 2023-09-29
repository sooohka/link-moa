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
  const { data } = api.links.findAll.useQuery(undefined, {
    enabled: status === "authenticated",
  });

  const handleAddNewLink = async () => {
    if (status !== "authenticated") {
      await openErrorAlert({
        title: "로그인 후 이용해주세요.",
      });
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
  console.log(data);
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
        {data?.map((link) => <LinkCard key={link.id} link={link}></LinkCard>)}
        {data?.map((link) => <LinkCard key={link.id} link={link}></LinkCard>)}
        {data?.map((link) => <LinkCard key={link.id} link={link}></LinkCard>)}
        {data?.map((link) => <LinkCard key={link.id} link={link}></LinkCard>)}
        {data?.map((link) => <LinkCard key={link.id} link={link}></LinkCard>)}
        {data?.map((link) => <LinkCard key={link.id} link={link}></LinkCard>)}
      </div>
    </main>
  );
};

export default Page;
