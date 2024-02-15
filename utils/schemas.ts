import { object, string, number, date, InferType, mixed, ref } from 'yup';

let userSchema = object({
    name: string().required(),
    age: number().required().positive().integer(),
    email: string().email(),
    website: string().url().nullable(),
    createdOn: date().default(() => new Date()),
});

let loginSchema = object({
    phonenumber: string().required('campo obrigatorio').max(9, 'insira um numero valido').min(9, 'insira um numero valido'),
    password: string().required().min(6, 'senha deve conter pelo menos 6 caracteres')
});

let acoountCreationSchema = object({
    phonenumber: string().required('campo obrigatorio').max(9, 'insira um numero valido').min(9, 'insira um numero valido'),
    password: string().required().min(6, 'senha deve conter pelo menos 6 caracteres'),
    confirmPassword: string().required('campo obrigatorio').min(6).trim().equalTo(ref("password")),
    location: mixed().oneOf(["Maputo", "Matola", "Gaza",
        "Inhambane",
        "Sofala",
        "Manica",
        "Zambézia",
        "Tete",
        "Niassa",
        "Nampula",
        "Cabo_Delgado"]).defined().required("campo obrigatório")
});

// parse and assert validity
// const user = await userSchema.validate(await fetchUser());

type User = InferType<typeof userSchema>;
/* {
  name: string;
  age: number;
  email?: string | undefined
  website?: string | null | undefined
  createdOn: Date
}*/


export { loginSchema, acoountCreationSchema }