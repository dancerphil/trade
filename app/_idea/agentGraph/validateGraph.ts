type GraphNode = string;

export interface GraphEdge {
    id: string;
    inputs: GraphNode[];
    output: GraphNode;
}

interface ErrorMessage {
    id: string;
    message: string;
}

// 构建一个 Graph
// input 和 output 的 name 是点，task 构成边，有向图
// 判断是否所有的 input 都被满足
// 一些细节
// 1. 如果一个 name 没有入，只有出，满足
export const validateGraph = (edges: GraphEdge[]): ErrorMessage[] => {
    if (edges.length === 0) {
        return [];
    }
    return [];
};
