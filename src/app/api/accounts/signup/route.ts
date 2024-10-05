import { NextResponse } from "next/server";
import { IssueData, RefinementCtx, z } from "zod";
import { prisma } from "@/lib/primsa-db";
import { hash } from "bcrypt";

// Define a custom context interface for validation issues
interface IContext extends RefinementCtx {
  addIssue: (issue: IssueData) => void;
}

// Define the request body schema
const bodySchema = z.object({
  email: z
    .string()
    .email("Email Tidak Valid")
    .min(5, "Email diperlukan")
    .superRefine(async (email: string, ctx: IContext) => {
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (user) {
        ctx.addIssue({
          message: "Email sudah terdafar",
          path: ["email"],
          code: "custom",
        });
      }
    }),
  password: z.string().min(8, "Kata sandi harus mengandung minimal 8 karakter"),
  fullname: z
    .string()
    .min(3, "Nama Lengkap harus mengandung minimal 3 karakter"),
  username: z
    .string()
    .min(3, "Nama Pengguna harus mengandung minimal 3 karakter")
    .superRefine(async (username: string, ctx: IContext) => {
      const user = await prisma.user.findFirst({
        where: { username },
      });

      if (user) {
        ctx.addIssue({
          message: "Nama pengguna tidak dapat digunakan",
          path: ["username"],
          code: "custom",
        });
      }
    }),
});

// Define the POST handler
export const POST = async (request: Request) => {
  try {
    // Parse and validate the request body
    const body = await bodySchema.parseAsync(await request.json());

    // Hash the password
    const hashedPassword = await hash(body.password, 10);

    // Create the account
    const createAccount = await prisma.account.create({
      data: {
        email: body.email,
        password: hashedPassword,
      },
    });

    // Create the user
    const createUser = await prisma.user.create({
      data: {
        accountId: createAccount.id,
        email: body.email,
        fullname: body.fullname,
        username: body.username, // Use the username from the request
      },
    });

    // Respond with the created user information
    return NextResponse.json(
      {
        message: "Berhasil buat akun",
        results: createUser,
      },
      { status: 201 } // Use 201 Created status
    );
  } catch (error: any) {
    // Handle specific validation errors and general server errors
    const isValidationError = error instanceof z.ZodError;

    return NextResponse.json(
      {
        message: isValidationError
          ? "Validation error"
          : "Internal server error",
        errors: isValidationError ? error.errors : undefined,
      },
      { status: isValidationError ? 400 : 500 }
    );
  }
};
