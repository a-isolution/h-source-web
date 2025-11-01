"use client";

import {
  useAcceptOrder,
  useDeliveredOrder,
  useDispatchOrder,
  useGetStoreOrders,
  useRejectOrder,
} from "@/api/order";
import React, { useState } from "react";
import moment from "moment";
import ActionConfirmationModal from "@/components/action-confirm-modal";
import { toast } from "sonner";
import Spinner from "@/components/spinner";
import { CustomPagination } from "@/components/pagination";
import { useQueryClient } from "@tanstack/react-query";

const OrderStatusProgress = ({ currentStatus }: { currentStatus: string }) => {
  const statuses = [
    "pending",
    "confirmed",
    "processing",
    "shipped",
    "delivered",
  ];
  const currentIndex = statuses.indexOf(currentStatus);

  return (
    <div className="relative flex justify-between items-center mt-6 mb-3">
      <div className="absolute top-[12px] left-0 w-full h-[3px] bg-gray-300 -translate-y-1/2 z-0" />
      <div
        className="absolute top-[12px] left-0 h-[3px] bg-green-500 -translate-y-1/2 z-0 transition-all duration-500"
        style={{
          width: `${(currentIndex / (statuses.length - 1)) * 100}%`,
        }}
      />

      {statuses.map((status, index) => {
        const isCompleted = index <= currentIndex;
        const isCurrent = index === currentIndex;

        return (
          <div key={status} className="flex flex-col items-center z-10 flex-1">
            <div
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                isCompleted
                  ? "bg-green-500 border-green-500"
                  : isCurrent
                  ? "bg-white border-green-500"
                  : "bg-gray-300 border-gray-300"
              }`}
            >
              {isCompleted && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </div>
            <p
              className={`text-[11px] mt-2 ${
                isCompleted || isCurrent
                  ? "text-gray-800 font-semibold"
                  : "text-gray-400"
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </p>
          </div>
        );
      })}
    </div>
  );
};

