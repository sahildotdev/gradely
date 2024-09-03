"use client";
import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

import Image from "next/image";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import PDFUploader from "./PDFUploader";
import useEssayEvaluationStore from "@/store/essayEvaluationStore";
import { usePDFThumbnail } from "@/hooks/usePDFThumbnail";

const formSchema = z.object({
  courseworkType: z.string().min(1, { message: "Coursework type is required" }),
  subject: z.string().min(1, { message: "Subject is required" }),
  essayTitle: z.string().min(1, { message: "Essay title is required" }),
  pdfFile: z
    .array(z.instanceof(File))
    .min(1, { message: "PDF file is required" }),
});

const EssayEvaluationForm: React.FC = () => {
  const {
    setCourseworkType,
    setSubject,
    setEssayTitle,
    setPdfFileMetadata,
    setIsLoading,
    setIsEvaluationRequested,
    addCoursework,
    isLoading,
  } = useEssayEvaluationStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      courseworkType: "",
      subject: "",
      essayTitle: "",
      pdfFile: [],
    },
  });

  const pdfFile = form.watch("pdfFile")[0];
  const { thumbnailUrl, error: thumbnailError } = usePDFThumbnail(pdfFile);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!values.pdfFile[0]) {
      console.error("No PDF file selected");
      return;
    }

    setCourseworkType(values.courseworkType);
    setSubject(values.subject);
    setEssayTitle(values.essayTitle);

    const selectedFile = values.pdfFile[0];

    setPdfFileMetadata({
      name: selectedFile.name,
      size: selectedFile.size,
      type: selectedFile.type,
      file: selectedFile,
    });

    setIsLoading(true);
    setIsEvaluationRequested(true);

    addCoursework({
      title: values.essayTitle,
      subject: values.subject,
      type: values.courseworkType,
      wordCount: Math.floor(Math.random() * 1000) + 500,
      fileMetadata: {
        name: values.pdfFile[0].name,
        size: values.pdfFile[0].size,
        type: values.pdfFile[0].type,
        file: selectedFile,
      },
      language: "English",
      thumbnailUrl: thumbnailUrl || "/images/thumbnail.png",
    });

    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
  };

  return (
    <div className="bg-[#FCFBFD] rounded-3xl border-[1px] p-5 md:p-6 lg:p-8">
      <FormProvider {...form}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="pdfFile"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <PDFUploader
                      onFileUpload={(files) => {
                        field.onChange(files);
                        form.trigger("pdfFile");
                      }}
                      value={field.value}
                    />
                  </FormControl>
                  {thumbnailError && (
                    <p className="text-red-500 text-sm mt-2">
                      Failed to generate thumbnail: {thumbnailError}
                    </p>
                  )}
                  {thumbnailUrl && (
                    <Image
                      src={thumbnailUrl}
                      alt="PDF thumbnail"
                      className="mt-2 max-w-full h-auto"
                    />
                  )}
                </FormItem>
              )}
            />

            <div className="flex flex-col md:flex-row md:gap-4 mb-2">
              <FormField
                control={form.control}
                name="courseworkType"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel
                      htmlFor="courseworkType"
                      className="text-sm font-semibold mb-2"
                    >
                      Coursework Type*
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger
                          className="border-[1px] rounded-3xl"
                          id="courseworkType"
                        >
                          <SelectValue placeholder="Coursework Type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent position="popper">
                        <SelectItem value="essay">Essay</SelectItem>
                        <SelectItem value="research_paper">
                          Research Paper
                        </SelectItem>
                        <SelectItem value="case_study">Case Study</SelectItem>
                      </SelectContent>
                    </Select>
                    {form.formState.errors.courseworkType && (
                      <p className="text-red-500 text-sm mt-1">
                        {form.formState.errors.courseworkType.message}
                      </p>
                    )}
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel
                      htmlFor="subject"
                      className="text-sm font-semibold mb-2"
                    >
                      Subject*
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger
                          className="border-[1px] rounded-3xl"
                          id="subject"
                        >
                          <SelectValue placeholder="Subject" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent position="popper">
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="history">History</SelectItem>
                        <SelectItem value="science">Science</SelectItem>
                      </SelectContent>
                    </Select>
                    {form.formState.errors.subject && (
                      <p className="text-red-500 text-sm mt-1">
                        {form.formState.errors.subject.message}
                      </p>
                    )}
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="essayTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    htmlFor="essayTitle"
                    className="text-sm font-semibold mb-2"
                  >
                    Essay Title*
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your essay title"
                      {...field}
                      className="rounded-3xl w-full"
                    />
                  </FormControl>
                  {form.formState.errors.essayTitle && (
                    <p className="text-red-500 text-sm mt-1">
                      {form.formState.errors.essayTitle.message}
                    </p>
                  )}
                </FormItem>
              )}
            />
            <a className="cursor-pointer">
              <Button
                type="submit"
                variant="default"
                className="font-Mont rounded-3xl mt-4 bg-[#ADB8C9] w-full sm:w-auto"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Evaluating...
                  </>
                ) : (
                  "Evaluate your Score"
                )}
              </Button>
            </a>
          </form>
        </Form>
      </FormProvider>
    </div>
  );
};

export default EssayEvaluationForm;
