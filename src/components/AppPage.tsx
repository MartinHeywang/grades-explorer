import React, { FC, useEffect, useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

import { firebaseApp } from "../firebase";
import { getAuth } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";

import Page from "./Page";
import { useNavigate } from "react-router-dom";

import "../scss/AppPage.scss";
import Button from "./Button";
import { gradeConverter } from "../types/grade";

const AppPage: FC<{}> = () => {
    const [user, loading, error] = useAuthState(getAuth(firebaseApp));
    const navigate = useNavigate();

    // redirect to login page when not connected
    useEffect(() => {
        if (loading) return;

        if (!user) navigate("/login");
    }, [user, loading, error]);

    return loading ? (
        <>Connexion en cours...</>
    ) : (
        <Page className="AppPage">
            <h1>Accueil</h1>
            <AddGrade></AddGrade>
        </Page>
    );
};

const AddGrade: FC<{}> = () => {
    const [user] = useAuthState(getAuth(firebaseApp));

    const [collapsed, setCollapsed] = useState(true);

    type FormStates = "default" | "submitted" | "passed" | "error";
    const [formState, setFormState] = useState<FormStates>("default");

    const FORM_STATE_COOLDOWN = 2000; // ms

    useEffect(() => {
        if (formState === "default") return;
        if (formState === "submitted") return;

        setTimeout(() => setFormState("default"), FORM_STATE_COOLDOWN);
    }, [formState]);

    const fields = {
        description: useRef<HTMLInputElement>(null),
        noteValue: useRef<HTMLInputElement>(null),
        noteMax: useRef<HTMLInputElement>(null),
        coefficient: useRef<HTMLInputElement>(null),
        date: useRef<HTMLInputElement>(null),
    };

    const toggleCollapsed = () => setCollapsed(old => !old);

    function submit() {
        setFormState("submitted");
        const values = {
            description: fields.description.current!.value!,
            noteValue: fields.noteValue.current!.valueAsNumber!,
            noteMax: fields.noteMax.current!.valueAsNumber!,
            coefficient: fields.coefficient.current!.valueAsNumber!,
            date: fields.date.current!.valueAsDate!,
        };

        if (
            values.noteValue < 0 ||
            values.noteMax < 0 ||
            values.coefficient < 0 ||
            values.noteValue > values.noteMax
        ) {
            setFormState("error");
            return;
        }
        if (values.date > new Date()) {
            setFormState("error");
            return;
        }

        addDoc(collection(getFirestore(firebaseApp), "grades"), {
            uid: user!.uid,
            ...values,
        })
            .then(() => {
                setFormState("passed");
            })
            .catch(() => {
                setFormState("error");
            });
    }

    function clearFields() {
        Object.keys(fields).forEach(key => {
            const field = fields[key as keyof typeof fields];

            field.current!.value = "";
        });
    }

    return (
        <div className="AddGrade">
            <div className="AddGrade__top-bar">
                <p>Ajouter une note</p>
                <button className="material-icons" onClick={toggleCollapsed}>
                    keyboard_arrow_{collapsed ? "down" : "up"}
                </button>
            </div>
            {!collapsed && (
                <div className="AddGrade__form">
                    <form onSubmit={e => e.preventDefault()}>
                        <div className="AddGrade__form-block AddGrade__description">
                            <label htmlFor="add-grade-description">Description</label>
                            <input ref={fields.description} id="add-grade-description" type="text" />
                        </div>
                        <div className="AddGrade__form-block AddGrade__note">
                            <label htmlFor="add-grade-value">Note</label>
                            <input ref={fields.noteValue} id="add-grade-value" type="number" />
                            {" / "}
                            <input
                                ref={fields.noteMax}
                                aria-labelledby="add-grade-value"
                                type="number"
                                defaultValue="20"
                            />
                        </div>
                        <div className="AddGrade__form-block AddGrade__coefficient">
                            <label htmlFor="add-grade-coefficient">Coefficient</label>
                            <input
                                ref={fields.coefficient}
                                id="add-grade-coefficient"
                                type="number"
                                defaultValue="1"
                                min={0}
                                max={100}
                            />
                        </div>
                        <div className="AddGrade__form-block AddGrade__date">
                            <label htmlFor="add-grade-date">Date</label>
                            <input
                                ref={fields.date}
                                id="add-grade-date"
                                type="date"
                                defaultValue={Date.now()}
                            />
                        </div>

                        <Button action={submit} disabled={formState !== "default"}>
                            {
                                {
                                    default: "Ajouter",
                                    submitted: "...",
                                    passed: "Ajouté!",
                                    error: "Erreur...",
                                }[formState]
                            }
                        </Button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default AppPage;
