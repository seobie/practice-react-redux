https://velog.io/@velopert/Redux-3-%EB%A6%AC%EB%8D%95%EC%8A%A4%EB%A5%BC-%EB%A6%AC%EC%95%A1%ED%8A%B8%EC%99%80-%ED%95%A8%EA%BB%98-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0-nvjltahf5e

3-1. 리덕스의 3가지 규칙
리덕스를 프로젝트에서 사용하게 될 때 알아둬야 할 3가지 규칙이 있습니다.

1. 하나의 애플리케이션 안에는 하나의 스토어가 있습니다.
   하나의 애플리케이션에선 단 한개의 스토어를 만들어서 사용합니다. 여러개의 스토어를 사용하는것은 사실 가능하기는 하나, 권장되지는 않습니다. 특정 업데이트가 너무 빈번하게 일어나거나, 애플리케이션의 특정 부분을 완전히 분리시키게 될 때 여러개의 스토어를 만들 수도 있습니다. 하지만 그렇게 하면, 개발 도구를 활용하지 못하게 됩니다.

2. 상태는 읽기전용 입니다.
   리액트에서 state 를 업데이트 해야 할 때, setState 를 사용하고, 배열을 업데이트 해야 할 때는 배열 자체에 push 를 직접 하지 않고, concat 같은 함수를 사용하여 기존의 배열은 수정하지 않고 새로운 배열을 만들어서 교체하는 방식으로 업데이트를 합니다. 엄청 깊은 구조로 되어있는 객체를 업데이트를 할 때도 마찬가지로, 기존의 객체는 건들이지 않고 Object.assign 을 사용하거나 spread 연산자 (...) 를 사용하여 업데이트 하곤 하죠.

리덕스에서도 마찬가지입니다. 기존의 상태는 건들이지 않고 새로운 상태를 생성하여 업데이트 해주는 방식으로 해주면, 나중에 개발자 도구를 통해서 뒤로 돌릴 수도 있고 다시 앞으로 돌릴 수도 있습니다.

리덕스에서 불변성을 유지해야 하는 이유는 내부적으로 데이터가 변경 되는 것을 감지하기 위하여 shallow equality 검사를 하기 때문입니다. 이를 통하여 객체의 변화를 감지 할 때 객체의 깊숙한 안쪽까지 비교를 하는 것이 아니라 겉핥기 식으로 비교를 하여 좋은 성능을 유지할 수 있는 것이죠.

우리는 이 튜토리얼에서는 Immutable.js 혹은 Immer.js 를 사용하여 불변성을 유지하며 상태를 관리하는 방법에 대해서 다뤄보게 됩니다. 불변성과 Immutable.js 가 익숙하지 않다면 리액트의 불변함, 그리고 컴포넌트에서 Immutable.js 사용하기 포스트를 읽으시면 도움이 될거에요.

3. 변화를 일으키는 함수, 리듀서는 순수한 함수여야 합니다.
   순수한 함수, 라는 개념이 익숙하지 않으시죠. 다음 사항을 기억해주세요.

리듀서 함수는 이전 상태와, 액션 객체를 파라미터로 받습니다.
이전의 상태는 절대로 건들이지 않고, 변화를 일으킨 새로운 상태 객체를 만들어서 반환합니다.
똑같은 파라미터로 호출된 리듀서 함수는 언제나 똑같은 결과값을 반환해야만 합니다.
3가지 사항을 주의해주세요. 동일한 인풋이라면 언제나 동일한 아웃풋이 있어야 합니다. 그런데 일부 로직들 중에서는 실행 할 때마다 다른 결과값이 나타날 수도 있죠. new Date() 를 사용한다던지.. 랜덤 숫자를 생성한다던지.. 혹은, 네트워크에 요청을 한다던지! 그러한 작업은 결코 순수하지 않은 작업이므로, 리듀서 함수의 바깥에서 처리해줘야 합니다. 그런것을 하기 위해서, 리덕스 미들웨어 를 사용하곤 하죠.

3-2. 리액트와 함께 사용하기
리덕스를 리액트와 함께 사용하는 방법을 알아봅시다. 우리는, 이러한 프로젝트를 만들어볼겁니다.

상단에는 알록달록한 카운터가 있습니다. 이 카운터에서는 팔레트에서 색상을 고를 수 있고, 여기서 고른 색상이 숫자의 색상으로 지정됩니다. 그리고 버튼을 누르면 값이 바뀌죠.

