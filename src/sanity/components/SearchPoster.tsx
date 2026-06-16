import { SearchIcon } from "@sanity/icons";
import { ImageValue, ObjectFieldProps, useFormValue } from "sanity";
import { Box, Flex, Button } from "@sanity/ui";

export function SearchPoster(props: ObjectFieldProps<ImageValue>) {
  const { renderDefault } = props;
  const filmName = useFormValue(["filmName"]) as string;
  const link = `https://www.google.com/search?q=${encodeURIComponent(filmName).trim().replace(/\s+/g, "+")}+poster+imdb&udm=2`;
  return (
    <Box>
      {renderDefault(props)}
      <Flex align="center" justify="flex-end" marginY={4}>
        <Button
          as="a"
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          mode="bleed"
          icon={SearchIcon}
          padding={2}
          radius={2}
          aria-label="Search for poster"
        />
      </Flex>
    </Box>
  );
}
