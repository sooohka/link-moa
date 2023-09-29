import { AppRouter } from "@/server/api/root";
import { cn } from "@/utils/style";
import { inferRouterOutputs } from "@trpc/server";
import { AspectRatio } from "./ui/aspect-ratio";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

interface Props {
  isReadOnly?: boolean;
  link: inferRouterOutputs<AppRouter>["links"]["findAll"][number];
}
const LinkCard = (props: Props) => {
  const { isReadOnly = false, link } = props;
  return (
    <Card
      className={cn({
        "hvr-grow": !isReadOnly,
      })}
    >
      <a href={link.url} rel="noreferrer" target="_blank">
        <CardHeader>
          <CardTitle>{link.title}</CardTitle>
          <CardDescription className="h-5">{link.description} </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <div className="w-[200px]">
            <AspectRatio className="overflow-hidden rounded-lg">
              <img
                className="m-auto "
                alt=""
                src={link.imagePath ?? undefined}
                width={"100%"}
              ></img>
            </AspectRatio>
          </div>
        </CardContent>
      </a>
      {!isReadOnly && (
        <CardFooter>
          <Button size="sm">수정</Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default LinkCard;
