export const SWEMWBS_LABELS = [
  "None of the time",
  "Rarely",
  "Some of the time",
  "Often",
  "All of the time",
];

export const SWEMWBS_CONV: Record<number, number> = {
  7: 7.0, 8: 9.51, 9: 11.25, 10: 12.4, 11: 13.33, 12: 14.08,
  13: 14.75, 14: 15.33, 15: 15.84, 16: 16.31, 17: 16.76, 18: 17.22,
  19: 17.7, 20: 18.19, 21: 18.73, 22: 19.27, 23: 19.85, 24: 20.46,
  25: 21.13, 26: 21.87, 27: 22.72, 28: 23.72, 29: 24.83, 30: 26.02,
  31: 27.03, 32: 28.23, 33: 29.41, 34: 31.01, 35: 35.0,
};

export const ABUSE_TYPES = [
  "Physical abuse",
  "Emotional abuse",
  "Financial exploitation",
  "Neglect",
  "Self-neglect",
  "Coercive control",
];

export const TABLE_NAMES = {
  modules: "CT_Modules",
  learnContent: "CT_Learn_Content",
  comparisonTables: "CT_Comparison_Tables",
  prompts: "CT_Prompts",
  takeaways: "CT_Takeaways",
  selfAssessment: "CT_Self_Assessment",
  practiceScenarios: "CT_Practice_Scenarios",
  discoverySteps: "CT_Discovery_Steps",
  circles: "CT_Circles",
  swemwbs: "CT_SWEMWBS",
  roleContent: "CT_Role_Content",
  journeyStages: "CT_Journey_Stages",
  trainingSessions: "CT_Training_Sessions",
  feedbackResponses: "CT_Feedback_Responses",
  galleryWalkNotes: "CT_Gallery_Walk_Notes",
  dotVotes: "CT_Dot_Votes",
  selfAssessmentRatings: "CT_Self_Assessment_Ratings",
  swemwbsResponses: "CT_SWEMWBS_Responses",
  feedbackConfig: "CT_Feedback_Config",
} as const;
