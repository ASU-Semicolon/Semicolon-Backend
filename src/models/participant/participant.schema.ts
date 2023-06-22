import mongoose from "mongoose";
import { participant as ParticipantType } from "../../types/participant";

export enum PreferencesEnum {
    C_PROG = "c-prog",
    AVR = "avr",
    ARM = "arm",
    FULLSTACK = "fullstack",
    FRONTEND = "frontend",
    REACT = "react",
    NODEJS = "nodejs",
    PYTHON = "python",
    DIGITAL_DESIGN = "digital",
    FLUTTER = "flutter",
    DESKTOP = "desktop"
}

export enum StatusEnum {
    ACCEPTED = "accepted",
    REJECTED = "rejected",
    PENDING = "pending",
    EMAILED = "emailed",
    FILTERED = "filtered",
    SCHEDULED = "scheduled",
    SECONDPREF = "secondpref",
}

export const participantSchema = new mongoose.Schema<ParticipantType>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            trim: true,
        },
        phone: {
            type: String,
            required: true,
            match: /^01\d{9}$/,
            trim: true,
        },
        firstPreference: {
            type: String,
            required: true,
            enum: Object.values(PreferencesEnum),
        },
        secondPreference: {
            type: String,
            required: true,
            enum: Object.values(PreferencesEnum),
        },
        firstPrefReason: {
            type: String,
            trim: true,
        },
        firstPrefKnowledge: {
            type: String,
            required: true,
            trim: true,
        },
        secondPrefReason: {
            type: String,
            trim: true,
        },
        pastExperience: {
            type: String,
            trim: true,
        },
        collegeId: {
            type: String,
            trim: true,
        },
        year: {
            type: String,
            required: true,
            enum: ["Freshman", "Sophomore", "Junior", "Senior 1", "Senior 2"],
        },
        acceptanceStatus: {
            type: String,
            required: true,
            default: StatusEnum.PENDING,
            enum: Object.values(StatusEnum),
        },
        emailedStatus: {
            type: Boolean,
            required: true,
            default: false,
        },
    },
    { timestamps: true }
);

const Participant = mongoose.model<ParticipantType>(
    "Participant",
    participantSchema
);

export default Participant;
