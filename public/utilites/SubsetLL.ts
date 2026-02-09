import { SetLL } from './SetLL.type';

export type SubsetLL = {
    subsetName: string;
    sets: Array<SetLL>;
    isSubsetSelected: boolean;
}