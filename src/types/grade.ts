import {
    DocumentData,
    DocumentReference,
    FirestoreDataConverter,
    QueryDocumentSnapshot,
    SnapshotOptions,
    Timestamp,
    WithFieldValue,
} from "firebase/firestore";

export type Grade = {
    id: string;
    ref: DocumentReference<DocumentData>;
} & GradeData;

type GradeData = {
    description: string;
    noteValue: number;
    noteMax: number;
    coefficient: number;
    date: Date;
};

export const gradeConverter: FirestoreDataConverter<Grade> = {
    toFirestore(grade: WithFieldValue<Grade>) {
        return {
            description: grade.description,
            noteValue: grade.noteValue,
            noteMax: grade.noteMax,
            coefficient: grade.coefficient,
            date: grade.date,
        };
    },

    fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): Grade {
        const data = snapshot.data(options);

        const obj: Grade = {
            id: snapshot.id,
            ref: snapshot.ref,

            description: data.description,
            noteValue: data.noteValue,
            noteMax: data.noteMax,
            coefficient: data.coefficient,
            date: (data.date as Timestamp).toDate()
        };

        return obj;
    },
};
