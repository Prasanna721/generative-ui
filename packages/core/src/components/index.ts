// Layout Components
export { LinearLayout, type LinearLayoutProps } from "./layouts/LinearLayout";
export {
  RelativeLayout,
  RelativeItem,
  type RelativeLayoutProps,
  type RelativeItemProps,
} from "./layouts/RelativeLayout";
export {
  GridLayout,
  GridItem,
  type GridLayoutProps,
  type GridItemProps,
} from "./layouts/GridLayout";

// Layout Registry
export {
  LayoutRegistry,
  layoutRegistry,
  type LayoutComponent,
  type LayoutDefinition,
} from "./LayoutRegistry";

export * from "./base/m3";

// Component Registry
export {
  ComponentRegistry,
  componentRegistry,
  type DesignSystem,
  type ComponentType,
  type ComponentDefinition,
} from "./ComponentRegistry";

// Layout Types for external consumption
export type LayoutType = "LinearLayout" | "RelativeLayout" | "GridLayout";
export type LayoutItemType = "RelativeItem" | "GridItem";

// Import types for utility unions
import type { LinearLayoutProps } from "./layouts/LinearLayout";
import type {
  RelativeLayoutProps,
  RelativeItemProps,
} from "./layouts/RelativeLayout";
import type { GridLayoutProps, GridItemProps } from "./layouts/GridLayout";

// Utility type for all layout props (simplified)
export type AnyLayoutProps =
  | LinearLayoutProps
  | RelativeLayoutProps
  | GridLayoutProps;

export type AnyLayoutItemProps = RelativeItemProps | GridItemProps;

// Simplified prop constraints for AI generation
export interface BaseLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export interface OrientationLayoutProps extends BaseLayoutProps {
  orientation: "horizontal" | "vertical";
}

export interface PositionLayoutProps extends BaseLayoutProps {
  position:
    | "top-left"
    | "top-center"
    | "top-right"
    | "center-left"
    | "center"
    | "center-right"
    | "bottom-left"
    | "bottom-center"
    | "bottom-right";
}

export interface GridLayoutConstraints extends BaseLayoutProps {
  columns: number; // 1-12
}

export interface GridItemConstraints extends BaseLayoutProps {
  span?: number; // 1-12
}
