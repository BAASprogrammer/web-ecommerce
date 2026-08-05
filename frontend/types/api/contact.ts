export interface ContactChannel {
  icon: string;
  title: string;
  desc: string;
  href: string;
}

export interface ContactMessageInput {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactMessageResult {
  id: number;
  name: string;
  email: string;
  subject: string;
}

export interface ContactMessageItem {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}
