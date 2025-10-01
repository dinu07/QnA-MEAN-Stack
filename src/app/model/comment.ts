import { TraceableDescription } from './traceable-description';
import {Question} from './question';

export interface Comment extends TraceableDescription {
    question: Question;
}
