"use client";
import { useEffect, useState } from "react";

const useForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    movieName: "",
    isInvalidEmail: false,
    isInvalidMovieName: false,
    isInvalid: true,
  });

  return { formData, setFormData };
};

export default useForm;
