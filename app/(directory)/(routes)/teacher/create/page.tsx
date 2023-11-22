"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from 'react-hot-toast';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormLabel,
  FormMessage,
  FormItem,
} from "@/components/ui/form";
import * as z from "zod";
import {zodResolver} from '@hookform/resolvers/zod'

//validation schema
const formSchema = z.object({
    title: z.string().min(1, {
    message: "Course title need to be longer than 1 words",
  }),
});

const CreateCourse = () => {
  const router = useRouter();
  const defaultFormValues = {
    title: "", //default is none
  };

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: defaultFormValues,
  });

  //extract values from the form
  const { isSubmitting, isValid } = form.formState; 
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post("/api/course", values);
      router.push(`/teacher/course/${response.data.id}`);
      toast.success("Course successfully created");
    } catch {
      toast.error("Invalid response");
    }
  }

  //disable button if form is invalid or submitting
  //onsubmit, send data to backend
  return (
    <div className="max-w-6xl p-10 mt-10">
      <div className="shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h1 className="text-xl font-bold mb-4">Title of your Course</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormDescription>
                What is your course's area of topic ?
              </FormDescription>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Course Title
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="Enter course title"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button
                  type="button"
                  variant="outline"
                >
                  Cancel
                </Button>
              </Link>
              <Button
                type="submit"
                disabled={!isValid || isSubmitting}
              >
                Continue
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
    
}
 
export default CreateCourse;


