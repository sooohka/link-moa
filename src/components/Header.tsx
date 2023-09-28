import Image from "next/image";
import Link from "next/link";
import { UserNav } from "./UserNav";
import { AspectRatio } from "./ui/aspect-ratio";
import { Button } from "./ui/button";

interface Props {
  onAddLinkClick: () => Promise<void>;
  onLoginClick: () => void;
  isAuthenticated: boolean;
}
const Header = (props: Props) => {
  const { isAuthenticated, onAddLinkClick, onLoginClick } = props;
  return (
    <header className="flex justify-between px-8 py-4">
      <div className="h-10 w-10">
        <Link href="/" legacyBehavior passHref>
          <AspectRatio>
            <Image src="/logo.png" alt="" width={40} height={40}></Image>
          </AspectRatio>
        </Link>
      </div>
      <div className="flex gap-4">
        <Button className="" variant="ghost" onClick={onAddLinkClick}>
          새 링크 추가하기
        </Button>
        {isAuthenticated ? (
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
