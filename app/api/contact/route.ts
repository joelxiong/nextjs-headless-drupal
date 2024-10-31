import { NextResponse } from 'next/server'
import * as yup from "yup"
import { contactFormSchema } from "../../validations/contact"

export const POST = async ( request ) => {
  try {
    //convert the ReadableStream to a usable format
    const requestBody = await new Response(request.body).json()
    const body = await contactFormSchema.validate(requestBody)
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/webform_rest/submit`,
      {
        method: "POST",
        body: JSON.stringify({
          webform_id: "contact",
          ...body,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )

    if (!result.ok) {
      throw new Error()
    }
    return NextResponse.json({ message: 'Success!' })
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      return NextResponse.json({ message: error.message }, { status: 422 })
    }
    console.error('Error in POST /api/contact:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
  }
}
