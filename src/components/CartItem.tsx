import { Button, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import storeItems from "../data/items.json";
import { formatCurrency } from "../utilities/formatCurrency";

type CarItemProps = {
  id: number;
  quantity: number;
};

export function CartItem({ id, quantity }: CarItemProps) {
  const { removeFromCart } = useShoppingCart();
  const item = storeItems.find((i) => i.id === id);
  if (item === null) return null;
  return (
    <Stack direction="horizontal" gap={2} className="d-flex align-items-center">

      <img
        src={item?.imgUrl}
        style={{ width: "125px", height: "75px", objectFit: "cover" }}
      />

      <div className="me-auto">
        <div>
          {item?.name}{" "}
          {quantity > 1 && (
            <span className="text-muted" style={{ fontSize: ".65rem" }}>
              x{quantity}
            </span>
          )}
        </div>
        <div className="text-muted" style={{ fontSize: ".75rem" }}>
          {item?.price !== undefined && formatCurrency(item?.price)}
        </div>
      </div>

      <div>
        {item?.price !== undefined && formatCurrency(item?.price * quantity)}
      </div>

      <Button
        variant="outline-danger"
        size="sm"
        onClick={() => {
          item?.id !== undefined && removeFromCart(item?.id);
        }}
      >
        &times;
      </Button>
      
    </Stack>
  );
}
