import { getCart } from "@/lib/cart";

export async function Cart() {
  const cart = await getCart();
  if (cart.length === 0) {
    return null;
  }
  const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);
  return (
    <div className="-right-3 -top-1 absolute rounded-full bg-accent2 px-1 text-accent1 text-xs">
      {totalQuantity}
    </div>
  );
}
