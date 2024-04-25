import { z} from "zod";

export const MenuSchema=z.object({
    description:z.string(),
    mealType:z.string(),
    itemName:z.string(),
    price:z.number(),
})

export type MenuSchemaType=z.infer<typeof MenuSchema>;