하단에는 대기자 명단이 있습니다. 폼에서 이름을 등록을 추가하면 하단에 추가되고, 리스트에서 입장을 누르면 줄이 그어지고, 나감을 누르면 제거됩니다.

시간을 효율적으로 활용하기 위하여, 컴포넌트 구성 및 스타일링은 생략하고, 껍데기만 이미 만들어진 프로젝트에서 진행하겠습니다.

다음 명령어를 입력하시거나,

$ git clone https://github.com/vlpt-playground/learn-redux.git
이미 만들어둔 코드샌드박스 템플릿에서 진행하세요.

프로젝트를 열어서 내부에 어떤 컴포넌트들이 있는지 하나하나 살펴보세요. 상태관리는 아직 구현이 되어있지 않기 떄문에 버튼들을 클릭해도 작동하지는 않을겁니다.

리액트에서 리덕스를 사용하기위해 필요한 라이브러리
리액트 프로젝트에서 리덕스를 사용하려면 다음 라이브러리들이 설치되어야 합니다. (위 템플릿 프로젝트에는 이미 설치가 된 상태입니다.)

redux: 리덕스 모듈
react-redux: 리액트 컴포넌트에서 리덕스를 사용하기위한 유용한 도구들이 들어가있습니다.
redux-actions: 이 라이브러리를 꼭 설치 할 필요는 없습니다. 단, 알아두면 굉장히 유용합니다.
준비가 다 되셨으면 하나하나 차근차근히 구현해봅시다!

3-3. 알록달록 카운터 만들기
알록달록 카운터를 만들어봅시다! 리덕스 공식 매뉴얼 을 보면 액션을 위한 파일과 리듀서를 위한 파일을 따로 작성합니다. 그렇게 하셔도 상관은 없는데 저는 개인적으로 불편하다고 생각합니다. 하나의 파일로 작성하는 방법도 있는데, 이를 Ducks 패턴이라고 합니다.

우리는, 처음 배울떄부터 이 Ducks 패턴으로 개발을 하겠습니다.

counter 모듈 만들기
특정 기능을 구현하기위하여 필요한 액션과, 액션생성함수와, 초깃값과, 리듀서함수가 들어있는 파일을 우리는 모듈 이라고 부릅니다. 그리고 이 파일은 src/store/modules 경로에 저장합니다.

src/store/modules/counter.js 라는 새 파일을 만들어주세요.

액션 타입 정의하기
그 파일에, 우리가 카운터 쪽에서 사용할 액션들을 작성해주세요.

src/store/modules/counter.js
// 액션 타입 정의
const CHANGE_COLOR = 'counter/CHANGE_COLOR';
const INCREMENT = 'counter/INCREMENT';
const DECREMENT = 'counter/DECREMENT';
Ducks 패턴을 사용 할 땐 위와 같이 액션 이름을 지을 때 문자열의 앞부분에 모듈 이름을 넣습니다. 이는, 다른 모듈에서 작성하게 될 수도 있는 액션들과 충돌되지 않게 하기 위함입니다.

액션 생성함수 정의하기
위에서 정의했던 액션 타입에 따라 액션 생성함수를 만들어주겠습니다.

src/store/modules/counter.js
// 액션 타입 정의
const CHANGE_COLOR = 'counter/CHANGE_COLOR';
const INCREMENT = 'counter/INCREMENT';
const DECREMENT = 'counter/DECREMENT';

// \*\*\*\* 액션 생섬함수 정의
export const changeColor = color => ({ type: CHANGE_COLOR, color });
export const increment = () => ({ type: INCREMENT });
export const decrement = () => ({ type: DECREMENT });
액션 생성함수를 정의할땐 위와 같이 꼭 앞에 export 를 붙여주세요. 여기서 만든 함수들은 나중에 우리가 컴포넌트에 리덕스를 연동하고 불러와서 사용하게 됩니다.

초기상태와 리듀서 정의
이제 초기상태와 리듀서를 정의해주겠습니다.

src/store/modules/counter.js
// 액션 타입 정의
const CHANGE_COLOR = 'counter/CHANGE_COLOR';
const INCREMENT = 'counter/INCREMENT';
const DECREMENT = 'counter/DECREMENT';

