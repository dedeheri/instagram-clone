import { NextResponse } from "next/server";
import { z, IssueData, RefinementCtx } from "zod";
import { prisma } from "@/lib/primsa-db";
import { compare } from "bcrypt";

// Define a custom context interface for validation issues
interface IContext extends RefinementCtx {
  addIssue: (issue: IssueData) => void;
}

// Define the schema with validation rules
const bodySchema = z
  .object({
    email: z.string().min(5, "Email diperlukan").email("Email Tidak Valid"),
    password: z
      .string()
      .min(8, "Kata sandi harus mengandung minimal 8 karakter"),
  })
  .superRefine(async ({ email, password }, ctx: IContext) => {
    const account = await prisma.account.findUnique({
      where: { email },
    });

    // Check if the email exists
    if (!account) {
      ctx.addIssue({
        message: "Email belum terdafar",
        path: ["email"],
        code: "custom",
      });
    } else {
      // Check password
      const passwordCompare = await compare(password, account.password || "");

      if (!passwordCompare) {
        ctx.addIssue({
          message: "Kata sandi salah",
          path: ["password"],
          code: "custom",
        });
      }
    }
  });

// Define the POST handler
export const POST = async (request: Request) => {
  try {
    // Parse and validate the incoming request body
    const body = await bodySchema.parseAsync(await request.json());

    // Retrieve the account by email
    const account = await prisma.account.findUnique({
      where: { email: body.email },
    });

    // Retrieve the user associated with the account
    const user = await prisma.user.findFirst({
      where: { accountId: account?.id },
    });

    // Respond with the user data
    return NextResponse.json(
      {
        message: "Berhasil",
        results: user,
      },
      { status: 200 }
    );
  } catch (error: any) {
    // Handle errors and respond with an appropriate message
    return NextResponse.json(
      { message: "Internal server error", error: error.errors || error },
      { status: 500 }
    );
  }
};
