export interface LegalSection {
  title: string;
  content: string;
}

export interface LegalDocument {
  id: LegalDocumentId;
  title: string;
  updated: string;
  sections: LegalSection[];
}

export type LegalDocumentId = "terms" | "privacy";
