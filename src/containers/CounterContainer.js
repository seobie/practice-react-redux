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
//mapStateToProps 부분에서는, state 에 해당하는 부분을 비구조화 할당을 해주었습니다. 그러면, 각 값을 조회 할 떄마다 state. 를 생략해도 되겠죠?

// const mapDispatchToProps = (dispatch) => ({
//   increment: () => dispatch(increment()),
//   decrement: () => dispatch(decrement()),
// });
//추가적으로 mapDispatchToProps 부분에선, 이번엔 액션이 두개가 있습니다. 계속 dispatch 해주기가 조금 귀찮죠? 그러한 경우엔 bindActionCreators 라는 함수를 사용하면 조금 더 쉽게 할 수 있습니다.

// const mapDispatchToProps = (dispatch) =>
//   bindActionCreators({ increment, decrement }, dispatch);
// 이렇게하면, 기존에 했던
// actionCreator: (...params) => dispatch(actionCreator(...params) 에 해당하는 작업을 자동으로 해줍니다. 만약에 액션 생성함수가 파라미터를 필요로 하는것이더라도, 정상적으로 작동합니다.

const mapDispatchToProps = { increment, decrement };
// mapDispatchToProps 를 함수형태가 아닌 아예 액션생성함수로 이뤄진 객체를 전달해주면, connect 가 발생하게 될 때 bindActionCreators 를 자동으로 해줍니다.

export default connect(mapStateToProps, mapDispatchToProps)(CounterContainer);
