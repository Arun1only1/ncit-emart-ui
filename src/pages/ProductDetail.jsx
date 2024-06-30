import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import Header from "../component/Header";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../lib/axios.instance";
import { useParams } from "react-router-dom";
import { fallbackImage } from "../constants/general.constant";

const ProductDetail = () => {
  const params = useParams();

  const { isPending, data } = useQuery({
    queryKey: ["product-detail"],
    queryFn: async () => {
      return await axiosInstance.get(`/product/detail/${params.id}`);
    },
  });

  const productDetail = data?.data?.productDetail;

  if (isPending) {
    return <CircularProgress />;
  }
  return (
    <Box>
      <Header />

      <Stack
        direction="row"
        sx={{
          marginTop: "5rem",
          maxHeight: "1000px",
          width: "80vw",
          gap: "1rem",
          padding: "1rem",
          boxShadow: "rgba(0, 0, 0, 0.56) 0px 22px 70px 4px",
        }}
      >
        <Box sx={{ width: "60%" }}>
          <img
            src={productDetail?.image || fallbackImage}
            alt={productDetail?.name}
            style={{ width: "90%", height: "100%" }}
          />
        </Box>
        <Box
          sx={{
            width: "40%",
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          <Typography variant="h5">{productDetail?.name}</Typography>
          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{ width: "100%" }}
          >
            <Chip label={productDetail?.brand} color="secondary" />
            <Chip label={productDetail?.category} color="secondary" />
          </Stack>

          <Typography variant="h6">Price: ${productDetail?.price}</Typography>
          <Typography variant="h6">
            Quantity: {productDetail?.quantity}
          </Typography>
          <Typography sx={{ textAlign: "justify" }}>
            {productDetail?.description}
          </Typography>

          <Stack
            direction="row"
            spacing={4}
            sx={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button variant="contained" color="success" fullWidth>
              edit
            </Button>
            <Button variant="contained" color="error" fullWidth>
              delete
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default ProductDetail;
