export interface AllOrders {
    shippingAddress: ShippingAddress;
    taxPrice: number;
    shippingPrice: number;
    totalOrderPrice: number;
    paymentMethodType: string;
    isPaid: boolean;
    isDelivered: boolean;
    _id: string;
    user: User;
    cartItems: CartItem[];
    paidAt: Date;
    createdAt: Date;
    updatedAt: Date;
    id: number;
    __v: number;
}

export interface CartItem {
    count: number;
    _id: string;
    product: Product;
    price: number;
}

export interface Product {
    subcategory: Brand[];
    ratingsQuantity: number;
    _id: string;
    title: string;
    imageCover: string;
    category: Brand;
    brand: Brand;
    ratingsAverage: number;
    id: string;
}

export interface Brand {
    _id: string;
    name: string;
    slug: string;
    image?: string;
    category?: Category;
}

export enum Category {
    The6439D2D167D9Aa4Ca970649F = "6439d2d167d9aa4ca970649f",
    The6439D58A0049Ad0B52B9003F = "6439d58a0049ad0b52b9003f",
}

export interface ShippingAddress {
    details: string;
    phone: string;
    city: string;
}

export interface User {
    _id: string;
    name: string;
    email: string;
    phone: string;
}