// 액션 생섬함수 정의
export const changeColor = color => ({ type: CHANGE_COLOR, color });
export const increment = () => ({ type: INCREMENT });
export const decrement = () => ({ type: DECREMENT });

// \*\*\*\* 초기상태 정의
const initialState = {
color: 'red',
number: 0,
};

// \*\*\*\* 리듀서 작성
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
리듀서 함수의 경우엔, 꼭 export default 를 해주어야합니다. 나중에 스토어를 만들 때, 이 함수를 필요로 합니다.

이제 알록 달록 카윤터에서 필요로하는 리덕스 모듈을 다 만들었습니다.
이제, 스토어를 만들어줄 차례인데요, 이번 프로젝트 같은 경우는, 앞으로 우리가 두개의 리듀서를 만들거여서 (아직은 만들지 않았지만) 여러개의 리듀서들을 합치는 작업을 해주어야 합니다.

combineReducers 로 리듀서 합치기
리듀서가 여러개일대는 redux 의 내장함수인 combineReducers 를 사용하여 리듀서를 하나로 합치는 작업을 합니다. 여러개로 나뉘어진 리듀서들을 서브리듀서 라고 부르고, 하나로 합쳐진 리듀서를 루트리듀서 라고 부릅니다.

modules 디렉토리에 index.js 파일을 다음과 같이 만들어주세요

src/store/modules/index.js
import { combineReducers } from 'redux';
import counter from './counter';

export default combineReducers({
counter,
// 다른 리듀서를 만들게되면 여기에 넣어줌..
});
이렇게 리듀서를 합치게 되면, 루트 리듀서의 초깃값은 다음과 같은 구조로 됩니다.

{
counter: {
color: 'red',
number: 0,
},
// ... 다른 리듀서에서 사용하는 초깃값들
}
스토어 만들기
이제 스토어를 만들어주겠습니다! 우리가 이전에 스토어를 만들때는 createStore 라는 함수를 사용하여 파라미터로는 리듀서를 넣어준다고 했었지요? 그리고, 리덕스의 3 가지 규칙을 배울떄 우리는 "하나의 애플리케이션 안에는 하나의 스토어가 있습니다." 라고 배웠습니다.

스토어는 여러분의 앱이 시작되는 src/index.js 쪽에서 딱 한번, 만드시면 됩니다.

다음과 같이 코드를 작성해보세요.

src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
// \*\*\*\* (1) createStore 와 루트 리듀서 불러오기
import { createStore } from 'redux';
import rootReducer from './store/modules';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// \*\*\*\* (2) 스토어를 만들고 현재 값 확인해보기
const store = createStore(rootReducer);
console.log(store.getState());

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
store.getState() 를 호출하셔서 현재 스토어의 값을 확인해보면 다음과 같이 나타날 것입니다.

그럼 스토어를 성공적으로, 잘 만드신겁니다!

리덕스 개발자 도구 적용하기
리덕스 개발을 더욱 편하게 하기 위해서 Redux Devtools 라는 크롬 확장프로그램을 활용하시면 정말 편합니다. 크롬 웹스토어 에서 설치를 하시고, 스토어를 만들 때 다음과 같이 코드를 수정해주면 적용됩니다.

src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
// createStore 와 루트 리듀서 불러오기
import { createStore } from 'redux';
import rootReducer from './store/modules';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// \*\*\*\* 리덕스 개발자도구 적용
const devTools =
window.**REDUX_DEVTOOLS_EXTENSION** && window.**REDUX_DEVTOOLS_EXTENSION**();
const store = createStore(rootReducer, devTools);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

Provider 를 사용하여 리액트 프로젝트에 스토어 연동
리액트 프로젝트에 스토어를 연동 할 때에는 react-redux 라이브러리 안에 들어있는 Provider 라는 컴포넌트를 사용합니다. 기존의 JSX 를 Provider 로 감싸고, store 는 props 로 Provider 한테 넣어주면 됩니다.

src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
// createStore 와 루트 리듀서 불러오기
import { createStore } from 'redux';
import rootReducer from './store/modules';
// \*\*\*\* (1) Provider 불러오기
import { Provider } from 'react-redux';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// 리덕스 개발자도구 적용
const devTools =
window.**REDUX_DEVTOOLS_EXTENSION** && window.**REDUX_DEVTOOLS_EXTENSION**();
const store = createStore(rootReducer, devTools);

