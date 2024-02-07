import { OrderStatus, type Order } from "../models/order";
export const fakeOrders: Order[] = [
  {
    status: OrderStatus["In Progress"],
    customerName: "Buu",
    phone: "123456789",
    address: "Mesa, Az , USA",
    priority: true,
    cart: [
      {
        productID: "7",
        productName: "Banh Chung",
        quantity: 3,
        unitPrice: 16,
      },
      {
        productID: "5",
        productName: "Banh Chuoi",
        quantity: 2,
        unitPrice: 16,
      },
      {
        productID: "3",
        productName: "Banh Dau Xanh",
        quantity: 1,
        unitPrice: 15,
      },
    ],
    orderPrice: 95,
    priorityPrice: 19,
  },
  {
    status: OrderStatus["Delivered"],
    customerName: "David",
    phone: "123456789",
    address: "Mesa, Az , USA",
    priority: false,
    cart: [
      {
        productID: "7",
        productName: "Banh Chung",
        quantity: 3,
        unitPrice: 16,
      },
      {
        productID: "5",
        productName: "Banh Chuoi",
        quantity: 2,
        unitPrice: 16,
      },
      {
        productID: "3",
        productName: "Banh Dau Xanh",
        quantity: 1,
        unitPrice: 15,
      },
    ],
    orderPrice: 95,
    priorityPrice: 19,
  },
  {
    status: OrderStatus["Delivered"],
    customerName: "Kim",
    phone: "123456789",
    address: "Mesa, Az , USA",
    priority: true,
    cart: [
      {
        productID: "7",
        productName: "Banh Chung",
        quantity: 3,
        unitPrice: 16,
      },
      {
        productID: "5",
        productName: "Banh Chuoi",
        quantity: 2,
        unitPrice: 16,
      },
      {
        productID: "3",
        productName: "Banh Dau Xanh",
        quantity: 1,
        unitPrice: 15,
      },
    ],
    orderPrice: 95,
    priorityPrice: 19,
  },
];
