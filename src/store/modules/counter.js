// 액션 타입 정의
const CHANGE_COLOR = 'counter/CHANGE_COLOR';
const INCREMENT = 'counter/INCREMENT';
const DECREMENT = 'counter/DECREMENT';

// 액션 생성함수 정의
export const changeColor = (color) => ({ type: CHANGE_COLOR, color: color });
export const increment = () => ({ type: INCREMENT });
export const decrement = () => ({ type: DECREMENT });

// 액션 생성함수를 정의할 때는 위와 같이 꼭 앞에 export를 붙여줘야한다.
// 여기서 만든 함수들은 나중에 컴포넌트에 리덕스를 연동하고 불러와서 사용하게 된다.

// 초기상태 정의
const initialState = {
  color: 'red',
  number: 0,
};

// 리듀서 작성
export default function counter(state = initialState, action) {
  switch (action.type) {
    case CHANGE_COLOR:
      return {
        ...state,
        color: action.color,
      };
    case INCREMENT:
      return {
        ...state,
        number: state.number + 1,
      };
    case DECREMENT:
      return {
        ...state,
        number: state.number - 1,
      };
    default:
      return state;
  }
}
// 리듀서 함수의 경우엔, 꼭 export default를 해주어야 한다. 나중에 스토어를 만들 때, 이 함수를 필요로 한다.