// \*\*\*\* (2) Provider 렌더링해서 기존의 App 감싸주기
ReactDOM.render(
<Provider store={store}>
<App />
</Provider>,
document.getElementById('root')
);
registerServiceWorker();
connect 함수를 사용하여 컴포넌트에 스토어 연동하기
이제 우리는 컴포넌트에 리덕스 스토어 안에 있는 값이나 액션 함수들을 연동해줄건데요, 이렇게 리덕스와 연동된 컴포넌트를 우리는 컨테이너 컴포넌트라고 부릅니다. 그리고, 그냥 단순히 props 를 전달해주면 그대로 보여주는 컴포넌트들은 프리젠테이셔널 컴포넌트라고 부릅니다.

컨테이너 컴포넌트는 똑똑한 (Smart) 컴포넌트, 프리젠테이셔널 컴포넌트는 멍청한 (Dumb) 컴포넌트라고 부르기도 합니다.

프리젠테이셔널 컴포넌트와 컨테이너 컴포넌트, 이렇게 컴포넌트를 분류하는 방식은 리덕스의 창시자인 Dan Abramov 가 제시한 방법이고, 리덕스를 사용 할 때 이렇게 하면 좋다고 권장하긴 하지만, 무조건 따를 필요까지는 없습니다. (우리는 이 방식대로 개발하긴 할겁니다. 충분히 유용한 흐름입니다.)

이러한 개발 방식에 있어서 최대 장점은 프리젠테이셔널 컴포넌트에선 UI 의 모양새에만 집중 할 수 있고, 컨테이너 컴포넌트쪽에서는 유저 인터랙션쪽에 집중 할 수 있다는 점이 있습니다.

src 디렉토리에 containers 라는 디렉토리를 만들고, PaletteContainer 라는 컴포넌트를 만드세요.

src/containers/PaletteContainer.js
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Palette from '../components/Palette';
import { changeColor } from '../store/modules/counter';

class PaletteContainer extends Component {
handleSelect = color => {
const { changeColor } = this.props;
console.log('what');
changeColor(color);
};

render() {
const { color } = this.props;
return <Palette onSelect={this.handleSelect} selected={color} />;
}
}

// props 로 넣어줄 스토어 상태값
const mapStateToProps = state => ({
color: state.counter.color,
});

// props 로 넣어줄 액션 생성함수
const mapDispatchToProps = dispatch => ({
changeColor: color => dispatch(changeColor(color)),
});

// 컴포넌트에 리덕스 스토어를 연동해줄 때에는 connect 함수 사용
export default connect(
mapStateToProps,
mapDispatchToProps
)(PaletteContainer);
컨테이너 컴포넌트를 만들땐, react-redux 안에 들어있는 connect 라는 함수를 사용합니다. 이 함수의 파라미터에 전달해주는 mapStateToProps 는 스토어 안에 들어있는 값을 props 로 전달해주고,
mapDispatchToProps 는 액션 생성함수들을 props 로 전달해줍니다.

여기서 mapDispatchToProps 가 조금 헷갈리실 수 도 있는데, 액션생성함수는, 호출한다고 해서 상태에 변화가 일어나는것이 아닙니다. 그 대신에, 액션 객체를 생성해내죠. 그 액션 객체를 스토어한테 전달해주어야 상태에 변화가 발생합니다.

여기 있는 mapDispatchToProps 에서는, color 를 파라미터로 받아와서, 그 값을 가지고 CHANGE_COLOR 액션 객체를 생성한다음에 스토어한테 디스패치 하는 함수를, 컴포넌트의 props 로 전달해주는 것 이랍니다.

connect 함수가 호출되면, 반환되는 값은 특정 컴포넌트에 설정된 props 를 전달해주는 함수입니다. 지금 보시면 connect(...)(PaletteContainer) 이런식으로 호출되었는데, connect() 를 호출해서 반환받은 함수에, PaletteContainer 를 파라미터로 넣어서 호출한것이다 라고 이해하시면 됩니다.

컨테이너 컴포넌트를 다 만드셨다면, App 에서 보여지는 Palette 를 PaletteContainer 로 대체하시구요,

src/App.js
import React, { Component } from 'react';

import './App.css';
import Counter from './components/Counter';
import WaitingList from './components/WaitingList';
import PaletteContainer from './containers/PaletteContainer'; // \*\*\*\* (1) 불러오기

