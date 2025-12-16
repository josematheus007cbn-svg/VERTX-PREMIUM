export interface PaymentFormData {
  fullName: string;
  email: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

export enum PaymentMethod {
  CREDIT_CARD = 'CREDIT_CARD',
  PIX = 'PIX'
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export interface PlanFeature {
  text: string;
  included: boolean;
}