export enum TreeNodeLevel {
  CONNECTION = 'connection',
  DATABASE = 'database',
  SCHEMA = 'schema',
  TABLE = 'table',
  COLUMN = 'column',
}

interface PecanTreeNodeUIProps {
  children?: TreeViewAvailableNode[];
}

export interface TreeViewAvailableNode extends PecanTreeNodeUIProps {
  id: string;
  title: string;
  parentId?: number;
  type: TreeNodeLevel;
}
