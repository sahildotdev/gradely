"use client";

import React from "react";
import { MdUploadFile } from "react-icons/md";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import useCourseworkStore from "@/store/courseworkStore";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { FormControl, FormLabel } from "./ui/form";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

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
    <div className="bg-[#FCFBFD] rounded-3xl border-[1px] p-5">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="bg-white content-center justify-center ">
            <FormControl>
              <>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-upload"
                />

                <div className="flex flex-col text-center border-dashed border-[1px] border-gray-300 rounded-lg p-10">
                  <div className="flex justify-center content-center ">
                    <MdUploadFile className="size-12 fill-[#98A1BB] " />
                  </div>
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <div>
                      <p className="text-gray-400 font-Mont font-bold text-base">
                        Drag and drop a PDF
                      </p>
                      <p className="text-gray-400 font-Mont font-semibold text-base">
                        Limit 25 MB per file
                      </p>
                    </div>
                    <Button
                      type="submit"
                      variant="outline"
                      className="mt-4  bg-white text-[#6947BF] border-[#CEC4EB] focus:outline-none font-extrabold text-base rounded-3xl border-[1px]"
                    >
                      Upload your file
                    </Button>
                  </label>
                </div>
                {errors.file && (
                  <p className="text-red-500">File is required</p>
                )}
              </>
            </FormControl>
          </div>
          <div className="flex flex-col mb-2">
            <Label className="mb-2 text-sm font-semibold" htmlFor="framework">
              Select your course & subjects*
            </Label>
            <div className="flex gap-5">
              <div className="flex flex-col space-y-5">
                <FormControl>
                  <>
                    <Select>
                      <SelectTrigger
                        className="border-[1px] rounded-3xl"
                        id="framework"
                      >
                        <SelectValue placeholder="Coursework Type" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectItem value="next">Next.js</SelectItem>
                        <SelectItem value="sveltekit">SvelteKit</SelectItem>
                        <SelectItem value="astro">Astro</SelectItem>
                        <SelectItem value="nuxt">Nuxt.js</SelectItem>
                      </SelectContent>
                    </Select>

                    {errors.courseworkType && (
                      <p className="text-red-500">
                        Coursework type is required
                      </p>
                    )}
                  </>
                </FormControl>
              </div>
              <div className="flex flex-col space-y-1.5">
                <FormControl>
                  <>
                    <Select>
                      <SelectTrigger
                        className="border-[1px] rounded-3xl"
                        id="framework"
                      >
                        <SelectValue placeholder="Subject" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectItem value="next">Next.js</SelectItem>
                        <SelectItem value="sveltekit">SvelteKit</SelectItem>
                        <SelectItem value="astro">Astro</SelectItem>
                        <SelectItem value="nuxt">Nuxt.js</SelectItem>
                      </SelectContent>
                    </Select>

                    {errors.subject && (
                      <p className="text-red-500">Subject is required</p>
                    )}
                  </>
                </FormControl>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-[30%] ">
            <FormControl>
              <>
                <FormLabel className="mb-2">Enter your essay title</FormLabel>
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
          </div>

          <Button
            type="submit"
            variant="default"
            className=" font-Mont rounded-3xl mt-4 bg-[#ADB8C9] "
          >
            Evaluate your Score
          </Button>
        </form>
      </FormProvider>
    </div>
  );
}
