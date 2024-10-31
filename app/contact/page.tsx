'use client'

import * as React from "react"
import { useForm } from "react-hook-form"
import { InferType } from 'yup'
import { yupResolver } from "@hookform/resolvers/yup"
import { contactFormSchema } from "../validations/contact"

type FormData = InferType<typeof contactFormSchema> 

export default function Page() {
  const [status, setStatus] = React.useState<"error" | "success">()
  const { register, handleSubmit, formState, reset} = useForm<FormData>({
    resolver: yupResolver(contactFormSchema),
  })
  async function onSubmit(data: FormData ) { 
    const response = await fetch(`/api/contact`, {
      method: "POST",
      body: JSON.stringify(data),
    })
    if (response.ok) {
      reset()
      return setStatus("success")
    }
    return setStatus("error")
  }

  return (
    <>
    <div className="w-full p-6 space-y-4">
      {status === "error" ? (
        <div className="px-4 py-2 text-sm text-red-600 bg-red-100 border-red-200 rounded-md">
          An error occured. Please try again.
        </div>
      ) : null}
      {status === "success" ? (
        <div className="px-4 py-2 text-sm text-green-600 bg-green-100 border-green-200 rounded-md">
          Your message has been sent. Thank you.
        </div>
      ) : null}
      {Object.values(formState.errors)?.length ? (
        <div className="px-4 py-2 text-sm text-red-600 bg-red-100 border-red-200 rounded-md">
          {Object.values(formState.errors).map((error, index) => (
            <p key={index}>{error.message}</p>
          ))}
        </div>
      ) : null}
    </div>
    <div className="my-8 pb-1 text-lg font-semibold text-gray-800 dark:text-gray-100 mx-auto">Complete the form and a professional Drupal/Next.js consultant will be in touch.</div>
      <form className="max-w-md" onSubmit={handleSubmit(onSubmit)}>  
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name  
            <input id="name" type="text" autoComplete="name"  {...register("name")} placeholder="Your Name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            {formState.errors.name && <p className="text-red-600">Name is required</p>}
          </label>
        </div>
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Company
            <input id="company" type="text" autoComplete="company" {...register("company")}  placeholder="Company Name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" /> 
            {formState.errors.company && <p className="text-red-600">Company name is required</p>}
          </label>
        </div>
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email
            <input id="email" type="email" autoComplete="email" {...register('email', { required: true, pattern: /^\S+@\S+$/i })}  placeholder="Your Email Address" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            {formState.errors.email && <p className="text-red-600">Enter a valid email</p>}
          </label>
        </div>
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Subject
            <input id="subject" type="subject" autoComplete="subject" {...register("subject")}  placeholder="Subject" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            {formState.errors.subject && <p className="text-red-600">Subject is required</p>}
          </label>
        </div>
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">message
            <textarea id="message" autoComplete="message" {...register("message")} placeholder="Message" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  />
            {formState.errors.message && <p className="text-red-600">Message is required</p>}
          </label>
        </div>
        <button type="submit" className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white">Submit</button>
      </form>
    </>
  )
}