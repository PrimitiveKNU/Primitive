import { Crown } from 'lucide-react';
import { Popup, usePopup } from '@/src/Components/common/popup';

export const TestPopup = () => {
  const popup1 = usePopup();
  const popup2 = usePopup();
  const popup3 = usePopup();
  const popup4 = usePopup();

  return (
    <div className='p-8 space-y-4 max-w-2xl mx-auto min-h-screen bg-background'>
      <h1 className='text-3xl font-bold mb-8 text-foreground'>
        Popup Component Tests
      </h1>

      {/* Test 1: Basic Single Button Popup (matching the screenshot) */}
      <div className='border-t border-border pt-4'>
        <h2 className='text-xl font-bold mb-2 text-foreground'>
          Test 1: Basic Achievement Popup
        </h2>
        <p className='text-muted-foreground mb-4'>
          Matches the screenshot with crown emoji
        </p>
        <button
          onClick={popup1.open}
          className='px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary-600 transition'
        >
          Show Achievement Popup
        </button>

        <Popup isOpen={popup1.isOpen} onClose={popup1.close}>
          <Popup.Title>기억력 상위 1%</Popup.Title>
          <Popup.Subtitle>오늘 참여자 3199217명 중</Popup.Subtitle>
          <Popup.Image>👑</Popup.Image>
          <Popup.Subtitle>홍예지님 기억력이 대단하다냥!</Popup.Subtitle>
          <Popup.Button variant='primary' onClick={popup1.close}>
            선물 받기
          </Popup.Button>
        </Popup>
      </div>

      {/* Test 2: Two-Button Confirmation Popup */}
      <div className='border-t border-border pt-4'>
        <h2 className='text-xl font-bold mb-2 text-foreground'>
          Test 2: Two-Button Confirmation
        </h2>
        <p className='text-muted-foreground mb-4'>
          Delete confirmation with secondary and danger buttons
        </p>
        <button
          onClick={popup2.open}
          className='px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary-600 transition'
        >
          Show Delete Confirmation
        </button>

        <Popup isOpen={popup2.isOpen} onClose={popup2.close}>
          <Popup.Title>프로젝트 삭제</Popup.Title>
          <Popup.Subtitle>정말로 삭제하시겠습니까?</Popup.Subtitle>
          <Popup.Button variant='secondary' onClick={popup2.close}>
            취소
          </Popup.Button>
          <Popup.Button
            variant='danger'
            onClick={() => {
              console.log('Project deleted');
              popup2.close();
            }}
          >
            삭제
          </Popup.Button>
        </Popup>
      </div>

      {/* Test 3: Success Popup with Custom Color */}
      <div className='border-t border-border pt-4'>
        <h2 className='text-xl font-bold mb-2 text-foreground'>
          Test 3: Success Popup with Custom Color
        </h2>
        <p className='text-muted-foreground mb-4'>
          Success message with accent color button
        </p>
        <button
          onClick={popup3.open}
          className='px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary-600 transition'
        >
          Show Success Message
        </button>

        <Popup isOpen={popup3.isOpen} onClose={popup3.close}>
          <Popup.Title>성공!</Popup.Title>
          <Popup.Image>✅</Popup.Image>
          <Popup.Subtitle>작업이 완료되었습니다</Popup.Subtitle>
          <Popup.Button variant='success' onClick={popup3.close}>
            확인
          </Popup.Button>
        </Popup>
      </div>

      {/* Test 4: Popup with Lucide Icon and Size Variant */}
      <div className='border-t border-border pt-4'>
        <h2 className='text-xl font-bold mb-2 text-foreground'>
          Test 4: Lucide Icon with Size Variant
        </h2>
        <p className='text-muted-foreground mb-4'>
          Using Lucide React Crown icon with large size
        </p>
        <button
          onClick={popup4.open}
          className='px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary-600 transition'
        >
          Show Lucide Icon Popup
        </button>

        <Popup isOpen={popup4.isOpen} onClose={popup4.close}>
          <Popup.Title>축하합니다!</Popup.Title>
          <Popup.Image size='lg'>
            <Crown className='text-accent' size={64} />
          </Popup.Image>
          <Popup.Subtitle>새로운 업적 달성</Popup.Subtitle>
          <Popup.Button variant='success' onClick={popup4.close}>
            확인
          </Popup.Button>
        </Popup>
      </div>

      {/* Test Instructions */}
      <div className='border-t border-border pt-4 bg-card p-4 rounded-lg'>
        <h3 className='font-bold mb-2 text-foreground'>Test Instructions:</h3>
        <ul className='list-disc list-inside space-y-1 text-sm text-muted-foreground'>
          <li>Click each button to open the corresponding popup</li>
          <li>Test backdrop click to close (should close popup)</li>
          <li>Test Escape key to close (should close popup)</li>
          <li>Test animations (fade in and fade out)</li>
          <li>Test responsive design by resizing the window</li>
          <li>Verify button interactions work correctly</li>
          <li>Check that body scroll is prevented when popup is open</li>
        </ul>
      </div>
    </div>
  );
};