class App extends Component {
render() {
return (
<div className="App">
<PaletteContainer /> {/_ \*\*\*\* (2) 대체하기 _/}
<Counter value={0} color="red" />
<WaitingList />
</div>
);
}
}

export default App;
Palette 컴포넌트에서 PaletteItem 에 onClick 함수를 제대로 구현해주면, 팔레트에서 다른 색상을 클릭하시면 제대로 선택이 될 것입니다.

src/components/Palette.js
import React from 'react';
import './Palette.css';

const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];

const PaletteItem = ({ color, active, onClick }) => {
return (
<div
className={`PaletteItem ${active ? 'active' : ''}`}
style={{ backgroundColor: color }}
onClick={onClick}
/>
);
};

const Palette = ({ selected, onSelect }) => {
return (
<div className="Palette">
<h2>색깔을 골라골라</h2>
<div className="colors">
{colors.map(color => (
<PaletteItem
color={color}
key={color}
active={selected === color}
onClick={() => onSelect(color)} // \*\*\*\* onClick 구현
/>
))}
</div>
</div>
);
};

export default Palette;

이번엔, 비슷한 원리대로, CounterContainer 도 만들어보겠습니다.

src/containers/CounterContainer.js
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Counter from '../components/Counter';
import { increment, decrement } from '../store/modules/counter';

class CounterContainer extends Component {
handleIncrement = () => {
this.props.increment();
};
handleDecrement = () => {
this.props.decrement();
};
render() {
const { color, number } = this.props;
return (
<Counter
        color={color}
        value={number}
        onIncrement={this.handleIncrement}
        onDecrement={this.handleDecrement}
      />
);
}
}

const mapStateToProps = ({ counter }) => ({
color: counter.color,
number: counter.number,
});

const mapDispatchToProps = dispatch => ({
increment: () => dispatch(increment()),
decrement: () => dispatch(decrement()),
});

export default connect(
mapStateToProps,
mapDispatchToProps
)(CounterContainer);
``;
mapStateToProps 부분에서는, state 에 해당하는 부분을 비구조화 할당을 해주었습니다. 그러면, 각 값을 조회 할 떄마다 state. 를 생략해도 되겠죠?

추가적으로 mapDispatchToProps 부분에선, 이번엔 액션이 두개가 있습니다. 계속 dispatch 해주기가 조금 귀찮죠? 그러한 경우엔 bindActionCreators 라는 함수를 사용하면 조금 더 쉽게 할 수 있습니다.

src/containers/CounterContainer.js
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'; // \*\*\*\* (1) 불러오기
import Counter from '../components/Counter';
import { increment, decrement } from '../store/modules/counter';

class CounterContainer extends Component {
handleIncrement = () => {
this.props.increment();
};
handleDecrement = () => {
this.props.decrement();
};
render() {
const { color, number } = this.props;
return (
<Counter
        color={color}
        value={number}
        onIncrement={this.handleIncrement}
        onDecrement={this.handleDecrement}
      />
);
}
}

const mapStateToProps = ({ counter }) => ({
color: counter.color,
number: counter.number,
});

const mapDispatchToProps = dispatch =>
bindActionCreators({ increment, decrement }, dispatch); // \*\*\*\* (2) bindActionCreators 사용.

