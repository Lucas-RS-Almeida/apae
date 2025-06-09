import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { LuLoaderCircle } from "react-icons/lu";

import { authClient } from "@/lib/auth-client";

interface ISignUpFormProps {
  $onToggleOptionAuthentication: (option: "login" | "signup") => void;
}

const registerSchema = z.object({
  name: z.string().trim().min(1, { message: "Nome é obrigatório" }),
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

export function SignUpFormComponent({
  $onToggleOptionAuthentication,
}: ISignUpFormProps) {
  const { data } = authClient.useSession();

  if (data?.user) {
    redirect("/dashboard");
  }

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  async function onSubmit(values: z.infer<typeof registerSchema>) {
    await authClient.signUp.email(
      {
        name: values.name,
        email: values.email,
        password: values.password,
      },
      {
        onSuccess: () => {
          router.push("/dashboard");
        },
        onError: (ctx) => {
          if (ctx.error.statusText === "USER_ALREADY_EXISTS") {
            toast.error("Esse e-mail já está cadastrado");

            return;
          }

          toast.error("Erro ao criar conta");
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
            placeholder="Nome de Usuário"
            className="w-full h-10 !px-4 border border-[#ccc] rounded-md bg-transparent"
            {...form.register("name")}
          />
        </div>
        <div className="!mt-4">
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
            <>Criar Conta</>
          )}
        </button>
      </form>

      <footer className="flex items-center flex-col gap-2">
        <button
          onClick={() => $onToggleOptionAuthentication("login")}
          className="bg-transparent"
        >
          <span>Já tem conta? Entrar</span>
        </button>
      </footer>
    </>
  );
}
