import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Plus } from "lucide-react";
import { FormEvent, useState } from "react";
import EditMenu from "./EditMenu";
import { MenuFormSchema, menuSchema } from "@/schema/MenuSchema";
import { useMenuStore } from "@/zustand/useMenuStore";
import { useRestaurantStore } from "@/zustand/useRestaurantStore";

const Addmenu = () => {
  const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setInput({ ...input, [name]: type === "number" ? Number(value) : value });
  };

  const [input, setInput] = useState<MenuFormSchema>({
    name: "",
    description: "",
    price: 0,
    image: undefined,
  });

  const { loading, createMenu } = useMenuStore();
  const { restaurant } = useRestaurantStore();
  const [open, setOpen] = useState<boolean>(false);
  const [editOpen, setEditOpen] = useState<boolean>(false);
  const [selectedMenu, setSelectedMenu] = useState<any>();
  const [error, setError] = useState<Partial<MenuFormSchema>>({});

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = menuSchema.safeParse(input);
    if (!result.success) {
      const fieldErrors = result.error.formErrors.fieldErrors;
      setError(fieldErrors as Partial<MenuFormSchema>);
      return;
    }

    // API START HERE....

    try {
      const formData = new FormData();
      formData.append("name", input.name);
      formData.append("description", input.description);
      formData.append("price", input.price.toString());
      if (input.image) {
        formData.append("image", input.image);
      }
      await createMenu(formData);
    } catch (error) {
    
    }
  };
  return (
    <div className="max-w-6xl mx-auto my-10">
      <div className="flex justify-between">
        <h1 className="font-bold md:font-extrabold text-lg md:text-2xl">
          Available Menus
        </h1>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger>
            <Button className="text-white dark:bg-gray-100 hover:dark:bg-gray-200 dark:text-black hover:bg-gray-800">
              <Plus className="mr-2" />
              Add menus
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add A Aew Menu</DialogTitle>
              <DialogDescription>
                Create a menu that will make your restaurant stand out
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
                    className="text-white dark:bg-gray-100 hover:dark:bg-gray-200 dark:text-black hover:bg-hoverOrange"
                  >
                    <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                    Please Wait
                  </Button>
                ) : (
                  <Button className="text-white dark:bg-gray-100 hover:dark:bg-gray-200 dark:text-black hover:bg-hoverOrange">
                    Submit
                  </Button>
                )}
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {restaurant?.menus.map((menu: any, idx: number) => (
        <div key={idx} className="mt-6 space-y-4 ">
          <div className="flex flex-col md:flex-row md:items-center md:space-x-4 md:p-4 p-2 shadow-md rounded-lg border">
            <img
              src={menu.image}
              alt=""
              className="md:h-24 md:w-24 h-16 w-full  object-cover rounded-lg"
            />
            <div className="flex-1 ">
              <h1 className="text-lg font-semibold text-gray-800 dark:text-gray-50">
                {menu.name}
              </h1>
              <p className="text-sm text-gray-600 mt-1 dark:text-gray-400">
                {menu.description}
              </p>
              <h2 className="text-md font-semibold mt-2">
                Price:<span className="text-[#D19254]">{menu.price}</span>
              </h2>
            </div>
            <Button
              onClick={() => {
                setSelectedMenu(menu);
                setEditOpen(true);
              }}
              size={"sm"}
              className="text-white dark:bg-gray-100 hover:dark:bg-gray-200 dark:text-black  mt-2"
            >
              Edit
            </Button>
          </div>
        </div>
      ))}

      <EditMenu
        selectedMenu={selectedMenu}
        editOpen={editOpen}
        setEditOpen={setEditOpen}
      />
    </div>
  );
};

export default Addmenu;
