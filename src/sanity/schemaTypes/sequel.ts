import { defineArrayMember, defineField } from "sanity";

const sequelSchema = {
  name: "sequel",
  title: "Sequels",
  type: "document",
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
};

export default sequelSchema;
