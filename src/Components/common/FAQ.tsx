import QuestionBox from '../QuestionBox';

const FAQ = () => {
  return (
    <section className='bg-slate-100'>
      <div className='max-w-7xl mx-auto md:p-20 p-10'>
        <div className='text-4xl font-bold text-center py-10'>
          자주 묻는 질문
        </div>
        <div className='flex flex-col'>
          <QuestionBox
            question={'모집은 언제부터 시작하나요?'}
            answer={
              'Primitive 부원 모집은 매년 입학하는 신입생들을 대상으로 2월 중순부터 한 달간 진행됩니다. 자세한 일정은 에브리타임을 통해 확인해주세요 :D'
            }
          />
          <QuestionBox
            question={'재학생도 신청 가능한가요?'}
            answer={
              '아쉽지만 재학생은 신청이 불가능합니다. 😢 Primitive는 매년 입학하는 신입생들을 대상으로 신청을 받고 있습니다.'
            }
          />
          <QuestionBox
            question={'코딩을 배운 적이 없어도 신청 가능한가요?'}
            answer={
              'Primitive는 개인의 실력이나 능력보다는 동아리 활동에 참여하고자 하는 의지와 열정, 그리고 협업 태도를 중심으로 부원을 선정합니다. 신입생분들은 재밌게 대학 생활을 하고 싶으면 망설이지 말고 신청하세요!'
            }
          />
          <QuestionBox
            question={'신입생 교육에서는 무엇을 가르치나요?'}
            answer={'1학기에는 C, Java, Python 언어를 중점으로 교육합니다!'}
          />
          <QuestionBox
            question={'활동에서는 어떤 기술들을 사용하나요?'}
            answer={
              '주로 앱과 웹으로 나누어 활동합니다! 그 외에도 사람들을 모아서 하고 싶은 기술들을 배워보는 스터디를 만들어볼 수 있습니다!'
            }
          />
          <QuestionBox
            question={'문의사항이 있어요!'}
            answer={
              '그 외 더 궁금한 사항이 있다면 카카오톡(모집공고 참고)을 통해 연락주시면 감사하겠습니다!'
            }
          />
        </div>
      </div>
    </section>
  );
};

export default FAQ;
