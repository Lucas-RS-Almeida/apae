import { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect, useRouter } from "next/navigation";
import { LuLoaderCircle } from "react-icons/lu";
import { toast } from "react-toastify";

import { authClient } from "@/lib/auth-client";

interface ILoginFormProps {
  $onToggleOptionAuthentication: (option: "login" | "signup") => void;
}

const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: "E-mail é obrigatório" })
    .email("E-mail inválido"),
  password: z
    .string()
    .trim()
    .min(8, { message: "Senha deve ter pelo menos 8 caracteres" }),
});

export function LoginFormComponent({
  $onToggleOptionAuthentication,
}: ILoginFormProps) {
  const { data } = authClient.useSession();

  if (data?.user) {
    redirect("/dashboard");
  }

  const [typeInput, setTypeInput] = useState<"text" | "password">("password");

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  function handleTogglePage(path: string) {
    redirect(path);
  }

  function handleToggleTypeInput() {
    setTypeInput(prevState => prevState === "password" ? "text" : "password");
  }

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    await authClient.signIn.email(
      {
        email: values.email,
        password: values.password,
      },
      {
        onSuccess: () => {
          router.push("/dashboard");
        },
        onError: (ctx) => {
          if (ctx.error.code === "INVALID_EMAIL_OR_PASSWORD") {
            toast.error("E-mail ou senha inválidos");

            return;
          }

          toast.error("Erro ao entrar");
        },
      }
    );
  }

  return (
    <>
      <form
        className="w-full boomAnimation"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div>
          <input
            placeholder="E-mail"
            className="w-full h-10 !px-4 border border-[#ccc] rounded-md bg-transparent"
            {...form.register("email")}
          />
          {form.formState.errors.email && <small className="text-red-600">{form.formState.errors.email.message}</small>}
        </div>
        <div className="!mt-4">
          <input
            type={typeInput}
            placeholder="Senha"
            className="w-full h-10 !px-4 border border-[#ccc] rounded-md bg-transparent"
            {...form.register("password")}
          />
          {form.formState.errors.password && <small className="text-red-600">{form.formState.errors.password.message}</small>}
        </div>

        <div className="flex items-center gap-1 !mt-2">
          <input type="checkbox" onClick={handleToggleTypeInput} className="cursor-pointer" />
          <label className="text-[14px]">Mostrar senha</label>
        </div>

        <button
          type="submit"
          className="w-full h-10 flex items-center justify-center !mt-6 rounded-md uppercase transition-all duration-200 ease-in bg-[#0476D9] text-white hover:bg-[#006db0] disabled:cursor-none"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? (
            <LuLoaderCircle className="animate-spin text-2xl" />
          ) : (
            <>Entrar</>
          )}
        </button>
      </form>

      <footer className="flex items-center flex-col gap-2">
        <button
          onClick={() => $onToggleOptionAuthentication("signup")}
          className="bg-transparent"
        >
          <span>Não tem conta? Cadastrar</span>
        </button>
        <button
          onClick={() => handleTogglePage("/users/forgot-password")}
          className="bg-transparent"
        >
          <span>Esqueci minha senha</span>
        </button>
      </footer>
    </>
  );
}
