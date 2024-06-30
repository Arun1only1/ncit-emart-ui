import {
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { Formik } from "formik";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axiosInstance from "../lib/axios.instance";

const Register = () => {
  const navigate = useNavigate();

  const { isPending, mutate } = useMutation({
    mutationKey: ["register-user"],
    mutationFn: async (values) => {
      return await axiosInstance.post("/user/register", values);
    },
    onSuccess: () => {
      navigate("/login");
    },
    onError: (error) => {
      console.log(error.response.data.message);
    },
  });

  if (isPending) {
    return <CircularProgress />;
  }

  return (
    <>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          password: "",
        }}
        validationSchema={Yup.object({
          firstName: Yup.string()
            .trim()
            .required("First name is required.")
            .max(30, "First name must be at max 30 characters."),
          lastName: Yup.string()
            .trim()
            .required("Last name is required.")
            .max(30, "Last name must be at max 30 characters."),
          email: Yup.string()
            .email("Must be a valid email.")
            .lowercase()
            .max(55, "Email must be at max 55 characters.")
            .required("Email is required.")
            .trim(),
          password: Yup.string().trim().required("Password is required."),
        })}
        onSubmit={(values) => {
          mutate(values);
        }}
      >
        {(formik) => (
          <form
            onSubmit={formik.handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "2rem",
              padding: "1rem",
              minWidth: "400px",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
            }}
          >
            <Typography variant="h5">Sign Up</Typography>

            <FormControl fullWidth>
              <TextField
                label="First name"
                {...formik.getFieldProps("firstName")}
              />

              {formik.touched.firstName && formik.errors.firstName ? (
                <FormHelperText error>{formik.errors.firstName}</FormHelperText>
              ) : null}
            </FormControl>

            <FormControl fullWidth>
              <TextField
                label="Last name"
                {...formik.getFieldProps("lastName")}
              />

              {formik.touched.lastName && formik.errors.lastName ? (
                <FormHelperText error>{formik.errors.lastName}</FormHelperText>
              ) : null}
            </FormControl>

            <FormControl fullWidth>
              <TextField label="Email" {...formik.getFieldProps("email")} />

              {formik.touched.email && formik.errors.email ? (
                <FormHelperText error>{formik.errors.email}</FormHelperText>
              ) : null}
            </FormControl>

            <FormControl fullWidth>
              <TextField
                label="Password"
                {...formik.getFieldProps("password")}
              />

              {formik.touched.password && formik.errors.password ? (
                <FormHelperText error>{formik.errors.password}</FormHelperText>
              ) : null}
            </FormControl>

            <Stack sx={{ width: "100%", gap: "10px", alignItems: "center" }}>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                color="success"
              >
                register
              </Button>

              <Link to="/login">Already registered? Login</Link>
            </Stack>
          </form>
        )}
      </Formik>
    </>
  );
};

export default Register;
