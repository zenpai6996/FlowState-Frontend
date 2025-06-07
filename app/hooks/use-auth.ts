import { useMutation } from "@tanstack/react-query";
import { postData } from "~/lib/fetch-utils";
import type { SignUpFormData } from "~/routes/auth/sign-up";

export const useSignUpMutation = () => {
    return useMutation({
      mutationFn:(data: SignUpFormData) => postData("/auth/register",data),
    });
};

export const useVerifyEmailMutation = () => {
  return useMutation({
    mutationFn: (
      data: {token:string}
    ) => postData("/auth/verify-email",data),
  });
};

export const useLoginMutation = () => {
  return useMutation({
    mutationFn:(data:{email:string,password:string}) => postData("/auth/login",data), 
  });
};