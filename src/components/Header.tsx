import Image from "next/image";
import Link from "next/link";
import { UserNav } from "./UserNav";
import { AspectRatio } from "./ui/aspect-ratio";
import { Button } from "./ui/button";
import { useAuth } from "@/context/auth";

interface Props {
  onAddLinkClick: () => Promise<void>;
  onLoginClick: () => void;
}
const Header = (props: Props) => {
  const { onAddLinkClick, onLoginClick } = props;
  const { status, user } = useAuth();
  return (
    <header className="flex justify-between px-8 py-4">
      <div className="h-10 w-10">
        <Link href="/" legacyBehavior passHref>
          <AspectRatio className="flex cursor-pointer items-center justify-center">
            <Image src="/logo.png" alt="" width={40} height={40}></Image>
          </AspectRatio>
        </Link>
      </div>
      <div className="flex gap-4">
        <Button className="" variant="ghost" onClick={onAddLinkClick}>
          새 링크 추가하기
        </Button>
        {status === "authenticated" ? (
          <UserNav></UserNav>
        ) : (
          <Button className="" variant="ghost" onClick={onLoginClick}>
            Log in
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;
