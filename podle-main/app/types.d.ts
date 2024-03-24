interface BusinessInfo {
  _id? : string;
    name: string;
    streetAddress?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    phoneNumber?: string; // Optional field for phone number
    searchResult?: string; // Field to store the search result
    logo? : string
    description? : string;
    services? : string[]
    specialTag? : string
    specialTags? : string
  }

  interface ContentCreator {
    _id: string;
    phoneNumber: string;
    email: string;
    userName: string;
    profileImage: string;
    description?: string;
    _createdAt: string; // Assuming _createdAt is a string representing a dateTime
  }

  interface ServiceProvider {
    _id: string;
    _createdAt: string; // Assuming _createdAt is a string representing a dateTime
    phoneNumber: string;
    email: string;
    userName: string;
    name: string;
    logo: string;
    streetAddress: string;
    city: string;
    state: string;
    zipCode: string;
    searchResult: string;
    description: string;
    services: string[]; // Assuming services is an array of strings
    specialTag : string;
    // Add other fields for your business schema
  }

  interface Category {
  title: string;
  image: {
    asset: {
      _ref: string;
      _type: 'reference';
    };
  };
}

interface AutoBusiness {
  _id : string;
  name: string;
  description?: string;
  specialTag?: string;
  services?: string[];
  logo?: string;
  searchResult: string;
  rating? : number;
  claimed? : boolean;
  // Add other fields as needed
}

interface Review {
  reviewText: string;
  reviewRating: number;
  buyerName: string;
  buyerImage: string;
  date: string;
  // Add any additional fields from buyer details if present
}

interface Conversation {
  _id: string;
  _type: string;
  email1: string;
  email2: string;
  messages: {
    messageText: string;
    sender: string;
  }[];
  otherUserName?: string;
  otherUserImage?: string;
  otherUserType?: string;
}

  interface Gig {
    _id: string;
    _createdAt: string; // Assuming _createdAt is a string representing a dateTime
    sellerEmail: string;
    imageUrl: string;
    title: string;
    location : string;
    numOrders : number;
    category: string;
    startingPrice: number;
    Description: string;
    rating : number;
    basicPackage: {
      estimatedDeliveryTime: string;
      price: number;
      description: string;
      Services: Array<{
        serviceName: string;
        included: boolean;
      }>;
    };
    standardPackage: {
      estimatedDeliveryTime: string;
      price: number;
      description: string;
      Services: Array<{
        serviceName: string;
        included: boolean;
      }>;
    };
    premiumPackage: {
      estimatedDeliveryTime: string;
      price: number;
      description: string;
      Services: Array<{
        serviceName: string;
        included: boolean;
      }>;
    };
    samples: string[];
    // Other fields for your business schema
  }
  
  
declare module '@heroicons/react/solid'
