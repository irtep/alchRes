import { Dispatch, SetStateAction } from "react";
import { AllNotes } from "../App";

interface Note {
    organ: string;
    metal: string;
    herb: string;
    alche: string;
    status: string;
    result: string;
}

interface Settings {
    method: 'GET' | 'POST';
    headers?: {
        'Content-Type': string;
        [key: string]: string; // To allow other header fields
    };
    body?: string;
    [key: string]: any; // To allow other properties
}

export const apiCall = async (
    method: 'GET' | 'POST',
    allNotes: AllNotes,
    setAllNotes: Dispatch<SetStateAction<AllNotes>>,
    note?: Note
): Promise<void> => {

    setAllNotes({
        ...allNotes,
        fetched: false
    });

    const url: string = `http://localhost:3111/api/research`;

    let settings: Settings = {
        method: method
    };

    if (method === "POST") {

        settings = {
            ...settings,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
        }

    }

    try {

        const connection = await fetch(url, settings);

        if (connection.status === 200) { // eli, jos fetchi palautti 200

            setAllNotes({
                ...allNotes,
                notes: await connection.json(),
                fetched: true
            });

        } else {

            let errormessage: string = "";

            switch (connection.status) {

                case 400: errormessage = "Virhe pyynnön tiedoissa"; break;
                default: errormessage = "Palvelimella tapahtui odottamaton virhe"; break;

            }

            setAllNotes({
                ...allNotes,
                error: errormessage,
                fetched: true
            });

        }

    } catch (e: any) {

        setAllNotes({
            ...allNotes,
            error: "Could not contact the server",
            fetched: true
        });
    }
}