export default connect(
mapStateToProps,
mapDispatchToProps
)(CounterContainer);
이렇게하면, 기존에 했던
actionCreator: (...params) => dispatch(actionCreator(...params) 에 해당하는 작업을 자동으로 해줍니다. 만약에 액션 생성함수가 파라미터를 필요로 하는것이더라도, 정상적으로 작동합니다.

또 다른 방식으로는 mapDispatchToProps 를 함수형태가 아닌 아예 액션생성함수로 이뤄진 객체를 전달해주면, connect 가 발생하게 될 때 bindActionCreators 를 자동으로 해줍니다.

src/containers/CounterContainer.js
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Counter from '../components/Counter';
import { increment, decrement } from '../store/modules/counter';

class CounterContainer extends Component {
handleIncrement = () => {
this.props.increment();
};
handleDecrement = () => {
this.props.decrement();
};
render() {
const { color, number } = this.props;
return (
<Counter
        color={color}
        value={number}
        onIncrement={this.handleIncrement}
        onDecrement={this.handleDecrement}
      />
);
}
}

const mapStateToProps = ({ counter }) => ({
color: counter.color,
number: counter.number,
});

// \*\*\*\* 함수가 아닌 객체 설정시 자동 bindActionCreators 됨
const mapDispatchToProps = { increment, decrement };

export default connect(
mapStateToProps,
mapDispatchToProps
)(CounterContainer);
다 작성하셨으면, App 에서 Counter 대신 CounterContainer 를 보여주겠습니다.

src/App.js
import React, { Component } from 'react';

import './App.css';
import WaitingList from './components/WaitingList';
import PaletteContainer from './containers/PaletteContainer';
import CounterContainer from './containers/CounterContainer'; // \*\*\*\* (1) 불러오기

class App extends Component {
render() {
return (
<div className="App">
<PaletteContainer />
<CounterContainer /> {/_ \*\*\*\*(2) 대체하기 _/}
<WaitingList />
</div>
);
}
}

export default App;
그럼, 카운터쪽 구현도 끝납니다! 버튼들을 눌러보세요.

3-4. 대기자 명단 만들기
이제 카운터 아래쪽에 있는 대기자 명단 기능의 상태관리 작업을 해줄 차례입니다. 이번에는, redux-actions 라는 라이브러리를 활용하여 리덕스 모듈 작성을 더욱 손쉽게 하는 방법을 알아보겠습니다.

액션 타입 정의하기
우선, waiting.js 라는 리덕스 모듈을 만들고, 필요한 액션 타입들을 정의해주겠습니다.

src/store/modules/waiting.js
const CHANGE_INPUT = 'waiting/CHANGE_INPUT'; // 인풋 값 변경
const CREATE = 'waiting/CREATE'; // 명단에 이름 추가
const ENTER = 'waiting/ENTER'; // 입장
const LEAVE = 'waiting/LEAVE'; // 나감
각 액션들마다, 필요로 하는 파라미터값들이 다릅니다. 예를들어서 CHANGE_INPUT 과 CREATE 는 문자열 상태의 값을 받아와야 할 것이고, ENTER 와 LEAVE 는 아이템의 id 값을 받아와야 하겠죠.

액션 생성함수 만들기
우리는 잠시 후에, 액션 생성 함수를 간편하게 만들 수 있게 해주는 redux-actions 의 createAction 이라는 함수를 사용하여 작성해볼건데요, 이는 FSA 규칙을 따르는 액션 객체를 만들어주는데, 이 FSA 규칙은 읽기 쉽고, 유용하고, 간단한 액션 객체를 만들기 위해서 만들어졌습니다.

FSA 에선 다음 조건들을 필수적으로 갖추고있어야 합니다.

순수 자바스크립트 객체이며,
type 값이 있어야 합니다.
그리고 다음 사항들은 선택적으로 필요합니다.

error 값이 있음
payload 값이 있음
meta 값이 있음
여기서 payload 부분을 주시하셔야 되는데, FSA 규칙을 따르는 액션 객체는, 액션에서 사용 할 파라미터의 필드명을 payload 로 통일 시킵니다. 이를 통하여, 우리는 액션 생성 함수를 훨씬 더 쉽게 작성 할 수 있습니다.

error 는 에러가 발생 할 시 넣어 줄 수 있는 값이고, meta 는 상태 변화에 있어서 완전히 핵심적이지는 않지만 참조할만한 값을 넣어줍니다.

그럼, 먼저 FSA 규칙을 준수하여 액션 생성 함수를 작성해볼까요?

src/store/modules/waiting.js
const CHANGE_INPUT = 'waiting/CHANGE_INPUT'; // 인풋 값 변경
const CREATE = 'waiting/CREATE'; // 명단에 이름 추가
const ENTER = 'waiting/ENTER'; // 입장
const LEAVE = 'waiting/LEAVE'; // 나감

// \*\*\*\* FSA 규칙을 따르는 액션 생성 함수 정의
export const changeInput = text => ({ type: CHANGE_INPUT, payload: text });
export const create = text => ({ type: CREATE, payload: text });
export const enter = id => ({ type: ENTER, payload: id });
export const leave = id => ({ type: LEAVE, payload: id });
createAction 사용하기
위 코드는, createAction 을 사용하게 된다면 다음과 같이 대체 할 수 있습니다.

src/store/modules/waiting.js
import { createAction } from 'redux-actions';

const CHANGE_INPUT = 'waiting/CHANGE_INPUT'; // 인풋 값 변경
const CREATE = 'waiting/CREATE'; // 명단에 이름 추가
const ENTER = 'waiting/ENTER'; // 입장
const LEAVE = 'waiting/LEAVE'; // 나감

// \*\*\*\* createAction 으로 액션 만들기
export const changeInput = createAction(CHANGE_INPUT, text => text);
export const create = createAction(CREATE, text => text);
export const enter = createAction(ENTER, id => id);
export const leave = createAction(LEAVE, id => id);
훨씬 가독성이 좋죠? createAction 함수에서 두번째 파라미터로 받는 부분은 payloadCreator 로서, payload 를 어떻게 정할 지 설정합니다. 만약에 생략하면 기본적으로 payload => payload 형태로 되기 때문에, 위 코드를 다음과 같이 작성해도 작동에 있어선 차이가 없습니다.

export const leave = createAction(LEAVE);
leave(1); // { type: LEAVE, payload: 1 }
그 대신에 이렇게 두번째 파라미터를 생략한다면, 해당 액션에서 어떠한 값을 payload 로 설정하게 했더라? 하고 헷갈릴 가능성이 있습니다.

현재 상황에서는, 데이터를 새로 생성 할 때마다 고유 id 값을 주어야 하는데요, 이전에 우리는 "변화를 일으키는 함수, 리듀서는 순수한 함수여야 합니다." 라고 배웠습니다. 데이터에 고유 id 를 주는 작업은 리듀서에서 발생하면 안되고, 액션이 스토어에 디스패치 되기 전에 이뤄져야 합니다.

그걸 하기 위해서, 액션 생성함수를 조금 수정해주는 방법도 있습니다. 다음과 같이 코드를 수정해주세요.

import { createAction, handleActions } from 'redux-actions';

const CHANGE_INPUT = 'waiting/CHANGE_INPUT'; // 인풋 값 변경
const CREATE = 'waiting/CREATE'; // 명단에 이름 추가
const ENTER = 'waiting/ENTER'; // 입장
const LEAVE = 'waiting/LEAVE'; // 나감

let id = 3;
// createAction 으로 액션 생성함수 정의
export const changeInput = createAction(CHANGE_INPUT, text => text);
export const create = createAction(CREATE, text => ({ text, id: id++ }));
export const enter = createAction(ENTER, id => id);
export const leave = createAction(LEAVE, id => id);

export default handleActions({});
그러면, 이렇게 작동하게 됩니다.

create('hello');
{ type: CREATE, payload: { id: 3, text: 'hello' } }
create('bye');
{ type: CREATE, payload: { id: 4, text: 'bye' } }
초기 상태 및 리듀서 정의
이제 이 모듈의 초기 상태와 리듀서를 정의해주겠습니다. 리듀서를 만들 땐, redux-actions 의 handleActions 를 사용하면 훨씬 편하게 작성 할 수 있습니다.

import { createAction, handleActions } from 'redux-actions';

const CHANGE_INPUT = 'waiting/CHANGE_INPUT'; // 인풋 값 변경
const CREATE = 'waiting/CREATE'; // 명단에 이름 추가
const ENTER = 'waiting/ENTER'; // 입장
const LEAVE = 'waiting/LEAVE'; // 나감

let id = 3;
// createAction 으로 액션 생성함수 정의
export const changeInput = createAction(CHANGE_INPUT, text => text);
export const create = createAction(CREATE, text => ({ text, id: id++ }));
export const enter = createAction(ENTER, id => id);
export const leave = createAction(LEAVE, id => id);

// \*\*\*\* 초기 상태 정의
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

// \*\*\*\* handleActions 로 리듀서 함수 작성
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
list: state.list.map(
item =>
item.id === action.payload
? { ...item, entered: !item.entered }
: item
),
}),
[LEAVE]: (state, action) => ({
...state,
list: state.list.filter(item => item.id !== action.payload),
}),
},
initialState
);
handleActions 를 사용하면, 더이상 switch / case 문을 사용 할 필요가 없이 각 액션 타입마다 업데이터 함수를 구현하는 방식으로 할 수 있어서 가독성이 더 좋아집니다.

