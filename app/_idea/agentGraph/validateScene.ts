import {validateGraph, GraphEdge} from './validateGraph';
import {Scene} from '@/types/scene';

export const validateScene = (scene: Scene) => {
    const {agents} = scene;
    const taskMap: Record<string, any> = {

    };
    const edges: GraphEdge[] = [];
    // 1. agent 名字不能重复
    agents.forEach((agent) => {
        const {tasks} = agent;
        // 1. tasks 名字不能重复
        // 2. 必须有输出
        tasks.forEach((task) => {
            taskMap[task.id] = task;
            edges.push({
                id: task.id,
                inputs: task.inputs,
                output: task.output,
            });
        });
    });
    const errors = validateGraph(edges);
    return errors;
};
