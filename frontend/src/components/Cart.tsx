import { Minus, Plus } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import CheckoutConfirmPage from "../components/CheckoutConfirmPage";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { useState } from "react";
import { useCartStore } from "@/zustand/useCartStore";
import { CartItem } from "@/types/cartTypes";

const Cart = () => {
  const [open, setOpen] = useState<boolean>(false);
  const {
    cart,
    incrementQuantity,
    decrementQuantity,
    removeFromTheCart,
    clearCart,
  } = useCartStore();
  const totalAmount = cart.reduce((acc, ele) => {
    return acc + ele.price * ele.quantity;
  }, 0);

  return (
    <div className="flex flex-col max-w-7xl mx-auto my-10 bg-transparent">
      <div className="flex justify-end">
        {/* Clear All Button */}
        <Button
          variant="link"
          onClick={clearCart}
          className="text-white bg-red-600 dark:bg-gray-100 hover:dark:bg-gray-200 dark:text-black  mb-3"
        >
          Clear All
        </Button>
      </div>
      <Table className="bg-gray-50 dark:bg-gray-900">
        <TableHeader>
          <TableRow>
            <TableHead className="text-extrabold">Items</TableHead>
            <TableHead className="text-extrabold">Title</TableHead>
            <TableHead className="text-extrabold">Price</TableHead>
            <TableHead className="text-extrabold">Quantity </TableHead>
            <TableHead className="text-extrabold">Total </TableHead>
            <TableHead className="text-right text-extrabold">Remove </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cart.map((item: CartItem) => (
            <TableRow key={item._id}>
              <TableCell>
                <Avatar>
                  <AvatarImage src={item.image} alt="" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.price}</TableCell>
              <TableCell>
                <div className="w-fit flex items-center rounded-full border border-gray-100 dark:border-gray-800 shadow-md">
                  <Button
                    onClick={() => decrementQuantity(item._id)}
                    size={"icon"}
                    variant={"outline"}
                    className="rounded-full bg-gray-200 dark:bg-gray-100 hover:bg-gray-100"
                  >
                    <Minus />
                  </Button>
                  <Button
                    size={"icon"}
                    disabled
                    variant={"outline"}
                    className="font-bold border-none"
                  >
                    {item.quantity}
                  </Button>
                  <Button
                    onClick={() => incrementQuantity(item._id)}
                    size={"icon"}
                    variant={"outline"}
                    className="rounded-full bg-gray-800 hover:bg-gray-600 dark:text-white text-white dark:hover:text-white  dark:bg-gray-800 hover:dark:bg-gray-600 "
                  >
                    <Plus />
                  </Button>
                </div>
              </TableCell>
              <TableCell>{item.price * item.quantity}</TableCell>
              <TableCell className="text-right">
                <Button
                  size={"sm"}
                  className="text-white dark:bg-gray-100 hover:dark:bg-gray-200 dark:text-black hover:bg-gray-800"
                  onClick={() => removeFromTheCart(item._id)}
                >
                  Remove
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow className="text-2xl font-bold">
            <TableCell colSpan={5}>Total</TableCell>
            <TableCell className="text-right">{totalAmount}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <div className="flex justify-end my-5">
        <Button
          onClick={() => setOpen(true)}
          className="text-white dark:bg-gray-100 hover:dark:bg-gray-200 dark:text-black hover:bg-gray-800"
        >
          Proceed To Checkout
        </Button>
      </div>
      <CheckoutConfirmPage open={open} setOpen={setOpen}></CheckoutConfirmPage>
    </div>
  );
};

export default Cart;
