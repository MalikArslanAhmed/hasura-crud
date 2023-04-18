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
import apiUrl from "../../../environment/enviroment";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Stack } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
const schema = yup
  .object()
  .shape({
    id: yup.string(),
    name: yup.string().max(10).required(),
    shortName: yup.string().max(10).required(),
    description: yup.string().min(5).required(),
  })
  .required();
const theme = createTheme();

export default function CreateProduct() {
  const [, setApiResponse] = useState(null);
  const navigate = useNavigate();
  let [searchParams] = useSearchParams();
  const {
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: yupResolver(schema),
  });
  useEffect(() => {
    if (searchParams.get("id")) {
      axios
        .get(`${apiUrl.baseUrl}/products/${searchParams.get("id")}`)
        .then((response) => {
          console.log(response.data.products_by_pk);
          setValue("name", response.data.products_by_pk.name);
          setValue("shortName", response.data.products_by_pk.shortName);
          setValue("description", response.data.products_by_pk.description);
          setValue("id", response.data.products_by_pk.id);
        })
        .catch(function (error) {
          console.log(error);
          setApiResponse(error.response.data);
        });
    }
  }, []);
  function onSubmit(formData) {
    if (searchParams.get("id")) {
      editData(formData, searchParams.get("id"));
    } else {
      addData(formData);
    }
  }

  function addData(fData) {
    axios
      .post(`${apiUrl.baseUrl}/products`, fData)
      .then((response) => {
        setApiResponse(response.data.products);
        navigate("/");
      })
      .catch(function (error) {
        console.log(error);
        setApiResponse(error.response.data);
      });
  }

  function editData(fData, id) {
    axios
      .put(`${apiUrl.baseUrl}/products/${id}`, fData)
      .then((response) => {
        setApiResponse(response.data.products_by_pk);
        navigate("/");
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
                      <TextField
                        error={!errors.name?.type ? false : true}
                        helperText={errors.name?.message}
                        {...field}
                        fullWidth
                        label="Name"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    control={control}
                    name="shortName"
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        error={!errors.shortName?.type ? false : true}
                        helperText={errors.shortName?.message}
                        {...field}
                        fullWidth
                        label="Short Name"
                      />
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
                        error={!errors.description?.type ? false : true}
                        helperText={errors.description?.message}
                        {...field}
                        fullWidth
                        multiline
                        rows={4}
                        label="Description"
                      />
                    )}
                  />
                </Grid>
              </Grid>
              <Button
                onClick={handleSubmit}
                type="submit"
                fullWidth
                variant="contained"
              >
                {searchParams.get("id") ? "Update" : "Add"}
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
