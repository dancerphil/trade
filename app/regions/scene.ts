import {createMappedRegion} from 'region-react';
import {Scene} from '@/types/scene';

const sceneRegion = createMappedRegion<string, Scene>();

export const getScene = sceneRegion.getValue;

export const setScene = sceneRegion.set;
