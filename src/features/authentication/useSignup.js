import { useMutation } from "@tanstack/react-query";
import { SignUp } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignup() {
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: SignUp,
    onSuccess: (user) => {
      toast.success("Account Has been Successfully Created!");
    },
  });

  return { signup, isLoading };
}
