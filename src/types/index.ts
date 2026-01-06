export type ServiceType = 'move-out' | 'airbnb';

export type UnitSize = 'studio' | '1bed1bath' | '2bed1bath' | '2bed2bath' | '3bed2bath';

export type AddOnType = 'oven' | 'fridge' | 'windows' | 'same-day';

export interface BookingState {
  city: string;
  zip: string;
  serviceType: ServiceType;
  unitSize: UnitSize;
  addOns: AddOnType[];
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
  serviceType: 'move-out',
  unitSize: '1bed1bath',
  addOns: [],
  date: null,
  contact: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: ''
  }
};

export const PRICING = {
  'move-out': {
    'studio': 125,
    '1bed1bath': 150,
    '2bed1bath': 200,
    '2bed2bath': 250,
    '3bed2bath': 300
  },
  'airbnb': {
    'studio': 80,
    '1bed1bath': 130,
    '2bed1bath': 180,
    '2bed2bath': 250,
    '3bed2bath': 300
  },
  'addons': {
    'oven': 35,
    'fridge': 35,
    'windows': 35,
    'same-day': 75
  }
};
