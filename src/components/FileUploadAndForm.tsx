"use client";

import React from "react";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import useCourseworkStore from "@/store/courseworkStore";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { FormControl, FormLabel } from "./ui/form";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FormValues {
  courseworkType: string;
  subject: string;
  essayTitle: string;
  file: File | null;
}

export default function FileUploadAndForm() {
  const { setCourseworkType, setSubject, setEssayTitle, setFile } =
    useCourseworkStore();
  const methods = useForm<FormValues>();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = methods;

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    setCourseworkType(data.courseworkType);
    setSubject(data.subject);
    setEssayTitle(data.essayTitle);
    setFile(data.file);
    // Handle form submission logic here
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setValue("file", selectedFile, { shouldValidate: true });
      setFile(selectedFile);
    } else {
      alert("Please upload a PDF file.");
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-white ">
        <FormControl>
          <>
            <FormLabel>Upload your file</FormLabel>
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer text-center block border-dashed border-2 border-gray-300 rounded-lg p-4"
            >
              <p className="text-gray-500">Drag and drop a PDF</p>
              <p className="text-gray-400">Limit 25 MB per file</p>
            </label>
            {errors.file && <p className="text-red-500">File is required</p>}
          </>
        </FormControl>

        <FormControl>
          <>
            <FormLabel>Select your coursework type</FormLabel>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Framework</Label>
              <Select>
                <SelectTrigger id="framework">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="next">Next.js</SelectItem>
                  <SelectItem value="sveltekit">SvelteKit</SelectItem>
                  <SelectItem value="astro">Astro</SelectItem>
                  <SelectItem value="nuxt">Nuxt.js</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {errors.courseworkType && (
              <p className="text-red-500">Coursework type is required</p>
            )}
          </>
        </FormControl>

        <FormControl>
          <>
            <FormLabel>Select your subject</FormLabel>
            <Select {...register("subject", { required: true })}>
              <option value="">Subject</option>
              <option value="Physics">Physics</option>
              <option value="Mathematics">Mathematics</option>
              <option value="English">English</option>
            </Select>
            {errors.subject && (
              <p className="text-red-500">Subject is required</p>
            )}
          </>
        </FormControl>

        <FormControl>
          <>
            <FormLabel>Enter your essay title</FormLabel>
            <Input
              type="text"
              placeholder="Enter your essay title"
              {...register("essayTitle", { required: true })}
            />
            {errors.essayTitle && (
              <p className="text-red-500">Essay title is required</p>
            )}
          </>
        </FormControl>

        <Button type="submit" variant="default" className="mt-4 w-full">
          Evaluate your Score
        </Button>
      </form>
    </FormProvider>
  );
}
