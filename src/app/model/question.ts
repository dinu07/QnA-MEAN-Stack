import { TraceableDescription } from './traceable-description';
import {Topic} from './topic';

export interface Question extends TraceableDescription {
    topic: Topic;
}
