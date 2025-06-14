"use client";

import { useState } from "react";

export type MovieRequestData = {
  fullName: string;
  email: string;
  movieName: string;
  isInvalidEmail: boolean;
  isInvalidMovieName: boolean;
};

const useForm = () => {
  const [formData, setFormData] = useState<MovieRequestData>({
    fullName: "",
    email: "",
    movieName: "",
    isInvalidEmail: false,
    isInvalidMovieName: false,
  });

  return { formData, setFormData };
};

export default useForm;
