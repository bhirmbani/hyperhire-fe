"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import H3Component from "@/components/ui/h3";
import LeadComponent from "@/components/ui/lead";
import { removeBookFromCart } from "@/services/app.service";
import { createOrder } from "@/services/order.service";
import { getUserCart } from "@/services/user.service";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { useReadLocalStorage } from "usehooks-ts";

export default function CartModule() {
  const userId = useReadLocalStorage("userId");
  const router = useRouter();
  const {
    data: userCart,
    isLoading: isGetUserCartLoading,
    mutate: mutateUserCart,
  } = useSWR("getUserCart", () => getUserCart(`${userId}`));

  const totalPointInCart = userCart?.data!.reduce(
    (accumulator, currentValue) => accumulator + currentValue.Book.point,
    0
  );

  const { trigger: triggerRemove, isMutating: isRemoveLoading } =
    useSWRMutation("/cart", removeBookFromCart, {
      onError: (err) => {
        toast.error(err.message, {
          duration: 1500,
        });
      },
      onSuccess: (data) => {
        toast.success("Removed!", {
          duration: 1500,
        });
        mutateUserCart();
      },
    });

  const { trigger: triggerOrder, isMutating: isOrderLoading } = useSWRMutation(
    "/order",
    createOrder,
    {
      onError: (err) => {
        toast.error(err.message, {
          duration: 1500,
        });
      },
      onSuccess: (data) => {
        toast.success("Order created!", {
          duration: 1500,
        });
        router.replace("/order");
      },
    }
  );

  return (
    <div>
      <div className="flex justify-between mb-4">
        <H3Component>My Cart</H3Component>
        {userCart?.data && userCart?.data?.length > 0 ? (
          <>
            <p>{totalPointInCart} points</p>
            <Button
              size="sm"
              disabled={isOrderLoading}
              onClick={() => triggerOrder({ userId: `${userId}` })}
            >
              {isOrderLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                "Checkout"
              )}
            </Button>
          </>
        ) : null}
      </div>
      <div className="grid grid-cols-3 grid-flow-row gap-2">
        {userCart?.data?.map((cart) => (
          <Card className="mx-1" key={cart.id}>
            <CardHeader>
              <img src={cart.Book.cover_img} alt="book cover" />
            </CardHeader>
            <CardContent className="w-fit">
              <p className="text-xs mb-2">
                {cart.Book.id} - {cart.Book.title}
              </p>
            </CardContent>
            <CardFooter className="flex flex-col items-start">
              <p>{cart.Book.point} point</p>
              <Button
                onClick={() => {
                  triggerRemove({ cartId: `${cart.id}` });
                }}
                size="sm"
                variant="link"
                className="text-start p-0 text-red-500"
                disabled={isRemoveLoading}
              >
                Remove
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
