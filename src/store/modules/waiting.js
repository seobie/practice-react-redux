import { createAction, handleActions } from 'redux-actions';

//액션 타입 정의
const CHANGE_INPUT = 'waiting/CHANGE_INPUT'; // 인풋 값 변경
const CREATE = 'waiting/CREATE'; // 명단에 이름 추가
const ENTER = 'waiting/ENTER'; // 입장
const LEAVE = 'waiting/LEAVE'; // 퇴장
// 각 액션들마다, 필요로 하는 파라미터값들이 다르다. 예를 들어 CHANGE_INPUT과 CREATE 는 문자열 상태의 값을 받아와야하고,
// ENTER와 LEAVE는 아이템의 id값을 받아와야 한다.

//액션 생성함수 만들기 - FSA 규칙을 따르게 정의
// export const changeInput = (text) => ({ type: CHANGE_INPUT, payload: text });
// export const create = (text) => ({ type: CREATE, payload: text });
// export const enter = (id) => ({ type: ENTER, payload: id });
// export const leave = (id) => ({ type: LEAVE, payload: id });

let id = 3;

// **** createAction으로 액션 만들기
export const changeInput = createAction(CHANGE_INPUT, (text) => text);
export const create = createAction(CREATE, (text) => ({ text, id: id++ }));
export const enter = createAction(ENTER, (id) => id);
export const leave = createAction(LEAVE, (id) => id);
// 가독성이 훨씬 좋아졌다.
// createAction 함수에서 두 번째 파라미터로 받는 부분은 payloadCreator 로서, payload 를 어떻게 정할 지 설정한다.
// 만약 생략하면 기본적으로 payload => payload 형태로 되기때문에 위의 코드를 다음과 같이 작성해도 작동에 있어선 차이가 없다.

// export const leave = createAction(LEAVE);
// leave(1); // { type: LEAVE, payload: 1}
// 그 대신에 이렇게 두번째 파라미터를 생략한다면, 해당 액션에서 어떠한 값을 payload 로 설정하게 했더라? 하고 헷갈릴 가능성이 있습니다.

// **** 초기 상태 정의
const initialState = {
  input: '',
  list: [
    {
      id: 0,
      name: '홍길동',
      entered: true,
    },
    {
      id: 1,
      name: '콩쥐',
      entered: false,
    },
    {
      id: 2,
      name: '팥쥐',
      entered: false,
    },
  ],
};

// **** handleActions 로 리듀서 함수 작성
// handleActions 를 사용하면, 더이상 switch/case 문을 사용할 필요가 없이 각 액션 타입마다 업데이터 함수를 구현하는 방식으로 할 수 있어서 가독성이 더 좋아진다.
export default handleActions(
  {
    [CHANGE_INPUT]: (state, action) => ({
      ...state,
      input: action.payload,
    }),
    [CREATE]: (state, action) => ({
      ...state,
      list: state.list.concat({
        id: action.payload.id,
        name: action.payload.text,
        entered: false,
      }),
    }),
    [ENTER]: (state, action) => ({
      ...state,
      list: state.list.map((item) =>
        item.id === action.payload ? { ...item, entered: !item.entered } : item
      ),
    }),
    [LEAVE]: (state, action) => ({
      ...state,
      list: state.list.filter((item) => item.id !== action.payload),
    }),
  },
  initialState
);
// CREATE, ENTER, LEAVE 의 액션의 경우엔 배열을 다뤄야 하는 것들이라 concat, map, filter를 사용하여 불변성을 유지하면서 배열에 새로운 값을 지정했다.
