export type ServiceType = 'standard' | 'airbnb';

export type UnitSize = 'studio' | '1bed1bath' | '2bed1bath' | '2bed2bath' | '3bed2bath' | '3bed3bath' | '4bed2bath' | '4bed3bath' | '5bed2bath' | '5bed3bath';

export type AddOnType = 'oven' | 'fridge' | 'windows' | 'same-day';

export interface BookingState {
  city: string;
  zip: string;
  address: string;
  serviceType: ServiceType;
  unitSize: UnitSize;
  addOns: AddOnType[];
  date: Date | null;
  time: string;
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
  address: '',
  serviceType: 'standard',
  unitSize: '1bed1bath',
  addOns: [],
  date: null,
  time: '',
  contact: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: ''
  }
};

export const PRICING = {
  'standard': {
    'studio': 80,
    '1bed1bath': 150,
    '2bed1bath': 200,
    '2bed2bath': 250,
    '3bed2bath': 300,
    '3bed3bath': 350,
    '4bed2bath': 350,
    '4bed3bath': 400,
    '5bed2bath': 400,
    '5bed3bath': 450
  },
  'airbnb': {
    'studio': 80,
    '1bed1bath': 130,
    '2bed1bath': 180,
    '2bed2bath': 250,
    '3bed2bath': 300,
    '3bed3bath': 350,
    '4bed2bath': 350,
    '4bed3bath': 400,
    '5bed2bath': 400,
    '5bed3bath': 450
  },
  'addons': {
    'oven': 35,
    'fridge': 35,
    'windows': 35,
    'same-day': 75
  }
};

