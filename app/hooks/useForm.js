"use client";
import { useState } from "react";

const useForm = (name, email, movieName) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    movieName: "",
  });

  return { formData, setFormData };
};

export default useForm;
