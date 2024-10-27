"use client";

import { useState } from "react";

const useForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    movieName: "",
    isInvalidEmail: false,
    isInvalidMovieName: false,
  });

  return { formData, setFormData };
};

export default useForm;
