import { useMutation } from "@tanstack/react-query";
import type { SignUpFormData } from "~/routes/auth/sign-up";

export const useSignUpMutation = () => {
  
    return useMutation({
      mutationFn:(data: SignUpFormData) => signUp(data),
    });

}