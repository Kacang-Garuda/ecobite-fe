type Category = 'STAPLES' | 'BEVERAGES' | 'CONDIMENTS' | 'SNACKS' | 'CANNED_FOOD' | 'DRIED_FOOD';
type FoodDonationProgressType = 'POSTED' | 'BOOKED' | 'PICKED UP'

export interface FoodDonation {
    id: string;
    title: string;
    description: string;
    category: Category;
    isInstitution: boolean;
    imageUrl: string;
    quantity: number;
    remainingQuantity: number;
    expiredDate: Date;
    instruction: string;
    location: string;
    createdAt: Date;
    updatedAt: Date;
    userEmail: string;
    transaction: Transaction[];
    progress: FoodDonationProgress[];
}

export interface FoodDonationProgress {
    id: string;
    status: FoodDonationProgressType;
    by: string;
    createdAt: Date;
    updatedAt: Date
    foodDonationId: string;
}

export interface Transaction {
    id: string;
    quantity: number;
    notes: string;
    createdAt: Date;
    updatedAt: Date;
    donorEmail: string;
    recipientEmail: string;
    foodDonationId: string;
}

export interface MoneyDonation {
    id: string;
    payment: string;
    createdAt: Date;
    updatedAt: Date;
    donorEmail: string;
    recipientEmail: string;
    progress: MoneyDonationProgress[];
}

type MoneyDonationProgressType = 'PENDING' | 'CONFIRMED' | 'PURCHASED' | 'DISTRIBUTED'

export interface MoneyDonationProgress {
    id: string;
    status: MoneyDonationProgressType;
    createdAt: Date;
    updatedAt: Date;
    moneyDonationId: string;
}

export interface Event {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    registeredUser: RegisteredEvent[];
    userEmail: string;
}

export interface RegisteredEvent {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    eventId: string;
    userEmail: string;
}

type TokenType = 'AUTHENTICATION' | 'VERIFY_EMAIL'

export interface Token {
    token: string;
    type: TokenType;
    isExpired: boolean;
    expiredAt: Date;
    createdAt: Date;
    updatedAt: Date;
    userEmail: string;
}

export interface User {
    email: string;
    isInstitution: boolean;
    name: string;
    phone: string;
    profileImage: string;
    description?: string;
    qris?: string;
    isEmailVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
    
    token: Token[];
    foodDonation: FoodDonation[];
    donateFood: Transaction[];
    receiveFood: Transaction[];
    donateMoney: MoneyDonation[];
    receiveMoney: MoneyDonation[];
    events: Event[];
    registeredEvents: RegisteredEvent[];
}
