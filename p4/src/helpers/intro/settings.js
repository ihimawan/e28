import {
  minLength,
  required,
  maxLength,
  alpha
} from "vuelidate/lib/validators";

export const validName = {
  required,
  minLength: minLength(4),
  maxLength: maxLength(10),
  alpha
};
