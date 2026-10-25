export type CategoryType = 'all' | 'paper' | 'plastic' | 'metal' | 'ewaste';

export interface Listing {
  id: string;
  title: string;
  category: 'paper' | 'plastic' | 'metal' | 'ewaste';
  quantity: string;
  location: string;
  price: string;
  description?: string;
  condition?: string;
  contactPerson: string;
  isDemo: boolean;
  createdAt: number;
}

export interface InquiryFormData {
  senderName: string;
  inquiryType: 'pickup' | 'inspection' | 'pricing';
  message: string;
}
