export interface SignupFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface FocusAreaOption {
  name: string;
  label: string;
}

export interface FormData {
  title: string;
  content: string;
  focusAreas: FocusAreaOption[];
}
