"use client";
import items from "../lib/items";
import itemss from "../lib/itemss";
import {
  Dropdown,
  DropdownTrigger,
  Button,
  DropdownMenu,
  DropdownItem,
  DropdownSection,
} from "@nextui-org/react";

export default function Genres() {
  return (
    <div>
      <Dropdown shouldBlockScroll>
        <DropdownTrigger>
          <Button variant="bordered">Kateqoriya</Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Dynamic Actions"
          className="flex w-full flex-row"
        >
          <DropdownSection items={items}>
            {(item) => <DropdownItem key={item.key}>{item.label}</DropdownItem>}
          </DropdownSection>
          <DropdownSection items={itemss}>
            {(item) => <DropdownItem key={item.key}>{item.label}</DropdownItem>}
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
