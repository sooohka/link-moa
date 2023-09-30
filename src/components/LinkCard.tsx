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
  onUpdate?: (id: number) => void;
  onDelete?: (id: number) => void;
}
const LinkCard = (props: Props) => {
  const { onUpdate, onDelete } = props;
  const { isReadOnly = false, link } = props;

  const handleUpdate = () => {
    if (isReadOnly) {
      return;
    }
    if (!onUpdate) {
      throw new Error("onUpdate is not defined");
    }
    onUpdate(link.id);
  };
  const handleDelete = () => {
    if (isReadOnly) {
      return;
    }
    if (!onDelete) {
      throw new Error("onDelete is not defined");
    }
    onDelete(link.id);
  };

  return (
    <Card
      className={cn("overflow-hidden", {
        "hvr-grow": !isReadOnly,
      })}
    >
      <a href={link.url} rel="noreferrer" target="_blank">
        <CardHeader>
          <CardTitle>{link.title}</CardTitle>
          <CardDescription className="text-sm line-clamp-3 h-[60px] text-ellipsis">
            {link.description}{" "}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <div className="w-[200px]">
            <AspectRatio className="overflow-hidden rounded-lg">
              <img
                className="m-auto h-full w-full"
                alt=""
                src={link.imagePath ?? undefined}
              ></img>
            </AspectRatio>
          </div>
        </CardContent>
      </a>
      {!isReadOnly && (
        <CardFooter>
          <div className="flex gap-1">
            <Button size="sm" onClick={handleUpdate}>
              수정
            </Button>
            <Button variant="destructive" size="sm" onClick={handleDelete}>
              삭제
            </Button>
          </div>
        </CardFooter>
      )}
    </Card>
  );
};

export default LinkCard;
