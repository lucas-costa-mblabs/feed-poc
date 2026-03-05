export type ComponentNode = {
  id: string;
  type: string;
  flex?: number;
  [key: string]: any;
};

export interface NodeProps {
  node: ComponentNode;
  dataContext?: any;
}
