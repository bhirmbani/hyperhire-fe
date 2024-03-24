"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cancelOrder, getUserOrder, payOrder } from "@/services/order.service";
import { getUserPoint } from "@/services/user.service";
import { toast } from "sonner";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { useReadLocalStorage } from "usehooks-ts";

export default function OrderModule() {
  const userId = useReadLocalStorage("userId");

  const {
    data: userPoint,
    isLoading: isGetUserPointLoading,
    mutate: mutateUserPoint,
  } = useSWR("getUserPoint", () => getUserPoint(`${userId}`));

  const {
    data: userOrder,
    isLoading: isGetUserOrderLoading,
    mutate: mutateUserOrder,
  } = useSWR("getUserOrder", () => getUserOrder(`${userId}`));

  const { trigger: triggerCancel, isMutating: isCancelMutating } =
    useSWRMutation("/order/cancel", cancelOrder, {
      onError: (err) => {
        toast.error(err.message, {
          duration: 1500,
        });
      },
      onSuccess: (data) => {
        toast.success("Canceled!", {
          duration: 1500,
        });
        mutateUserOrder();
      },
    });

  const { trigger: triggerPay, isMutating: isPayMutating } = useSWRMutation(
    "/order/pay",
    payOrder,
    {
      onError: (err) => {
        toast.error(err.message, {
          duration: 1500,
        });
      },
      onSuccess: (data) => {
        toast.success("Order paid successfully!", {
          duration: 1500,
        });
        mutateUserOrder();
        mutateUserPoint();
      },
    }
  );

  return (
    <div>
      <p>User point: {userPoint?.data?.point}</p>

      <div className="grid grid-cols-3 grid-flow-row gap-2">
        {userOrder?.data?.map((order) => (
          <Card className="mx-1" key={order.id}>
            <CardContent className="flex w-fit p-2">
              <p className="font-bold">Order ID: {order.id}</p>
            </CardContent>
            <CardContent className="flex w-fit p-2">
              <p>Order Status: {order.status}</p>
            </CardContent>
            <CardContent className="flex w-fit p-2">
              <p>Books:</p>
            </CardContent>
            {order.Books.map((book) => (
              <>
                <CardContent className="flex w-fit p-2" key={book.Book.id}>
                  <p>{book.Book.title}</p>
                  <span className="ml-2">
                    <p>({book.Book.point} points)</p>
                  </span>
                </CardContent>
              </>
            ))}
            {order.status === "UNPAID" ? (
              <CardContent className="flex w-fit p-2">
                <Button
                  onClick={() =>
                    triggerPay({ orderId: `${order.id}`, userId: `${userId}` })
                  }
                  variant="link"
                >
                  Pay
                </Button>
                <Button
                  onClick={() =>
                    triggerCancel({
                      orderId: `${order.id}`,
                      userId: `${userId}`,
                    })
                  }
                  variant="link"
                  className="text-red-500"
                >
                  Cancel order
                </Button>
              </CardContent>
            ) : null}
          </Card>
        ))}
      </div>
    </div>
  );
}
