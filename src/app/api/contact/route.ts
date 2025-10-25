import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';

const apiKey = process.env.RESEND_API_KEY;

if (!apiKey) {
  console.error('⚠️ RESEND_API_KEY is not defined in environment variables');
  console.error('Please add RESEND_API_KEY to your .env.local file');
}

const resend = new Resend(apiKey || '');


// Schema for "Looking for a job" form (no company name)
const jobSeekerSchema = z.object({
  formType: z.literal('jobSeeker'),
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  phoneNumber: z.string().min(9, 'Please enter a valid phone number'),
  email: z.string().email('Please enter a valid email address'),
  suggestion: z.string().min(10, 'Suggestion must be at least 10 characters'),
  agreeToPrivacy: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the Privacy Policy',
  }),
});

// Schema for "Request personnel" form (includes company name)
const employerSchema = z.object({
  formType: z.literal('employer'),
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  phoneNumber: z.string().min(9, 'Please enter a valid phone number'),
  email: z.string().email('Please enter a valid email address'),
  companyName: z.string().min(2, 'Company name must be at least 2 characters'),
  suggestion: z.string().min(10, 'Suggestion must be at least 10 characters'),
  agreeToPrivacy: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the Privacy Policy',
  }),
});

// Union schema
const contactSchema = z.discriminatedUnion('formType', [
  jobSeekerSchema,
  employerSchema,
]);

export async function POST(request: NextRequest) {
  try {
    // Check if API key is configured
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Email service not configured. Please contact administrator.' },
        { status: 500 }
      );
    }

    const body = await request.json();

    // Validate the request body
    const validatedData = contactSchema.parse(body);

    const { formType, fullName, phoneNumber, email, suggestion } = validatedData;
    const companyName = formType === 'employer' ? validatedData.companyName : null;

    // Determine email subject based on form type
    const subject = formType === 'jobSeeker'
      ? `Job Application from ${fullName}`
      : `Personnel Request from ${fullName} (${companyName})`;

    // Build email HTML
    const companyNameHtml = companyName
      ? `<p><strong>Company Name:</strong> ${companyName}</p>`
      : '';

    // Using dummy data for now - in production, update from/to addresses
    const { data, error } = await resend.emails.send({
      from: 'Contact Form <event@expresni-prace.com>', // TODO: Update to verified domain
      to: ['expresni.prace@gmail.com'], // TODO: Update to your email
      subject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">
            ${formType === 'jobSeeker' ? 'New Job Application' : 'New Personnel Request'}
          </h2>
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Form Type:</strong> ${formType === 'jobSeeker' ? 'Looking for a Job' : 'Request Personnel'}</p>
            <p><strong>Full Name:</strong> ${fullName}</p>
            <p><strong>Phone Number:</strong> ${phoneNumber}</p>
            <p><strong>Email:</strong> ${email}</p>
            ${companyNameHtml}
            <p><strong>Suggestion:</strong></p>
            <div style="background-color: white; padding: 15px; border-radius: 4px; margin-top: 10px;">
              ${suggestion.replace(/\n/g, '<br>')}
            </div>
          </div>
          <p style="color: #666; font-size: 14px;">
            This email was sent from your website's contact form.
          </p>
        </div>
      `,
      replyTo: email,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Email sent successfully', id: data?.id },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid form data', details: error.issues },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}