여기서, CREATE, ENTER, LEAVE 의 액션의 경우엔 배열을 다뤄야 하는 것들이라, concat, map, filter 를 사용하여 불변성을 유지하면서 배열에 새로운 값을 지정해주었습니다.

루트 리듀서에 포함 시키기
새 리듀서를 만들었으니, 루트 리듀서쪽에도 포함시켜줘야겠죠?

src/store/modules/index.js
import { combineReducers } from 'redux';
import counter from './counter';
import waiting from './waiting'; // \*\*\*\* 불러오기

export default combineReducers({
counter,
waiting, // \*\*\*\* 추가
});
WaitingListContainer 만들기
이제 컨테이너 컴포넌트를 만들어주겠습니다!

src/containers/WaitingListContainer.js
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import \* as waitingActions from '../store/modules/waiting';
import WaitingList from '../components/WaitingList';

class WaitingListContainer extends Component {
// 인풋 변경 이벤트
handleChange = e => {
const { WaitingActions } = this.props;
WaitingActions.changeInput(e.target.value);
};
// 등록 이벤트
handleSubmit = e => {
e.preventDefault();
const { WaitingActions, input } = this.props;
WaitingActions.create(input); // 등록
WaitingActions.changeInput(''); // 인풋 값 초기화
};
// 입장
handleEnter = id => {
const { WaitingActions } = this.props;
WaitingActions.enter(id);
};
// 나가기
handleLeave = id => {
const { WaitingActions } = this.props;
WaitingActions.leave(id);
};
render() {
const { input, list } = this.props;
return (
<WaitingList
        input={input}
        waitingList={list}
        onChange={this.handleChange}
        onSubmit={this.handleSubmit}
        onEnter={this.handleEnter}
        onLeave={this.handleLeave}
      />
);
}
}

