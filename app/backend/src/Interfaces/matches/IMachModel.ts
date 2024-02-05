import { ICRUDModelReader } from '../ICRUDModel';
import { IMatch } from './IMatch';

export interface IMatchModel extends ICRUDModelReader<IMatch> {
  findByProgress(query: string): Promise<IMatch[]>
}
