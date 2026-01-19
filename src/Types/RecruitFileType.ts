export interface RecruitFileInfo {
  name: string;
  url: string;
  downloadURL: string;
  uploadedAt: Date;
}

export interface RecruitFilesData {
  year: number;
  formFile?: RecruitFileInfo;
  otFile?: RecruitFileInfo;
  updatedAt: Date;
}

export interface RecruitSchedule {
  year: number;
  startDate: string; // YYYY-MM-DD format
  endDate: string; // YYYY-MM-DD format
  startTime?: string; // HH:mm format
  endTime?: string; // HH:mm format
  updatedAt: Date;
}
