declare interface MerchantGroup {
    id: string;
    name: string;
    description: string;
    currency: string;
  }
  
  declare interface Merchant {
    id: string;
    merchantGroupId: string;
    name: string;
    address: string;
    country: string;
  }