const sequelSchema = {
  name: "sequel",
  title: "Sequels",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Sequel Name",
      type: "string",
    },
    {
      name: "movies",
      title: "Movies",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "Movie-studio" }],
        },
      ],
    },
  ],
};

export default sequelSchema;
