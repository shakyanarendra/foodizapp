import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MenuFormSchema, menuSchema } from "@/schema/MenuSchema";
import { MenuItem } from "@/types/restaurantTypes";
import { useMenuStore } from "@/zustand/useMenuStore";
import { Loader2 } from "lucide-react";
import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
const EditMenu = ({
  selectedMenu,
  editOpen,
  setEditOpen,
}: {
  selectedMenu: MenuItem;
  editOpen: boolean;
  setEditOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setInput({
      ...input,
      [name]: type === "number" ? (value ? Number(value) : 0) : value,
    });
  };

  const { loading, editMenu } = useMenuStore();
  const [input, setInput] = useState<MenuFormSchema>({
    name: "",
    description: "",
    price: 0,
    image: undefined,
  });
  const [error, setError] = useState<Partial<MenuFormSchema>>({});

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = menuSchema.safeParse(input);
    if (!result.success) {
      const fieldErrors = result.error.formErrors.fieldErrors;
      setError(fieldErrors as Partial<MenuFormSchema>);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", input.name);
      formData.append("description", input.description);
      formData.append("price", input.price.toString());
     

      if (input.image) {
        formData.append("image", input.image);
      }

      await editMenu(selectedMenu._id, formData);
    } catch (error) {
       throw new Error("Failed to edit menu");
    }
  };
  useEffect(() => {
    setInput({
      name: selectedMenu?.name || "",
      description: selectedMenu?.description || "",
      price: selectedMenu?.price || 0,
      image: undefined,
    });
  }, [selectedMenu]);
  return (
    <Dialog open={editOpen} onOpenChange={setEditOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Menu</DialogTitle>
          <DialogDescription>
            Update Your Menu to keep your offerings fresh and exciting
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={submitHandler} className="space-y-4">
          <div>
            <Label>Name</Label>
            <Input
              type="text"
              placeholder="Enter Menu Name"
              name="name"
              value={input.name}
              onChange={changeEventHandler}
            />
            {error && (
              <span className="text-xs font-medium text-red-600">
                {error.name}
              </span>
            )}
          </div>

          <div>
            <Label>Description</Label>
            <Input
              type="text"
              placeholder="Enter Menu Description"
              name="description"
              value={input.description}
              onChange={changeEventHandler}
            />
            {error && (
              <span className="text-xs font-medium text-red-600">
                {error.description}
              </span>
            )}
          </div>

          <div>
            <Label>Price in (Rupee)</Label>
            <Input
              type="number"
              placeholder="Enter Menu Price"
              name="price"
              value={input.price}
              onChange={changeEventHandler}
            />
            {error && (
              <span className="text-xs font-medium text-red-600">
                {error.price}
              </span>
            )}
          </div>

          <div>
            <Label>Upload Menu Image</Label>
            <Input
              type="file"
              name="image"
              onChange={(e) =>
                setInput({
                  ...input,
                  image: e.target.files?.[0] || undefined,
                })
              }
            />
            {error && (
              <span className="text-xs font-medium text-red-600">
                {error.image?.name}
              </span>
            )}
          </div>
          <DialogFooter className="mt-5">
            {loading ? (
              <Button
                disabled
                className="text-white dark:bg-gray-100 hover:dark:bg-gray-200 dark:text-black hover:bg-gray-600"
              >
                <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                Please Wait
              </Button>
            ) : (
              <Button className="text-white dark:bg-gray-100 hover:dark:bg-gray-200 dark:text-black hover:bg-gray-500">
                Submit
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditMenu;
