import { Box, Button, CircularProgress } from "@mui/material";
import React from "react";
import Header from "../component/Header";
import { useNavigate } from "react-router-dom";
import ProductCard from "../component/ProductCard";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../lib/axios.instance";

const product1 = {
  image:
    "https://media.gettyimages.com/id/622013488/photo/chinese-water-dragon.jpg?s=612x612&w=0&k=20&c=AXYA9calwRrnu3ouzU57Ub5xYaCxFxWDE7zYNsTKKAg=",
  name: "Macbook M3",
  brand: "Apple",
  price: 1500,
  description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
          asperiores iure animi error iste aspernatur quas? Aperiam culpa id
          suscipit neque maxime, et, incidunt totam amet nostrum praesentium quo
          magnam...`,
};
const Home = () => {
  const navigate = useNavigate();

  const { isPending, data } = useQuery({
    queryKey: ["product-list"],
    queryFn: async () => {
      return await axiosInstance.get("/product/list");
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
