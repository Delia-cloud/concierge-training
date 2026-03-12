"use client";

import { useState, useEffect, useCallback } from "react";

interface SessionState {
  sessionCode: string | null;
  participantName: string | null;
  isFacilitator: boolean;
}

export function useSession() {
  const [session, setSession] = useState<SessionState>({
    sessionCode: null,
    participantName: null,
    isFacilitator: false,
  });

  useEffect(() => {
    const code = sessionStorage.getItem("ct_sessionCode");
    const name = sessionStorage.getItem("ct_participantName");
    const facilitator = sessionStorage.getItem("ct_isFacilitator") === "true";
    if (code) {
      setSession({ sessionCode: code, participantName: name, isFacilitator: facilitator });
    }
  }, []);

  const joinSession = useCallback((code: string, name?: string) => {
    sessionStorage.setItem("ct_sessionCode", code);
    if (name) sessionStorage.setItem("ct_participantName", name);
    sessionStorage.setItem("ct_isFacilitator", "false");
    setSession({ sessionCode: code, participantName: name || null, isFacilitator: false });
  }, []);

  const createSession = useCallback((code: string, facilitatorName: string) => {
    sessionStorage.setItem("ct_sessionCode", code);
    sessionStorage.setItem("ct_participantName", facilitatorName);
    sessionStorage.setItem("ct_isFacilitator", "true");
    setSession({ sessionCode: code, participantName: facilitatorName, isFacilitator: true });
  }, []);

  const leaveSession = useCallback(() => {
    sessionStorage.removeItem("ct_sessionCode");
    sessionStorage.removeItem("ct_participantName");
    sessionStorage.removeItem("ct_isFacilitator");
    setSession({ sessionCode: null, participantName: null, isFacilitator: false });
  }, []);

  return { ...session, joinSession, createSession, leaveSession };
}
