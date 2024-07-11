
export interface FoodDonation {
    id: string;
    title: string;
    description: string;
    category: string;
    isInstitution: boolean;
    imageUrl: string;
    quantity: number;
    expiredDate: string;
    instruction: string;
    location: string;
    createdAt: string;
    updatedAt: string;
    userEmail: string;
    transaction: Transaction[];
}

export interface Transaction {
    id: string;
    quantity: number;
    notes: string;
    createdAt: string;
    updatedAt: string;
    donorEmail: string;
    recipientEmail: string;
    foodDonationId: string;
}

export interface MoneyDonation {
    id: string;
    payment: string;
    createdAt: string;
    updatedAt: string;
    donorEmail: string;
    recipientEmail: string;
    progress: Progress[];
}

export interface Progress {
    id: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    moneyDonationId: string;
}

export interface RegisteredEvent {
    id: string;
    createdAt: string;
    updatedAt: string;
    eventId: string;
    userEmail: string;
}

export interface Token {
    token: string;
    type: string;
    isExpired: boolean;
    expiredAt: string;
    createdAt: string;
    updatedAt: string;
    userEmail: string;
}

export interface User {
    email: string;
    isInstitution: boolean;
    name: string;
    phone: string;
    description?: string;
    qris?: string;
    isEmailVerified: boolean;
    createdAt: string;
    updatedAt: string;
    
    token: Token[];
    foodDonation: FoodDonation[];
    donateFood: Transaction[];
    receiveFood: Transaction[];
    donateMoney: MoneyDonation[];
    receiveMoney: MoneyDonation[];
    events: Event[];
    registeredEvents: RegisteredEvent[];
}
