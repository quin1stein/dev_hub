export interface SignupFormData {
  name: string;
  email: string;
  password: string;
}

export interface FocusAreaOption {
  value: string;
  label: string;
}

export interface FormData {
  title: string;
  content: string;
  focusAreas: FocusAreaOption[];
}
