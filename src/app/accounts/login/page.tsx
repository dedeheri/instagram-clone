"use client";

import { useEffect, useState } from "react";

import bannerLogin from "@/assets/banner_login.png";
import Input from "@/components/input";
import IgIcon from "@/components/svg/ig-icon";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import SpinIcon from "@/components/svg/spin-icon";

interface IState {
  email: string;
  password: string;
}

interface ZodErrorIssue {
  code: string; // e.g., "invalid_string", "too_small", "custom"
  validation?: string; // Optional validation type (e.g., "email")
  minimum?: number; // Minimum value for the constraint (optional)
  type?: string; // Type of the input (optional, e.g., "string")
  inclusive?: boolean; // Whether the minimum is inclusive (optional)
  exact?: boolean; // Whether the value must be exact (optional)
  message: string; // Error message
  path: (string | number)[]; // Path to the field with the issue
}

interface ZodErrorResponse {
  message?: string; // General error message
  error?: {
    issues: ZodErrorIssue[]; // Array of issues
    name: string; // e.g., "ZodError"
  };
}

const Page = () => {
  const router = useRouter();

  const [error, setError] = useState<ZodErrorResponse>();
  const [isError, setIsError] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [state, setState] = useState<IState>({
    email: "",
    password: "",
  });

  const onChange = (events: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [events.target.name]: events.target.value });
  };

  const onSubmit = async (events: React.FormEvent) => {
    events.preventDefault();

    setIsLoading(true);
    const response = await signIn("credentials", {
      email: state.email,
      password: state.password,
      redirect: false,
    });

    if (!response?.ok) {
      setIsSuccess(false);
      setIsError(true);
      setIsLoading(false);
      setError(JSON.parse(response?.error || ""));
    } else {
      setError({});
      setIsLoading(false);
      setIsSuccess(true);
      setIsError(false);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Berhasil login");

      const interval = setInterval(() => {
        router.push("/");
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isSuccess]);

  console.log(error);

  return (
    <main className="flex max-w-4xl h-screen justify-center space-x-7 items-center mx-auto">
      <Image src={bannerLogin} alt="banner" className="hidden lg:block" />

      <article className="space-y-5 max-w-[350px] w-full">
        <section className="w-full border p-7 space-y-10 rounded">
          <div className="flex justify-center">
            <IgIcon />
          </div>

          <div className="space-y-10">
            <form onSubmit={onSubmit} className="space-y-4">
              <Input
                name="email"
                label="Email"
                onChange={onChange}
                isError={isError}
                error={error?.error?.issues}
              />
              <Input
                name="password"
                label="Kata Sandi"
                type="password"
                onChange={onChange}
                isError={isError}
                error={error?.error?.issues}
              />
              <Button
                disabled={isLoading}
                className="w-full h-9 bg-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600 dark:text-white"
              >
                {isLoading ? <SpinIcon /> : <span>Masuk</span>}
              </Button>
            </form>

            <div className="flex items-center justify-between space-x-4 w-full">
              <div className="border-b w-full" />
              <p className="font-medium text-sm">ATAU</p>
              <div className="border-b w-full" />
            </div>

            <button className="font-medium text-sm text-blue-500 text-center w-full">
              Masuk dengan Facebook
            </button>
          </div>
        </section>

        <section className="w-full border p-7 space-y-10 rounded">
          <p className="text-sm text-center">
            Tidak punya akun?{" "}
            <Link href={"/accounts/register"} className="font-medium">
              Buat akun
            </Link>
          </p>
        </section>
      </article>
    </main>
  );
};

export default Page;
