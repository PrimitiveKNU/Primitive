interface IRecruitData {
  recruitStartDate: {
    year: number;
    month: number;
    day: number;
  };
  recruitEndDate: {
    year: number;
    month: number;
    day: number;
  };
  form: string;
  ot: string;
  recruitNotice: string;
  presidentData: {
    position: string;
    name: string;
    kakaoID: string;
    email: string;
  };
  vicePresidentData: {
    position: string;
    name: string;
    kakaoID: string;
    email: string;
  };
}

export const recruitData: IRecruitData = {
  recruitStartDate: {
    // 모집 시작일 연 월 일 단위로 수정해주세요.
    year: 2026,
    month: 1,
    day: 10,
  },
  recruitEndDate: {
    // 모집 마감일 연 월 일 단위로 수정해주세요.
    year: 2026,
    month: 3,
    day: 14,
  },
  // 신청서 경로를 입력
  form: '/25/2025학년도 PRIMITIVE 신청서.hwp',
  // OT 자료 경로를 입력
  ot: '/25/2025 PRIMITIVE 신입생 OT 자료.pdf',
  // 모집 공고 이미지 경로를 입력
  recruitNotice: '/26/26PrimitiveRecruit.webp',
  // 아래는 회장/부회장 정보를 입력해주세요.
  presidentData: {
    position: '회장',
    name: '최아현',
    kakaoID: '4a.huxn_',
    email: 'choiahye0n211@gmail.com',
  },
  vicePresidentData: {
    position: '부회장',
    name: '강현찬',
    kakaoID: 'kanghyun122',
    email: 'kanghyun122@naver.com',
  },
};
