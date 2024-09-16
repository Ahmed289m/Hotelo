import supabase from "./supabase";
import { supabaseUrl } from "./supabase";
export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }
  return data;
}
export async function deleteCabin(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabins can not be deleted");
  }
}

export async function addOrUpdateCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replace("/", "");

  const imageUrl = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabinsImages/${imageName}`;

  let query = supabase.from("cabins");

  //Create

  if (!id) query = query.insert([{ ...newCabin, image: imageUrl }]);

  //Update

  if (id) query = query.update({ ...newCabin, image: imageUrl }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabins can not be added");
  }

  if (hasImagePath) return data;
  const { error: uploadingError } = await supabase.storage
    .from("cabinsImages")
    .upload(imageName, newCabin.image);

  if (uploadingError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    throw new Error("There was an error with uploading cabin Image");
  }

  return data;
}
