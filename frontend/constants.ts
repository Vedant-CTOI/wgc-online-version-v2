import { Template } from './types';

const GRAY_PLACEHOLDER = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='500' viewBox='0 0 400 500'%3E%3Crect width='400' height='500' fill='%23e5e7eb'/%3E%3Cpath d='M200 220a20 20 0 1 0 0-40 20 20 0 0 0 0 40zm-40 60l30-40 20 20 40-50 30 70H160z' fill='%239ca3af'/%3E%3C/svg%3E";

export const MOCK_TEMPLATES: Template[] = [
  {
    id: 't1',
    name: 'Diwali Mega Sale',
    category: 'Diwali',
    thumbnail: GRAY_PLACEHOLDER,
    ratioClass: 'aspect-[610/794]',
    defaultText: {
      headline: 'FESTIVE MEGA SALE',
      subheadline: 'Light up your home with our special offers',
      offer: 'UP TO 50% OFF',
    },
    colorScheme: { bg: 'bg-gray-200', text: 'text-gray-900', accent: 'bg-gray-800' }
  },
  {
    id: 't2',
    name: 'Wedding Collection',
    category: 'Wedding',
    thumbnail: GRAY_PLACEHOLDER,
    ratioClass: 'aspect-[936/709]',
    defaultText: {
      headline: 'WEDDING SPECIAL',
      subheadline: 'Make your special day even more memorable',
      offer: 'FLAT 30% OFF',
    },
    colorScheme: { bg: 'bg-gray-100', text: 'text-gray-900', accent: 'bg-gray-700' }
  },
  {
    id: 't3',
    name: 'Concert Tickets',
    category: 'Concert',
    thumbnail: GRAY_PLACEHOLDER,
    ratioClass: 'aspect-square',
    defaultText: {
      headline: 'LIVE IN CONCERT',
      subheadline: 'Get your tickets before they sell out',
      offer: 'BOOK NOW',
    },
    colorScheme: { bg: 'bg-gray-300', text: 'text-gray-900', accent: 'bg-black' }
  },
  {
    id: 't4',
    name: 'Office Supplies',
    category: 'Office',
    thumbnail: GRAY_PLACEHOLDER,
    ratioClass: 'aspect-[610/794]',
    defaultText: {
      headline: 'BACK TO OFFICE',
      subheadline: 'Stock up on essentials for the new year',
      offer: 'BULK DISCOUNTS',
    },
    colorScheme: { bg: 'bg-white', text: 'text-gray-900', accent: 'bg-gray-900' }
  },
  {
    id: 't5',
    name: 'Diwali Gifts',
    category: 'Diwali',
    thumbnail: GRAY_PLACEHOLDER,
    ratioClass: 'aspect-square',
    defaultText: {
      headline: 'PERFECT GIFTS',
      subheadline: 'Find something special for everyone',
      offer: 'SHOP NOW',
    },
    colorScheme: { bg: 'bg-gray-100', text: 'text-gray-800', accent: 'bg-gray-600' }
  },
  {
    id: 't6',
    name: 'Wedding Decor',
    category: 'Wedding',
    thumbnail: GRAY_PLACEHOLDER,
    ratioClass: 'aspect-[936/709]',
    defaultText: {
      headline: 'DREAM DECOR',
      subheadline: 'Transform your venue into a magical space',
      offer: 'FREE CONSULTATION',
    },
    colorScheme: { bg: 'bg-gray-200', text: 'text-black', accent: 'bg-gray-900' }
  },
  {
    id: 't7',
    name: 'Music Festival',
    category: 'Concert',
    thumbnail: GRAY_PLACEHOLDER,
    ratioClass: 'aspect-[610/794]',
    defaultText: {
      headline: 'SUMMER FEST',
      subheadline: 'Three days of non-stop music and fun',
      offer: 'EARLY BIRD TICKETS',
    },
    colorScheme: { bg: 'bg-gray-300', text: 'text-gray-900', accent: 'bg-gray-800' }
  },
  {
    id: 't8',
    name: 'Corporate Event',
    category: 'Office',
    thumbnail: GRAY_PLACEHOLDER,
    ratioClass: 'aspect-[936/709]',
    defaultText: {
      headline: 'ANNUAL MEET',
      subheadline: 'Join us for our yearly corporate gathering',
      offer: 'RSVP NOW',
    },
    colorScheme: { bg: 'bg-white', text: 'text-gray-900', accent: 'bg-black' }
  },
  {
    id: 't9',
    name: 'Diwali Sweets',
    category: 'Diwali',
    thumbnail: GRAY_PLACEHOLDER,
    ratioClass: 'aspect-square',
    defaultText: {
      headline: 'SWEET TREATS',
      subheadline: 'Delicious hampers for your loved ones',
      offer: 'PRE-ORDER',
    },
    colorScheme: { bg: 'bg-gray-100', text: 'text-gray-900', accent: 'bg-gray-700' }
  },
  {
    id: 't10',
    name: 'Bridal Wear',
    category: 'Wedding',
    thumbnail: GRAY_PLACEHOLDER,
    ratioClass: 'aspect-[610/794]',
    defaultText: {
      headline: 'BRIDAL ELEGANCE',
      subheadline: 'Discover our new collection of bridal wear',
      offer: 'UP TO 70% OFF',
    },
    colorScheme: { bg: 'bg-gray-200', text: 'text-gray-800', accent: 'bg-gray-900' }
  },
  {
    id: 't11',
    name: 'Rock Concert',
    category: 'Concert',
    thumbnail: GRAY_PLACEHOLDER,
    ratioClass: 'aspect-[936/709]',
    defaultText: {
      headline: 'ROCK THE NIGHT',
      subheadline: 'Experience the ultimate rock performance',
      offer: 'VIP PASSES',
    },
    colorScheme: { bg: 'bg-gray-300', text: 'text-black', accent: 'bg-gray-800' }
  },
  {
    id: 't12',
    name: 'Office Furniture',
    category: 'Office',
    thumbnail: GRAY_PLACEHOLDER,
    ratioClass: 'aspect-square',
    defaultText: {
      headline: 'WORKSPACE UPGRADE',
      subheadline: 'Ergonomic furniture for a productive environment',
      offer: 'SPECIAL OFFERS',
    },
    colorScheme: { bg: 'bg-white', text: 'text-gray-900', accent: 'bg-black' }
  },
  {
    id: 't13',
    name: 'Diwali Crackers',
    category: 'Diwali',
    thumbnail: GRAY_PLACEHOLDER,
    ratioClass: 'aspect-[610/794]',
    defaultText: {
      headline: 'SAFE CELEBRATIONS',
      subheadline: 'Eco-friendly crackers for a green Diwali',
      offer: 'EXPLORE NOW',
    },
    colorScheme: { bg: 'bg-gray-100', text: 'text-gray-900', accent: 'bg-gray-700' }
  },
  {
    id: 't14',
    name: 'Wedding Photography',
    category: 'Wedding',
    thumbnail: GRAY_PLACEHOLDER,
    ratioClass: 'aspect-[936/709]',
    defaultText: {
      headline: 'CAPTURE MEMORIES',
      subheadline: 'Professional photography for your special day',
      offer: 'BOOK A SESSION',
    },
    colorScheme: { bg: 'bg-gray-200', text: 'text-gray-900', accent: 'bg-gray-800' }
  }
];

export const CATEGORIES = ['All', 'Wedding', 'Diwali', 'Concert', 'Office'];

export const ASPECT_RATIOS = [
  { id: '610x794', name: 'Full Page', class: 'aspect-[610/794]' },
  { id: '936x709', name: 'Half Page', class: 'aspect-[936/709]' },
  { id: '621x621', name: 'Social Media', class: 'aspect-square' },
];
