import React, { Component } from 'react';
import { connect } from 'react-redux';
import Palette from '../components/Palette';
import { changeColor } from '../store/modules/counter';

class PaletteContainer extends Component {
  handleSelect = (color) => {
    const { changeColor } = this.props;
    console.log('what');
    changeColor(color);
  };

  render() {
    const { color } = this.props;
    return <Palette onSelect={this.handleSelect} selected={color} />;
  }
}

// props로 넣어줄 스토어 상태값
const mapStateToProps = (state) => ({ color: state.counter.color });

// props로 넣어줄 액션 생성함수
const mapDispatchToProps = (dispatch) => ({
  changeColor: (color) => dispatch(changeColor(color)),
});

//컴포넌트에 리덕스 스토어를 연동해줄 때에는 connect 함수 사용
export default connect(mapStateToProps, mapDispatchToProps)(PaletteContainer);

// 컨테이너 컴포넌트를 만들땐, react-redux 안에 들어있는 connect 라는 함수를 사용한다.
// 이 함수의 파라미터에 전달해주는 mapStateToProps 는 스토어 안에 들어있는 값을 props로 전달해주고, mapDispatchToProps는 액션 생성함수들을 props로 전달한다.
// mapDispatchToProps가 조금 헷갈릴 수 있다. 액션생성함수는 호출한다고 해서 상태에 변화가 일어나는 것은 아니다.
// 그 대신에, 액션 객체를 생성해낸다. 그 액션 객체를 스토어에 전달해주어야 상태에 변화가 발생한다.
// mapDIspatchToProps 에서는 color를 파라미터로 받아와서 그 값을 가지고 CHANGE_COLOR 액션 객체를 생성한 다음에 스토어한테 디스패치 하는 함수를, 컴포넌트의 props로 전달해준다.
// connect 함수가 호출되면 반환되는 값은 특정 컴포넌트에 설정된 props를 전달해주는 함수이다.
// connect()를 호출해서 반환받은 함수에 PaletteContainer를 파라미터로 넣어서 호출한 것이다 라고 이해하면 된다.
// 컨테이너 컴포넌트를 다 만들었다면 App 에서 보여지는 Palette를 PaletteContainer로 대체한다.
