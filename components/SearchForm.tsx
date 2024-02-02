import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { searchMovies } from "./api";

const schema = yup.object().shape({
  searchTerm: yup.string().required(),
});

const SearchForm: React.FC = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useQuery(
    "searchMovies",
    async (searchTerm) => {
      const response = await searchMovies(searchTerm);
      return response.data;
    },
  );

  const onSubmit = (data: { searchTerm: string }) => {
    navigate({
      pathname: "/search-results",
      search: `?q=${data.searchTerm}`,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="search">Search:</label>
      <input type="text" id="search" {...register("searchTerm")} />
      {errors.searchTerm && <span>{errors.searchTerm.message}</span>}
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchForm;
