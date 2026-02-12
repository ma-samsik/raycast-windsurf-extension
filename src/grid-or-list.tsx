import { List, Grid } from "@raycast/api";
import { layout } from "./preferences";

interface ListOrGridCommonProps {
  columns?: number;
  inset?: Grid.Inset;
  searchBarPlaceholder?: string;
  isLoading?: boolean;
  filtering?: { keepSectionOrder: boolean };
  searchBarAccessory?: any;
  children?: any;
}

interface AccessoryTag {
  value: string;
  color: string | { light: string; dark: string; adjustContrast?: boolean };
}

interface Accessory {
  tag?: AccessoryTag;
  tooltip?: string;
}

export function ListOrGrid(props: ListOrGridCommonProps) {
  if (layout === "grid") {
    // Grid doesn't support dropdown in searchBarAccessory
    return (
      <Grid
        columns={props.columns}
        inset={props.inset}
        searchBarPlaceholder={props.searchBarPlaceholder}
        isLoading={props.isLoading}
        filtering={props.filtering}
      >
        {props.children}
      </Grid>
    );
  }

  return (
    <List
      searchBarPlaceholder={props.searchBarPlaceholder}
      isLoading={props.isLoading}
      filtering={props.filtering}
      searchBarAccessory={props.searchBarAccessory}
    >
      {props.children}
    </List>
  );
}

export function ListOrGridSection(props: { title?: string; children?: any }) {
  if (layout === "grid") {
    return <Grid.Section title={props.title}>{props.children}</Grid.Section>;
  }

  return <List.Section title={props.title}>{props.children}</List.Section>;
}

interface ListOrGridItemProps {
  id?: string;
  title: string;
  subtitle?: string;
  icon?: string | { fileIcon: string };
  content?: string | { fileIcon: string };
  keywords?: string[];
  accessories?: Accessory[];
  actions?: any;
}

export function ListOrGridItem(props: ListOrGridItemProps) {
  if (layout === "grid") {
    const contentValue =
      typeof props.content === "string"
        ? props.content
        : props.content?.fileIcon || "";
    return (
      <Grid.Item
        id={props.id}
        title={props.title}
        subtitle={props.subtitle}
        content={contentValue}
        keywords={props.keywords}
        actions={props.actions}
      />
    );
  }

  const iconValue =
    typeof props.icon === "string" ? { fileIcon: props.icon } : props.icon;
  const colorToString = (color: AccessoryTag["color"]): string => {
    if (typeof color === "string") return color;
    return color.light;
  };

  return (
    <List.Item
      id={props.id}
      title={props.title}
      subtitle={props.subtitle}
      icon={iconValue}
      keywords={props.keywords}
      accessories={
        props.accessories?.map((acc) => ({
          tag: acc.tag
            ? { value: acc.tag.value, color: colorToString(acc.tag.color) }
            : undefined,
          tooltip: acc.tooltip,
        })) || []
      }
      actions={props.actions}
    />
  );
}

export function ListOrGridDropdown(props: {
  tooltip?: string;
  defaultValue?: string;
  storeValue?: boolean;
  onChange?: (value: string) => void;
  children?: any;
}) {
  // Grid doesn't support dropdown in searchBar, only List does
  // When in Grid mode, filtering by type won't work via dropdown
  const dropdownProps: any = {};
  if (props.tooltip) dropdownProps.tooltip = props.tooltip;
  if (props.defaultValue) dropdownProps.defaultValue = props.defaultValue;
  if (props.storeValue !== undefined)
    dropdownProps.storeValue = props.storeValue;
  if (props.onChange) dropdownProps.onChange = props.onChange;

  return <List.Dropdown {...dropdownProps}>{props.children}</List.Dropdown>;
}

export function ListOrGridDropdownItem(props: {
  title: string;
  value: string;
}) {
  return <List.Dropdown.Item title={props.title} value={props.value} />;
}

export function ListOrGridDropdownSection(props: { children?: any }) {
  return <List.Dropdown.Section>{props.children}</List.Dropdown.Section>;
}
