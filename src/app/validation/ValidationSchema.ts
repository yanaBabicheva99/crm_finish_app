import * as Yup from "yup";
import {Validation} from "../constants/validationConstants";

export const schemaProduct = Yup.object().shape({
    store: Yup
        .string()
        .required(Validation.isRequired)
        .min(2, Validation.isShort)
        .max(25, Validation.isLong),
    price: Yup
        .string()
        .required(Validation.isRequired)
        .matches(
            /^(0|[1-9]\d*)$/,
            Validation.isIncorrect
        )
        .matches(
            /^[1-9]{1}[0-9]*$/,
            Validation.isIncorrect
        ),
    productName: Yup
        .string()
        .required(Validation.isRequired)
        .min(2, Validation.isShort)
        .max(25, Validation.isLong),
    category: Yup
        .string()
        .required(Validation.isRequired)
        .min(2, Validation.isShort)
        .max(25,  Validation.isLong),

    remains: Yup
        .string()
        .required(Validation.isRequired)
        .matches(
            /^(0|[1-9]\d*)$/,
            Validation.isIncorrect
        )
        .matches(
            /^[1-9]{1}[0-9]*$/,
            Validation.isIncorrect
        ),
    weight: Yup
        .string()
        .required(Validation.isIncorrect)
        .matches(
            /^(0|[1-9]\d*)$/,
            Validation.isIncorrect
        )
        .matches(
            /^[1-9]{1}[0-9]*$/,
            Validation.isIncorrect
        )
})

export const schemaSellProduct = (quantity: number) => Yup.object().shape({
    quantity: Yup
        .string()
        .test(Validation.isIncorrect, Validation.isIncorrect,
            (val) => Number(val) <= Number(quantity),
        )
        .required(Validation.isRequired)
        .matches(
            /^(0|[1-9]\d*)$/,
            Validation.isIncorrect
        )
        .matches(
            /^[1-9]{1}[0-9]*$/,
            Validation.isIncorrect
        ),
});

export const schemaUser = Yup.object().shape({
    name: Yup.string()
        .min(2, Validation.isShort)
        .max(10, Validation.isLong)
        .required(Validation.isRequired),
    lastName: Yup.string()
        .min(2, Validation.isShort)
        .max(10, Validation.isLong)
        .required(Validation.isRequired),
    companyName: Yup.string()
        .min(2, Validation.isShort)
        .max(10, Validation.isLong)
        .required(Validation.isRequired),

    email: Yup.string().email(Validation.isInvalid).required(Validation.isRequired),
    password: Yup
        .string()
        .required(Validation.isRequired)
        .matches(
            /(?=.*[A-Z])/,
            Validation.isCapital
        )
        .matches(
            /(?=.*[0-9])/,
            Validation.isDigit
        )
        .matches(
            /(?=.*[!@#$%^&*])/,
            Validation.isSymbol
        )
        .matches(
            /(?=.{8,})/,
            Validation.isLength
        ),
    repeatPassword: Yup.string()
        .required(Validation.isRequired)
        .oneOf([Yup.ref('password'), null], Validation.isSame)
});

