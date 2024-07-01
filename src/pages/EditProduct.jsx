import { Formik } from "formik";
import React from "react";
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  FormHelperText,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import productSchema from "../schema/product.schema";
import { productCategories } from "../constants/general.constant";
import Header from "../component/Header";
import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "../lib/axios.instance";
import { useNavigate, useParams } from "react-router-dom";

const EditProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  // get product details
  const { isPending, data } = useQuery({
    queryKey: ["get-product-detail"],
    queryFn: async () => {
      return await axiosInstance.get(`/product/detail/${params.id}`);
    },
  });

  const productDetail = data?.data?.productDetail;

  // ? edit product
  const { isPending: editProductPending, mutate } = useMutation({
    mutationKey: ["edit-product"],
    mutationFn: async (values) => {
      return await axiosInstance.put(`/product/edit/${params.id}`, values);
    },
    onSuccess: () => {
      navigate(`/product-detail/${params.id}`);
    },
    onError: (error) => {
      console.log(error?.response?.data?.message);
    },
  });

  if (isPending || editProductPending) {
    return <CircularProgress />;
  }
  return (
    <Box>
      <Header />

      <Formik
        enableReinitialize
        initialValues={{
          name: productDetail?.name || "",
          brand: productDetail?.brand || "",
          price: productDetail?.price || 0,
          quantity: productDetail?.quantity || 1,
          category: productDetail?.category || "",
          description: productDetail?.description || "",
          hasFreeShipping: productDetail?.hasFreeShipping || false,
        }}
        validationSchema={productSchema}
        onSubmit={(values) => {
          mutate(values);
        }}
      >
        {(formik) => {
          return (
            <form
              onSubmit={formik.handleSubmit}
              style={{
                margin: "7rem 0 4rem",
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
              <Typography variant="h4">Edit Product</Typography>

              {productDetail?.image && (
                <img
                  height="250px"
                  width="100%"
                  src={productDetail?.image}
                  alt={productDetail?.name}
                />
              )}
              <FormControl fullWidth>
                <TextField
                  required
                  label="Name"
                  {...formik.getFieldProps("name")}
                />

                {formik.touched.name && formik.errors.name ? (
                  <FormHelperText error>{formik.errors.name}</FormHelperText>
                ) : null}
              </FormControl>

              <FormControl fullWidth>
                <TextField
                  required
                  label="Brand"
                  {...formik.getFieldProps("brand")}
                />

                {formik.touched.brand && formik.errors.brand ? (
                  <FormHelperText error>{formik.errors.brand}</FormHelperText>
                ) : null}
              </FormControl>

              <FormControl fullWidth>
                <TextField
                  required
                  type="number"
                  label="Price"
                  {...formik.getFieldProps("price")}
                />

                {formik.touched.price && formik.errors.price ? (
                  <FormHelperText error>{formik.errors.price}</FormHelperText>
                ) : null}
              </FormControl>

              <FormControl fullWidth>
                <TextField
                  required
                  type="number"
                  label="Quantity"
                  {...formik.getFieldProps("quantity")}
                />

                {formik.touched.quantity && formik.errors.quantity ? (
                  <FormHelperText error>
                    {formik.errors.quantity}
                  </FormHelperText>
                ) : null}
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select label="Category" {...formik.getFieldProps("category")}>
                  {productCategories.map((item, index) => {
                    return (
                      <MenuItem key={index} value={item}>
                        {item}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              {console.log(formik.values)}

              <FormControl
                fullWidth
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Typography>Free shipping</Typography>
                <Checkbox
                  checked={formik.values.hasFreeShipping}
                  {...formik.getFieldProps("hasFreeShipping")}
                />
              </FormControl>

              <FormControl fullWidth>
                <TextField
                  multiline
                  rows={7}
                  required
                  label="Description"
                  {...formik.getFieldProps("description")}
                />

                {formik.touched.description && formik.errors.description ? (
                  <FormHelperText error>
                    {formik.errors.description}
                  </FormHelperText>
                ) : null}
              </FormControl>

              <Button
                fullWidth
                type="submit"
                variant="contained"
                color="success"
              >
                submit
              </Button>
            </form>
          );
        }}
      </Formik>
    </Box>
  );
};

export default EditProduct;
