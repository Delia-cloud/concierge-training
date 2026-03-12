import { createRecord } from "./airtable";
import { TABLE_NAMES } from "./constants";

export async function createSession(data: {
  sessionCode: string;
  date: string;
  location: string;
  facilitator: string;
}) {
  return createRecord(TABLE_NAMES.trainingSessions, {
    "Session Code": data.sessionCode,
    "Date": data.date,
    "Location": data.location,
    "Facilitator": data.facilitator,
    "Status": "Active",
  });
}

export async function submitFeedbackResponse(data: {
  sessionCode: string;
  participantName?: string;
  questionType: string;
  questionIndex: number;
  questionText: string;
  response: string;
}) {
  return createRecord(TABLE_NAMES.feedbackResponses, {
    "Session Code": data.sessionCode,
    "Participant Name": data.participantName || "",
    "Question Type": data.questionType,
    "Question Index": data.questionIndex,
    "Question Text": data.questionText,
    "Response": data.response,
  });
}

export async function submitGalleryNote(data: {
  sessionCode: string;
  moduleId: string;
  noteType: string;
  noteText: string;
  participantName?: string;
}) {
  return createRecord(TABLE_NAMES.galleryWalkNotes, {
    "Session Code": data.sessionCode,
    "Module ID": data.moduleId,
    "Note Type": data.noteType,
    "Note Text": data.noteText,
    "Participant Name": data.participantName || "",
  });
}

export async function submitDotVote(data: {
  sessionCode: string;
  moduleId: string;
  participantName?: string;
}) {
  return createRecord(TABLE_NAMES.dotVotes, {
    "Session Code": data.sessionCode,
    "Module ID": data.moduleId,
    "Participant Name": data.participantName || "",
  });
}

export async function submitSelfAssessmentRating(data: {
  sessionCode?: string;
  moduleId: string;
  statement: string;
  rating: number;
  participantName?: string;
}) {
  return createRecord(TABLE_NAMES.selfAssessmentRatings, {
    "Session Code": data.sessionCode || "",
    "Module ID": data.moduleId,
    "Statement": data.statement,
    "Rating": data.rating,
    "Participant Name": data.participantName || "",
  });
}

export async function submitSwemwbsResponse(data: {
  sessionCode?: string;
  participantName?: string;
  rawScore: number;
  metricScore: number;
  answers: Record<string, number>;
}) {
  return createRecord(TABLE_NAMES.swemwbsResponses, {
    "Session Code": data.sessionCode || "",
    "Participant Name": data.participantName || "",
    "Raw Score": data.rawScore,
    "Metric Score": data.metricScore,
    "Answers": JSON.stringify(data.answers),
  });
}
