import * as Yup from "yup";

export const credentialsSchema = Yup.object().shape({
  username: Yup.string().required("username is required"),
  password: Yup.string().required("password is required").min(6, "password must be at least 6 characters"),
});
