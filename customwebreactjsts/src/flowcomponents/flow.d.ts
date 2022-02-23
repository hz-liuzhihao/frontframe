export interface FlowInfo {
  /**
   * 流程id
   */
  id: string;

  /**
   * 流程名称
   */
  name: string;

  /**
   * 节点列表
   */
  nodes: NodeInfo[];
}

export interface FormInfo {
  /**
   * 表单模板id
   */
  id: string;

  /**
   * 表单名称
   */
  name: string;
}

export interface NodeInfo {
  /**
   * 节点的字节点,节点类型或者表单类型
   */
  children: Array<NodeInfo |  FormInfo>;
}