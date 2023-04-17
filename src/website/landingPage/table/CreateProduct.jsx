import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useForm, Controller } from "react-hook-form";
import { FormHelperText } from "@mui/material";
import apiUrl from "../../../environment/enviroment";
import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Stack,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";

const theme = createTheme();

export default function CreateProduct() {
  const [apiResponse, setApiResponse] = useState(null);
  const navigate = useNavigate();
  let [searchParams] = useSearchParams();
  const [productCategories, setProductCategories] = useState([]);

  const { handleSubmit, setValue, control, clearErrors } = useForm({
    mode: "all",
  });

  useEffect(() => {
    // getProductList();
    // if (searchParams.get("id")) {
    //   console.log(searchParams.get("id"));
    //   axios
    //     .get(`${apiUrl.baseUrl}/admin/products/${searchParams.get("id")}`)
    //     .then((response) => {
    //       console.log("asdf", response.data.data.productCategory._id);
    //       setValue("id", response.data.data._id);
    //       setValue("name", response.data.data.name);
    //       setValue("shortName", response.data.data.shortName);
    //       setValue("description", response.data.data.description);
    //       setValue("productCategoryId", response.data.data.productCategory._id);
    //     })
    //     .catch(function (error) {
    //       console.log(error);
    //       setApiResponse(error.response.data);
    //     });
    // }
  }, []);
  function addData(fData) {
    axios
      .post("https://square-perch-32.hasura.app/api/rest/product", fData)
      .then((response) => {
        setApiResponse(response.data);
        navigate("/");
      })
      .catch(function (error) {
        console.log(error);
        setApiResponse(error.response.data);
      });
  }

  function onSubmit(formData) {
    let fData = new FormData();
    fData.append("name", formData.name);
    fData.append("shortName", formData.shortName);
    fData.append("description", formData.description);
    fData.append("productCategoryId", formData.productCategoryId);
    if (searchParams.get("id")) {
      if (typeof imageFile === "string") {
        editData(formData, searchParams.get("id"));
      } else {
        editData(fData, searchParams.get("id"));
      }
    } else {
      addData(fData);
    }
  }
  //   function getProductList() {
  //     axios
  //       .get(`${apiUrl.baseUrl}/admin/productCategories`)
  //       .then((response) => {
  //         setProductCategories(response.data.data);
  //         console.log(response.data.data);
  //       })
  //       .catch(function (error) {
  //         console.log(error);
  //         setProductCategories(error.response.data);
  //       });
  //   }

  function editData(fData, id) {
    axios
      .put(`${apiUrl.baseUrl}/admin/products/${id}`, fData)
      .then((response) => {
        setApiResponse(response.data);
        navigate("/admin/product");
      })
      .catch(function (error) {
        console.log(error);
        setApiResponse(error.response.data);
      });
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              {<b>{searchParams.get("id") ? "Update" : "Add"} Product</b>}
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit(onSubmit)}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Controller
                    control={control}
                    name="name"
                    defaultValue=""
                    render={({ field }) => (
                      <TextField {...field} fullWidth label="Name" />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    control={control}
                    name="shortName"
                    defaultValue=""
                    render={({ field }) => (
                      <TextField {...field} fullWidth label="Short Name" />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    control={control}
                    name="description"
                    defaultValue=""
                    id="filled-multiline-static"
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Description"
                        multiline
                        rows={4}
                      />
                    )}
                  />
                </Grid>
              </Grid>
              <Button
                // onClick={handleSubmit}
                type="submit"
                fullWidth
                variant="contained"
              >
                Add
                {/* {searchParams.get("id") ? "Update" : "Add"} */}
              </Button>
              <Stack>
                <Button
                  type="button"
                  variant="outlined"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={() => navigate("/")}
                >
                  Product
                </Button>
              </Stack>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}
