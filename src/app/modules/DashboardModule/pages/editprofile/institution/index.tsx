'use client'
import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod"
import { Textarea } from "@/components/ui/textarea"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useAuth } from '@/app/modules/AuthenticationModule/context/Authentication';

const MAX_FILE_SIZE = 50000;
const ACCEPTED_IMAGE_TYPES = ["image/jpg", "image/png"];

const institutionSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Please enter a valid input" }),
  phone: z
    .string()
    .min(1, { message: "Please enter a valid input" })
    .max(20, { message: "Please enter a valid input" }),
  description: z
    .string()
    .min(5, { message: "Please enter a valid input" }),
  qris: z
    .any()
    .optional()
    .refine((file) => !file || (file.size <= MAX_FILE_SIZE && ACCEPTED_IMAGE_TYPES.includes(file.type)), "Only .jpg and .png formats are supported and max size is 50KB."),
});

const EditProfileInstitutionPage = () => {
  const { user, setUser } = useAuth();
  const [fileName, setFileName] = useState('');
  const [base64String, setBase64String] = useState<string | null>(null);
  const route = useRouter();
  const form = useForm<z.infer<typeof institutionSchema>>({
    resolver: zodResolver(institutionSchema),
    defaultValues: {
      name: user?.name,
      phone: user?.phone,
      description: user?.description,
      qris: null,
    }
  });

  useEffect(() => {
    if (user?.qris && user.qris.startsWith('data:image')) {
      setBase64String(user.qris);
    }
  }, [user?.qris]);
  
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: z.infer<typeof institutionSchema>) => {
    const token = Cookies.get('token');
    if (token) {
      try {
        setLoading(true);
        const updatedData = { ...data };
        if(fileName) {
          const file = data.qris;
          const reader = new FileReader();
    
          reader.onloadend = async () => {
            const base64String = reader.result;
            updatedData.qris = base64String;
            const response = await axios.patch('http://localhost:3001/api/auth/', updatedData, {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            });
            setUser(response.data.data);
          };
          reader.readAsDataURL(file);
        } else {
          delete updatedData.qris; // Prevent sending empty qris field
          const response = await axios.patch('http://localhost:3001/api/auth/', updatedData, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          setUser(response.data.data);
        }
      } catch (error) {
        console.error('Error submitting form', error);
      } finally {
        setLoading(false);
        route.push('/');
      }
    } else {
      console.log("error");
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      if (file.size <= MAX_FILE_SIZE && ACCEPTED_IMAGE_TYPES.includes(file.type)) {
        setFileName(file.name);
        form.setValue('qris', file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setBase64String(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        form.setError('qris', {
          type: 'manual',
          message: file.size > MAX_FILE_SIZE
            ? 'Max image size is 5MB.'
            : 'Only .jpg and .png formats are supported.',
        });
      }
    }
  };

  return (
    <div className='flex flex-col relative w-full'>
      <div className='relative flex flex-col flex-grow items-center justify-center bg-white px-40 py-20 font-bold'>
        <div className='w-full flex flex-row justify-center relative py-12'>
          <div className='absolute left-0'>
            <button className='hover:scale-110 transition ease-in-out' onClick={() => route.back()}>
              <img src="/images/authentication/arrow-left.svg" alt="Arrow Left" />
            </button>
          </div>
          <div className='flex justify-center items-center pt-4'>
            <p className='text-3xl text-[#02353C]'>Edit Profile</p>
          </div>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='w-full gap-6 flex flex-col font-normal'>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-[#333]'>Organization Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-[#333]'>Phone Number</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-[#333]'>Organization Description</FormLabel>
                  <FormControl>
                    <Textarea rows={6} {...field} className="w-full" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex w-full gap-20 items-center">
              <FormField
                control={form.control}
                name="qris"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className='text-[#333]'>QRIS Bank Account</FormLabel>
                    <FormControl>
                      <div className="relative w-full">
                        <label
                          htmlFor="file-upload"
                          className="flex items-center justify-center w-full py-4 border-dashed border-2 border-[#188290] text-[#188290] rounded-md cursor-pointer"
                        >
                          <img src="/images/authentication/upload-icon.svg" alt="Upload Icon" className="mr-2" />
                          <span className={fileName ? 'text-black' : 'text-[#828282]'}>{fileName || "Browse File"}</span>
                          <Input
                            id="file-upload"
                            type="file"
                            className="absolute inset-0 opacity-0 cursor-pointer"
                            accept="image/png, image/jpg"
                            onChange={handleFileChange}
                          />
                        </label>
                      </div>
                    </FormControl>
                    <FormDescription>File supported: .png, .jpg</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {base64String && (
                <div className="flex-1 py-4 gap-8 flex flex-col">
                  <p className='font-medium'>Last Qris:</p>
                  <img src={base64String} alt="QRIS" className="w-1/2 h-auto" />
                </div>
              )}
            </div>
            <button
              type="submit"
              className={`mt-10 px-10 py-4 w-max flex self-center font-semibold text-white rounded-lg ${loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-[#188290] hover:bg-[#02353C]'}`}
              disabled={loading}
            >
              {loading ? 'Saving Your Update...' : 'Save'}
            </button>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default EditProfileInstitutionPage;