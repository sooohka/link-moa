import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useFormError from "@/hooks/useFormError";
import { OgRouterOutput } from "@/types/dto";
import { api } from "@/utils/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import LinkCard from "./LinkCard";
import { Collapsible, CollapsibleContent } from "./ui/collapsible";

const formType = z.object({
  url: z.string().url().trim(),
});
type FormType = z.infer<typeof formType>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
}
export function AddLinkDialog(props: Props) {
  const { isOpen, onClose } = props;
  const { onSubmitError } = useFormError();
  const { mutate: searchOgTag } = api.og.get.useMutation({
    onSuccess: (og) => {
      setOgInfo(og);
    },
    onError: () => {
      setOgInfo(null);
    },
  });
  const { mutateAsync: createOgTag } = api.links.create.useMutation({
    onSuccess: () => {
      onClose();
    },
  });
  const [ogInfo, setOgInfo] = useState<OgRouterOutput["get"] | null>(null);

  const { register, handleSubmit, watch } = useForm<FormType>({
    defaultValues: {
      url: "",
    },
    resolver: zodResolver(formType),
  });
  const url = watch("url");

  const onSubmit: SubmitHandler<FormType> = async (payload) => {
    createOgTag(payload);
    return true;
  };

  useEffect(() => {
    const s = setTimeout(() => {
      if (!url) {
        return;
      }
      searchOgTag({ url });
    }, 500);

    return () => {
      clearTimeout(s);
    };
  }, [searchOgTag, url]);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          onClose();
        }
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(onSubmit, onSubmitError)}>
          <DialogHeader className="pb-4">
            <DialogTitle>링크 추가</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-8 py-4">
            <div className="flex items-center gap-4">
              <Label htmlFor="url" className="flex-shrink-0 text-right">
                링크:
              </Label>
              <Input {...register("url")} id="url" className="col-span-3" />
            </div>
            <Collapsible open={Boolean(ogInfo)}>
              <CollapsibleContent>
                {ogInfo && (
                  <LinkCard
                    isReadOnly
                    link={{
                      id: 0,
                      url: ogInfo.url,
                      createdAt: new Date(),
                      updatedAt: new Date(),
                      description: ogInfo.description ?? null,
                      imagePath: ogInfo.images?.[0]?.url ?? null,
                      title: ogInfo.title,
                      userId: "",
                    }}
                  ></LinkCard>
                )}
              </CollapsibleContent>
            </Collapsible>
          </div>
          <DialogFooter>
            <Button type="submit">저장</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
