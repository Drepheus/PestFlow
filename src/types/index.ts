export type PestType = 'ants' | 'roaches' | 'spiders' | 'rodents' | 'scorpions' | 'general' | 'mosquitos' | 'termites';

export type PropertyType = 'house' | 'apartment' | 'commercial';

export type PlanType = 'one-time' | 'quarterly' | 'monthly';

export interface BookingState {
  city: string;
  zip: string;
  pests: PestType[];
  propertyType: PropertyType;
  propertySize: string;
  plan: PlanType;
  date: Date | null;
  contact: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
  };
}

export const INITIAL_BOOKING_STATE: BookingState = {
  city: '',
  zip: '',
  pests: [],
  propertyType: 'house',
  propertySize: '2000-3000',
  plan: 'quarterly',
  date: null,
  contact: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: ''
  }
};
