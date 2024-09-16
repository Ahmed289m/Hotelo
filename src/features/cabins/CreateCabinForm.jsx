import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import useAddCabin from "./useAddCabin";
import useEditCabin from "./useEditCabin";

function CreateCabinForm({ cabinToBeEdited = {}, onCloseModal }) {
  const { id: editedCabinId, ...editedValues } = cabinToBeEdited;
  const isEditingForm = Boolean(editedCabinId);
  const { register, handleSubmit, reset, formState, getValues } = useForm({
    defaultValues: isEditingForm ? editedValues : {},
  });
  const { errors } = formState;

  const { isAdding, addingCabin } = useAddCabin();
  //For Editing
  const { isEditing, editingCabin } = useEditCabin();

  const addingOrEditing = isAdding || isEditing;

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];

    if (isEditingForm) {
      editingCabin(
        {
          newCabinData: { ...data, image: image },
          id: editedCabinId,
        },
        {
          onSuccess: () => {
            reset();
            onCloseModal();
          },
        }
      );
    } else {
      addingCabin(
        { ...data, image: image },
        {
          onSuccess: () => {
            reset();
            onCloseModal();
          },
        }
      );
    }
  }
  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          {...register("name", {
            required: "This Field Is Required",
          })}
        />
      </FormRow>

      <FormRow error={errors?.maxCapacity?.message} label="Maximum capacity">
        <Input
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "This Field Is Required",
            min: {
              value: 1,
              message: "Capacity Must be Greater Than 1",
            },
          })}
        />
      </FormRow>

      <FormRow error={errors?.regularPrice?.message} label="Regular price">
        <Input
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "This Field Is Required",
          })}
        />
      </FormRow>

      <FormRow error={errors?.discount?.message} label="Discount">
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            validate: (value) => {
              const regularPrice = parseFloat(getValues("regularPrice")) || 0;
              return (
                parseFloat(value) <= regularPrice ||
                "Discount must be less than or equal to Regular Price"
              );
            },
          })}
        />
      </FormRow>

      <FormRow
        error={errors?.description?.message}
        label="Description for website"
      >
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register("description", {
            required: "This Field Is Required",
          })}
        />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: isEditingForm ? false : "Photo Is Required",
          })}
        />
      </FormRow>

      <FormRow>
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={addingOrEditing}>
          {isEditingForm ? "Edit Cabin" : "Add cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
