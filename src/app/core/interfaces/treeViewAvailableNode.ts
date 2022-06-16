export enum TreeNodeLevel {
  CONNECTION = 'connection',
  DATABASE = 'database',
  SCHEMA = 'schema',
  TABLE = 'table',
  COLUMN = 'column',
}

interface PecanTreeNodeUIProps { // usefull for keeping clean the model instead of multiple ?
  isForbidden?: boolean;
  children?: TreeViewAvailableNode[];
}

export interface TreeViewAvailableNode extends PecanTreeNodeUIProps {
  id: string;
  title: string;
  parentId?: number;
  type: TreeNodeLevel;
}
