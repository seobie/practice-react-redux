//combineReducers로 리듀서 합치기
// 리듀서가 여러개일 때는 redux의 내장함수인 combineReducers를 사용하여 리듀서를 하나로 함치는 작업을 한다.
// 여러개로 나뉘어진 리듀서들을 서브리듀서라고 부르고, 하나로 함쳐진 리듀서를 루트리듀서라고 부른다.

import { combineReducers } from 'redux';
import counter from './counter';
import waiting from './waiting';

export default combineReducers({
  counter,
  waiting,
  //다른 리듀서를 만들게되면 여기에 넣어준다.
});

// 이렇게 리듀서를 합치게 되면, 루트 리듀서의 초깃값은 다음과 같은 구조로 됩니다.
// {
//   counter: {
//     color: 'red',
//     number: 0,
//   },
//   // ... 다른 리듀서에서 사용하는 초깃값들
// }
