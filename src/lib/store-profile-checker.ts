export interface Availability {
  to: string; // ISO timestamp
  from: string; // ISO timestamp
  name: string; // e.g., "Monday"
  active: boolean;
}

export interface Owner {
  id: number;
  role: string;
  bio: string | null;
  fullName: string;
  email: string;
  phone: string;
  avatar: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  emailVerifiedAt: string | null; // ISO timestamp
  phoneVerifiedAt: string | null; // ISO timestamp
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Store {
  id: number;
  name: string;
  description: string;
  address: string;
  phone: string;
  isOnline: boolean;
  availability: Availability[];
  offerDeliveryService: boolean;
  deliveryRadius: number;
  deliveryFee: number;
  bankName: string;
  accountNumber: string;
  accountName: string;
  payoutSchedule: string; // e.g., "weekly"
  ownerId: number;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
  owner: Owner;
}

export function isStoreProfileComplete(store: Store): boolean {
  if (
    !store?.name ||
    !store?.description ||
    !store?.address ||
    !store?.phone ||
    !store?.bankName ||
    !store?.accountNumber ||
    !store?.accountName ||
    !store?.payoutSchedule ||
    !store?.availability?.some((day) => day.active) ||
    !store?.owner ||
    !store?.owner.fullName ||
    !store?.owner.phone ||
    !store?.owner.email ||
    !store?.owner.emailVerifiedAt
  ) {
    return false;
  }

  // If delivery service is offered, check delivery fields
  if (store?.offerDeliveryService) {
    if (!store?.deliveryRadius || !store?.deliveryFee) {
      return false;
    }
  }

  return true;
}
