import {
  List,
  Grid,
  Action,
  ActionPanel,
  Icon,
  ReactNode,
  RootSearchBarAccessory,
  SearchBarAccessoryDropdown,
  SearchBarAccessoryDropdownItem,
  SearchBarAccessoryDropdownSection,
} from "@raycast/api";
import { layout } from "./preferences";

interface ListOrGridCommonProps {
  columns?: number;
  inset?: Grid.Inset;
  searchBarPlaceholder?: string;
  isLoading?: boolean;
  filtering?: { keepSectionOrder: boolean };
  searchBarAccessory?: ReactNode;
  children?: ReactNode;
}

export function ListOrGrid(props: ListOrGridCommonProps) {
  if (layout === "grid") {
    return (
      <Grid
        columns={props.columns}
        inset={props.inset}
        searchBarPlaceholder={props.searchBarPlaceholder}
        isLoading={props.isLoading}
        filtering={props.filtering}
        searchBarAccessory={props.searchBarAccessory as RootSearchBarAccessory}
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
      searchBarAccessory={props.searchBarAccessory as RootSearchBarAccessory}
    >
      {props.children}
    </List>
  );
}

export function ListOrGridSection(props: { title?: string; children?: ReactNode }) {
  if (layout === "grid") {
    return <Grid.Section title={props.title}>{props.children}</Grid.Section>;
  }

  return <List.Section title={props.title}>{props.children}</List.Section>;
}

export function ListOrGridItem(props: {
  id?: string;
  title: string;
  subtitle?: string;
  icon?: { fileIcon: string };
  content?: { fileIcon: string };
  keywords?: string[];
  accessories?: Array<{ tag?: { value: string; color: string }; tooltip?: string }>;
  actions?: ReactNode;
}) {
  if (layout === "grid") {
    return (
      <Grid.Item
        id={props.id}
        title={props.title}
        subtitle={props.subtitle}
        content={props.content?.fileIcon || ""}
        keywords={props.keywords}
        actions={props.actions as JSX.Element}
      />
    );
  }

  return (
    <List.Item
      id={props.id}
      title={props.title}
      subtitle={props.subtitle}
      icon={props.icon?.fileIcon ? { fileIcon: props.icon.fileIcon } : undefined}
      keywords={props.keywords}
      accessories={
        props.accessories?.map((acc) => ({
          tag: acc.tag ? { value: acc.tag.value, color: acc.tag.color } : undefined,
          tooltip: acc.tooltip,
        })) || []
      }
      actions={props.actions as JSX.Element}
    />
  );
}

export function ListOrGridDropdown(props: {
  tooltip?: string;
  defaultValue?: string;
  storeValue?: boolean;
  onChange?: (value: string) => void;
  children?: ReactNode;
}) {
  if (layout === "grid") {
    return (
      <SearchBarAccessoryDropdown
        tooltip={props.tooltip}
        defaultValue={props.defaultValue}
        onSelect={props.onChange}
      >
        {props.children}
      </SearchBarAccessoryDropdown>
    );
  }

  return (
    <SearchBarAccessoryDropdown
      tooltip={props.tooltip}
      defaultValue={props.defaultValue}
      onSelect={props.onChange}
    >
      {props.children}
    </SearchBarAccessoryDropdown>
  );
}

export function ListOrGridDropdownItem(props: { title: string; value: string }) {
  return <SearchBarAccessoryDropdownItem title={props.title} value={props.value} />;
}

export function ListOrGridDropdownSection(props: { children?: ReactNode }) {
  return <SearchBarAccessoryDropdownSection>{props.children}</SearchBarAccessoryDropdownSection>;
}
