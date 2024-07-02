import { Box, Button, CircularProgress, Stack } from "@mui/material";
import React, { useState } from "react";
import Header from "../component/Header";
import { useNavigate } from "react-router-dom";
import ProductCard from "../component/ProductCard";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../lib/axios.instance";
import FilterProduct from "../component/FilterProduct";

const Home = () => {
  const navigate = useNavigate();

  const [category, setCategory] = useState("");

  const { isPending, data } = useQuery({
    queryKey: ["product-list", category],
    queryFn: async () => {
      return await axiosInstance.post("/product/list", {
        category: category || null,
      });
    },
  });

  const productList = data?.data?.productList;
  console.log(productList);

  if (isPending) {
    <CircularProgress />;
  }
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Header />

      <Stack spacing={4}>
        <Button
          sx={{ marginTop: "7rem" }}
          variant="contained"
          color="secondary"
          onClick={() => {
            navigate("/add-product");
          }}
        >
          Add Product
        </Button>

        <FilterProduct setCategory={setCategory} />

        {category && (
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              setCategory(null);
            }}
          >
            clear filter
          </Button>
        )}
      </Stack>

      <Box
        sx={{
          margin: "5rem 0",
          display: "flex",
          flexWrap: "wrap",
          gap: "3rem",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {productList?.map((item) => {
          return (
            <ProductCard
              key={item._id}
              _id={item._id}
              image={item.image}
              name={item.name}
              brand={item.brand}
              price={item.price}
              description={item.description}
            />
          );
        })}
      </Box>
    </Box>
  );
};

export default Home;
