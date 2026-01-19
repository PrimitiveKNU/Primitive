import { deleteField, doc, getDoc, setDoc } from 'firebase/firestore';
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { useEffect, useState } from 'react';
import { Popup, usePopup } from '../Components/common/popup';
import { db, storage } from '../firebase';
import { RecruitFilesData } from '../Types/RecruitFileType';

const RecruitFileUpload = () => {
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear(),
  );
  const [years, setYears] = useState<number[]>([]);
  const [recruitData, setRecruitData] = useState<RecruitFilesData | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploadingForm, setUploadingForm] = useState(false);
  const [uploadingOt, setUploadingOt] = useState(false);
  const [uploadProgressForm, setUploadProgressForm] = useState(0);
  const [uploadProgressOt, setUploadProgressOt] = useState(0);
  const [popupMessage, setPopupMessage] = useState<string>('');
  const [popupTitle, setPopupTitle] = useState<string>('');
  const popup = usePopup();
  const [pendingDeleteType, setPendingDeleteType] = useState<
    'form' | 'ot' | null
  >(null);
  const deleteConfirmDialog = usePopup();

  // 연도 선택 범위 설정 (현재 연도 ±3년)
  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const yearList = [];
    for (let i = currentYear - 3; i <= currentYear + 3; i++) {
      yearList.push(i);
    }
    setYears(yearList);
  }, []);

  // 선택된 연도의 파일 정보 로드
  useEffect(() => {
    const fetchRecruitFiles = async () => {
      try {
        setLoading(true);
        const docRef = doc(db, 'recruitFiles', selectedYear.toString());
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setRecruitData(docSnap.data() as RecruitFilesData);
        } else {
          setRecruitData({
            year: selectedYear,
            formFile: undefined,
            otFile: undefined,
            updatedAt: new Date(),
          });
        }
      } catch (error) {
        console.error('파일 정보 로드 실패:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecruitFiles();
  }, [selectedYear]);

  const uploadFile = async (
    file: File,
    type: 'form' | 'ot',
    setUploading: (state: boolean) => void,
    setProgress: (progress: number) => void,
  ) => {
    if (!file) return;

    try {
      setUploading(true);
      const fileName = file.name;
      const storageRef = ref(storage, `recruit-files/${selectedYear}/${type}`);

      // 기존 파일이 있으면 삭제
      try {
        await deleteObject(storageRef);
      } catch (e) {
        // 파일이 없는 경우 무시
        console.error('기존 파일 삭제 실패 (무시됨):', e);
      }

      // 파일 업로드
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress);
        },
        (error) => {
          console.error('업로드 중 오류:', error);
          showPopup('오류', '파일 업로드에 실패했습니다.');
        },
        async () => {
          // 업로드 완료
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

          // Firestore에 메타데이터 저장
          const docRef = doc(db, 'recruitFiles', selectedYear.toString());
          await setDoc(
            docRef,
            {
              year: selectedYear,
              [`${type}File`]: {
                name: fileName,
                url: storageRef.fullPath,
                downloadURL: downloadURL,
                uploadedAt: new Date().toISOString(),
              },
              updatedAt: new Date().toISOString(),
            },
            { merge: true },
          );

          // UI 업데이트
          setRecruitData((prev) => {
            if (!prev) return null;
            return {
              ...prev,
              [`${type}File`]: {
                name: fileName,
                url: storageRef.fullPath,
                downloadURL: downloadURL,
                uploadedAt: new Date(),
              },
            };
          });

          showPopup('성공', '파일이 성공적으로 업로드되었습니다.');
          setProgress(0);
          setUploading(false);
        },
      );
    } catch (error) {
      console.error('파일 업로드 실패:', error);
      showPopup('오류', '파일 업로드 중 오류가 발생했습니다.');
      setUploading(false);
    }
  };

  const openDeleteConfirm = (type: 'form' | 'ot') => {
    setPendingDeleteType(type);
    deleteConfirmDialog.open();
  };

  const confirmDelete = async () => {
    if (!pendingDeleteType) return;

    const type = pendingDeleteType;
    deleteConfirmDialog.close();

    try {
      const storageRef = ref(storage, `recruit-files/${selectedYear}/${type}`);

      // Storage에서 파일 삭제 (파일이 없어도 무시)
      try {
        await deleteObject(storageRef);
      } catch (error) {
        // 파일이 없는 경우(object-not-found) 무시
        if (
          error instanceof Error &&
          'code' in error &&
          error.code !== 'storage/object-not-found'
        ) {
          throw error;
        }
        console.log(
          `파일이 존재하지 않습니다: recruit-files/${selectedYear}/${type}`,
        );
      }

      // Firestore에서 메타데이터 삭제
      const docRef = doc(db, 'recruitFiles', selectedYear.toString());
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const currentData = docSnap.data() as RecruitFilesData;
        await setDoc(
          docRef,
          {
            ...currentData,
            [`${type}File`]: deleteField(),
            updatedAt: new Date().toISOString(),
          },
          { merge: true },
        );
      }

      setRecruitData((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          [`${type}File`]: undefined,
        };
      });

      showPopup('성공', '파일이 삭제되었습니다.');
      setPendingDeleteType(null);
    } catch (error) {
      console.error('파일 삭제 실패:', error);
      showPopup('오류', '파일 삭제 중 오류가 발생했습니다.');
      setPendingDeleteType(null);
    }
  };

  const showPopup = (title: string, message: string) => {
    setPopupTitle(title);
    setPopupMessage(message);
    popup.open();
  };

  const formatDate = (dateString: string | Date | undefined) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className='w-full mx-auto bg-white rounded px-8 pt-6 pb-8 mb-4'>
      {/* 연도 선택 */}
      <div className='mb-6'>
        <label className='block text-gray-700 text-sm font-bold mb-3'>
          연도 선택
        </label>
        <div className='flex gap-2 flex-wrap'>
          {years.map((year) => (
            <button
              key={year}
              onClick={() => setSelectedYear(year)}
              className={`px-4 py-2 rounded transition-colors ${
                selectedYear === year
                  ? 'bg-emerald-950 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {year}
            </button>
          ))}
        </div>
      </div>

      {/* 현재 업로드된 파일 정보 */}
      <div className='mb-8 p-4 bg-gray-50 rounded border border-gray-200'>
        <h3 className='font-bold text-lg mb-4'>
          {selectedYear}년 업로드된 파일
        </h3>
        {loading ? (
          <svg
            className='animate-pulse h-5 w-5 rounded-full bg-green-950'
            viewBox='0 0 24 24'
          ></svg>
        ) : (
          <div className='space-y-3'>
            {/* 모집 신청서 */}
            <div className='flex items-center justify-between p-3 bg-white rounded border border-gray-200'>
              <div className='flex-1'>
                <p className='text-sm font-semibold text-gray-700'>
                  모집 신청서 양식
                </p>
                {recruitData?.formFile ? (
                  <div className='mt-1'>
                    <p className='text-xs text-gray-600'>
                      📄 {recruitData.formFile.name}
                    </p>
                    <p className='text-xs text-gray-500'>
                      업로드: {formatDate(recruitData.formFile.uploadedAt)}
                    </p>
                  </div>
                ) : (
                  <p className='text-xs text-gray-500 mt-1'>
                    업로드된 파일 없음
                  </p>
                )}
              </div>
              {recruitData?.formFile && (
                <button
                  onClick={() => openDeleteConfirm('form')}
                  className='ml-4 px-3 py-1 text-xs bg-red-500 hover:bg-red-600 text-white rounded'
                >
                  삭제
                </button>
              )}
            </div>

            {/* OT 자료 */}
            <div className='flex items-center justify-between p-3 bg-white rounded border border-gray-200'>
              <div className='flex-1'>
                <p className='text-sm font-semibold text-gray-700'>
                  신입생 OT 자료
                </p>
                {recruitData?.otFile ? (
                  <div className='mt-1'>
                    <p className='text-xs text-gray-600'>
                      📄 {recruitData.otFile.name}
                    </p>
                    <p className='text-xs text-gray-500'>
                      업로드: {formatDate(recruitData.otFile.uploadedAt)}
                    </p>
                  </div>
                ) : (
                  <p className='text-xs text-gray-500 mt-1'>
                    업로드된 파일 없음
                  </p>
                )}
              </div>
              {recruitData?.otFile && (
                <button
                  onClick={() => openDeleteConfirm('ot')}
                  className='ml-4 px-3 py-1 text-xs bg-red-500 hover:bg-red-600 text-white rounded'
                >
                  삭제
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* 파일 업로드 폼 */}
      <div className='space-y-6'>
        {/* 모집 신청서 업로드 */}
        <div className='p-4 bg-white border border-gray-200 rounded'>
          <label className='block text-gray-700 text-sm font-bold mb-3'>
            모집 신청서 양식 업로드
          </label>
          <p className='text-xs text-gray-500 mb-3'>
            지원 가능한 형식: .hwp, .docx, .pdf (최대 10MB)
          </p>
          <div className='flex items-center gap-3'>
            <input
              type='file'
              id='formFile'
              accept='.hwp,.docx,.pdf'
              disabled={uploadingForm}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  if (file.size > 10 * 1024 * 1024) {
                    showPopup('알림', '파일 크기가 10MB를 초과합니다.');
                    return;
                  }
                  uploadFile(
                    file,
                    'form',
                    setUploadingForm,
                    setUploadProgressForm,
                  );
                }
              }}
              className='flex-1 px-3 py-2 border border-gray-300 rounded text-sm'
            />
          </div>
          {uploadingForm && (
            <div className='mt-3'>
              <div className='w-full bg-gray-200 rounded-full h-2'>
                <div
                  className='bg-emerald-950 h-2 rounded-full transition-all'
                  style={{ width: `${uploadProgressForm}%` }}
                ></div>
              </div>
              <p className='text-xs text-gray-600 mt-1'>
                업로드 중... {Math.round(uploadProgressForm)}%
              </p>
            </div>
          )}
        </div>

        {/* OT 자료 업로드 */}
        <div className='p-4 bg-white border border-gray-200 rounded'>
          <label className='block text-gray-700 text-sm font-bold mb-3'>
            신입생 OT 자료 업로드
          </label>
          <p className='text-xs text-gray-500 mb-3'>
            지원 가능한 형식: .pdf, .pptx (최대 10MB)
          </p>
          <div className='flex items-center gap-3'>
            <input
              type='file'
              id='otFile'
              accept='.pdf,.pptx'
              disabled={uploadingOt}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  if (file.size > 10 * 1024 * 1024) {
                    showPopup('알림', '파일 크기가 10MB를 초과합니다.');
                    return;
                  }
                  uploadFile(file, 'ot', setUploadingOt, setUploadProgressOt);
                }
              }}
              className='flex-1 px-3 py-2 border border-gray-300 rounded text-sm'
            />
          </div>
          {uploadingOt && (
            <div className='mt-3'>
              <div className='w-full bg-gray-200 rounded-full h-2'>
                <div
                  className='bg-emerald-950 h-2 rounded-full transition-all'
                  style={{ width: `${uploadProgressOt}%` }}
                ></div>
              </div>
              <p className='text-xs text-gray-600 mt-1'>
                업로드 중... {Math.round(uploadProgressOt)}%
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Popup - 일반 메시지 */}
      <Popup isOpen={popup.isOpen} onClose={popup.close}>
        <Popup.Title>{popupTitle}</Popup.Title>
        <Popup.Content>{popupMessage}</Popup.Content>
        <Popup.Button variant='primary' onClick={popup.close}>
          확인
        </Popup.Button>
      </Popup>

      {/* Popup - 삭제 확인 */}
      <Popup
        isOpen={deleteConfirmDialog.isOpen}
        onClose={deleteConfirmDialog.close}
      >
        <Popup.Title>파일 삭제</Popup.Title>
        <Popup.Content>
          {pendingDeleteType === 'form' ? '모집 신청서' : 'OT 자료'}를
          삭제하시겠습니까?
        </Popup.Content>
        <div className='flex gap-3'>
          <Popup.Button variant='neutral' onClick={deleteConfirmDialog.close}>
            취소
          </Popup.Button>
          <Popup.Button variant='danger' onClick={confirmDelete}>
            삭제
          </Popup.Button>
        </div>
      </Popup>
    </div>
  );
};

export default RecruitFileUpload;