const Orders = () => {
  const qc = useQueryClient();
  const [_, setPage] = useState(1);
  const [activeTab, setActiveTab] = useState("all");
  const [editingOrderId, setEditingOrderId] = useState<string | null>(null);
  const [acceptModalOpen, setAcceptModalOpen] = useState(false);
  const [rejectModalOpen, setRejectModalOpen] = useState(false);

  const { mutate: acceptOrder, isPending: acceptLoading } = useAcceptOrder();
  const handleAcceptOrder = () => {
    acceptOrder(
      { orderId: editingOrderId },
      {
        onSuccess: (data) => {
          toast.success(data?.message);
          setEditingOrderId(null);
          setAcceptModalOpen(false);
          qc.invalidateQueries({ queryKey: ["store-orders"] });
        },
      }
    );
  };

  const { mutate: rejectOrder, isPending: rejectLoading } = useRejectOrder();
  const handleRejectOrder = () => {
    rejectOrder(
      { orderId: editingOrderId },
      {
        onSuccess: (data) => {
          toast.success(data?.message);
          setEditingOrderId(null);
          setRejectModalOpen(false);
          qc.invalidateQueries({ queryKey: ["store-orders"] });
        },
      }
    );
  };

  const { mutate: dispatchOrder, isPending: dispatchLoading } =
    useDispatchOrder();

  const { mutate: markDelivered, isPending: deliveredLoading } =
    useDeliveredOrder();

  const { data: storeOrders } = useGetStoreOrders();
  const orders = storeOrders?.data || [];

  const filteredOrders =
    activeTab === "all"
      ? orders
      : orders.filter((o: any) => o.status === activeTab);

  return (
    <section className="w-full">
      <div>
        <h1 className="text-xl font-medium">Orders</h1>
        <span className="font-medium text-[#A7A7A7] text-sm">
          Manage your sales and customer orders
        </span>
      </div>

      {/* Tabs */}
      <div className="flex gap-3 my-6 flex-wrap">
        {[
          "all",
          "pending",
          "confirmed",
          "shipped",
          "delivered",
          "cancelled",
        ].map((tab) => {
          const count =
            tab === "all"
              ? orders.length
              : orders.filter((o: any) => o.status === tab).length;

          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium border border-stone-200 ${
                activeTab === tab
                  ? "bg-lime-400 text-black"
                  : "bg-white text-gray-700"
              }`}
            >
              <span className="capitalize">
                {tab === "all" ? "All Orders" : tab}
              </span>

              {/* Count Badge */}
              <span
                className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                  activeTab === tab
                    ? "bg-black text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {filteredOrders.length === 0 && (
        <div className="mx-auto w-full text-center py-20 text-gray-400">
          <p className="text-lg font-medium">No orders found.</p>
          <p className="text-sm">
            Try adjusting your filters or check back later.
          </p>
        </div>
      )}

      {/* Orders grid */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-6">
        {filteredOrders.map((order: any) => (
          <div
            key={order.id}
            className="bg-white rounded-xl shadow-sm p-4 flex flex-col justify-between"
          >
            <p className="self-end text-xs text-gray-400 mb-3">
              {moment(order?.createdAt).fromNow()}
            </p>

            {/* Order Header */}
            <div className="flex justify-between items-start">
              <h3 className="font-semibold">{order.orderNumber}</h3>
              <div className="flex gap-2">
                {order.status === "pending" && (
                  <span className="text-xs px-2 py-1 rounded-full border text-blue-600 border-blue-200">
                    NEW
                  </span>
                )}
                {order.status === "processing" && (
                  <span className="text-xs px-2 py-1 rounded-full border text-indigo-600 border-indigo-200">
                    IN PROGRESS
                  </span>
                )}
                {order.status === "confirmed" && (
                  <span className="text-xs px-2 py-1 rounded-full border text-green-600 border-green-200">
                    CONFIRMED
                  </span>
                )}
                {order.status === "cancelled" && (
                  <span className="text-xs px-2 py-1 rounded-full border text-red-600 border-red-200">
                    CANCELLED
                  </span>
                )}
                {order.status === "delivered" && (
                  <span className="text-xs px-2 py-1 rounded-full border text-green-600 border-green-200">
                    COMPLETED
                  </span>
                )}
              </div>
            </div>

            <div className="mt-2 flex flex-row gap-2 items-center">
              <p className="font-bold text-[13px]"> Payment Status:</p>
              <span className="text-xs px-2 py-1 rounded-full border text-emerald-600 border-emerald-200">
                {order?.paymentStatus?.toUpperCase()}
              </span>
            </div>

            {/* Customer Info */}
            <div className="mt-3">
              <p className="font-bold text-[13px]">Customer Info</p>

              <p className="text-sm text-gray-700 mt-1">
                {order?.shippingAddress}
              </p>
              <p className="text-xs text-gray-400">{order?.buyer?.fullName}</p>
              <p className="text-xs text-gray-400">{order?.buyer?.phone}</p>
            </div>

            {/* Items */}
            <div className="mt-3 text-sm">
              <p className="font-bold text-[13px]">Items</p>
              {order?.orderItems?.map((item: any, idx: number) => (
                <p key={idx} className="flex justify-between text-gray-600">
                  <span>
                    {item.quantity}x {item?.product?.name}
                  </span>
                  <span>
                    {order?.currency?.code} {item?.product?.price / 100}
                  </span>
                </p>
              ))}
            </div>

            {/* Total */}
            <p className="mt-2">
              Total{" "}
              <span className="font-semibold float-right">
                {order?.currency?.code} {order?.total / 100}
              </span>
            </p>

            {/* Actions */}
            <div className="flex gap-2 mt-4">
              {order.status === "pending" && (
                <>
                  <button
                    onClick={() => {
                      setEditingOrderId(order?.id);
                      setRejectModalOpen(true);
                    }}
                    className="bg-red-100 text-red-600 px-4 py-1 rounded-full text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      setEditingOrderId(order?.id);
                      setAcceptModalOpen(true);
                    }}
                    className="bg-lime-400 px-4 py-1 rounded-full text-sm font-medium"
                  >
                    Accept
                  </button>
                </>
              )}

              {order?.status !== "shipped" &&
                order?.status !== "delivered" &&
                order.paymentStatus === "paid" && (
                  <>
                    <button
                      onClick={() => {
                        dispatchOrder(
                          {
                            orderId: order?.id,
                            body: { carrier: "", trackingNumber: "" },
                          },
                          {
                            onSuccess: (data) => {
                              toast.success(
                                data?.message ||
                                  "Order items dispatched successfully"
                              );
                              setEditingOrderId(null);
                              setRejectModalOpen(false);
                              qc.invalidateQueries({
                                queryKey: ["store-orders"],
                              });
                            },
                          }
                        );
                      }}
                      className="bg-indigo-100 text-indigo-600 px-4 py-1 rounded-full text-sm"
                    >
                      {dispatchLoading ? <Spinner /> : " Dispatch"}
                    </button>
                  </>
                )}

              {order?.status === "shipped" && (
                <button
                  onClick={() => {
                    markDelivered(
                      {
                        body: { deliveryNotes: "" },
                        orderId: order?.id,
                      },
                      {
                        onSuccess: (data) => {
                          toast.success(data?.message);
                          qc.invalidateQueries({
                            queryKey: ["order-id", order?.id],
                          });
                        },
                      }
                    );
                  }}
                  className="bg-lime-400 px-4 py-1 rounded-full text-sm font-medium"
                >
                  Mark as Delivered
                </button>
              )}

              {order.status === "delivered" && (
                <button
                  // onClick={() => router.push(`/orders/${order?.id}`)}
                  className="bg-lime-400 px-4 py-1 rounded-full text-sm font-medium"
                >
                  View Details
                </button>
              )}

              {order.status === "cancelled" && (
                <div className="flex gap-2">
                  <span className="text-xs px-2 py-1 rounded-full border text-red-600 border-red-200">
                    REFUNDED
                  </span>
                </div>
              )}
            </div>

            <OrderStatusProgress currentStatus={order.status} />
          </div>
        ))}

        <ActionConfirmationModal
          open={acceptModalOpen}
          setOpen={setAcceptModalOpen}
          title="Order Confirmation"
          description="Are you sure you want to accept this order?"
          onAccept={handleAcceptOrder}
          isLoading={acceptLoading}
          acceptText="Accept"
        />

        <ActionConfirmationModal
          open={rejectModalOpen}
          setOpen={setRejectModalOpen}
          title="Reject Order"
          description="Are you sure you want to reject/cancel this order?"
          onReject={handleRejectOrder}
          isLoading={rejectLoading}
          rejectText="Reject"
        />
      </div>

      <div className="w-full flex justify-center items-center mt-12 mb-20">
        {orders?.pagination?.totalPages > 1 && (
          <CustomPagination
            totalPages={orders?.pagination?.totalPages}
            onPageChange={(page) => setPage(page - 1)}
          />
        )}
      </div>
    </section>
  );
};

export default Orders;
