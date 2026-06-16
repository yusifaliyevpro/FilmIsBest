import { SearchIcon } from "@sanity/icons";
import { InputProps, useFormValue } from "sanity";
import { Box, Button } from "@sanity/ui";

export function SearchOnYoutube(props: InputProps) {
  const { renderDefault } = props;
  const filmName = useFormValue(["filmName"]) as string;
  const link = `https://www.youtube.com/results?search_query=${encodeURIComponent(filmName).trim().replace(/\s+/g, "+")}+official+trailer`;

  return (
    <Box style={{ position: "relative" }}>
      {renderDefault(props)}
      <Button
        as="a"
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        mode="bleed"
        icon={SearchIcon}
        radius={2}
        aria-label="Search on YouTube"
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          zIndex: 2000,
          height: "98%",
          width: "40px",
        }}
      />
    </Box>
  );
}
