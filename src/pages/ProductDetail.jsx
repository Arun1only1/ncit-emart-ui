import {
  Box,
  Button,
  Checkbox,
  Chip,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import Header from "../component/Header";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../lib/axios.instance";
import { useNavigate, useParams } from "react-router-dom";
import { fallbackImage } from "../constants/general.constant";
import DeleteProductDialog from "../component/DeleteProductDialog";

const ProductDetail = () => {
  const params = useParams();
  const navigate = useNavigate();

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
        sx={{
          flexDirection: {
            xs: "column",
            md: "row",
          },
          marginTop: {
            xs: "4rem",
            md: "5rem",
          },

          maxHeight: "1000px",
          width: {
            xs: "100%",
            md: "80vw",
          },
          gap: "1rem",
          padding: "1rem",
          boxShadow: { md: "rgba(0, 0, 0, 0.56) 0px 22px 70px 4px", xs: null },
        }}
      >
        <Box sx={{ width: { xs: "100%", md: "60%" } }}>
          <img
            src={productDetail?.image || fallbackImage}
            alt={productDetail?.name}
            style={{ width: "100%", height: "100%" }}
          />
        </Box>
        <Box
          sx={{
            width: { xs: "100%", md: "40%" },

            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
            justifyContent: "center",
            alignItems: "flex-start",
            mb: "5rem",
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

          <Typography variant="h6">
            Free shipping: <Checkbox checked={productDetail?.hasFreeShipping} />
          </Typography>

          <Stack
            spacing={4}
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              width: "90%",
              gap: "10px",

              justifyContent: "center",
              alignItems: "center",
              mb: "1rem",
            }}
          >
            <Button
              variant="contained"
              color="success"
              fullWidth
              onClick={() => {
                navigate(`/edit-product/${params.id}`);
              }}
            >
              edit
            </Button>

            <DeleteProductDialog />
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default ProductDetail;