const mapStateToProps = ({ waiting }) => ({
input: waiting.input,
list: waiting.list,
});

// 이런 구조로 하면 나중에 다양한 리덕스 모듈을 적용해야 하는 상황에서 유용합니다.
const mapDispatchToProps = dispatch => ({
WaitingActions: bindActionCreators(waitingActions, dispatch),
// AnotherActions: bindActionCreators(anotherActions, dispatch)
});
export default connect(
mapStateToProps,
mapDispatchToProps
)(WaitingListContainer);
그리고, App.js 에서 WaitingList 를 WaitingListContainer 로 교체하세요.

src/App.js
import React, { Component } from 'react';

import './App.css';
import PaletteContainer from './containers/PaletteContainer';
import CounterContainer from './containers/CounterContainer';
import WaitingListContainer from './containers/WaitingListContainer'; // \*\*\*\* 불러오기

class App extends Component {
render() {
return (
<div className="App">
<PaletteContainer />
<CounterContainer />
<WaitingListContainer /> {/_ \*\*\*\* 교체하기 _/}
</div>
);
}
}

export default App;
WaitingList 내부 구현
껍데기만 구현되어있었던 WaitingList 컴포넌트에 전달한 props 들을 유의미하게 사용하도록 기능들을 구현해주겠습니다.

src/components/WaitingList.js
import React from 'react';
import './WaitingList.css';

const WaitingItem = ({ text, entered, onEnter, onLeave }) => {
return (
<li>
<div className={`text ${entered ? 'entered' : ''}`}>{text}</div>
<div className="buttons">
<button onClick={onEnter}>입장</button>
<button onClick={onLeave}>나감</button>
</div>
</li>
);
};

const WaitingList = ({
input, // \***\* 추가됨
waitingList,
onChange, // \*\*** 추가됨
onSubmit, // \***\* 추가됨
onEnter,
onLeave,
}) => {
// \*\*** 데이터를 컴포넌트 리스트로 변환
const waitingItems = waitingList.map(w => (
<WaitingItem
key={w.id}
text={w.name}
entered={w.entered}
id={w.id}
onEnter={() => onEnter(w.id)}
onLeave={() => onLeave(w.id)}
/>
));
return (
<div className="WaitingList">
<h2>대기자 명단</h2>
{/_ form 과 input 에 이벤트 및 값 설정 _/}
<form onSubmit={onSubmit}>
<input value={input} onChange={onChange} />
<button>등록</button>
</form>
<ul>{waitingItems}</ul> {/_ 하드코딩된것을 컴포넌트 배열로 교체 _/}
</div>
);
};

export default WaitingList;
이제 대기자 명단 구현도 끝났습니다!
