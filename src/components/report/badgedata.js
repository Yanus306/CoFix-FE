const images = import.meta.glob('../../assets/badge/*.png', { 
  eager: true, 
  import: 'default' 
});

// 파일명(확장자 제외)만 넣으면 해당 이미지를 반환하는 함수
const getImg = (name) => images[`../../assets/badge/${name}.png`];

export const BADGE_DATA = [
    { 
        id: 'starter', 
        name: 'Hello, World!', 
        desc: 'Cofix 첫 시작',
        comment: '"Cofix에 오신것을 환영합니다!"', 
        src: getImg('badge-starter')
    },
    { 
        id: 'master', 
        name: '진(眞) 고인물', 
        desc: 'Cofix의 모든 배지 획득',
        comment: '"모든 배지를 획득하셨습니다!"', 
         src: getImg('badge-master')
    },
    { 
        id: 'CA-3', //Consecutive Attendance 연속출석
        name: '또 왔어?', 
        desc: '연속출석 3일 완료하셨습니다!',
        comment: '"또 오셨네요?"', 
         src: getImg('badge-ca-3')
    },
    { 
        id: 'CA-7', 
        name: '단골손님', 
        desc: '연속출석 7일 완료하셨습니다.',
        comment: '"저희 가게 단골이십니다."',
         src: getImg('badge-ca-7')
    },
    { 
        id: 'CA-15', 
        name: '근면성실 코딩 개미', 
        desc: '연속출석 15일 완료하셨습니다.',
        comment: '"개미는.. 뚠뚠 오늘도.. 뚠뚠"',
        src: getImg('badge-ca-15')
    },
    { 
        id: 'CA-30', 
        name: '사이버 지박령', 
        desc: '연속출석 30일 완료하셨습니다!',
        comment: '"당신은 사이버 지박령입니다."', 
         src: getImg('badge-ca-30')
    },
    { 
        id: 'TA-10', //Total Attendance 누적출석 약자
        name: '열 번 찍어 안 넘어 가는 코드 없다.', 
        desc: '누적 출석 10일 완료하셨습니다!',
        comment: '"10번 찍으면 넘어갈지도.."', 
         src: getImg('badge-ta-10')
    },
    { 
        id: 'TA-67', 
        name: '식세븐', 
        desc: '누적 출석 67일 완료하셨습니다!',
        comment: '"67!!!!!!!!!!!!!!!!!"', 
        src: getImg('badge-ta-67')
    },
    { 
        id: 'TA-100', 
        name: '사람이 되었습니다.', 
        desc: '누적 출석 100일 완료하셨습니다!',
        comment: '"사람되기 이렇게 힘든일이엿나?"', 
        src: getImg('badge-ta-100')
    },
    { 
        id: 'TA-365', 
        name: '코딩과 물아일체', 
        desc: '누적 출석 365일 완료하셨습니다!',
        comment: '"깨달았다.. 코딩의 핵심!!"', 
        src: getImg('badge-ta-365') 
    },
    { 
        id: 'TA-777', 
        name: '럭키데이', 
        desc: '누적 출석 777일 완료하셨습니다!',
        comment: '"뭔가 좋은일이 있으면 좋겠네.."', 
         src: getImg('badge-ta-777') 
    },
    { 
        id: 'VD-100', //Vulnerability Detection 약점 발견 약자
        name: '꼬마 탐정', 
        desc: '약점을 100개 발견하였습니다!',
        comment: '"약점을 찾았다!!"', 
         src: getImg('badge-starter') 
    },
    { 
        id: 'VD-300', 
        name: '견습 탐정', 
        desc: '약점을 300개 발견하였습니다!',
        comment: '"내 이름은 Co난.."', 
         src: getImg('badge-starter') 
    },
     { 
        id: 'VD-500', 
        name: '유명한 탐정', 
        desc: '약점을 500개 발견하였습니다!',
        comment: '"내 이름은 유명한.."', 
         src: getImg('badge-total-500') 
    },
    { 
        id: 'VD-999', 
        name: '비둘기 탐정', 
        desc: '약점을 999개 발견하였습니다!',
        comment: '"비둘기야 먹자~"', 
         src: getImg('badge-starter')
    },
    { 
        id: 'WR-50', //Weakness Resolution 약점 해결
        name: '동네 해결사', 
        desc: '약점을 50회 해결했습니다!',
        comment: '"내가 해결해주마."', 
         src: getImg('badge-starter') 
    },
     { 
        id: 'WR-100', 
        name: '약점엔 쎈 해결사', 
        desc: '약점을 100회 해결했습니다!',
        comment: '"이것도 해결해 보시지!"', 
        src: getImg('badge-starter') 
    },
     { 
        id: 'WR-300',
        name: '은빛 해결사', 
        desc: '약점을 300회 해결했습니다!',
        comment: '"더 이상의 허점은 존재하지 않는다."', 
         src: getImg('badge-starter')
    },
    { 
        id: 'WR-500',
        name: '은빛 해결사', 
        desc: '약점을 500회 해결했습니다!',
        comment: '"내가.. 정점에 서겠다."',
        src: getImg('badge-starter')
    },
    { 
        id: 'WR-999', 
        name: '비둘기 해결사', 
        desc: '약점을 999회 해결했습니다!',
        comment: '"비둘기야 먹자~~"',
        src: getImg('badge-starter')
    },
    { 
        id: 'CD-5', //Coding Duration 누적 코딩시간
        name: '어린이', 
        desc: '누적 코딩 5시간 달성하셨습니다!',
        comment: '"벌써 그렇게 됬나?"',
        src: getImg('badge-starter')
    },
       { 
        id: 'CD-20', 
        name: '청년',
        desc: '누적 코딩 20시간 달성하셨습니다!',
        comment: '"코딩했음청년"',
        src: getImg('badge-starter')
    },
       { 
        id: 'CD-90', 
        name: '코드 깎는 노인',
        desc: '누적 코딩 90시간 달성하셨습니다!',
        comment: '"니들이 게 맛을 알어?"',
        src: getImg('badge-starter')
    },
       { 
        id: 'CD-999',
        name: '코드 깎는 비둘기', 
        desc: '누적 코딩 999시간 달성하셨습니다!',
        comment: '"비둘기야 먹자~~~"',
       src: getImg('badge-starter')
    },
   
];