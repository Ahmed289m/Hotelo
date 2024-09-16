import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdateCurrentUser } from "../../services/apiAuth";
import toast from "react-hot-toast";

function useUpdateUser() {
  const queryClient = useQueryClient();
  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    mutationFn: UpdateCurrentUser,
    onSuccess: () => {
      toast.success("Account Successfully Updated");
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { updateUser, isUpdating };
}

export default useUpdateUser;
