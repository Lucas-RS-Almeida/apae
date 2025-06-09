import { z } from "zod";
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
        </div>
        <div className="!mt-4">
          <input
            type="password"
            placeholder="Senha"
            className="w-full h-10 !px-4 border border-[#ccc] rounded-md bg-transparent"
            {...form.register("password")}
          />
        </div>

        <button
          type="submit"
          className="w-full h-10 flex items-center justify-center !mt-6 rounded-md uppercase transition-all duration-200 ease-in bg-[#048ce1] text-white hover:bg-[#006db0]"
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
