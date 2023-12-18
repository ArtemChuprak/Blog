import * as yup from 'yup';

export const userCreateValidation = yup.object().shape({
  userName: yup
    .string()
    .min(3, 'Минимум 3 символа')
    .max(20, 'Максимум 20 символов')
    .required('Поле обязательно к заполнению'),
  email: yup
    .string()
    .email('укажите корректный почтовый адрес')
    .required('Поле обязательно к заполнению'),
  password: yup
    .string()
    .min(6, 'Минимум 6 символа')
    .max(40, 'Максимум 40 символов')
    .required('Поле обязательно к заполнению'),
  repeatPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'пароли не совпадают')
    .required('Поле обязательно к заполнению'),
  checkbox: yup.bool().oneOf([true], 'Предоставьте согласие на обработку персональных данных'),
});

export const userEditValidation = yup.object().shape({
  userName: yup
    .string()
    .min(3, 'Минимум 3 символа')
    .max(20, 'Максимум 20 символов')
    .required('Поле обязательно к заполнению'),
  email: yup
    .string()
    .email('укажите корректный почтовый адрес')
    .required('Поле обязательно к заполнению'),
  password: yup
    .string()
    .min(6, 'Минимум 6 символа')
    .max(40, 'Максимум 40 символов')
    .required('Поле обязательно к заполнению'),
  avatar: yup.string().url('Введите корректный URL'),
});

export const userLoginValidation = yup.object().shape({
  email: yup
    .string()
    .email('укажите корректный почтовый адрес')
    .required('Поле обязательно к заполнению'),
  password: yup
    .string()
    .min(6, 'Минимум 6 символа')
    .max(40, 'Максимум 40 символов')
    .required('Поле обязательно к заполнению'),
});