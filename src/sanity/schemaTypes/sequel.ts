import { defineArrayMember, defineField } from "sanity";
import { TbStack2Filled } from "react-icons/tb";

const sequelSchema = defineField({
  name: "sequel",
  title: "Sequels",
  type: "document",
  icon: TbStack2Filled,
  fields: [
    defineField({
      name: "name",
      title: "Sequel Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "movies",
      title: "Movies",
      type: "array",
      validation: (rule) => rule.required(),
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "Movie-studio" }],
          options: { disableNew: true },
        }),
      ],
    }),
  ],
});

export default sequelSchema;
