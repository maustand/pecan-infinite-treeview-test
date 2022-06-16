export enum TreeNodeLevel {
  CONNECTION = 'connection',
  DATABASE = 'database',
  SCHEMA = 'schema',
  TABLE = 'table',
  COLUMN = 'column',
}

/**
 * Record for resolving the Icon
 */
export const TreeNodeTypeIconMap: Record<TreeNodeLevel, string> = {
  [TreeNodeLevel.CONNECTION]: 'bi-ethernet',
  [TreeNodeLevel.DATABASE]: 'bi-boxes',
  [TreeNodeLevel.SCHEMA]: 'bi-collection',
  [TreeNodeLevel.TABLE]: 'bi-table',
  [TreeNodeLevel.COLUMN]: 'bi-columns',
};

interface PecanTreeNodeUIProps {
  // usefull for keeping clean the model instead of multiple ?
  isForbidden?: boolean;
  children?: TreeViewAvailableNode[];
}

export interface TreeViewAvailableNode extends PecanTreeNodeUIProps {
  id: string;
  title: string;
  parentId?: number;
  type: TreeNodeLevel;
}
