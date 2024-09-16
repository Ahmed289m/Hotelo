import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { addOrUpdateCabin } from "../../services/apiCabins";

function useEditCabin() {
  const queryClient = useQueryClient();
  const { mutate: editingCabin, isLoading: isEditing } = useMutation({
    mutationFn: ({ newCabinData, id }) => addOrUpdateCabin(newCabinData, id),
    onSuccess: () => {
      toast.success("Cabin successfully Edited");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isEditing, editingCabin };
}

export default useEditCabin;
