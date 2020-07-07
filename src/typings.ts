interface Company {
  name: string;
}

interface Address {
  street: string;
  suite: string;
  city: string;
  state: string;
  zipcode: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}
